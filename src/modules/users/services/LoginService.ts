import { LoginRepository } from "../repositories/LoginRepository";


class LoginService {
    constructor(private loginRepository: LoginRepository) {}

    executeLogin(username, password){
        const usernameExist = this.loginRepository.findByEmail(username);

        const passwordExist = this.loginRepository.findByPassword(password);

        if(!usernameExist){
            throw new Error("Email não cadastrado"); 
        }

        if(!passwordExist){
            throw new Error("senha não cadastrada"); 
        }

    
        if(usernameExist != username || passwordExist != password){
            throw new Error("Usuário ou senha inválidos");
        }

        

    }
   

}

export { LoginService }