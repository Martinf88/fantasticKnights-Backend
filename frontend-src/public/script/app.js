// import getData from "./api"
import { getProducts, getUsers, getCart, getFilteredProducts, getFilteredUsers, updateUser } from "./api.js"
import { addEvent, deleteProductEvent } from "./delete.js";
import { displaySingelCartItem, displaySingleProduct, displaySingleUsers} from "./displayProducts.js";

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

async function displayUsers() {
	try {
		const users = await getUsers()
		users.forEach(displaySingleUsers)
	} catch (error) {
		console.error('Error loading users:', error);
	}
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
	editOverlay.classList.remove('show')
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