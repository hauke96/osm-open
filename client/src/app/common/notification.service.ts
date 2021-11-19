import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private errorMessages: Array<string>;

  constructor() {
    this.errorMessages = [];
  }

  public hasError(): boolean {
    return this.errorMessages.length !== 0;
  }

  // Returns the oldest message
  public getError(): string | undefined {
    return this.errorMessages[0];
  }

  // Drops/removes the oldest error reported by "getError()"
  public dropError(): void {
    this.errorMessages.shift();
  }

  public addError(message: string): void {
    this.errorMessages.push(message);
  }
}
