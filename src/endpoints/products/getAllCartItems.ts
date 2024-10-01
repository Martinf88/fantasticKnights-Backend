import {WithId, InsertOneResult, ObjectId, UpdateResult, DeleteResult } from "mongodb";
import { CartModel } from "../../models/cartModel.js";
import { getCartCollection } from "../../getDb.js";


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

async function addItemToCart(newCartItem: CartModel): Promise<InsertOneResult<CartModel>> {
	const col = getCartCollection();
	try {
		const result: InsertOneResult<CartModel> = await col.insertOne(newCartItem)
		console.log('Item added to cart: ', result);
		return result;
	} catch (error) {
		console.error('Error adding item to cart: ', error);
		throw new Error("Could not add item to cart");
	}
}

async function updateCartItem(id: string, updateData: Partial<CartModel>) {
	const col = getCartCollection();
	try {
		const result: UpdateResult = await col.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: updateData }
		)
		return result
	} catch (error) {
		console.error('Error updating cart item: ', error);
		throw new Error('Could not update cart item')
	}
}

async function deleteCartItem(id: string) {
	const col = getCartCollection();
	try {
		const result: DeleteResult = await col.deleteOne(
			{ _id: new ObjectId(id) }
		)
		return result
	} catch (error) {
		console.error('Error updating cart item: ', error);
		throw new Error('Could not update cart item')
	}
}

export { getAllCartItems, addItemToCart, updateCartItem, deleteCartItem }