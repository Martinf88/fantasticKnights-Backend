import { deleteCartItem, deleteProduct } from "./api.js"
import { displayCart, displayProducts } from "./displayItems.js"

const productsList = document.querySelector('.product-list')
const cartList = document.querySelector('.cart-list')

function addDeleteCartEvent() {
    const deleteCartItemButton = document.querySelectorAll('.cart-delete-button')

    deleteCartItemButton.forEach(button => {
        const itemId = button.getAttribute('data-id')
        button.addEventListener('click', async() => {
            await deleteCartItem(itemId)
            cartList.innerHTML = ''
            await displayCart()
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
export { addDeleteCartEvent, deleteProductEvent }
