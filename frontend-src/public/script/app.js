// import getData from "./api"
import { getProducts, getUsers, getCart, getFilteredProducts } from "./api.js"
import { addEvent, deleteProductEvent } from "./delete.js";
import { displaySingelCartItem, displaySingleProduct } from "./displayProducts.js";


const productsList = document.querySelector('.product-list')
const cartList = document.querySelector('.cart-list');
const userList = document.querySelector('.user-list');
const productSearch = document.querySelector('.search-product-input')

let products = []

async function loadProducts() {
	products = await getProducts()
}

async function displayProducts() {
	await loadProducts()

	products.forEach(displaySingleProduct)
	deleteProductEvent()
}

productSearch.addEventListener('input', async () => {
	if (productSearch.value.length > 0) {
		const result = await getFilteredProducts(productSearch.value)
		productsList.innerHTML = ''
		result.forEach(displaySingleProduct)
	} if (productSearch.value === '') {
		productsList.innerHTML = ''
		displayProducts()
	}
})

async function displayCart() {
	const cart = await getCart()	
	const users = await getUsers()
	
	
	cart.forEach(cartData => {
		const cartItem = displaySingelCartItem(cartData, users, products)
		cartList.appendChild(cartItem)
	})
	
	addEvent()
}
displayProducts()
displayCart()