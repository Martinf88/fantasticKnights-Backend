// import getData from "./api"
import { getProducts, getUsers, getCart } from "./api.js"
const productsList = document.querySelector('.product-list')
const cartList = document.querySelector('.cart-list');
const userList = document.querySelector('.user-list');

// let users = []
// let products = []
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
	console.log('extralog cart: ', cart);
	
	const users = await getUsers()
	const products = await getProducts()

	cart.forEach(cartData => {
		const cartItem = document.createElement('div')
		const name = document.createElement('h4')
		const boughtProduct = document.createElement('h4')
		const amount = document.createElement('p')
		cartItem.classList.add('cart-item')
		
		const user = users.find(u => u._id === cartData.userId)
		console.log(user);
		
		name.textContent = `Name: ${user.name}`
		
		const product = products.find(p => p._id === cartData.productId)
		boughtProduct.textContent = `Product: ${product.name}`
		amount.textContent = `Amount: ${cartData.amount}`
		
		cartItem.appendChild(name)
		cartItem.appendChild(boughtProduct)
		cartItem.appendChild(amount)
		cartList.appendChild(cartItem)

	})
}
displayCart()

async function displayUsers() {
	const users = await getUsers()


}