import { Module } from '@nestjs/common';
import { TagReposigory } from './tag.reposigory';

@Module({
  providers: [TagReposigory],
})
export class TagModule {}
