import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { ITableProducts } from '../../interfaces/ITableProducts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-products',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.scss'
})
export class TableProductsComponent {
  displayedColumns: string[] = [
    'position',
    'id',
    'name',
    'description',
    'price',
    'actions'
  ];
  dataSource = new MatTableDataSource<ITableProducts>();

  // API injeção
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.apiService.httpListProducts$().subscribe((res) => {
      this.dataSource.data = res.map((element, index) => ({
        position: index + 1,
        id: element.id,
        name: element.name,
        description: element.description,
        price: element.price,
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
      text: "Se um Pacote for removido, os registros associados serão permanentemente excluídos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0353a4',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar Pacote!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.httpDeleteProduct$(id).subscribe((res) => {
          this.loadData();
        });
      }
    });
  }
}
