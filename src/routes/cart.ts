import express, { Router, Request, Response } from "express";
import { addItemToCart, getAllCartItems, updateCartItem, deleteCartItem } from "../endpoints/products/getAllCartItems.js";
import { ObjectId, WithId } from "mongodb";
import { CartModel } from "../models/cartModel.js";


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
		const newCartItem: CartModel = req.body;
		if(!newCartItem.userId || !newCartItem.productId || !newCartItem.amount) {
			return res.status(400).json({ message: 'Missing required fields: userId, productId or amount'})
		}
		await addItemToCart(newCartItem)
		res.status(201).json({ message: 'Item added successfully'})
	} catch (error) {
		console.error('Error adding item ', error);
		
	}

})
//PUT
cartRouter.put('/:id', async (req: Request, res: Response) => {
	const {amount} = req.body;
	if (!amount) {
        return res.status(400).json({ message: 'Invalid data' });
    }
		try {
			const result = await updateCartItem(req.params.id, amount);
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