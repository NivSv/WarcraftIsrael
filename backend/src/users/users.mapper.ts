import { UserDto } from "./dtos/user.dto";
import { User } from "./user.entity";

export class UsersMapper {
  public static async entityToDto(entity: User): Promise<UserDto> {
    const dto: UserDto = ({
      id:entity.id,
      username:entity.username,
      fistName:entity.firstName,
      lastName:entity.lastName,
    });

    return dto;
  }

  public static async entitiesToDtos(entities: Array<User>): Promise<Array<UserDto>> {
    const dtos = entities.map(entity => this.entityToDto(entity));
    return await Promise.all(dtos);
  }
}