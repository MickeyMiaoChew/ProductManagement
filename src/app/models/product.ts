export interface Product {
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productStock: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }