import { Sport } from "./sports.model";

export class User {
    public name: string;
    public email?: string;
    public phone?: number;
    public gender: string;
    public sports: Sport[];

    constructor(name: string, email: string, phone: number, gender: string, sports: Sport[]) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.sports = sports;
    }
}