import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../common/utils/multer.options';
import { ProductService } from '../service/product.service';
import { User } from '../../user/model/user.model';
import { Product } from '../model/product.model';
import { ProductFavorite } from '../../product-favorite/model/product-favorite.model';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

// s3 객체 생성후 AWS.config을 수정하면 에러발생
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

console.log('[ product environment ]');
console.log(process.env.AWS_S3_BUCKET_NAME);
console.log(process.env.AWS_S3_REGION);

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:keyword/search')
  async searchTitleByKeyword(
    @Param('keyword') keyword: string,
  ): Promise<Product[]> {
    return await this.productService.searchTitleByKeyword(keyword);
  }

  @Get('/favorite')
  @UseGuards(JwtAuthGuard)
  async getProductFavorite(
    @CurrentUser() currentUser: User,
  ): Promise<ProductFavorite[]> {
    return await this.productService.getProductFavorite(currentUser._id);
  }

  @Get('/:productId/contact')
  async getProductContact(@Param('productId') productId: string): Promise<any> {
    return await this.productService.getProductContact(productId);
  }

  @Post('/:productId/contact')
  @UseGuards(JwtAuthGuard)
  async createProductContact(
    @Param('productId') productId: string,
    @Body('content') content: string,
    @CurrentUser() currentUser: User,
  ): Promise<any> {
    return await this.productService.createProductContact(
      currentUser._id,
      productId,
      content,
    );
  }

  @Delete('/:askId/contact')
  @UseGuards(JwtAuthGuard)
  async deleteProductContact(
    @Param('askId') askId: string,
    @CurrentUser() currentUser: User,
  ): Promise<any> {
    return await this.productService.deleteProductContact(askId);
  }

  @Get('/:productId/favorite')
  @UseGuards(JwtAuthGuard)
  async addFavoriteProduct(
    @CurrentUser() currentUser: User,
    @Param('productId') productId: string,
  ): Promise<boolean> {
    console.log('currentUser >> ', currentUser);
    console.log('productId >> ', productId);
    return this.productService.addProductFavorite(currentUser._id, productId);
  }

  @Delete('')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(
    @Query('productId') productId: string,
    @Query('state') state: string,
  ): Promise<boolean> {
    return await this.productService.deleteHardProduct(productId);
  }

  @Patch('state')
  @UseGuards(JwtAuthGuard)
  async updateProductState(
    @Body('productId') productId: string,
    @Body('state') state: string,
  ): Promise<Product> {
    console.log(productId, state);
    return await this.productService.updateProductState(productId, state);
  }

  @Get('all')
  async getAllProduct() {
    return this.productService.getAllProduct();
  }

  @Get('detail/:productId')
  async getOneProduct(@Param('productId') productId: string): Promise<Product> {
    console.log('productId >> ', productId);
    return await this.productService.getOneProduct(productId);
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('image', 12, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
          cb(null, `product/${Date.now().toString()}-${file.originalname}`);
        },
      }),
      limits: {},
    }),
  )
  async uploadProduct(
    @CurrentUser() currentUser: User,
    @UploadedFiles() files: Express.MulterS3.File[],
    @Body() productInfo,
  ): Promise<boolean> {
    console.log('files >> ', files);
    return await this.productService.uploadProduct(
      currentUser,
      files,
      JSON.parse(productInfo.data),
    );
  }
}
