import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories"


interface IAuthenticateRequest {
  email: string;
  password: string;
}


class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest) {

    const usersRepository = getCustomRepository(UsersRepositories);

    // Verificar se email existe
    const user = await usersRepository.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/password incorrect");
    }

    // Verificar se senha esta correta
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("Email/password Incorrect");
    }

    // Gerar token
    const token = sign({
      email: user.email
    }, "a9388d84e89b966c4c6c640b87fb814d", {
      subject : user.id,
      expiresIn: "1d"
    });

    return token;
  }

}

export { AuthenticateUserService }