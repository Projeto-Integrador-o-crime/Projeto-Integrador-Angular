import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-update-product',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './dialog-update-product.component.html',
  styleUrl: './dialog-update-product.component.scss'
})
export class DialogUpdateProductComponent implements OnInit {
  // Variáveis.
  public apiKey: string = 'e8fd7ca6417479482154b280ab46d204';
  public idProduct: string | null = null;
  public selectedImage: string | ArrayBuffer | null = null;
  public selectedFile: File | null = null;

  public isRegistered: boolean = false;
  public isFileNull: any;

  public errorName: string = '';
  public errorPrice: string = '';
  public erroDescription: string = '';
  public erroImage: string = '';

  public fileInput: any;

  public getCadastroProductError = this.apiService.getCadastroProductError;

  // API
  constructor(private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: { id: string }) {
    this.secordProductForm = this.#fb.group({
      productPicture: ['']
    });
  }

  ngOnInit(): void {
    this.idProduct = this.data.id;

    this.fillsFields();
  }

  #fb = inject(FormBuilder);

  // forumulario
  public firstProductForm = this.#fb.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  public secordProductForm = this.#fb.group({
    productPicture: ['', [Validators.required]]
  })

  public validateForm() {
    return this.firstProductForm.valid && this.fileInput ? false : true
  }

  // Pega Dados Para Preenchiemnto Automatico dos Campos.
  public fillsFields() {
    this.apiService.httpListProductByidUser$(this.idProduct).subscribe((res) => {
      this.firstProductForm.patchValue({
        name: res.name,
        price: res.price,
        description: res.description,
      });
      this.secordProductForm.patchValue({
        productPicture: res.productPicture
      })
    });
  }

  // Tratamento de erro Front
  public validateData(event: any, name: string) {
    if (!event.target.value) {
      switch (name) {
        case 'nome':
          this.errorName = 'Preencher o campo ' + name;
          break;

        case 'preço':
          this.errorPrice = 'Preencher o campo ' + name;
          break;

        case 'descrição':
          this.erroDescription = 'Preencher o campo ' + name;
          break;

        case 'image':
          this.erroImage = 'Preencher o campo ' + name;
          break;

        default:
          break;
      }
    } else {
      switch (name) {
        case 'nome':
          this.errorName = '';
          break;

        case 'preço':
          this.errorPrice = '';
          break;

        case 'descrição':
          this.erroDescription = '';
          break;

        case 'image':
          this.erroImage = '';
          break;

        default:
          break;
      }
    }
  }

  // Função para receber e visualizar o arquivo do usuário
  public getFile(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;
      const reader = new FileReader();

      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }

    this.fileInput = event.target.files[0];
    this.secordProductForm.patchValue({
      productPicture: this.fileInput
    });

  }

  // Limpar o arquivo selecionado e resetar o controle productPicture
  public cleanFile() {
    this.fileInput = undefined;
    this.secordProductForm.patchValue({
      productPicture: ''
    });
  }

  // Valida e Altera campo nome do Arquivo
  public validateNameFile() {
    const maxLength = 20;

    const fileName = this.fileInput.name;
    const fileExtension = fileName.split('.').pop();
    const fileNameWithoutExtension = fileName.substring(0, fileName.length - fileExtension.length - 1);

    if (fileNameWithoutExtension.length > maxLength) {
      return fileNameWithoutExtension.substring(0, maxLength) + '...' + fileExtension;
    } else {
      return fileName;
    }
  }

  // função para enviar dados
  public submit() {
    this.isRegistered = false;

    if (this.firstProductForm.valid && this.secordProductForm.valid) {
      const body = {
        id: this.idProduct,
        name: this.firstProductForm.get('name')?.value,
        price: this.firstProductForm.get('price')?.value,
        description: this.firstProductForm.get('description')?.value,
        productPicture: this.selectedImage,
      };

      this.apiService.httpUpdateProducts$(body).subscribe((res) => {
        this.isRegistered = true;
      });
    }
  }
}
