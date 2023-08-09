export interface Product {
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    productStock: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    status: string;
    errors: string;
    data: T;
  }