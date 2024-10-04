const productsList = document.querySelector('.product-list')
const userList = document.querySelector('.user-list')

function displaySingleProduct(product) {
		const productItem = document.createElement('div');
		const img = document.createElement('img')
		const name = document.createElement('h3');
		const price = document.createElement('p');
		const inStock = document.createElement('p');
		const deleteButton = document.createElement('button')

		img.classList.add('product-img')
		productItem.classList.add('product-item')
		deleteButton.classList.add('product-delete-button')
		deleteButton.setAttribute('data-id', product._id)

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
}

function displaySingelCartItem(cartData, users, products) {
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
		
		return cartItem;
}

function displaySingleUsers(userData) {
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
}

export { displaySingelCartItem, displaySingleProduct, displaySingleUsers }