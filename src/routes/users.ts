import express, { Request, Response, Router } from 'express';
import { UserModel } from '../models/userModel.js';
import { getAllUsers } from '../endpoints/users/getAllUsers.js';
import { WithId } from 'mongodb';

export const userRouter: Router = express.Router();

// Definiera typ för svar
type UserResponse = WithId<UserModel>[] | { message: string };

// GET alla användare
userRouter.get('/', async (req: Request, res: Response<UserResponse>) => {
    try {
        const allUsers: WithId<UserModel>[] = await getAllUsers();
        
        if (allUsers.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        
        res.status(200).send(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }  
});

userRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newUser: UserModel = req.body;
        // validering?
        // const newUserResult = await col.insertOne(newUser)
        // res.status(201).json({message: 'User created', userId: newUserResult.insertId});
    } catch {

    }
});
