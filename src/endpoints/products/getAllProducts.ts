import { WithId, Filter, InsertOneResult, UpdateResult, ObjectId, DeleteResult } from "mongodb";
import { ProductModel, ProductQuery } from "../../models/productModel.js";
import { getProductCollection } from "../../getDb.js";

async function getAllProducts(): Promise<WithId<ProductModel>[]> {
    const col = getProductCollection()
    try {
        const result: WithId<ProductModel>[] = await col.find({}).toArray()
        return result
        
    } catch(error) {
        console.error('Error getting all products getallproducts.ts', error);
        throw new Error('Could not get all products')        
    }
}

async function getFilteredProducts(query: ProductQuery): Promise<WithId<ProductModel>[]> {
    const col = getProductCollection()
    const filter: Filter<ProductModel> = {}
    try {
        if(query.name) {   
            filter.name = { $regex: query.name, $options: 'i'}
        }
        if(query.minPrice !== undefined || query.maxPrice !== undefined) {
            filter.price = {}
            if (query.minPrice !== undefined) {
                filter.price.$gte = query.minPrice
            }
            if (query.maxPrice !== undefined) {
                filter.price.$lte = query.maxPrice
            }
        }
        const result: WithId<ProductModel>[] = await col.find(filter).toArray()
        return result

    } catch(error) {
        console.error('Error fetching filtered products', error)
        throw new Error('Could not fetch products')
    }
}

async function postNewProduct(newProduct: ProductModel): Promise<InsertOneResult<ProductModel>> {
	const col = getProductCollection();
	try {
		const result: InsertOneResult<ProductModel> = await col.insertOne(newProduct)
		console.log('Product added to productCollection: ', result);
		return result;
	} catch (error) {
		console.error('Error adding product to collection: ', error);
		throw new Error("Could not add product to collection");
	}
}

async function updateProduct(id: string, updatedProduct: Partial<ProductModel>): Promise<UpdateResult> {
    const col = getProductCollection()
    let objectId: ObjectId
    try {
        objectId = new ObjectId(id)
    } catch(error) {
        throw new Error('Invalid id format')
    }

    try {
        const result: UpdateResult = await col.updateOne(
            {_id: objectId},
            {$set: updatedProduct}
        )
        return result
    } catch(error) {
        console.error('Error updating product in collection', error)
        throw new Error('Could not update the collection')
    }
}

async function deleteProduct(id: string): Promise<DeleteResult> {
    const col = getProductCollection()
    let objectId: ObjectId
    try {
        objectId = new ObjectId(id)
    } catch(error) {
        throw new Error('Invalid id')
    }
    try {
        const result: DeleteResult = await col.deleteOne({ _id: objectId })
        if (result.deletedCount === 0) {
            throw new Error(`ID: ${id} not found`)
        }
        return result
    } catch(error) {
        console.error('Error deleting from collection', error)
        throw new Error('Could not delete from collection')
    }
}

export { getAllProducts, getFilteredProducts, postNewProduct, updateProduct, deleteProduct }

