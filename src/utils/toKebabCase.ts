export function toKebabCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => '-' + c)
    .trim()
}
