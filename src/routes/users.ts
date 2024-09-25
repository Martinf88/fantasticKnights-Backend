import express, { Request, Response, Router } from 'express';
import { UserModel } from '../models/userModel.js';
import { getAllUsers } from '../endpoints/users/getAllUsers.js';
import { ObjectId, WithId } from 'mongodb';
import { getUserCollection } from '../getDb.js';

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

// POST en ny användare
userRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newUser: UserModel = req.body;

        if (!newUser.name || newUser.isAdmin === undefined) {
            return res.status(400).json({ message: 'Missing required fields: name or isAdmin' });
        }

        const userCol = getUserCollection();
        const postResults = await userCol.insertOne(newUser);

        res.status(201).json({
            message: 'User created successfully',
            userId: postResults.insertedId
        });
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT uppdatera en användare
userRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updatedUser: Partial<UserModel> = req.body;

        if (!updatedUser || Object.keys(updatedUser).length === 0) {
            return res.status(400).json({ message: 'No data provided for update' });
        }

        const userCol = getUserCollection();
        const updateResult = await userCol.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updatedUser }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
    
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({message: 'Invalid user ID'})
        }
    
        const userCol = getUserCollection();
        const deleteResult = await userCol.deleteOne({
            _id: new ObjectId(userId)
        });
    
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.status(200).json({
            message: 'User deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting user', error);
        res.status(500).json({
            message: 'server error'
        });
    }
});