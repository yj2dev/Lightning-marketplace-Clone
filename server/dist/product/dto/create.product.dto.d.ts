import { Product } from '../model/product.model';
declare const CreateProductDto_base: import("@nestjs/common").Type<Pick<Product, "description" | "title" | "newProduct" | "enableExchange" | "price" | "containDeliveryCharge" | "address" | "tag" | "quantity" | "largeCateogry" | "mediumCategory" | "smallCategory">>;
export declare class CreateProductDto extends CreateProductDto_base {
}
export {};
