import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactSectionComponent } from '@components/contact-section/contact-section.component';
import { PageHeaderComponent } from '@components/page-header/page-header.component';

@Component({
  imports: [ContactSectionComponent, PageHeaderComponent],
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
})
export class ContactComponent {}
