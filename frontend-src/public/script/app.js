// import getData from "./api"
import { addProduct } from "./addNewProduct.js";
import { getProducts, getUsers, getCart, getFilteredProducts } from "./api.js"
import { addEvent, deleteProductEvent } from "./delete.js";
import { displaySingelCartItem, displaySingleProduct } from "./displayProducts.js";
const productsList = document.querySelector('.product-list')
const cartList = document.querySelector('.cart-list');
const userList = document.querySelector('.user-list');
const productSearch = document.querySelector('.search-product-input')

async function displayProducts() {
	const products = await getProducts()

	products.forEach(displaySingleProduct)
	deleteProductEvent()
}
displayProducts()

productSearch.addEventListener('input', async () => {
	if (productSearch.value.length > 0) {
		const result = await getFilteredProducts(productSearch.value)
		productsList.innerHTML = ''
		result.forEach(displaySingleProduct)
	}	
})

async function displayCart() {
	const cart = await getCart()	
	const users = await getUsers()
	const products = await getProducts()


	cart.forEach(cartData => {
		const cartItem = displaySingelCartItem(cartData, users, products)
		cartList.appendChild(cartItem)
	})

	addEvent()
}
displayCart()