export type FieldErrorRow = { message: string };

function getFieldErrorMessage(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return undefined;
  const { message } = value as Record<string, unknown>;
  return typeof message === "string" ? message : undefined;
}

/**
 * Converts TanStack Form errors into a format compatible with the FieldError component.
 *
 * @param errors - Array of error values from TanStack Form field state
 * @param translate - Optional translation function for i18n support
 * @returns Array of error rows with message strings, or undefined if no valid errors
 *
 * @example
 * ```tsx
 * // Basic usage without translation
 * const errors = toFieldErrorRows(field.state.meta.errors);
 *
 * // With i18n translation
 * const errors = toFieldErrorRows(field.state.meta.errors, t);
 * ```
 */
export function toFieldErrorRows(
  errors: readonly unknown[] | undefined,
  translate?: (key: string) => string,
): FieldErrorRow[] | undefined {
  if (!errors?.length) return undefined;

  const rows = errors
    .map((error) => {
      const message = getFieldErrorMessage(error);
      if (!message) return undefined;
      const translated = translate && message.includes(".") ? translate(message) : message;
      return { message: translated };
    })
    .filter((row): row is FieldErrorRow => row !== undefined);

  return rows.length > 0 ? rows : undefined;
}