import { NotificationService } from './notification.service';

describe(NotificationService.name, () => {
  let service: NotificationService;

  beforeEach(() => {
    service = new NotificationService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
