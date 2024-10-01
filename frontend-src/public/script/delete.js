import { deleteCartItem } from "./api.js"

function addEvent() {
    const deleteCartItemButton = document.querySelectorAll('.cart-delete-button')
    deleteCartItemButton.forEach(button => {
        const itemId = button.getAttribute('data-id')
        button.addEventListener('click', () => {
            deleteCartItem(itemId)
        })
    })    
}
export { addEvent }
