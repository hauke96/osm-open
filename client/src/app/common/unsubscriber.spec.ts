import { Unsubscriber } from './unsubscriber';
import { Subscription } from 'rxjs';

describe(Unsubscriber.name, () => {
  let service: Unsubscriber;

  beforeEach(() => {
    service = new Unsubscriber();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('with subscription', () => {
    let spy: Subscription;

    beforeEach(() => {
      spy = {
        unsubscribe: jest.fn(),
      } as unknown as Subscription;

      service.unsubscribeLater(spy);
    });

    describe('with destroy-call', () => {
      beforeEach(() => {
        service.ngOnDestroy();
        // There should not be another call on a second destroy
        service.ngOnDestroy();
      });

      it('should call unsubscribe on subscriptions', () => {
        expect(spy.unsubscribe).toHaveBeenCalledTimes(1);
      });
    });
  });
});
