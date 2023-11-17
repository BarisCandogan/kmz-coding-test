import {ImagePath} from './productImagePath';

export interface Products {
  categoryName: string;
  hasImage: number;
  id: number;
  imagePath: ImagePath;
  link: string;
  order: number;
  parentId: number;
  productCount: number;
  subCategoryCount: number;
}
