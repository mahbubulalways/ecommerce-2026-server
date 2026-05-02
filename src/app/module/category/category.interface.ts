export interface ICategory {
  name: string;
  id: string;
  slug: string;
  parentId: string;
  image: string;
  specifications: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISpecificationCategory {
  categoryId: string;
  specificationSectionId: string[];
}
