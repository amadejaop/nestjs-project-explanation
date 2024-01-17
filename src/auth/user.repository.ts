import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const user = this.create({ username, password });
        
        try {
            await this.save(user);
    
        } catch (error) {
            // if the error code corresponds to the one given when username already exists
            // console.log(error) to get the error code
            if (error.code === "23505") {
                throw new ConflictException("Username already exists.");
            } else {
                throw new InternalServerErrorException();
            }
        }

    }
}