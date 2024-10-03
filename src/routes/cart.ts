import express, { Router, Request, Response } from "express";
import { addItemToCart, getAllCartItems, updateCartItem, deleteCartItem } from "../endpoints/products/getAllCartItems.js";
import { ObjectId, WithId } from "mongodb";
import { CartModel } from "../models/cartModel.js";
import { validatePutCartItem, validateCartItem} from "../validation/cartValidation.js";


export const cartRouter: Router = express.Router()

//GET
cartRouter.get('/', async (req: Request, res: Response<WithId<CartModel>[] | { message: string}>) => {
	try {
		const allCartItems:  WithId<CartModel>[] = await getAllCartItems()
		res.status(200).send(allCartItems)

	} catch (error) {
		console.error('Error fetching cart items: ', error);
		return res.sendStatus(500)
	}
})

//POST
cartRouter.post('/', async (req: Request, res: Response) => {
    try {
        const validation = await validateCartItem(req.body);

        if (!validation.success) {
            return res.sendStatus(400)
        }

        const newCartItem: CartModel = validation.value;

        await addItemToCart(newCartItem);
        res.sendStatus(201)

    } catch (error) {
        console.error('Error adding item: ', error);
        res.sendStatus(500)
    }
});
//PUT
//TODO: Testa valideringen med insomnia.
//TODO: Gå igenom valideringen för PUT 
cartRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const cartItemId = req.params.id;

		const validation = await validatePutCartItem(req.body, cartItemId)

		if (!validation.success) {
            return res.sendStatus(400);
        }

        const result = await updateCartItem(cartItemId, validation.value);

        if (result.matchedCount === 0) {
            return res.sendStatus(404)
        }

        res.sendStatus(200)

    } catch (error) {
        console.error('Error updating cart item: ', error);
        res.sendStatus(500)
    }
});
//DELETE
cartRouter.delete('/:id', async (req: Request, res: Response) => {

	try {
		const cartItemId = req.params.id

		if(!ObjectId.isValid(cartItemId)){
			return res.sendStatus(400)
		}

		const result = await deleteCartItem(req.params.id);

		if(result.deletedCount === 0) {
			return res.sendStatus(404)
		}
		  res.sendStatus(200)

	} catch (error) {
		console.error('Error deleting cart item: ', error);
		res.sendStatus(500)
	}
})