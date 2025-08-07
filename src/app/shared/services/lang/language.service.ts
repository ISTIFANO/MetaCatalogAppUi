// import { Injectable } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LanguageService {

//   private supportedLanguages = [
//     { code: 'en', name: 'English'},
//     { code: 'fr', name: 'Français'},  
//     { code: 'ar', name: 'Arabe'}
//   ];
//   private rtlLanguages = ['ar', 'he', 'fa', 'ur'];

//   // Add a BehaviorSubject to track current language
//   private currentLanguageSubject = new BehaviorSubject<string>('en');
//   public currentLanguage$ = this.currentLanguageSubject.asObservable();

//   constructor(private translate: TranslateService) {
//     console.log('LanguageService initialized');
//     this.initializeLanguage();
//   }

//   private initializeLanguage() {
//     // Set supported languages
//     this.translate.addLangs(['en', 'fr', 'ar']);
//     console.log('Supported languages added:', ['en', 'fr', 'ar']);
    
//     // Set default language
//     this.translate.setDefaultLang('en');
//     console.log('Default language set to: en');
    
//     // Get saved language or use browser language
//     const savedLang = localStorage.getItem('selectedLanguage');
//     const browserLang = this.translate.getBrowserLang();
//     console.log('Saved language:', savedLang);
//     console.log('Browser language:', browserLang);
    
//     const supportedLangCodes = this.supportedLanguages.map(lang => lang.code);
    
//     let languageToUse = 'en';
    
//     if (savedLang && supportedLangCodes.includes(savedLang)) {
//       languageToUse = savedLang;
//     } else if (browserLang && supportedLangCodes.includes(browserLang)) {
//       languageToUse = browserLang;
//     }
    
//     console.log('Language to use:', languageToUse);
    
//     this.translate.use(languageToUse).subscribe({
//       next: (translations) => {
//         console.log('Translations loaded successfully for:', languageToUse);
//         this.currentLanguageSubject.next(languageToUse);
//       },
//       error: (error) => {
//         console.error('Error loading translations:', error);
//         this.translate.use('en').subscribe(() => {
//           this.currentLanguageSubject.next('en');
//         });
//       }
//     });

//     setTimeout(() => {
//       const testTranslation = this.translate.instant('header.title');
//       console.log('Test translation for header.title:', testTranslation);
      
//       if (testTranslation === 'header.title') {
//         console.warn('Translation not found - check if translation files are loaded properly');
//       }
//     }, 1000);
//   }

//   getSupportedLanguages() {
//     return this.supportedLanguages;
//   }

//   getCurrentLanguage(): string {
//     return this.translate.currentLang || 'en';
//   }

//   getCurrentLanguage$(): Observable<string> {
//     return this.currentLanguage$;
//   }

//   changeLanguage(langCode: string): Promise<any> {
//     return new Promise((resolve, reject) => {
//       if (!langCode) {
//         reject(new Error('Language code is required'));
//         return;
//       }

//       const supportedLangCodes = this.supportedLanguages.map(lang => lang.code);
//       if (!supportedLangCodes.includes(langCode)) {
//         reject(new Error(`Language ${langCode} is not supported`));
//         return;
//       }

//       this.translate.use(langCode).subscribe({
//       next: (translations) => {
//           console.log('Language changed successfully to:', langCode);
//           localStorage.setItem('selectedLanguage', langCode);
//           this.currentLanguageSubject.next(langCode);

//           this.updateDirection(langCode);

//           resolve(translations);
//         },
//         error: (error) => {
//           console.error('Error changing language:', error);
//           reject(error);
//         }
//       });
//     });
//   }

//   private updateDirection(langCode: string) {
//     const isRtl = this.rtlLanguages.includes(langCode);
//     document.documentElement.lang = langCode;
//     document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

//     // Optional body class
//     if (isRtl) {
//       document.body.classList.add('rtl');
//     } else {
//       document.body.classList.remove('rtl');
//     }
//   }

//   getLanguageName(langCode: string): string {
//     const lang = this.supportedLanguages.find(l => l.code === langCode);
//     return lang ? lang.name : langCode;
//   }

//   // Helper method to get translation with fallback
//   getTranslation(key: string, fallback?: string): string {
//     const translation = this.translate.instant(key);
//     return translation !== key ? translation : (fallback || key);
//   }
// }