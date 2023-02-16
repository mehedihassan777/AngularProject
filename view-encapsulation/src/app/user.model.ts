import { Sport } from './sports.model';

export interface User {
    id: number;
    fname: string;
    lname: string;
    email?: string;
    phone?: number;
    password: string;
    gender: string;
    sports: Sport[];
}
