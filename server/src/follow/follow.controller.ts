import {
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from '../common/interceptor/success.interceptor';
import { HttpExceptionFilter } from '../common/exception/http-exception.filter';
import { FollowService } from './follow.service';
import { Follow } from './model/follow.model';
import { CurrentUser } from '../common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller('follow')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get(':userId/exist')
  @UseGuards(JwtAuthGuard)
  async isFollow(
    @CurrentUser() currentUser,
    @Param('userId') userId,
  ): Promise<boolean> {
    console.log(currentUser._id, userId);

    return await this.followService.isFollow(userId, currentUser._id);
  }

  @Get(':userId/following')
  async getFollowing(@Param('userId') userId): Promise<Follow[]> {
    return await this.followService.following(userId);
  }

  @Get(':userId/follower')
  async getFollower(@Param('userId') userId): Promise<Follow[]> {
    return await this.followService.follower(userId);
  }
}
