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

const productSchema = Joi.object<ProductModel>({
    name: Joi.string().required().trim().min(1).max(100),
    price: Joi.number().positive().precision(2).required().strict(),
    amountInStock: Joi.number().integer().min(0).required().strict(),
    image: Joi.string().required().uri()
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