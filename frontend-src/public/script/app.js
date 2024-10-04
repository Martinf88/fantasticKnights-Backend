// import getData from "./api"
import { addProduct } from "./addNewProduct.js";
import { getUsers, getFilteredProducts, getFilteredUsers, updateUser } from "./api.js"
import { displayProducts, displayCart, displayUsers } from './displayItems.js'
import { displaySingleProduct, displaySingleUsers} from "./createItems.js";

const productsList = document.querySelector('.product-list')
const userList = document.querySelector('.user-list')
const productSearch = document.querySelector('.search-product-input')
const userSearch = document.querySelector('.search-user-input')
const editForm = document.querySelector('.edit-user-form');
const editFormUsername = document.querySelector('.edit-username');
const editFormAdmin = document.querySelector('.edit-admin');
const closeEditFormButton = document.querySelector('.close-edit');
const editOverlay = document.querySelector('.edit-overlay')
const addProductButton = document.querySelector('#add-new-product-btn')
const cartList = document.querySelector('.cart-list');

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

userSearch.addEventListener('input', async () => {
	if (userSearch.value.length > 0) {
		const result = await getFilteredUsers(userSearch.value);
		
        userList.innerHTML = '';
        if (result.length > 0) {
			result.forEach(displaySingleUsers);
        } else {
			userList.innerHTML = 'Inga användare hittades.'; 
        }
    } else {
		userList.innerHTML = '';
        displayUsers();
    }
});

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
	
	const userId = editForm.getAttribute('data-id');
	const updatedUser = {
		name: editFormUsername.value,
		isAdmin: editFormAdmin.value.toLowerCase() === 'true'
	};
	
	await updateUser(userId, updatedUser);
	
	editOverlay.classList.remove('show')
	
	userList.innerHTML = ''; 
	cartList.innerHTML = ''
	await displayCart()
	await displayUsers()
});

addProductButton.addEventListener('click', () => {
	addProduct()
})
displayProducts()
displayCart()
displayUsers()