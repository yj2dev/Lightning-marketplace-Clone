import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './model/tag.model';
import { Model } from 'mongoose';
import { Product } from '../product/model/product.model';

@Injectable()
export class TagRepository {
  constructor(@InjectModel(Tag.name) private readonly tag: Model<Tag>) {}

  // 태그 저장
  // 매개변수 입력 예시 ['#사과', '#바나나', '#오렌지']
  async saveTags(tags: string[], id: Product): Promise<boolean> {
    try {
      for (const tag of tags) {
        await this.tag.create({ name: tag, toProductId: id });
      }
      return true;
    } catch {
      return false;
    }
  }

  // 상점아이디로 태그 제거
  async deleteTagsByProductId(productId: string): Promise<boolean> {
    try {
      const result = await this.tag.deleteMany({ toProductId: productId });
      console.log('[delete tags] result >> ', result);

      return true;
    } catch {
      return false;
    }
  }
}
