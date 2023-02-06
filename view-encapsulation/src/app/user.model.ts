import { Sport } from './sports.model';

export interface User {
  name: string;
  email?: string;
  phone?: number;
  gender: string;
  sports: Sport[];
}
