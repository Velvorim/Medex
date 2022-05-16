
import { Locale } from "./locale";
import { Sms } from "./sms";

class User {
    id?: string;
    name: string;
    sms: Sms;
    locale: Locale;
    produto: string;
    email: string;
}

export { User };