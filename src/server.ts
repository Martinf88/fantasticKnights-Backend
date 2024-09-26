import express, { Express, NextFunction, Request, Response } from "express";
import { cartRouter } from "./routes/cart.js";
import { userRouter } from "./routes/users.js"
import { router as productRouter } from './routes/products.js'
import { getDb } from "./getDb.js";

const app: Express = express()
const port = 9876

async function startServer() {
	try {
		await getDb()
		console.log("Database connected successfully");

		app.use(express.json())

		app.use('/', (req: Request, res: Response, next: NextFunction) => {
			console.log(`${req.method} ${req.url}`, req.body);
			next()
		})
		
		app.use(express.json());

		app.use('/cart', cartRouter)
		app.use('/users', userRouter)
		app.use('/', productRouter)
		
		app.listen(port, () => {
			console.log('Server is listening on port ' + port);
		})

	} catch (error) {
		console.error('Error connecting to the database:', error);
		
	}
	
}





startServer();
