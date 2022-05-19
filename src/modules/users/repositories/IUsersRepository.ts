
import { Email } from "../model/email";
import { Locale } from "../model/locale";
import { Produto } from "../model/produto";
import { Sms } from "../model/sms";
import { User } from "../model/user";

interface ICreateUserDTO {
    id: string;
    name: string;
    sms: Sms;
    locale: Locale;
    produto: Produto;
    email: Email;

}

interface ICreateSmsDTO {
    id?: string;
    code: string;
    status: string;
    verified: boolean;
    number: string;
}

interface ICreateLocaleDTO {
    cep: string;
    address: string;
    neighborhood: string;
    city: string;
    state: string;
}

interface ICreateEmailDTO {
    code: string;
    verified: boolean;
    value: string;
}

interface ICreateProdutolDTO {
    name: string;
    quantidade: number;
}


interface IUsersRepository {
    findByName(name: string): User;
    findByData(data, id): User;
    list(): User[];
    createName({ name }): User;
    createSms({ number, id  }): void;
    createSmsMessage({ code, id }): void;
    createLocale({ cep, id }): void;
    createProduto({ name, quantidade, id }): void;
    createEmail({ value, id }): void;
    createEmailCode({ code, id }): void;
    createSenha({ senha, id }): void;

}

export { IUsersRepository, ICreateUserDTO, ICreateSmsDTO, ICreateLocaleDTO,  ICreateEmailDTO, ICreateProdutolDTO };