import { addDeleteCartEvent, deleteProductEvent } from "./delete.js"
import { getCart, getProducts, getUsers } from "./api.js"
import { displaySingleProduct, displaySingelCartItem, displaySingleUsers } from "./createItems.js"

const cartList = document.querySelector('.cart-list');

let products = []

async function loadProducts() {
	products = await getProducts()
}

async function displayProducts() {
	await loadProducts()

	products.forEach(displaySingleProduct)
	deleteProductEvent()
}

async function displayCart() {
	const cart = await getCart()	
	const users = await getUsers()
	
	
	cart.forEach(cartData => {
		const cartItem = displaySingelCartItem(cartData, users, products)
		cartList.appendChild(cartItem)
	})
	
	addDeleteCartEvent()
}

async function displayUsers() {
	try {
		const users = await getUsers()
		users.forEach(displaySingleUsers)
	} catch (error) {
		console.error('Error loading users:', error);
	}
}

export { displayProducts, displayCart, displayUsers }