import { Db, MongoClient, Collection, WithId, Filter } from "mongodb";
import { ProductModel, ProductQuery } from "../../models/productModel.js";

const con: string | undefined = process.env.CONNECTION_STRING

async function getAllProducts(): Promise<WithId<ProductModel>[]> {
    if(!con) {
        console.log('Connection not connecting bc string');
        throw new Error('No .env con string')
        
    }
    const client: MongoClient = await MongoClient.connect(con)
    const db: Db = await client.db('fantasticKnights')
    const col: Collection<ProductModel> = db.collection<ProductModel>('product')

    const result: WithId<ProductModel>[] = await col.find({}).toArray()
    return result

}

async function getFilteredProducts(query: ProductQuery): Promise<WithId<ProductModel>[]> {
    if(!con) {
        console.log('Connection not connecting bc string');
        throw new Error('No .env con string')
        
    }
    const client: MongoClient = await MongoClient.connect(con)
    const db: Db = await client.db('fantasticKnights')
    const col: Collection<ProductModel> = db.collection<ProductModel>('product')
    const filter: Filter<ProductModel> = {}

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
}

export { getAllProducts, getFilteredProducts }