async function getCart() {
	const response = await fetch('/cart', {
		method: 'GET'
	})
	const data = await response.json()
	console.log('Svar från cart: ', data);
	
}
async function getProducts() {
	const response = await fetch('/products', {
		method: 'GET'
	})
	const data = await response.json()
	console.log('Svar från products: ', data);
	
}
async function getUsers() {
	const response = await fetch('/users', {
		method: 'GET'
	})
	const data = await response.json()
	console.log('Svar från users: ', data);
	
}

export { getCart, getProducts, getUsers }