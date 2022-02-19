import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
  Res,
  Req,
  Put,
  Patch,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../service/user.service';
import { HttpExceptionFilter } from '../../common/exception/http-exception.filter';
import { SuccessInterceptor } from '../../common/interceptor/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserReadonlyDto } from '../dto/user.readonly.dto';
import { UserRequestDto } from '../dto/user.request.dto';
import { AuthService } from '../../auth/auth.service';
import { UserSigninDto } from '../../auth/dto/user.signin.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
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

  @ApiOperation({ summary: '유저와 연관된 모든 정보 요청' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @UseGuards(JwtAuthGuard)
  @Get('detail')
  async getDetailUser(@CurrentUser() currentUser): Promise<User> {
    return await this.userService.getDetailUser(currentUser._id);
  }

  @ApiOperation({ summary: '유저(상점) 자기소개(상점설명) 변경' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @UseGuards(JwtAuthGuard)
  @Patch('description')
  async updateDescription(
    @CurrentUser() currentUser,
    @Body('description') description: string,
  ): Promise<User> {
    return this.userService.updateDescription(currentUser._id, description);
  }

  @ApiOperation({ summary: '유저(상점) 닉네임(상점명) 변경' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @UseGuards(JwtAuthGuard)
  @Patch('nickname')
  async updateNickname(
    @CurrentUser() currentUser,
    @Body('storeName') storeName: string,
  ) {
    console.log('curr user >> ', currentUser, storeName);
    return this.userService.updateStoreName(currentUser._id, storeName);
  }

  @ApiOperation({ summary: '유저인증' })
  @ApiResponse({ status: 200, description: '성공', type: UserReadonlyDto })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @UseGuards(JwtAuthGuard)
  @Get('auth')
  async authUser(@CurrentUser() currentUser) {
    return currentUser;
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 200, description: '성공', type: UserRequestDto })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @Post('signup')
  async signUp(@Body() userRequestDto: UserRequestDto) {
    return await this.userService.signup(userRequestDto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '성공', type: UserSigninDto })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @Post('signin')
  async signin(
    @Body() userSigninDto: UserSigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { jwt, user } = await this.authService.jwtSignin(userSigninDto);
    res.cookie('jwt', jwt, { httpOnly: true });
    return user.readonlyData;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Get('signout')
  async signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
  }

  @ApiOperation({ summary: '유저 회원가입 여부 조회' })
  @ApiResponse({
    status: 200,
    description: '유저가 존재함',
    type: UserReadonlyDto,
  })
  @ApiResponse({ status: 409, description: '유저가 존재하지 않음' })
  @Get('/check')
  async isUser(@Query('phoneNumber') phoneNumber: string) {
    return await this.userService.isPhoneNumber(phoneNumber);
  }

  @Post('upload/profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image', 1, multerOptions('user_profile')))
  uploadFile(
    @CurrentUser() currentUser: User,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    console.log('profile');
    console.log('currentUser >> ', currentUser);
    console.log('file >> ', file);
    // const imgURI = `http://localhost:8000/static/user_profile/${file.filename}`;
    return this.userService.uploadImg(currentUser, file);
  }
}
