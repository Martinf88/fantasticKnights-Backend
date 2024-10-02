import Joi from "joi";
import { CartModel } from "../models/cartModel.js";
import { getProductById, getUserById } from "../endpoints/products/getAllCartItems.js";
import { ObjectId } from "mongodb";


const cartItemSchema: Joi.ObjectSchema<CartModel> = Joi.object<CartModel>({
	productId: Joi.string().required(),
	userId: Joi.string().required(),
	amount: Joi.number().integer().greater(0).required().strict(),
})

const updateCartItemSchema: Joi.ObjectSchema<CartModel> = Joi.object<CartModel>({
	productId: Joi.string().optional(),
	userId: Joi.string().optional(),
	amount: Joi.number().integer().greater(0).optional().strict(),
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

async function validateCartItem(cartItem: CartModel) {
    const { error, value } = cartItemSchema.validate(cartItem);
    if (error) {
        return { valid: false, message: error.details[0].message };
    }

    if (!ObjectId.isValid(cartItem.userId) || !ObjectId.isValid(cartItem.productId)) {
        return { valid: false, message: 'Invalid userId or productId' };
    }

    const validation = await validateUserAndProduct(cartItem.userId, cartItem.productId);
    if (!validation.valid) {
        return { valid: false, message: validation.message };
    }

    return { valid: true, value };
}

export { cartItemSchema, updateCartItemSchema, validateUserAndProduct, validateCartItem } 