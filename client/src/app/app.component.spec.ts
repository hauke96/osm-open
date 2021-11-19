import { AppComponent } from './app.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from './app.module';
import { TranslateService } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';

['en', 'de'].forEach((language: string) => {
  describe(AppComponent.name + ' for language=' + language, () => {
    let component: AppComponent;
    let fixture: MockedComponentFixture<AppComponent>;
    let translateService: TranslateService;
    let title: Title;
    let langChangedSubject: Subject<string>;

    beforeEach(() => {
      langChangedSubject = new Subject<string>();

      translateService = {
        onLangChange: langChangedSubject.asObservable(),
      } as unknown as TranslateService;
      translateService.addLangs = jest.fn();
      translateService.setDefaultLang = jest.fn();
      translateService.getBrowserLang = jest.fn().mockReturnValue(language);
      translateService.use = jest.fn();

      title = {} as Title;

      return MockBuilder(AppComponent, AppModule)
        .provide({ provide: TranslateService, useFactory: () => translateService })
        .provide({ provide: Title, useFactory: () => title });
    });

    beforeEach(() => {
      fixture = MockRender(AppComponent);
      component = fixture.point.componentInstance;
      fixture.detectChanges();
    });

    it('should create the app', () => {
      expect(component).toBeTruthy();
    });

    it('should add languages', () => {
      expect(translateService.addLangs).toHaveBeenCalledWith(['en']);
    });

    it('should set default language', () => {
      expect(translateService.setDefaultLang).toHaveBeenCalledWith('en');
    });

    it('should set used language', () => {
      expect(translateService.use).toHaveBeenCalledWith('en');
    });

    describe('on changed language', () => {
      let expedtedTitle: string;

      beforeEach(() => {
        expedtedTitle = 'my expected title';

        translateService.get = jest.fn().mockReturnValue(of(expedtedTitle));
        title.setTitle = jest.fn();

        langChangedSubject.next('de');
      });

      it('should get translated title', () => {
        expect(translateService.get).toHaveBeenCalledWith('title');
      });

      it('should set new title', () => {
        expect(title.setTitle).toHaveBeenCalledWith(expedtedTitle);
      });
    });
  });
});
