// import getData from "./api"
import { getProducts, getUsers, getCart } from "./api.js"
const productsList = document.querySelector('.product-list')
const cartList = document.querySelector('.cart-list');
const userList = document.querySelector('.user-list');



async function displayProducts() {
	const products = await getProducts()

	products.forEach(product => {
		const productItem = document.createElement('div');
		const name = document.createElement('h3');
		const price = document.createElement('p');
		const inStock = document.createElement('p');
		productItem.classList.add('product-item')
		name.textContent = product.name
		price.textContent = `$${product.price}`
		inStock.textContent = `In stock: ${product.amountInStock}`
		productItem.appendChild(name)
		productItem.appendChild(price)
		productItem.appendChild(inStock)
		productsList.appendChild(productItem)
	});
	
}

displayProducts()
async function displayCart() {
	const cart = await getCart()

}
async function displayUsers() {
	const users = await getUsers()


}