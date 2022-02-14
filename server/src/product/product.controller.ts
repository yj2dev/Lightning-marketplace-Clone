import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create.product.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../common/utils/multer.options';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('image', 12, multerOptions('product_image')),
  )
  async uploadProduct(
    @CurrentUser() currentUser,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() productInfo,
  ) {
    console.log('user >> ', currentUser);
    console.log('user new >> ', currentUser._id);
    console.log('files >> ', files);

    console.log('productInfo >> ');

    return await this.productService.uploadProduct(
      currentUser,
      files,
      JSON.parse(productInfo.data),
    );
  }
}
