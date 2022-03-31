import { Model } from 'mongoose';
import { Product } from '../model/product.model';
import { ProductImage } from '../../product-image/model/product-image.model';
import { CreateProductDto } from '../dto/create.product.dto';
import { ProductFavorite } from '../../product-favorite/model/product-favorite.model';
import { ProductContact } from '../../product-contact/model/product-contact.model';
export declare class ProductRepository {
    private readonly product;
    private readonly productImage;
    private readonly productFavorite;
    private readonly productContact;
    constructor(product: Model<Product>, productImage: Model<ProductImage>, productFavorite: Model<ProductFavorite>, productContact: Model<ProductContact>);
    searchTitleByKeyword(keyword: string): Promise<Product[]>;
    getProductFavorite(userId: string): Promise<ProductFavorite[]>;
    getProductContactAll(productId: string): Promise<any>;
    createProductContact(userId: string, productId: string, content: string): Promise<any>;
    deleteProductContact(askId: string): Promise<any>;
    createProductFavorite(userId: string, productId: string): Promise<ProductFavorite>;
    deleteProductFavorite(userId: string, productId: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
    findByIdProductFavorite(userId: string, productId: string): Promise<ProductFavorite>;
    deleteHardProduct(productId: any): Promise<any>;
    updateProduct(productId: any, field: object): Promise<Product>;
    findByIdAndPopulate(id: string): Promise<Product>;
    getAllProduct(): Promise<Product[]>;
    uploadProduct(currentUser: any, productInfo: CreateProductDto): Promise<Product>;
    uploadProductImage(productId: any, files: any): Promise<boolean>;
}
