import { MongoClient, Db, Collection } from "mongodb";
import { CartModel } from "./models/cartModel.js";

const con: string | undefined = process.env.CONNECTION_STRING;
let db: Db | null = null;

async function getDb() {
    if (!con) {
        throw new Error("No connection string");
    }

    const client = new MongoClient(con);
    await client.connect();
    db = client.db('fantasticKnights');
}

function getCartCollection(): Collection<CartModel> {
    if (!db) {
        throw new Error("Database not initialized");
    }
    return db.collection<CartModel>('cart');
}

export { getDb, getCartCollection };
