import express, { Request, Response, Router } from 'express'
import { ProductModel } from '../models/productModel.js'
import { getAllProducts, getFilteredProducts } from '../endpoints/products/getAllProducts.js'
import { WithId } from 'mongodb'

export const router: Router = express.Router()

router.get('/products', async (req: Request, res: Response<WithId<ProductModel>[]>) => {
    try {
        const allProducts: WithId<ProductModel>[] = await getAllProducts()
        res.status(200).send(allProducts)
        
    } catch(error) {
        console.log('Error in getting all items products.ts', error);
        res.status(500)
        
    }

})

router.get('/products/search', async (req: Request, res: Response<WithId<ProductModel>[]>) => {
    try {
        const { name, maxPrice, minPrice } = req.query
        const filteredProducts: WithId<ProductModel>[] = await getFilteredProducts({
            name: name as string | undefined,
            maxPrice: maxPrice ? Number(maxPrice): undefined,
            minPrice: minPrice ? Number(minPrice): undefined
        })
        res.status(200).send(filteredProducts)

    } catch(error) {
        console.log('Error in getting filtered items products.ts', error);    
        res.status(500)    
    }
})
