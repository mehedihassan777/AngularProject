import { Sport } from './sports.model';

export interface User {
    id?: number;
    fname: string;
    lname: string;
    email?: string;
    phone?: number;
    gender: string;
    sports: Sport[];
}
