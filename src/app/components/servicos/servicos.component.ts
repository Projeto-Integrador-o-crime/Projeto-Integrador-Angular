import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogBuyProductComponent } from '../dialog-buy-product/dialog-buy-product.component';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [MatGridListModule, MatTabsModule, MatDialogModule],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.scss',
})
export class ServicosComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogBuyProductComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
