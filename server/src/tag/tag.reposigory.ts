import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './model/tag.model';
import { Model } from 'mongoose';
import { TagToProduct } from './model/tag-to-user.model';

@Injectable()
export class TagRepository {
  constructor(@InjectModel(Tag.name) private readonly tag: Model<Tag>) {}

  // 태그 저장
  // 매개변수 입력 예시 ['#사과', '#바나나', '#오렌지']
  async saveTags(tags: string[]): Promise<Tag> {
    tags.forEach((tag) => {});
    // const result = await this.tag.create();
    tag.insertMany();
    // log('saveTags result >> ', result);
  }
}
