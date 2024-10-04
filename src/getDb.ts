import { MongoClient, Db, Collection } from "mongodb";
import { CartModel } from "./models/cartModel.js";
import { UserModel } from "./models/userModel.js";
import { ProductModel } from "./models/productModel.js";

const con: string | undefined = process.env.CONNECTION_STRING;
let db: Db | null = null;
let client: MongoClient | null = null

async function getDb() {
    if (!con) {
        throw new Error("No connection string");
    }

    client = new MongoClient(con);
    await client.connect();
    db = client.db('fantasticKnights');
}

function getCartCollection(): Collection<CartModel> {
    if (!db) {
        throw new Error("Database not initialized");
    }
    return db.collection<CartModel>('cart');
}

function getUserCollection(): Collection<UserModel> {
    if (!db) {
        throw new Error("Database not initialized");
    }
    return db.collection<UserModel>('user');
}
function getProductCollection(): Collection<ProductModel> {
    if (!db) {
        throw new Error("Database not initialized");
    }
    return db.collection<ProductModel>('product');
}

//TODO: ta reda på hur det är tänkt att vi skall använda client.close
async function closeClient() {
	if(client) {
		try {
			await client.close()
			client = null
			db = null
		} catch (error) {
			console.error('Error closing MongoDB client', error);
			
		}
	}
}

export { getDb, getCartCollection, getUserCollection, getProductCollection, closeClient };

