import { User } from './user.model';

export interface ReportSalaryUser extends User {
  year?: number;
  monthlySalaries?: { [key: string]: number };
}
export interface ReportSalary {
  userDetail: ReportSalaryUser[];
}
