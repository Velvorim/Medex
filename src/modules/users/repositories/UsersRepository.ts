
import { ICreateUserDTO, IUsersRepository } from "./IUsersRepository";
import * as fs from 'fs';
import { User } from "../model/user";
import { Sms } from "../model/sms";
import axios from 'axios';
import { Locale } from "../model/locale";
import { isEmpty } from "lodash";
import createHttpError from "http-errors";


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
                console.error(err)
            }
            throw createHttpError(400, 'CEP inválido')
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

    createEmail({ email, id }: ICreateUserDTO): void {

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