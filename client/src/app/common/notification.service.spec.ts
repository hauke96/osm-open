import { NotificationService } from './notification.service';

describe(NotificationService.name, () => {
  let service: NotificationService;

  beforeEach(() => {
    service = new NotificationService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not have errors after init', () => {
    expect(service.getError()).toBeUndefined();
    expect(service.hasError()).toBe(false);
  });

  describe('with added errors', () => {
    let errorString1: string;
    let errorString2: string;

    beforeEach(() => {
      errorString1 = 'foo';
      errorString2 = 'bar';

      service.addError(errorString1);
      service.addError(errorString2);
    });

    it('should get oldest error', () => {
      expect(service.getError()).toEqual(errorString1);
      // Ask a second time to make sure nothing was dropped
      expect(service.getError()).toEqual(errorString1);
    });

    it('should have error', () => {
      expect(service.hasError()).toBe(true);
    });

    describe('with dropped error', () => {
      beforeEach(() => {
        service.dropError();
      });

      it('should still have error', () => {
        expect(service.hasError()).toBe(true);
      });

      it('should return second error', () => {
        expect(service.getError()).toEqual(errorString2);
      });

      describe('with another dropped error', () => {
        beforeEach(() => {
          service.dropError();
        });

        it('should NOT have errors anymore', () => {
          expect(service.hasError()).toBe(false);
        });

        it('should NOT return error', () => {
          expect(service.getError()).toBeUndefined();
        });
      });
    });
  });
});
