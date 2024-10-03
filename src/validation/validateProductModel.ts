import { ObjectId } from "mongodb";
import { ProductModel } from "../models/productModel.js";
import Joi from 'joi'

type ValidationResult = ValidationSuccess | ValidationFailure

interface ValidationSuccess {
    success: true;
    value: ProductModel[];
}

interface ValidationFailure {
    success: false;
    error: string;
}
function isValidObjectId(id: string): boolean {
    return ObjectId.isValid(id)
}

const productSchema = Joi.object<ProductModel>({
    name: Joi.string().required().trim().min(1).max(100),
    price: Joi.number().positive().precision(2).required().strict(),
    amountInStock: Joi.number().integer().min(0).required().strict(),
    image: Joi.string().required().uri()
})

const productPutSchema = Joi.object<ProductModel>({
    name: Joi.string().trim().min(1).max(100),
    price: Joi.number().positive().precision(2).strict(),
    amountInStock: Joi.number().integer().min(0).strict(),
    image: Joi.string().uri()
})

const productsArraySchema = Joi.array().items(productSchema).min(1)

export function validateProduct(prod: ProductModel | ProductModel[]): ValidationResult {
    const schema = Array.isArray(prod) ? productsArraySchema : productSchema
    const result = schema.validate(prod, { abortEarly: false })

    if (result.error) {
        return { 
            success: false,
            error: result.error.details.map(detail => detail.message).join(', ')
        }
    } else {
        return {
            success: true,
            value: Array.isArray(prod) ? prod : [prod]
        }
    }
}

export function validatePutProduct(prod: ProductModel, id: string): ValidationResult {
    if (!id || !isValidObjectId(id)) {
        return {
            success: false,
            error: 'No matching id'
        }
    }
    const result = productPutSchema.validate(prod, { abortEarly: false })

    if (result.error) {
        return { 
            success: false,
            error: result.error.details.map(detail => detail.message).join(', ')
        }
    } else {
        return {
            success: true,
            value: [prod]
        }
    }
}