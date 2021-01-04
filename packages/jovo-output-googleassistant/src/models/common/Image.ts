import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'jovo-output';

export enum ImageFill {
  Unspecified = 'UNSPECIFIED',
  Gray = 'GRAY',
  White = 'WHITE',
  Cropped = 'CROPPED',
}

export class Image {
  @IsUrl({ protocols: ['https', 'http'] })
  url: string;

  @IsString()
  @IsNotEmpty()
  alt: string;

  @IsOptional()
  @IsInt()
  height?: number;

  @IsOptional()
  @IsInt()
  width?: number;
}
