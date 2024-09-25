import express, { Router, Request, Response } from "express";
import { getAllCartItems } from "../endpoints/products/getAllCartItems.js";
import { WithId } from "mongodb";
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
//PUT

//DELETE
//deleteOne
//deleteAll