
export interface ProductModel {
name: string;
price: number;
image: string;
amountInStock: number;
}

export interface ProductQuery {
    name?: string;
    maxPrice?: number;
    minPrice?: number;
}
