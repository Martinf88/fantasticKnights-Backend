import { MongoClient, Db, Collection, WithId } from "mongodb";
import { UserModel } from "../../models/userModel.js"

const conUser: string | undefined = process.env.CONNECTION_STRING

async function getAllUsers(): Promise<WithId<UserModel>[]> {
	if( !conUser ) {
		console.log('No connection string, check your .env file!')
		throw new Error('No connection string')
	}
    
	const client: MongoClient = await MongoClient.connect(conUser)
	const db: Db = await client.db('fantasticKnights')
	const col: Collection<UserModel> = db.collection<UserModel>('user')

	const result: WithId<UserModel>[] = await col.find({}).toArray()
	return result
}

export { getAllUsers }