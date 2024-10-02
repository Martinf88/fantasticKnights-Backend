const productsList = document.querySelector('.product-list')

export function displaySingleProduct(product) {
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