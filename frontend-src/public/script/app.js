// import getData from "./api"
import { addProduct } from "./addNewProduct.js";
import { getProducts, getUsers, getCart, getFilteredProducts } from "./api.js"
import { addEvent, deleteProductEvent } from "./delete.js";
import { displaySingleProduct } from "./displayProducts.js";
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

async function displayUsers() {
	const users = await getUsers(); 

	users.forEach(userData => {
		const userItem = document.createElement('div');
		const userName = document.createElement('h4');
		const userAdmin = document.createElement('p');
		const editButton = document.createElement('button');

		userItem.classList.add('user-item');
		editButton.classList.add('edit-button');
		editButton.innerText = 'Edit';
		editButton.setAttribute('data-id', userData._id);

		userName.textContent = `User: ${userData.name}`; 
		userAdmin.textContent = `Admin: ${userData.isAdmin}`; 

		userItem.appendChild(userName);
		userItem.appendChild(userAdmin);
		userItem.appendChild(editButton);

		userList.appendChild(userItem); 
	});
}

displayUsers();
