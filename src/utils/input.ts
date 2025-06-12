import { OptionProps } from '../types/input';

export const convertToOptions = (
  defaultValues: string | number | readonly string[] | undefined,
  collection: Array<OptionProps> | undefined
) => {
  if (!collection) {
    return [];
  }

  const items = collection.map(({ _id, name }) => ({
    value: _id,
    label: name,
    selected:
      defaultValues && Array.isArray(defaultValues)
        ? defaultValues.includes(_id.toString())
        : _id.toString() === defaultValues?.toString(),
  }));

  return items;
};
