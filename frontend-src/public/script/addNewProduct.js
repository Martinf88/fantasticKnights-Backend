import { addNewProduct } from "./api.js";

const pForm = document.querySelector('.add-product-form')
const productImg = document.querySelector('#image')
const productName = document.querySelector('#name')
const productPrice = document.querySelector('#price')
const productInStock = document.querySelector('#stock')
const addProductButton = document.querySelector('#add-new-product-btn')

function addProduct() {
	const newProduct = {
		image: productImg.value,
		name: productName.value,
		price: Number(productPrice.value),
		amountInStock: Number(productInStock.value)
	}
	addNewProduct(newProduct)
	console.log('Test av addnewproduct', newProduct);
	
}
addProductButton.addEventListener('click', () => {
	addProduct()
	
})

export { addProduct }