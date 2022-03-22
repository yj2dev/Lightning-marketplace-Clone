import {
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRequestDto } from '../dto/user.request.dto';
import { User } from '../model/user.model';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private logger = new Logger('user');

  // 상점 후기 제거
  async deleteStoreReview(commentId: string): Promise<any> {
    return await this.userRepository.deleteStoreReview(commentId);
  }

  // 상점 후기내용 가져오기
  async getStoreReview(storeId: string): Promise<any> {
    return await this.userRepository.getStoreReviewAll(storeId);
  }

  // 상점 후기 저장
  async createStoreReview(
    userId: string,
    storeId: string,
    content: string,
  ): Promise<any> {
    return await this.userRepository.createStoreReview(
      userId,
      storeId,
      content,
    );
  }

  // 상점 문의 제거
  async deleteStoreContact(commentId: string): Promise<any> {
    return await this.userRepository.deleteStoreContact(commentId);
  }

  // 상점 문의내용 가져오기
  async getStoreContact(storeId: string): Promise<any> {
    return await this.userRepository.getStoreContactAll(storeId);
  }

  // 상점 문의 저장
  async createStoreContact(
    userId: string,
    storeId: string,
    content: string,
  ): Promise<any> {
    return await this.userRepository.createStoreContact(
      userId,
      storeId,
      content,
    );
  }

  // 회원탈퇴
  async deleteAccount(
    userId: string,
    phoneNumber: string,
    password: string,
  ): Promise<boolean> {
    // 유저 아이디로 유저 정보가 있는지 확인
    const isUser = await this.userRepository.findUserById(userId);

    console.log('isUser >> ', isUser);

    if (!isUser) throw new UnauthorizedException('유저가 존재하지 않습니다.');

    // 불러온 유저 정보와 탈퇴를 희망하는 휴대번호가 일치하는지 확인
    console.log(isUser.phoneNumber === phoneNumber);
    console.log(typeof isUser.phoneNumber, typeof phoneNumber);
    if (isUser.phoneNumber !== phoneNumber)
      throw new UnauthorizedException(
        '현재 사용자와 휴대번호가 일치하지 않습니다.',
      );

    // 암호화된 비밀번호 확인
    const isPassword: boolean = await bcrypt.compare(password, isUser.password);

    console.log('isPassword >> ', isPassword);

    // 비밀번호가 일치하지 않다면 오류 발생
    if (!isPassword)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    // 회원탈퇴
    const deleteAccountResult = await this.userRepository.deleteUser(
      isUser._id,
    );
    console.log('deleteAccountResult >> ', deleteAccountResult);
    if (!deleteAccountResult)
      throw new UnauthorizedException('회원탈퇴에 실패했습니다.');

    return true;
  }

  // 상점 전체정보 조회
  async getDetailUser(id: string): Promise<User> {
    const isUser = await this.userRepository.findUserByIdAndPopulate(id);
    return isUser;
  }

  // 상점명 변경
  async updateStoreName(id: string, storeName: string): Promise<User> {
    const isStoreName = await this.userRepository.existsByStoreName(storeName);

    console.log('isStoreName >> ', isStoreName);

    // 중복된 상점명이 있으면 변경 불가능
    // "409 Conflict" 는 리소스의 충돌을 의미하는 상태코드입니다
    if (isStoreName)
      throw new HttpException('동일한 상점명이 등록되어 있습니다.', 409);

    return await this.userRepository.updateStoreNameById(id, storeName);
  }

  // 상점 소개글 변경
  async updateDescription(id: string, description: string): Promise<User> {
    return this.userRepository.updateDescriptionById(id, description);
  }

  // 상점명 무작위 생성
  async createStoreName(): Promise<string> {
    let storeName;
    while (true) {
      // 랜덤 8자리 생성(0 ~ 99999999)
      let random8Number = '';
      for (let i = 0; i < 8; i++) {
        const random = Math.floor(Math.random() * 10);
        random8Number = random8Number + random;
      }

      storeName = `상점${random8Number}호`;

      // 중복된 상점명이 있는지 확인
      const isStoreName = await this.userRepository.existsByStoreName(
        storeName,
      );

      console.log('storeName >> ', storeName);
      console.log('isStoreName >> ', isStoreName);

      // 중복된 상점명이 없으면 진행
      if (!isStoreName) break;
      else this.logger.log('기본 상점명 재생성');
    }
    return storeName;
  }

  // 회원가입
  async signup(userRequestDto: UserRequestDto) {
    console.log('userRequestDto >> ', userRequestDto);

    // 돋일한 번호로 가입된 유저가 있는지 확인
    const isPhoneNumber = await this.userRepository.existsByPhoneNumber(
      userRequestDto.phoneNumber,
    );

    // 가입된 유저가 있으면 에러 반환
    if (isPhoneNumber) {
      throw new UnauthorizedException(
        '동일한 번호로 가입된 유저가 존재합니다.',
      );
    }

    /* 유저 저장 */
    // 신규 상점명 생성
    const storeName = await this.createStoreName();

    console.log('return storeName >> ', storeName);

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(userRequestDto.password, 10);
    console.log('hashedPassword >> ', hashedPassword);

    const user = await this.userRepository.createUser({
      phoneNumber: userRequestDto.phoneNumber,
      password: hashedPassword,
      storeName,
    });

    console.log('user >> ', user);

    return user.readonlyData;
  }

  async isPhoneNumber(phoneNumber: string) {
    const isUser = await this.userRepository.findUserByPhoneNumber(phoneNumber);
    // if (!isUser) {
    //   throw new HttpException('유저가 존재하지 않습니다.', 409);
    // }
    return isUser;
  }

  async uploadImg(userId: string, file: Express.Multer.File) {
    // example URL: https://localhost:8000/static/user.profile/ad061644514995652.png
    const imgSaveResult = await this.userRepository.findByIdAndUpdateImg(
      userId,
      file,
    );
    console.log('imgSaveResult >> ', imgSaveResult);
    return true;
  }

  async resetImg(userId: string) {
    const imgResetResult = await this.userRepository.findByIdAndResetImg(
      userId,
    );
    console.log('imgResetResult >> ', imgResetResult);
    return true;
  }
}
