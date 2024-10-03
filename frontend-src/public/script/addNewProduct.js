import { addNewProduct } from "./api.js";

const productImg = document.querySelector('#image')
const productName = document.querySelector('#name')
const productPrice = document.querySelector('#price')
const productInStock = document.querySelector('#stock')


export function addProduct() {
	
	const newProduct = {
		image: productImg.value,
		name: productName.value,
		price: Number(productPrice.value),
		amountInStock: Number(productInStock.value)
	}
	addNewProduct(newProduct)
	console.log('Test av addnewproduct', newProduct);
	
}




