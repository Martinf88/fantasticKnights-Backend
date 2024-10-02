// import getData from "./api"
import { addProduct } from "./addNewProduct.js";
import { getProducts, getUsers, getCart, getFilteredProducts, getFilteredUsers, updateUser } from "./api.js"
import { addEvent, deleteProductEvent } from "./delete.js";
import { displaySingleProduct } from "./displayProducts.js";
import { displaySingleUsers } from "./displaySingleUsers.js";


const productsList = document.querySelector('.product-list')
const cartList = document.querySelector('.cart-list');
const userList = document.querySelector('.user-list')
const productSearch = document.querySelector('.search-product-input')
const userSearch = document.querySelector('.search-user-input')
const editForm = document.querySelector('.edit-user-form');
const editFormUsername = document.querySelector('.edit-username');
const editFormAdmin = document.querySelector('.edit-admin');
const closeEditFormButton = document.querySelector('.close-edit');
const editOverlay = document.querySelector('.edit-overlay')


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
	const users = await getUsers()

	users.forEach(displaySingleUsers)
}
displayUsers()

userSearch.addEventListener('input', async () => {
	if (userSearch.value.length > 0) {
		const result = await getFilteredUsers(userSearch.value)
		userList.innerHTML = ''
		result.forEach(displaySingleUsers)

	} else {
		userList.innerHTML = ''
		displayUsers()
	}
})

closeEditFormButton.addEventListener('click', () => {
	editForm.style.display = 'none';
  });


  document.querySelector('.user-list').addEventListener('click', async (e) => {
	if (e.target.classList.contains('edit-button')) {
		
	  const userId = e.target.getAttribute('data-id');
	  const users = await getUsers();
	  const user = users.find(u => u._id === userId);
  
	  editFormUsername.value = user.name;
	  editFormAdmin.value = user.isAdmin.toString();
  
	  editForm.setAttribute('data-id', userId);
  
	  editOverlay.classList.add('show')

	} else {
		console.error('User not found for the given ID.');
	}
  });
  
  editForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	
	const userId =editForm.getAttribute('data-id');
	const updatedUser = {
	  name: editFormUsername.value,
	  isAdmin: editFormAdmin.value.toLowerCase() === 'true'
	};
  
	await updateUser(userId, updatedUser);
  
	editOverlay.classList.remove('show')
  
	document.querySelector('.user-list').innerHTML = ''; 
	const users = await getUsers(); 
	users.forEach(displaySingleUsers); 
  });