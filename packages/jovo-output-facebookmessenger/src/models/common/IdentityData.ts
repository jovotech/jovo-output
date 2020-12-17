import { IsNotEmpty, IsOptional, IsString } from 'jovo-output';

export class IdentityData {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  user_ref?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  post_id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  comment_id?: string;
}
