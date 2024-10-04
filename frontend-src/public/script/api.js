async function getCart() {
	const response = await fetch('/cart', {
		method: 'GET'
	})
	const data = await response.json()
	console.log('Svar från cart: ', data);
	return data
}

async function deleteCartItem(id) {
	await fetch(`/cart/${id}`, {
		method: 'DELETE'
	})
}

async function getProducts() {
	const response = await fetch('/products', {
		method: 'GET'
	})
	const data = await response.json()
	console.log('Svar från products: ', data);

	return data
	
}
// 
async function getFilteredProducts(name) {
	const response = await fetch(`/products/search?name=${name}`, {
		method: 'GET'
	})
	const data = await response.json()
	console.log('Svar från addNewProduct', data);
	
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

async function deleteProduct(id) {
	await fetch(`/products/${id}`, {
		method: 'DELETE'
	})
}


async function getUsers() {
	const response = await fetch('/users', {
		method: 'GET'
	})
	const data = await response.json()
	console.log('Svar från users: ', data);
	return data
}

async function getFilteredUsers(name) {
    const response = await fetch(`/users/search?name=${name}`, {
        method: 'GET'
    });

    if (!response.ok) {
        if (response.status === 404) {
            console.log('No users found with the given name.');
            return []; 
        }
        throw new Error(`Error fetching filtered users: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Svar från getFilteredUsers:', data);
    return data;
}


async function updateUser(userId, updatedUser) {
    const response = await fetch(`/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    });

    return response;
}



export { getCart, getProducts, getUsers, deleteCartItem, addNewProduct, deleteProduct, getFilteredProducts, getFilteredUsers, updateUser }