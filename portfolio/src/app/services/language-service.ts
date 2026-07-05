import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { inject } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translocoService = inject(TranslocoService);

  setLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }
}
