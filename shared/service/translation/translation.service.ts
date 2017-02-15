import { Inject, Injectable, EventEmitter } from '@angular/core';
import { TRANSLATIONS, languages, default_language } from './translation';

@Injectable()
export class TranslationService {

    private currentLanguage: string;

    public get CurrentLanguage(): string { return this.currentLanguage; }
    public get SupportedLanguages(): string[] { return languages; }

    constructor( @Inject(TRANSLATIONS) private _translations: any) {
        this.LanguageChanged = new EventEmitter<string>();
        const storageLang = sessionStorage.getItem('language');
        if (languages.indexOf(storageLang) !== -1) {
            this.currentLanguage = storageLang;
        }
        else {
            this.currentLanguage = 'nl';
        }
        this.LanguageChanged.next(this.currentLanguage);
    }

    public LanguageChanged: EventEmitter<string>;

    public instant(key: string) {
        return this.translate(key);
    }

    public has(key: string): boolean{
        return this._translations[this.CurrentLanguage] && this._translations[this.CurrentLanguage][key];
    }

    public use(lang: string) {
        if (this.SupportedLanguages.indexOf(lang) !== -1) {
            this.currentLanguage = lang;
            sessionStorage.setItem('language', lang);

            this.LanguageChanged.next(this.currentLanguage);
        }
    }

    private translate(key: string): string {
        let translation = key;
        if (this.has(key)) {
            return this._translations[this.CurrentLanguage][key];
        }
        return translation;
    }

}