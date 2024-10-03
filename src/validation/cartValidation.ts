import Joi from "joi";
import { CartModel } from "../models/cartModel.js";
import { getProductById, getUserById } from "../endpoints/products/getAllCartItems.js";
import { ObjectId } from "mongodb";


type ValidationResult = ValidationSuccess | ValidationFailure

interface ValidationSuccess {
    success: true;
    value: CartModel;
}

interface ValidationFailure {
    success: false;
    error: string;
}


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


async function validateUserAndProduct(userId: string, productId: string): Promise<ValidationResult>{
    const userExist = await getUserById(userId);
    const productExist = await getProductById(productId);

    if (!userExist) {
        return { success: false, error: 'UserId not found' };
    }

    if (!productExist) {
        return { success: false, error: 'ProductId not found' };
    }

    return { success: true, value: { userId, productId, amount: 0} as CartModel };
}

async function validateCartItem(cartItem: CartModel): Promise<ValidationResult>{
    const { error, value } = cartItemSchema.validate(cartItem);
	
    if (error) {
        return { success: false, error: error.details[0].message };
    }

    if (!ObjectId.isValid(value.userId) || !ObjectId.isValid(value.productId)) {
        return { success: false, error: 'Invalid userId or productId' };
    }

    const validation = await validateUserAndProduct(value.userId, value.productId);
    if (!validation.success) {
        return { success: false, error: validation.error };
    }

    return { success: true, value };
}

async function validatePutCartItem(cartItem: CartModel, cartItemId: string): Promise<ValidationResult>{

	if (!ObjectId.isValid(cartItemId)) {
		return { success: false, error: 'Invalid cart item ID' }
	}

	const { error, value } = updateCartItemSchema.validate(cartItem);
	if (error) {
		return { success: false, error: error.details[0].message  }
	}

	const { userId, productId }: CartModel = value;
    if (userId && productId) {
        const validation = await validateUserAndProduct(userId, productId);
        if (!validation.success) {
            return { success: false, error: validation.error };
        }
    }
	
	return { success: true, value };
}

export { cartItemSchema, updateCartItemSchema, validateUserAndProduct, validateCartItem, validatePutCartItem } 