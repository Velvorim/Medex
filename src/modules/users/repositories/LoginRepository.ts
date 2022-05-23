
import * as fs from 'fs';
import * as crypto  from 'crypto';
const banco = __dirname + '/BancoJson.json';

class LoginRepository {

    findByEmail(email){
        const users = fs.readFileSync(banco, 'utf-8');

        let user = JSON.parse(users);

        const userEmail = user.find(
            (user: { email: { value: string} }) => user.email.value === email
        );
        if(!userEmail){
            return new Error("Email inválido");
        }
        return userEmail.email.value;
    }

    findByPassword(password){
        const users = fs.readFileSync(banco, 'utf-8');

        let user = JSON.parse(users);
        const userEmail = user.find(
            (user: { senha }) => this.checkPsw(user.senha) === password
        );
        
        if(!userEmail){
            return new Error("Senha inválida");
        }
        return this.checkPsw(userEmail.senha);
    }

     checkPsw(userSenha){
        const alg = "aes-256-ctr";
        const key = "12345678958769321457871587458741";
        const iv = "1234567891123456";
     
        let decipher = crypto.createDecipheriv(alg, key, iv);
        let decrypted = decipher.update(userSenha, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted
    }

}
 
export { LoginRepository }