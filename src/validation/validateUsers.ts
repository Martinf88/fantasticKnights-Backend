import Joi from 'joi'
import { UserModel } from '../models/userModel.js';

export const userModelSchema = Joi.object<UserModel>({
    name: Joi.string().min(3).max(30).required(),
    isAdmin: Joi.boolean().strict().required()
});

export const updateUserSchema = Joi.object<Partial<UserModel>>({
    name: Joi.string().min(3).max(30).optional(),
    isAdmin: Joi.boolean().strict().optional()
});
