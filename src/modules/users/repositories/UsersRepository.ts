
import { ICreateUserDTO, IUsersRepository } from "./IUsersRepository";
import * as fs from 'fs';
import { User } from "../model/user";
import { Sms } from "../model/sms";
import axios from 'axios';
import { Locale } from "../model/locale";
import { isEmpty } from "lodash";
import createHttpError from "http-errors";
import { Email } from "../model/email";
import { v4 as uuidV4 } from "uuid";


const banco = __dirname + '/BancoJson.json';

class UsersRepository implements IUsersRepository {

    createName({ name }): User {
        const user = new User();

        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);
        const produto = "";
        Object.assign(user, {
            id: uuidV4(),
            name,
            produto,
            created_at: new Date(),
            sms: {},
            locale: {},
            email:{},
        });



        userData.push(user);

        fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
            if (err) throw err;
        });

        return user;
    }

    createSms({ number, id }): void {
        const smss = new Sms();
        Object.assign(smss, {
            number,
            created_at: new Date(),
        });
        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        const findUserId = userData.find(user => user.id === id);
        findUserId.sms = smss;

        userData.map(function (cell) {
            return findUserId
        });

        fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
            if (err) throw err;
        });

    }

    createSmsMessage({ code, status, verified, id }): void {
        const smss = new Sms();
        Object.assign(smss, {
            code,
            status,
            verified,
        });
        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        const findUserId = userData.find(user => user.id === id);
        findUserId.sms.code = smss.code;
        findUserId.sms.status = smss.status;
        findUserId.sms.verified = smss.verified;

        userData.map(function (cell) {
            return findUserId
        });

        fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
            if (err) throw err;
        });

    }


    createLocale({ cep, id }): void {

        const locale = new Locale();

        async function getAddress(cep) {
            try {
                const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`);

                if (isEmpty(data.erro)) {
                    const zip_code = data.cep;
                    const address = data.logradouro;
                    const neighborhood = data.bairro;
                    const city = data.localidade;
                    const state = data.uf;

                    Object.assign(locale, {
                        zip_code,
                        address,
                        neighborhood,
                        city,
                        state,
                    });


                    const usersBanco = fs.readFileSync(banco, 'utf-8');

                    let userData = JSON.parse(usersBanco);

                    const findUserId = userData.find(user => user.id === id);
                    findUserId.locale = locale;

                    userData.map(function (cell) {
                        return findUserId
                    });
                    console.log(userData);
                    fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
                        if (err) throw err;
                    });
                }
            } catch (err) {
                console.error(err);
            }
            throw createHttpError(400, 'CEP inválido');
        }

        getAddress(cep)

    }


    createProduto({ produto, id }: ICreateUserDTO): void {

        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        const findUserId = userData.find(user => user.id === id);
        findUserId.produto = produto

        userData.map(function (produto) {
            return findUserId
        });

        fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
            if (err) throw err;
        });

    }

    createEmail({ value, id }): void {
        const email = new Email();
        Object.assign(email, {
            value,
            created_at: new Date(),
        });
        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        const findUserId = userData.find(user => user.id === id);
        findUserId.email = email

        userData.map(function (email) {
            return findUserId
        });

        fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
            if (err) throw err;
        });

    }

    createEmailCode({ code, verified, id }): void {
        const email = new Email();
        Object.assign(email, {
            code,
            verified,
        });
        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        const findUserId = userData.find(user => user.id === id);
        findUserId.email.code = email.code;
        findUserId.email.verified = email.verified;

        userData.map(function (email) {
            return findUserId
        });

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



    findByData(data, id) {
        const users = fs.readFileSync(banco, 'utf-8');

        let user = JSON.parse(users);

        const userExists = user.find(
            (user) =>  user.id === id
        );

        if(userExists.sms.number === data || userExists.email.value === data || userExists.locale.zip_code === data ||
             userExists.produto === data){
            return false;
        }

        return userExists;

    }

    list() {

        const users = fs.readFileSync(banco, 'utf-8');

        let user = JSON.parse(users);
        return user;
    }
}

export { UsersRepository };