import { MongoClient, Db, Collection, WithId } from "mongodb";
import { CartModel } from "../../models/cartModel.js";


const con: string | undefined = process.env.CONNECTION_STRING

async function getAllCartItems() {
	if(!con) {
		console.log('No connection string, check your .env file!');
		throw new Error("No connection string");
	}

	let client: MongoClient | null = null;

	try {
		client = await MongoClient.connect(con)
		const db: Db = await client.db('fantasticKnights')
		const col: Collection<CartModel> = db.collection<CartModel>('cart')
	
		const result: WithId<CartModel>[] = await col.find({}).toArray()
		return result
	} catch (error) {
		console.error('Error fetching cart items: ', error);
		throw new Error("Could not fetch cart items");
	} finally {
		if (client !== null) {
			await client.close()
		}
	}
}

export { getAllCartItems }