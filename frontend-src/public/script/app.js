// import getData from "./api"
import { getProducts, getUsers, getCart } from "./api.js"
import { addEvent } from "./delete.js";
const productsList = document.querySelector('.product-list')
const cartList = document.querySelector('.cart-list');
const userList = document.querySelector('.user-list');

// let users = []
// let products = []
async function displayProducts() {
	const products = await getProducts()

	products.forEach(product => {
		const productItem = document.createElement('div');
		const img = document.createElement('img')
		const name = document.createElement('h3');
		const price = document.createElement('p');
		const inStock = document.createElement('p');
		const deleteButton = document.createElement('button')

		img.classList.add('product-img')
		productItem.classList.add('product-item')
		deleteButton.classList.add('product-delete-button')

		img.src = product.image
		deleteButton.innerText = 'Delete Item'
		name.textContent = product.name
		price.textContent = `$${product.price}`
		inStock.textContent = `In stock: ${product.amountInStock}`

		productItem.appendChild(img)
		productItem.appendChild(name)
		productItem.appendChild(price)
		productItem.appendChild(inStock)
		productItem.append(deleteButton)
		productsList.appendChild(productItem)
	});	
}
displayProducts()

async function displayCart() {
	const cart = await getCart()	
	const users = await getUsers()
	const products = await getProducts()

	cart.forEach(cartData => {
		const cartItem = document.createElement('div')
		const name = document.createElement('h4')
		const boughtProduct = document.createElement('h4')
		const amount = document.createElement('p')
		const deleteButton = document.createElement('button')
		cartItem.classList.add('cart-item')
		deleteButton.classList.add('cart-delete-button')
		deleteButton.innerText = 'Delete'
		deleteButton.setAttribute('data-id', cartData._id)
		
		const user = users.find(u => u._id === cartData.userId)
		name.textContent = `Name: ${user.name}`
		
		const product = products.find(p => p._id === cartData.productId)
		boughtProduct.textContent = `Product: ${product.name}`

		amount.textContent = `Amount: ${cartData.amount}`
		cartItem.appendChild(name)
		cartItem.appendChild(boughtProduct)
		cartItem.appendChild(amount)
		cartItem.appendChild(deleteButton)
		cartList.appendChild(cartItem)

	})
	addEvent()
}
displayCart()