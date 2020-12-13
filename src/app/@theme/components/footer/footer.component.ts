import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
    ©2020. Open ICU Labs. All Rights Reserved.
    </span>
  `,
})
export class FooterComponent {
}
