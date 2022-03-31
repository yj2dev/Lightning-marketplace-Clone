import { Tag } from './model/tag.model';
import { Model } from 'mongoose';
import { Product } from '../product/model/product.model';
export declare class TagRepository {
    private readonly tag;
    constructor(tag: Model<Tag>);
    saveTags(tags: string[], id: Product): Promise<boolean>;
    deleteTagsByProductId(productId: string): Promise<boolean>;
}
