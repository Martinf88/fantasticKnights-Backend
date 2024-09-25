import { Db, MongoClient, Collection, WithId, FindCursor } from "mongodb";
import { ProductModel } from "../../models/productModel.js";

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

export { getAllProducts }