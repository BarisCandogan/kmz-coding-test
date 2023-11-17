import {ProductImages} from './productImages';

export interface CategoryProducts {
  currency: string;
  discountRate: number;
  id: number;
  inCartQty: number;
  isInFavorite: number;
  kdv: number;
  key: number;
  listPrice: number;
  listPriceVat: string;
  maxSaleUnit: number;
  minSaleUnit: number;
  price: number;
  priceVat: string;
  productImages: ProductImages[];
  score: number;
  stock: number;
  stockCode: string;
  stockName: string;
  stockType: string;
  totalRow: number;
  unitIncrement: number;
}
