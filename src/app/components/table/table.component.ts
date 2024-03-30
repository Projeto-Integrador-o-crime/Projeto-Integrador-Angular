import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../../services/api.service';
import { ITableUsers } from '../../interfaces/ITableUsers';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  displayedColumns: string[] = [
    'position',
    'id',
    'name',
    'email',
    'password',
    'actions',
  ];
  dataSource = new MatTableDataSource<ITableUsers>();

  // API injeção
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.apiService.httpListUser$().subscribe((res) => {
      this.dataSource.data = res.map((element, index) => ({
        position: index + 1,
        id: element.id,
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

  deleteUser(id: string) {
    Swal.fire({
      title: 'Tem certeza disso?',
      text: "Se um usuário for removido, os registros associados serão permanentemente excluídos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0353a4',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar usuário!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.httpDeleteUser$(id).subscribe((res) => {
          this.loadData();
        });
      }
    });
  }
}
