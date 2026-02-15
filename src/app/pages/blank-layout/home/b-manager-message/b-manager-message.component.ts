import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChairMessage } from '../../../../core/interfaces/IHomeData';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-b-manager-message',
  standalone: true,
  imports: [TranslateModule,SafeHtmlPipe],
  templateUrl: './b-manager-message.component.html',
  styleUrl: './b-manager-message.component.css',
})
export class BManagerMessageComponent {
  isRTL = input(false);
  ChairMessage = input.required<ChairMessage | null>();
}
