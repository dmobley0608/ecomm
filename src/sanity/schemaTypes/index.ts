import { type SchemaTypeDefinition } from 'sanity'
import { promotionCodes } from './schemas/promotion-codes'
import { product } from './schemas/product'
import { productCategory } from './schemas/product-category'
import { promotionCampaign } from './schemas/promotion-compaign'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [promotionCodes, promotionCampaign, productCategory, product],
}
