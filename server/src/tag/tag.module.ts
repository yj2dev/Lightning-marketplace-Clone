import { Module } from '@nestjs/common';
import { TagRepository } from './tag.reposigory';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './model/tag.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  providers: [TagRepository],
  exports: [TagRepository],
})
export class TagModule {}
