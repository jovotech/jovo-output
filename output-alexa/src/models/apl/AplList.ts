import {
  ArrayMinSize,
  CarouselItem,
  IsArray,
  IsInstance,
  IsOptional,
  IsString,
  Type,
  ValidateNested,
} from '@jovotech/output';
import AplListJson from '../../apl/List.json';
import { AplHeader } from './AplHeader';
import { AplRenderDocumentDirective } from './AplRenderDocumentDirective';

export class AplList {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  backgroundImageUrl?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AplHeader)
  header?: AplHeader;

  @IsArray()
  @ArrayMinSize(2)
  @IsInstance(CarouselItem, {
    each: true,
  })
  @ValidateNested({
    each: true,
  })
  @Type(() => CarouselItem)
  items: CarouselItem[];

  toApl?(): AplRenderDocumentDirective {
    if (this.title) {
      AplListJson.datasources.data.title = this.title;
    }

    if (this.header) {
      AplListJson.datasources.data.header = this.header;
    }

    if (this.backgroundImageUrl) {
      AplListJson.datasources.data.backgroundImageUrl = this.backgroundImageUrl;
    }

    (AplListJson.datasources.data.items as CarouselItem[]) = this.items.map((item) => ({
      ...item,
      selection: item.selection
        ? {
            type: 'Selection',
            ...item.selection,
          }
        : undefined,
    }));

    return {
      type: 'Alexa.Presentation.APL.RenderDocument',
      token: 'token',
      ...AplListJson,
    };
  }
}
