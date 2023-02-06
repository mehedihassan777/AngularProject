import { Sport } from './sports.model';

export interface User {
  id?: number;
  name: string;
  email?: string;
  phone?: number;
  gender: string;
  sports: Sport[];
}
