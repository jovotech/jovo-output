import {
  ArrayMaxSize,
  ArrayMinSize,
  GenericCarousel,
  IsArray,
  Type,
  ValidateNested,
} from 'jovo-output';
import { CollectionItem } from './CollectionItem';

export class Carousel {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => CollectionItem)
  items: CollectionItem[];

  toGenericCarousel?(): GenericCarousel {
    return {
      items: this.items.map((item) => {
        return {
          key: item.optionInfo.key !== item.title ? item.optionInfo.key : undefined,
          title: item.title,
          subtitle: item.description,
          imageUrl: item.image?.url,
        };
      }),
    };
  }
}
