import {Collection, WithId, InsertOneResult, ObjectId } from "mongodb";
import { CartModel } from "../../models/cartModel.js";
import { getCartCollection } from "../../getDb.js";


const con: string | undefined = process.env.CONNECTION_STRING

async function getAllCartItems() {
    const col = getCartCollection();
    try {
        const result: WithId<CartModel>[] = await col.find({}).toArray();
        return result;
    } catch (error) {
        console.error('Error fetching cart items: ', error);
        throw new Error("Could not fetch cart items");
    }
}


export { getAllCartItems}