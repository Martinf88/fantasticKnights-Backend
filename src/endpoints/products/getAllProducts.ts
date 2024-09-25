import { Db, MongoClient, Collection, WithId, FindCursor } from "mongodb";
import { ProductModel } from "../../models/productModel.js";

async function connect(): Promise<void> {
    const con: string | undefined = process.env.CONNECTION_STRING
    if( !con ) {
        console.log('Error, conection not connecting');
        return
        
    }
    let client: MongoClient | null = null
    try {
        client = await MongoClient.connect(con)
        const db: Db = await client.db('fantasticKnights')
        const col: Collection<ProductModel> = db.collection<ProductModel>('product')

        await getAllProducts(col)
        console.log('precessing getAllProducts');
        
    } catch(error) {

    } finally {
        if( client !== null ) {
            await client.close()
        }
    }
}

async function getAllProducts(col: Collection<ProductModel>): Promise<void> {
    const cursor: FindCursor<WithId<ProductModel>> = col.find({}).sort({ name: 1 })
    const product: WithId<ProductModel>[] = await cursor.toArray()
    console.log('running getallproducts');
    
    product.forEach( product => {
        console.log(`${product.name} kostar ${product.price} euro. \n`);
        

    })
}

connect()