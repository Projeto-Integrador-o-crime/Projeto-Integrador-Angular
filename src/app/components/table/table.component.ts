import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../../services/api.service';
import { ITableUsers } from '../../interfaces/ITableUsers';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  displayedColumns: string[] = ['position', 'name', 'email', 'password'];
  dataSource = new MatTableDataSource<ITableUsers>();

  // API injeção
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.httpListUser$().subscribe((res) => {
      this.dataSource.data = res.map((element, index) => ({
        position: index + 1,
        name: element.name,
        email: element.email,
        password: element.password,
      }));
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
