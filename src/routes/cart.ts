import express, { Router, Request, Response } from "express";
import { addItemToCart, getAllCartItems, updateCartItem, deleteCartItem } from "../endpoints/products/getAllCartItems.js";
import { ObjectId, WithId } from "mongodb";
import { CartModel } from "../models/cartModel.js";
import {cartItemSchema, updateCartItemSchema} from "../validation/cartValidation.js";
import { validateUserAndProduct } from "../validation/cartValidation.js";


export const cartRouter: Router = express.Router()

//GET
cartRouter.get('/', async (req: Request, res: Response<WithId<CartModel>[] | { message: string}>) => {
	try {
		const allCartItems:  WithId<CartModel>[] = await getAllCartItems()
		res.status(200).send(allCartItems)

	} catch (error) {
		console.error('Error fetching cart items: ', error);
		return res.status(500).json({ message: 'Internal Server Error' });
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
		
		const validation = await validateUserAndProduct(newCartItem.userId, newCartItem.productId);
        if (!validation.valid) {
            return res.status(404).json({ message: validation.message });
        }

		await addItemToCart(newCartItem)

		res.status(201).json({ message: 'Item added successfully'})

	} catch (error) {
		console.error('Error adding item ', error);
		res.status(500).json({ message: 'Internal Server Error' });
		
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

			const validation = await validateUserAndProduct(userId, productId);
			if (!validation.valid) {
				return res.status(404).json({ message: validation.message });
			}

			const result = await updateCartItem(req.params.id, value);


			if (result.matchedCount === 0) {
				return res.status(404).json({ message: 'Item not found' })
			}
			
			res.status(200).json(({ message: 'Cart item updated' }))
		}catch (error) {
			console.error('Error updating cart item: ', error);
			res.status(500).json({ message: 'Internal Server Error' })
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
		res.status(500).json({ message: 'Internal Server Error' })
	}
})