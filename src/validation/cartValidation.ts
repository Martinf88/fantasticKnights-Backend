import Joi from "joi";
import { CartModel } from "../models/cartModel.js";


const cartItemSchema: Joi.ObjectSchema<CartModel> = Joi.object<CartModel>({
	productId: Joi.string().required(),
	userId: Joi.string().required(),
	amount: Joi.number().integer().greater(0).required(),
})

const updateCartItemSchema: Joi.ObjectSchema<CartModel> = Joi.object<CartModel>({
	productId: Joi.string().optional(),
	userId: Joi.string().optional(),
	amount: Joi.number().integer().greater(0).optional(),
}).min(1)

export { cartItemSchema, updateCartItemSchema } 