import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrl: './common.component.scss',
})
export class CommonComponent {
  display: boolean = true;

  setActive(button: string) {
    this.display = (button === 'login');
  }

}


