import { IsNotEmpty, IsString, Type, ValidateIf, ValidateNested } from 'jovo-output';
import { BasicCard } from './basic-card/BasicCard';
import { CarouselBrowse } from './carousel-browse/CarouselBrowse';
import { HtmlResponse } from './html-response/HtmlResponse';
import { MediaResponse } from './media-response/MediaResponse';
import { SimpleResponse } from './simple-response/SimpleResponse';
import { StructuredResponse } from './structured-response/StructuredResponse';
import { TableCard } from './table-card/TableCard';

export class RichResponseItem {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((o) => Object.keys(o).length === 1 || Object.keys(o).includes('simpleResponse'))
  @ValidateNested()
  @Type(() => SimpleResponse)
  simpleResponse?: SimpleResponse;

  @ValidateIf((o) => Object.keys(o).length === 1 || Object.keys(o).includes('basicCard'))
  @ValidateNested()
  @Type(() => BasicCard)
  basicCard?: BasicCard;

  @ValidateIf((o) => Object.keys(o).length === 1 || Object.keys(o).includes('structuredResponse'))
  @ValidateNested()
  @Type(() => StructuredResponse)
  structuredResponse?: StructuredResponse;

  @ValidateIf((o) => Object.keys(o).length === 1 || Object.keys(o).includes('mediaResponse'))
  @ValidateNested()
  @Type(() => MediaResponse)
  mediaResponse?: MediaResponse;

  @ValidateIf((o) => Object.keys(o).length === 1 || Object.keys(o).includes('carouselBrowse'))
  @ValidateNested()
  @Type(() => CarouselBrowse)
  carouselBrowse?: CarouselBrowse;

  @ValidateIf((o) => Object.keys(o).length === 1 || Object.keys(o).includes('tableCard'))
  @ValidateNested()
  @Type(() => TableCard)
  tableCard?: TableCard;

  @ValidateIf((o) => Object.keys(o).length === 1 || Object.keys(o).includes('htmlResponse'))
  @ValidateNested()
  @Type(() => HtmlResponse)
  htmlResponse?: HtmlResponse;
}
