import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");
const generatedDir = path.join(packageRoot, "assets", "generated");
const spriteOutputPath = path.join(generatedDir, "icons.svg");
const generatedTypesPath = path.join(packageRoot, "src", "generated", "icons.ts");

async function main() {
  const manifestModule = await loadManifest();
  const iconManifest = manifestModule.iconManifest;

  validateManifestShape(iconManifest);

  const icons = await Promise.all(
    iconManifest.map(async (entry) => {
      const absoluteSourcePath = path.resolve(packageRoot, entry.source);
      const svg = await fs.readFile(absoluteSourcePath, "utf8");
      return parseIcon(entry, svg);
    }),
  );

  await fs.mkdir(generatedDir, { recursive: true });
  await fs.mkdir(path.dirname(generatedTypesPath), { recursive: true });

  await Promise.all([
    fs.writeFile(spriteOutputPath, buildSprite(icons), "utf8"),
    fs.writeFile(generatedTypesPath, buildGeneratedTypes(iconManifest), "utf8"),
  ]);

  console.log(
    `Generated ${icons.length} icons:\n- ${path.relative(process.cwd(), spriteOutputPath)}\n- ${path.relative(process.cwd(), generatedTypesPath)}`,
  );
}

async function loadManifest() {
  const manifestPath = path.join(packageRoot, "src", "icon-manifest.ts");
  const manifestSource = await fs.readFile(manifestPath, "utf8");
  const transpiledSource = transpileManifestToJs(manifestSource);
  const dataUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(transpiledSource)}`;
  return import(dataUrl);
}

function transpileManifestToJs(source) {
  return source
    .replace(/export type[\s\S]*?;\n/g, "")
    .replace(/export interface[\s\S]*?\n}\n/g, "")
    .replace(
      /function defineIconManifest<const T extends readonly IconManifestEntry\[\]>\(entries: T\): T \{/g,
      "function defineIconManifest(entries) {",
    )
    .replace(/\] as const\);/g, "]);")
    .replace(/export const iconManifest =/g, "export const iconManifest =")
    .replace(/export type IconManifest[\s\S]*$/g, "");
}

function validateManifestShape(iconManifest) {
  if (!Array.isArray(iconManifest)) {
    throw new Error("Icon manifest must export an array named `iconManifest`.");
  }

  const exportNames = new Set();
  const symbolIds = new Set();

  for (const entry of iconManifest) {
    if (!entry || typeof entry !== "object") {
      throw new Error("Each icon manifest entry must be an object.");
    }

    for (const field of ["exportName", "symbolId", "source", "group", "size"]) {
      if (typeof entry[field] !== "string" || entry[field].length === 0) {
        throw new Error(`Icon manifest entry is missing a valid string field: ${field}`);
      }
    }

    if (exportNames.has(entry.exportName)) {
      throw new Error(`Duplicate icon export name: ${entry.exportName}`);
    }

    if (symbolIds.has(entry.symbolId)) {
      throw new Error(`Duplicate icon symbol id: ${entry.symbolId}`);
    }

    exportNames.add(entry.exportName);
    symbolIds.add(entry.symbolId);
  }
}

function parseIcon(entry, svgSource) {
  const svgTagMatch = svgSource.match(/<svg\b([^>]*)>/i);
  if (!svgTagMatch) {
    throw new Error(`Missing <svg> root in ${entry.source}`);
  }

  const viewBoxMatch = svgTagMatch[1].match(/\bviewBox="([^"]+)"/i);
  if (!viewBoxMatch) {
    throw new Error(`Missing viewBox in ${entry.source}`);
  }

  const innerMarkup = svgSource
    .replace(/^[\s\S]*?<svg\b[^>]*>/i, "")
    .replace(/<\/svg>\s*$/i, "")
    .trim();

  if (!innerMarkup) {
    throw new Error(`SVG has no drawable content: ${entry.source}`);
  }

  return {
    ...entry,
    viewBox: viewBoxMatch[1],
    body: normalizeSvgBody(simplifySvgBody(innerMarkup), entry.symbolId),
  };
}

function simplifySvgBody(body) {
  return body.replace(
    /<g clip-path="url\(#([^"]+)\)">([\s\S]*?)<\/g>\s*<defs>\s*<clipPath id="\1">\s*<rect[^>]*width="(?:20|16|12)"[^>]*height="(?:20|16)"[^>]*\/>\s*<\/clipPath>\s*<\/defs>/i,
    "$2",
  );
}

function normalizeSvgBody(body, symbolId) {
  const idMap = new Map();
  const scopedBody = body.replace(/\sid="([^"]+)"/g, (match, id) => {
    const scopedId = `${symbolId}__${id}`;
    idMap.set(id, scopedId);
    return match.replace(`id="${id}"`, `id="${scopedId}"`);
  });

  return Array.from(idMap.entries())
    .reduce((result, [id, scopedId]) => {
      return result
        .replaceAll(`url(#${id})`, `url(#${scopedId})`)
        .replaceAll(`href="#${id}"`, `href="#${scopedId}"`)
        .replaceAll(`xlink:href="#${id}"`, `xlink:href="#${scopedId}"`);
    }, scopedBody)
    .replace(/\s(fill|stroke)="black"/gi, ' $1="currentColor"')
    .replace(/\s(fill|stroke)="#000(?:000)?"/gi, ' $1="currentColor"')
    .replace(/\s(fill|stroke)="none"/gi, ' $1="none"')
    .replace(/\s+xmlns="[^"]*"/gi, "")
    .replace(/>\s+</g, "><")
    .trim();
}

function buildSprite(icons) {
  const symbols = icons
    .map(
      (icon) =>
        `<symbol id="${escapeAttribute(icon.symbolId)}" viewBox="${escapeAttribute(icon.viewBox)}">${icon.body}</symbol>`,
    )
    .join("\n");

  return [
    '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">',
    symbols,
    "</svg>",
    "",
  ].join("\n");
}

function buildGeneratedTypes(iconManifest) {
  // Separate illustrations from other icons
  const illustrationEntries = iconManifest.filter((entry) => entry.group === "illustration");
  const nonIllustrationEntries = iconManifest.filter((entry) => entry.group !== "illustration");

  const iconEntries = nonIllustrationEntries
    .map((entry) => `  ${entry.exportName}: "${entry.symbolId}",`)
    .join("\n");

  const illustrationIconEntries = illustrationEntries
    .map((entry) => `  ${entry.exportName}: "${entry.symbolId}",`)
    .join("\n");

  const groupEntries = groupBy(iconManifest, (entry) => entry.group);
  const groupBlocks = Object.entries(groupEntries)
    .map(([group, entries]) => {
      const values = entries.map((entry) => `  ${entry.exportName},`).join("\n");
      return `  ${JSON.stringify(group)}: [\n${values}\n  ],`;
    })
    .join("\n");

  return `
    export const icons = {
      ${iconEntries}
    } as const;

    export type IconDefinition = (typeof icons)[keyof typeof icons];
    export type IconName = keyof typeof icons;

    export const illustrations = {
      ${illustrationIconEntries}
    } as const;

    export type IllustrationDefinition = (typeof illustrations)[keyof typeof illustrations];
    export type IllustrationName = keyof typeof illustrations;

    export const {
      ${nonIllustrationEntries.map((entry) => `  ${entry.exportName},`).join("\n")}
    } = icons;

    export const {
      ${illustrationEntries.map((entry) => `  ${entry.exportName},`).join("\n")}
    } = illustrations;

    export const iconGroups = {
      ${groupBlocks}
    } as const;
  `;
}

function groupBy(items, getKey) {
  const groups = {};

  for (const item of items) {
    const key = getKey(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  }

  return groups;
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

main().catch((error) => {
  console.error("Failed to generate icons.");

  if (error instanceof Error) {
    console.error(error.stack ?? error.message);
  } else {
    console.error(String(error));
  }

  process.exit(1);
});
