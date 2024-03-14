import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-debugger',
  standalone: true,
  imports: [RouterLink, MatSidenavModule, MatButtonModule],
  templateUrl: './debugger.component.html',
  styleUrl: './debugger.component.scss',
})
export class DebuggerComponent {
  showFiller = false;
}
