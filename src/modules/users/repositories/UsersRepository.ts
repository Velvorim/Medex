
import { IUsersRepository } from "./IUsersRepository";
import * as fs from 'fs';
import * as crypto from 'crypto';
import { User } from "../model/user";
import { Sms } from "../model/sms";
import axios from 'axios';
import { Locale } from "../model/locale";
import { isEmpty } from "lodash";
import createHttpError from "http-errors";
import { Email } from "../model/email";
import { v4 as uuidV4 } from "uuid";
import { Produto } from "../model/produto";
import { DateTime } from "luxon";



const banco = __dirname + '/BancoJson.json';

class UsersRepository implements IUsersRepository {

    createName({ name }): User {
        const user = new User();

        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);
        const senha = "";
        Object.assign(user, {
            id: uuidV4(),
            name,
            produto: {},
            sms: {},
            locale: {},
            email: {},
            senha,
            created_at: new Date(),
        });



        userData.push(user);

        fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
            if (err) throw err;
        });

        return user;
    }

    createSms({ number, id }): void {
        const smss = new Sms();

        var i, arr = [];
        for (i = 0; i < 5; i++) {
            arr[i] = Math.floor(Math.random() * 9 + 1);
        }
        const code = arr.join("");

        const verified = false;

        Object.assign(smss, {
            code,
            number,
            status: "Pendente",
            verified,
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

    sendSmsMessage({ code, id }): void {
     

        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        const findUserId = userData.find(user => user.id === id);
       
        if(findUserId.sms.code === code && findUserId.sms.verified === false){

            const verified = true;

            const smss = new Sms();
            Object.assign(smss, {
                code,
                status: "Autorizado",
                verified,
            });

            findUserId.sms.code = smss.code;
            findUserId.sms.status = smss.status;
            findUserId.sms.verified = smss.verified;

            userData.map(function (cell) {
                return findUserId
            });
    
            fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
                if (err) throw err;
            });
        }else{
            throw new Error("Código de sms invalido ou já verificado");
        }
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


    createProduto({ name, quantidade, id }): void {

        const produto = new Produto();

        Object.assign(produto, { 
            name,
            quantidade
        });


        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        const findUserId = userData.find(user => user.id === id);


        findUserId.produto.name = produto.name;
        findUserId.produto.quantidade = produto.quantidade;


        userData.map(function (produto) {
            return findUserId
        });

        fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
            if (err) throw err;
        });

    }

    createEmail({ value, id }): void {
        var i, arr = [];
        for (i = 0; i < 5; i++) {
            arr[i] = Math.floor(Math.random() * 9 + 1);
        }
        const code = arr.join("");
        
        
        const email = new Email();
        Object.assign(email, {
            value,
            code,
            verified: false,
            created_at: new Date(),
            expires_at: DateTime.utc().plus({ minutes: 15 }).toISO()
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

    

    sendEmailCode({ code, id }): void {

        const verifyExpiration = (target, maxMinutesUntilInvalid) => {
            const now = DateTime.utc()
            const max = DateTime.fromISO(target)
            const diff = now.diff(max, [ 'minutes' ])
        
            if (diff.minutes > maxMinutesUntilInvalid)
                throw new Error("Código de verificação expirado")
        }

        const email = new Email();

        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        const findUserId = userData.find(user => user.id === id);
       

        
        if(findUserId.email.code === code && findUserId.email.verified === false){
            
            verifyExpiration(findUserId.email.expires_at, 15);
            Object.assign(email, {
                code,
                verified: true,
            });

    
            findUserId.email.code = email.code;
            findUserId.email.verified = email.verified;
    
            userData.map(function (email) {
                return findUserId
            });
    
            fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
                if (err) throw err;
            });

        }else{
            throw new Error("Código de Email invalido");
        }
    }

    createSenha({senha, id}): void{

        const alg = "aes-256-ctr";
        const key = "12345678958769321457871587458741";
        const iv = "1234567891123456";

        let cipher = crypto.createCipheriv(alg,key,iv);
        let encrypted = cipher.update(senha, "utf-8", "hex");
        encrypted += cipher.final("hex")

        const usersBanco = fs.readFileSync(banco, "utf-8");

        let userData = JSON.parse(usersBanco);

        const findUserId = userData.find(user => user.id === id);
        findUserId.senha = encrypted.toString();

        userData.map(function (cell) {
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
            (user) => user.id === id
        );

        if (userExists.sms.number === data || userExists.email.value === data || userExists.locale.zip_code === data ||
            userExists.produto === data) {
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