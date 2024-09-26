import { WithId, Filter } from "mongodb";
import { ProductModel, ProductQuery } from "../../models/productModel.js";
import { getProductCollection } from "../../getDb.js";

const con: string | undefined = process.env.CONNECTION_STRING

async function getAllProducts(): Promise<WithId<ProductModel>[]> {
    const col = getProductCollection()
    try {
        const result: WithId<ProductModel>[] = await col.find({}).toArray()
        return result
        
    } catch(error) {
        console.error('Error getting all products getallproducts.ts', error);
        throw new Error('Could not get all products')        
    }
}

async function getFilteredProducts(query: ProductQuery): Promise<WithId<ProductModel>[]> {
    const col = getProductCollection()
    const filter: Filter<ProductModel> = {}
    try {
        if(query.name) {
    
            filter.name = { $regex: query.name, $options: 'i'}
        }
        if(query.minPrice !== undefined || query.maxPrice !== undefined) {
            filter.price = {}
            if (query.minPrice !== undefined) {
                filter.price.$gte = query.minPrice
            }
            if (query.maxPrice !== undefined) {
                filter.price.$lte = query.maxPrice
            }
        }
        const result: WithId<ProductModel>[] = await col.find(filter).toArray()
        return result

    } catch(error) {
        console.error('Error fetching filtered products', error)
        throw new Error('Could not fetch products')
    }

}

export { getAllProducts, getFilteredProducts }

