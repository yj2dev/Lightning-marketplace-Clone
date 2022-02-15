import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Hashtag {
  @ApiProperty({
    example: '해시태그명',
  })
  @Prop({ required: true })
  name: string;
}
