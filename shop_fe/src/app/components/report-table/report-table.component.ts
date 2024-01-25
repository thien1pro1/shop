import { Component } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ReportSalaryUser } from '../../shared/models/reportSalary.model';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.css',
})
export class ReportTableComponent {
  startMonth: number = 1; // Đặt giá trị thích hợp
  endMonth: number = 3; // Đặt giá trị thích hợp
  users$: Observable<ReportSalaryUser[]>;
  year?: string;
  inputValues: { [userId: number]: number[] } = {};

  totalSalariesByMonth: { [key: string]: number } = {};
  users?: ReportSalaryUser[]; // Thêm dòng này

  constructor(private store: Store<{ users: User[] }>) {
    this.users$ = this.store.select('users') as Observable<ReportSalaryUser[]>;
    this.users$.subscribe((users) => {
      this.users = users;
    });
  }
  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.year = currentYear.toString();
    this.users$.subscribe((users) => {
      users.forEach((user) => {
        this.inputValues[user.id] = new Array(this.getMonthRange().length).fill(
          0
        );
      });
    });
  }

  // Code TypeScript
  getSalaryKey(month: number): string {
    return `salary${month}`;
  }

  getMonthRange(): number[] {
    return Array.from(
      { length: this.endMonth - this.startMonth + 1 },
      (_, index) => index + this.startMonth
    );
  }

  calculateTotalSalaryByMonth(month: number): number {
    let total = 0; // Khởi tạo tổng lương

    // Lặp qua mỗi user trong inputValues
    Object.values(this.inputValues).forEach((userInputValues) => {
      // Lấy giá trị lương của user cho tháng cụ thể và cộng vào tổng lương
      total += userInputValues[month - 1] || 0; // Sử dụng month - 1 vì index của mảng bắt đầu từ 0
    });
    console.log(total);
    return total; // Trả về tổng lương tính được
  }
  updateTotalSalary(userId: number, month: number) {
    // Cập nhật giá trị tổng lương của tháng được chọn
    this.totalSalariesByMonth[month.toString()] =
      this.calculateTotalSalaryByMonth(month);
  }
}
