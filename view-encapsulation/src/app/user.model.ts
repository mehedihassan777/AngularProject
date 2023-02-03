import { Sport } from "./sports.model";

export interface User extends Sport {
    name: string;
    email?: string;
    phone?: number;
    gender: string;
    sports: Sport[];
}