export class SignUpInfo {
    email: string;
    username: string;
    password: string;
    role: string[];

    constructor(email: string, username: string, password: string) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = ['user'];
    }
}