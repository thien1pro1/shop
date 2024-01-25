import { Component } from '@angular/core';
interface Employee {
  id: number;
  name: string;
  position: string;
}
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent {
  employees: Employee[] = [
    { id: 1, name: 'John Doe', position: 'Developer' },
    { id: 2, name: 'Jane Doe', position: 'Designer' },
    // ...
  ];

  onEditComplete(employee: Employee) {
    console.log('Chỉnh sửa hoàn tất cho nhân viên:', employee);
  }
}
