async function getCart() {
	const response = await fetch('/cart', {
		method: 'GET'
	})
	const data = await response.json()
	console.log('Svar från cart: ', data);
	return data
}
async function deleteCartItem(id) {
	const response = await fetch(`/cart/${id}`, {
		method: 'DELETE'
	})
	// const data = await response.json()
	await getCart()
	
}
async function getProducts() {
	const response = await fetch('/products', {
		method: 'GET'
	})
	const data = await response.json()
	console.log('Svar från products: ', data);

	return data
	
}

async function addNewProduct(newProduct) {
	const response = await fetch('/products', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newProduct)
	})
	const data = await response.json()
	console.log('Svar från addNewProduct', data);
	
	return data
}


async function getUsers() {
	const response = await fetch('/users', {
		method: 'GET'
	})
	const data = await response.json()
	console.log('Svar från users: ', data);
	return data
}

export { getCart, getProducts, getUsers, deleteCartItem, addNewProduct }