export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  currency: string;
  imageUrl: string;
  availability: string;
  companyId: string;
  retailerId: string;
  archived: boolean;
  retailerProductGroupId?: string;
  siteWeb?: string;
}