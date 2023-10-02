import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  public name: string;

  @IsString()
  @IsNotEmpty()
  public userId: string;
}
