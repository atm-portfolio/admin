export const castArray = (
  value: string | number | boolean | object | readonly string[] | undefined
) => (Array.isArray(value) ? value : [value]);

export function getColWidth(width: number): number {
  return width < 450 ? 70 : 90;
}
