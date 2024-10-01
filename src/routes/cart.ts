import express, { Router, Request, Response } from "express";
import { addItemToCart, getAllCartItems, updateCartItem, deleteCartItem } from "../endpoints/products/getAllCartItems.js";
import { ObjectId, WithId } from "mongodb";
import { CartModel } from "../models/cartModel.js";
import {cartItemSchema, updateCartItemSchema} from "../validation/cartValidation.js";
import { getProductCollection, getUserCollection } from "../getDb.js";

async function getUserById(userId: string) {
	const col = getUserCollection()
	return await col.findOne({ _id: new ObjectId(userId) });
}

async function getProductById(productId: string) {
	const col = getProductCollection()
	return await col.findOne({ _id: new ObjectId(productId)})
}

export const cartRouter: Router = express.Router()

//GET
cartRouter.get('/', async (req: Request, res: Response<WithId<CartModel>[]>) => {
	try {
		const allCartItems:  WithId<CartModel>[] = await getAllCartItems()
		res.send(allCartItems)

	} catch (error) {
		console.error('Error fetching cart items: ', error);
		res.status(500)
	}
})

//POST
cartRouter.post('/', async (req: Request, res: Response) => {
	try {
		const { error, value } = cartItemSchema.validate(req.body)
		if (error) {
			return res.status(400).json({ message: error.details[0].message})
		}

		const newCartItem: CartModel = value;

		if (!ObjectId.isValid(newCartItem.userId) || !ObjectId.isValid(newCartItem.productId)) {
            return res.status(400).json({ message: 'Invalid userId or productId' });
        }
		
		const userExist = await getUserById(newCartItem.userId)
		const productExist = await getProductById(newCartItem.productId)

		await addItemToCart(newCartItem)

		res.status(201).json({ message: 'Item added successfully'})

	} catch (error) {
		console.error('Error adding item ', error);
		
	}

})
//PUT
cartRouter.put('/:id', async (req: Request, res: Response) => {
		try {
			const { error, value } = updateCartItemSchema.validate(req.body);
			if (error) {
				return res.status(400).json({ message: error.details[0].message });
			}

			const { userId, productId } = value;

			if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(userId) || !ObjectId.isValid(productId)) {
				return res.status(400).json({ message: 'Invalid ID' });
			}

			const userExist = await getUserById(userId)
			const productExist = await getProductById(productId)

			if (!userExist) {
				return res.status(404).json({ message: 'UserId not found'})
			}

			if (!productExist) {
				return res.status(404).json({ message: 'ProductId not found'})
			}

			console.log('Updating cart item:', req.params.id);
			console.log('Update data:', value); 

			const result = await updateCartItem(req.params.id, value);


			if (result.matchedCount === 0) {
				return res.status(404).json({ message: 'Item not found' })
			}
			
			res.status(200).json(({ message: 'Cart item updated' }))
		}catch (error) {
			console.error('Error updating cart item: ', error);
			res.status(500).json({ message: 'Could not update item' })
	}
})
//DELETE
cartRouter.delete('/:id', async (req: Request, res: Response) => {

	try {
		const cartItemId = req.params.id

		if(!ObjectId.isValid(cartItemId)){
			return res.status(400).json({message: 'Invalid ID'})
		}

		const result = await deleteCartItem(req.params.id);

		if(result.deletedCount === 0) {
			return res.status(404).json({ message: 'Item not found' })
		}
		  res.status(200).json({
            message: 'Item deleted successfully'})

	} catch (error) {
		console.error('Error deleting cart item: ', error);
		res.status(500).json({ message: 'Could not delete item' })
	}
})