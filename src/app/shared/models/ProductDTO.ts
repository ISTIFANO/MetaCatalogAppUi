export interface ProductDTO {
  name: string
  description?: string
  price: number
  stockQuantity: number
  companyId?: string
  archived: boolean
  retailerId: string
  currency: string
  siteWeb: string
  imageUrl: string
  availability: string
  retailerProductGroupId?: string
  category?: string
  wooCommerceId: string
}
