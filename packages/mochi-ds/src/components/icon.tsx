import * as React from "react";

import { cn } from "#src/lib/utils";
import type { IconDefinition } from "../generated/icons";

const DEFAULT_ICON_SPRITE_URL = "/icons.svg";

const IconSpriteUrlContext = React.createContext<string>(DEFAULT_ICON_SPRITE_URL);

interface IconSpriteProviderProps {
  children: React.ReactNode;
  spriteUrl: string;
}

/**
 * Makes the icon sprite's URL available to every `Icon` beneath it.
 * The consuming app is expected to host the generated sprite (see
 * `assets/generated/icons.svg`) at `DEFAULT_ICON_SPRITE_URL` or to
 * provide the actual URL here.
 */
function IconSpriteProvider({ children, spriteUrl }: IconSpriteProviderProps) {
  return (
    <IconSpriteUrlContext.Provider value={spriteUrl}>{children}</IconSpriteUrlContext.Provider>
  );
}

function useIconSpriteUrl() {
  return React.useContext(IconSpriteUrlContext);
}

type IconProps = Omit<React.ComponentProps<"svg">, "children"> & {
  icon: IconDefinition;
  spriteUrl?: string;
  title?: string;
};

function Icon({
  icon,
  className,
  spriteUrl,
  title,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
  ...props
}: IconProps) {
  const contextSpriteUrl = useIconSpriteUrl();
  const resolvedSpriteUrl = spriteUrl ?? contextSpriteUrl;
  const href = `${resolvedSpriteUrl}#${icon}`;
  const isDecorative = ariaLabel == null && title == null;

  return (
    <svg
      data-slot="icon"
      className={cn("inline-block align-middle fill-current overflow-visible", className)}
      role={isDecorative ? undefined : "img"}
      aria-hidden={ariaHidden ?? (isDecorative ? true : undefined)}
      aria-label={ariaLabel}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <use href={href} xlinkHref={href} />
    </svg>
  );
}

export { DEFAULT_ICON_SPRITE_URL, Icon, IconSpriteProvider, useIconSpriteUrl };
export type { IconDefinition, IconProps };
