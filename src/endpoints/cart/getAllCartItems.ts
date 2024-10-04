import {WithId, InsertOneResult, ObjectId, UpdateResult, DeleteResult } from "mongodb";
import { CartModel } from "../../models/cartModel.js";
import { getCartCollection } from "../../getDb.js";
import { getUserCollection, getProductCollection } from "../../getDb.js";
import { UserModel } from "../../models/userModel.js";
import { ProductModel } from "../../models/productModel.js";


//GET userId and productId for display in cart
async function getUserById(userId: string): Promise<WithId<UserModel> | null> {
	const col = getUserCollection()
	return await col.findOne({ _id: new ObjectId(userId) });
}

async function getProductById(productId: string): Promise<WithId<ProductModel> | null> {
	const col = getProductCollection()
	return await col.findOne({ _id: new ObjectId(productId)})
}


async function getAllCartItems(): Promise<WithId<CartModel>[]> {
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

async function updateCartItem(id: string, updateData: Partial<CartModel>): Promise<UpdateResult<Document>> {
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

async function deleteCartItem(id: string): Promise<DeleteResult> {
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

export { getAllCartItems, addItemToCart, updateCartItem, deleteCartItem, getProductById, getUserById }