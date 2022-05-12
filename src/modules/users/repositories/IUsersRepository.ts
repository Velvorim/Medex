
import { Locale } from "../model/locale";
import { Sms } from "../model/sms";
import { User } from "../model/user";

interface ICreateUserDTO {
    id: string;
    name: string;
    sms: Sms;
    locale: Locale;
    produto: string;
    email: string;

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


interface IUsersRepository {
    findByName(name: string): User;
    findByData(data: string): User;
    list(): User[];
    createName({ name }): void;
    createSms({ number, id  }): void;
    createSmsMessage({ code, status, verified, id }): void;
    createLocale({ cep, id }): void;
    createProduto({ produto, id }): void;
    createEmail({ email, id }): void;

}

export { IUsersRepository, ICreateUserDTO, ICreateSmsDTO, ICreateLocaleDTO };