import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    fistName: string;
    @ApiProperty()
    lastName: string;
}