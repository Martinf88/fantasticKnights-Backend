async function getUsers() {
	const url = "http://localhost:9876"

	try {
		const response = await fetch(`${url}/users`)
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		}
		const data = await response.json()
		console.log(data);
		return data;
	} catch (error) {
		console.error(error.message);
	}
	
}

getUsers()

async function getCart() {
	const url = "http://localhost:9876"

	try {
		const response = await fetch(`${url}/cart`)
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		}
		const data = await response.json()
		console.log(data);
		return data;
	} catch (error) {
		console.error(error.message);
	}
	
}

getCart()

async function getProducts() {
	const url = "http://localhost:9876"

	try {
		const response = await fetch(`${url}/products`)
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		}
		const data = await response.json()
		console.log(data);
		return data;
	} catch (error) {
		console.error(error.message);
	}
	
}

getProducts()

export {getUsers, getCart, getProducts}