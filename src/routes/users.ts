import express, { Request, Response, Router } from 'express';
import { UserModel } from '../models/userModel.js';
import { getAllUsers } from '../endpoints/users/getAllUsers.js';
import { ObjectId, WithId } from 'mongodb';
import { getUserCollection } from '../getDb.js';
import { Filter } from 'mongodb'

export const userRouter: Router = express.Router();

type UserResponse = WithId<UserModel>[] | { message: string };

userRouter.get('/', async (req: Request, res: Response<UserResponse>) => {
    try {
        const allUsers: WithId<UserModel>[] = await getAllUsers();
        
        if (allUsers.length === 0) {
            return res.sendStatus(404)
        }
        
        res.status(200).send(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.sendStatus(500)
    }  
});


userRouter.get('/search', async (req: Request, res: Response) => {
    try {
        const { name, isAdmin } = req.query;

        if ((!name || (name as string).trim() === '') && isAdmin === undefined) {
            return res.sendStatus(400)
        }

        const filter: Filter<UserModel> = {};

        if (name) {
            const searchTerms = (name as string).split(' ').map(term => term.trim());

            filter.$or = searchTerms.map(term => ({
                name: { $regex: new RegExp(term, 'i') }
            }));
        }

        if (isAdmin !== undefined) {
            filter.isAdmin = isAdmin === 'true';
        }

        const userCol = getUserCollection();
        const filteredUsers = await userCol.find(filter).toArray();

        if (filteredUsers.length === 0) {
            return res.sendStatus(404)
        }

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error('Error searching for users:', error);
        res.sendStatus(500)
    }
});

userRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newUser: UserModel = req.body;

        if (!newUser.name || newUser.isAdmin === undefined) {
            return res.sendStatus(400)
        }

        const userCol = getUserCollection();
        const postResults = await userCol.insertOne(newUser);

        res.sendStatus(201)
    } catch (error) {
        console.error('Error creating user', error);
        res.sendStatus(500)
    }
});

userRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updatedUser: Partial<UserModel> = req.body;

        if (!updatedUser || Object.keys(updatedUser).length === 0) {
            return res.sendStatus(400)
        }

        const userCol = getUserCollection();
        const updateResult = await userCol.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updatedUser }
        );

        if (updateResult.matchedCount === 0) {
            return res.sendStatus(404)
        }

        res.sendStatus(200)
    } catch (error) {
        console.error('Error updating user:', error);
        res.sendStatus(500)
    }
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
    
        if (!ObjectId.isValid(userId)) {
            return res.sendStatus(400)
        }
    
        const userCol = getUserCollection();
        const deleteResult = await userCol.deleteOne({
            _id: new ObjectId(userId)
        });
    
        if (deleteResult.deletedCount === 0) {
            return res.sendStatus(404)
        }
        res.sendStatus(200)

    } catch (error) {
        console.error('Error deleting user', error);
        res.sendStatus(500)
    }
});