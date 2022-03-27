import { ProductRepository } from '../repository/product.repository';
import { Product } from '../model/product.model';
import { TagRepository } from '../../tag/tag.reposigory';
import { ProductFavorite } from '../../product-favorite/model/product-favorite.model';
export declare class ProductService {
    private readonly productRepository;
    private readonly tagRepository;
    constructor(productRepository: ProductRepository, tagRepository: TagRepository);
    searchTitleByKeyword(keyword: string): Promise<Product[]>;
    getProductFavorite(userId: string): Promise<ProductFavorite[]>;
    getProductContact(productId: string): Promise<any>;
    createProductContact(userId: string, productId: string, content: string): Promise<any>;
    deleteProductContact(askId: string): Promise<any>;
    addProductFavorite(userId: string, productId: string): Promise<boolean>;
    deleteHardProduct(productId: string): Promise<boolean>;
    updateProductState(productId: string, state: string): Promise<Product>;
    getOneProduct(productId: string): Promise<Product>;
    getAllProduct(): Promise<Product[]>;
    uploadProduct(currentUser: any, files: any, productInfo: any): Promise<boolean>;
}
