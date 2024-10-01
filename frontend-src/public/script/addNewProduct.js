import { addNewProduct } from "./api.js";

const productImg = document.querySelector('#image')
const productName = document.querySelector('#name')
const productPrice = document.querySelector('#price')
const productInStock = document.querySelector('#stock')
const addProductButton = document.querySelector('#add-new-product-btn')

function addProduct(event) {
	event.preventDefault()
	const newProduct = {
		image: productImg.value,
		name: productName.value,
		price: Number(productPrice.value),
		amountInStock: Number(productInStock.value)
	}
	addNewProduct(newProduct)
	console.log('Test av addnewproduct', newProduct);
	
}
addProductButton.addEventListener('click', (event) => {
	addProduct(event)
	
})

export { addProduct }
