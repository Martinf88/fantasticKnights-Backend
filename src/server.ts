import express, { Express, NextFunction, Request, Response } from "express";
import { router as productRouter } from './routes/products.js'

const app: Express = express()
const port = 9876

app.use('/', (req: Request, res: Response, next: NextFunction) => {
	console.log(`${req.method} ${req.url}`, req.body);
	next()
})

app.use('/', productRouter) 
app.use('/', productRouter)

app.listen(port, () => {
	console.log('Server is listening on port ' + port);
})
