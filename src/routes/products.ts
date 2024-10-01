import express, { Request, Response, Router } from 'express'
import { ProductModel } from '../models/productModel.js'
import { deleteProduct, getAllProducts, getFilteredProducts, postNewProduct, updateProduct } from '../endpoints/products/getAllProducts.js'
import { WithId } from 'mongodb'
import { validateProduct } from '../validation/validateProductModel.js'

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


router.post('/products', async (req: Request, res: Response) => {
    console.log('bodycheck i router.post: ', req.body);
    const validationResult = validateProduct(req.body)
    if(!validationResult.success) {
        return res.status(400).json({ error: validationResult.error })
    }
    try {
        const newProduct: ProductModel = req.body
        if(!newProduct.name || !newProduct.price || !newProduct.amountInStock || !newProduct.image) {
            return res.status(400).json({message: 'Missing required fields: name, price and ammountInStock need to be filled in'})
        }
        if(typeof newProduct.name !== 'string') {
            return res.status(400).json({message: 'Name must be a string value'})
        }
        if(typeof newProduct.price !== 'number') {
            return res.status(400).json({message: 'Price must be a number value'})
        }
        if(typeof newProduct.image !== 'string') {
            return res.status(400).json({message: 'Image must be a string'})
        }
        await postNewProduct(newProduct)
        res.status(201).json({message: 'Product added successfully'})
    } catch(error) {
        console.error('Error in adding product', error)
    }
})

router.put('/products/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const updatedProduct: Partial<ProductModel> = req.body
        if (Object.keys(updatedProduct).length === 0) {
            return res.status(400).json({message: 'No fields to update'})
        }
        const result = await updateProduct(id, updatedProduct)
        if (result.modifiedCount === 0) {
            return res.status(404).json({message: 'Product not updated'})
        }
        res.status(200).json({message: 'Product updated'})
    } catch(error) {
        console.error('Error updating product', error)
        res.status(500).json({message: 'Server issue'})
    }
})

router.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const result = await deleteProduct(id)
        if (result.deletedCount === 0) {
            return res.status(404).json({message: 'Product with this id not found'})
        }
        res.status(200).json({message: 'Product deleted successfully'})
    } catch(error) {
        
    }
})