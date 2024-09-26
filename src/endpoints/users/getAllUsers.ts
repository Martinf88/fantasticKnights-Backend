import { WithId } from "mongodb";
import { UserModel } from "../../models/userModel.js"
import { getUserCollection } from "../../getDb.js";

async function getAllUsers() {
    const userCol = getUserCollection()
    console.log("Connected to users collection");
    try { 
        const userResult: WithId<UserModel>[] = await userCol.find({}).toArray();
        return userResult;
    } catch (error) {
        console.error('Error fetching users', error)
        throw new Error('Could not fetch users')
    }
}

export { getAllUsers }