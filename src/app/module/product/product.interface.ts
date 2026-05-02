type TSpecification = {
  specId: string;
  value: string;
  productId: string;
  sectionId: string;
};

export type TProductPayload = {
  category: string;
  name: string;
  brand: string;
  price: string;
  discount: string;
  stock: string;
  description: string;
  thumbnail: string;
  images: string[];

  specification: TSpecification[];
};
