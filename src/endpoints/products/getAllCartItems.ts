import { MongoClient, Db, Collection, WithId } from "mongodb";
import { CartModel } from "../../models/cartModel.js";


const con: string | undefined = process.env.CONNECTION_STRING

async function getAllCartItems() {
	if(!con) {
		console.log('No connection string, check your .env file!');
		throw new Error("No connection string");
	}
	const client: MongoClient = await MongoClient.connect(con)
	const db: Db = await client.db('fantasticKnights')
	const col: Collection<CartModel> = db.collection<CartModel>('cart')

	const result: WithId<CartModel>[] = await col.find({}).toArray()
	return result
}

export { getAllCartItems }