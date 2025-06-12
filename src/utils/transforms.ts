export const castArray = (
  value: string | number | boolean | object | readonly string[] | undefined
) => (Array.isArray(value) ? value : [value]);
