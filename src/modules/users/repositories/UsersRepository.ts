
import { ICreateUserDTO, IUsersRepository } from "./IUsersRepository";
import * as fs from 'fs';
import { User } from "../model/user";


const banco = __dirname + '/BancoJson.json';

class UsersRepository implements IUsersRepository {

    createName({ name }: ICreateUserDTO): void {
        const user = new User();

        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        Object.assign(user, {
            name,
            created_at: new Date(),
        });

        

        userData.push(user);

        fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
            if (err) throw err;
        });

    }

    createCelular({ celular, id }: ICreateUserDTO): void {

        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        const findUserId = userData.find(user => user.id === id);
        findUserId.celular = celular
        
        userData.map(function(cell){
            return findUserId
        } );
    
        fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
            if (err) throw err;
        });

    }

    createCep({ cep, id }: ICreateUserDTO): void {

        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        const findUserId = userData.find(user => user.id === id);
        findUserId.cep = cep
        
        userData.map(function(cell){
            return findUserId
        } );
    
        fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
            if (err) throw err;
        });

    }

    createProduto({ produto, id }: ICreateUserDTO): void {

        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        const findUserId = userData.find(user => user.id === id);
        findUserId.produto = produto
        
        userData.map(function(produto){
            return findUserId
        } );
    
        fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
            if (err) throw err;
        });

    }

    createEmail({ email, id }: ICreateUserDTO): void {

        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        const findUserId = userData.find(user => user.id === id);
        findUserId.email = email
        
        userData.map(function(email){
            return findUserId
        } );
    
        fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
            if (err) throw err;
        });

    }

 



    findByName(name: string) {
        const users = fs.readFileSync(banco, 'utf-8');

        let user = JSON.parse(users);

        const userExists = user.find(
            (user: { name: string; }) => user.name === name
        );

        return userExists;

    }

    findByData(data: string) {
        const users = fs.readFileSync(banco, 'utf-8');

        let user = JSON.parse(users);

        const userExists = user.find(
            (user) => (user.celular === data || user.cep === data || user.produto === data || user.email === data)
        );

        return userExists;

    }

    list() {

        const users = fs.readFileSync(banco, 'utf-8');

        let user = JSON.parse(users);
        return user;
    }
}

export { UsersRepository };