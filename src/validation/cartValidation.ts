import Joi from "joi";
import { CartModel } from "../models/cartModel.js";
import { getProductById, getUserById } from "../endpoints/products/getAllCartItems.js";


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


async function validateUserAndProduct(userId: string, productId: string): Promise<{
    valid: boolean;
    message: string;
} | {
    valid: boolean;
    message?: undefined;
}> {
    const userExist = await getUserById(userId);
    const productExist = await getProductById(productId);

    if (!userExist) {
        return { valid: false, message: 'UserId not found' };
    }

    if (!productExist) {
        return { valid: false, message: 'ProductId not found' };
    }

    return { valid: true };
}

export { cartItemSchema, updateCartItemSchema, validateUserAndProduct } 