import express, { Express, NextFunction, Request, Response } from "express";
import { userRouter } from "./routes/users.js";

const app: Express = express()
const port = 9876

app.use('/', (req: Request, res: Response, next: NextFunction) => {
	console.log(`${req.method} ${req.url}`, req.body);
	next()
})

// new
app.use('/users', userRouter)

app.listen(port, () => {
	console.log('Server is listening on port ' + port);
})