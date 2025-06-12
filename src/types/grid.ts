export type ProjectColumnType = {
  _id: string;
  name: string;
  description: string;
  products: [];
};

export type ProductColumnType = {
  _id: string;
  name: string;
  description: string;
  code: string;
  image: string | undefined;
};

export type ProductOptionType = {
  _id: string;
  name: string;
};
