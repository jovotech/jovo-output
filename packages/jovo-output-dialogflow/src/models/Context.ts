import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Min } from 'jovo-output';

export class Context {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  lifespan_count?: number;

  @IsOptional()
  @IsObject()
  parameters?: Record<string, unknown>;
}
