import { deleteCartItem, deleteProduct } from "./api.js"
import { displayProducts } from "./app.js"

const productsList = document.querySelector('.product-list')

function addEvent() {
    const deleteCartItemButton = document.querySelectorAll('.cart-delete-button')
    deleteCartItemButton.forEach(button => {
        const itemId = button.getAttribute('data-id')
        button.addEventListener('click', () => {
            deleteCartItem(itemId)
        })
    })    
}

function deleteProductEvent() {
    const deleteProductButton = document.querySelectorAll('.product-delete-button')
    deleteProductButton.forEach(button => {
        const productId = button.getAttribute('data-id')
        button.addEventListener('click', async() => {
            try {
                await deleteProduct(productId)
                productsList.innerHTML = ''
                await displayProducts()

            } catch(error) {
                
            }
        })
    })    
}
export { addEvent, deleteProductEvent }
