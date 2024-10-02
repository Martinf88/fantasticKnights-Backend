import { getFilteredProducts } from "./api.js"
import { displaySingleProduct } from "./displayProducts.js"
const productsList = document.querySelector('.product-list')

const productSearch = document.querySelector('.search-product-input')

export function searchProductEvent(query) {
    productSearch.addEventListener('input', async () => {
        if (query.length > 0) {
            const result = await getFilteredProducts(query)
            productsList.innerHTML = ''
            result.forEach(displaySingleProduct)
        }
        
    })
}