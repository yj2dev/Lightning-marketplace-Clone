import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from './model/follow.model';
import { FollowReposigory } from './follow.reposigory';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
  ],
  controllers: [FollowController],
  providers: [FollowService, FollowReposigory],
  exports: [FollowService, FollowReposigory],
})
export class FollowModule {}
