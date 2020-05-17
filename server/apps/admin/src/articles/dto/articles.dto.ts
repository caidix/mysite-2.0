import { ApiProperty } from "@nestjs/swagger";
export class QueryDto {
  @ApiProperty()
  limit?: number;
  @ApiProperty()
  page?: number;
  @ApiProperty()
  skip?: number;
}