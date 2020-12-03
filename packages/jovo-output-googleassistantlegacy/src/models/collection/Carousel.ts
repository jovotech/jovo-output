import { ArrayMaxSize, ArrayMinSize, IsArray, Type, ValidateNested } from 'jovo-output';
import { CollectionItem } from './CollectionItem';

export class Carousel {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => CollectionItem)
  items: CollectionItem[];
}
