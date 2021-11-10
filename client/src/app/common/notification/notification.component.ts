import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  constructor(private notificationService: NotificationService) {}

  hasError(): boolean {
    return this.notificationService.hasError();
  }

  onOkButtonClicked(): void {
    this.notificationService.dropError();
  }

  errorText(): string | undefined {
    return this.notificationService.getError();
  }
}
