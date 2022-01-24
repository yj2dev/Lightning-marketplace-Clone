import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { HttpExceptionFilter } from '../../common/exception/http-exception.filter';
import { SuccessInterceptor } from '../../common/interceptor/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserReadonlyDto } from '../dto/user.readonly.dto';
import { UserRequestDto } from '../dto/user.request.dto';
import { AuthService } from '../../auth/auth.service';
import { LoginRequestDto } from '../../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../common/utils/multer.options';
import { User } from '../model/user.model';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  allUser(@CurrentUser() currentUser) {
    return currentUser.readonlyData;
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 200, description: '성공', type: UserReadonlyDto })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @Post('signup')
  async signUp(@Body() userRequestDto: UserRequestDto) {
    return await this.userService.signUp(userRequestDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  signIn(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.jwtLogin(loginRequestDto);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Get('signout')
  signOut() {
    return this.userService.signOut();
  }

  @Post('upload/profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image', 1, multerOptions('user.profile')))
  uploadFile(
    @CurrentUser() currentUser: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    // const imgURI = `http://localhost:8000/static/user.profile/${file.filename[0]}`;
    // console.log('imgURI >> ', imgURI);
    return this.userService.uploadImg(currentUser, files);
  }
}
