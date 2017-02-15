import { OpaqueToken } from '@angular/core';

import { EN_LANG_CODE, EN_TRANSLATE } from './lang-en';
import { NL_LANG_CODE, NL_TRANSLATE } from './lang-nl';

export const TRANSLATIONS = new OpaqueToken('translations');

var enLang = EN_LANG_CODE;
var nlLang = NL_LANG_CODE;
var enTranslate = EN_TRANSLATE;
var nlTranslate = NL_TRANSLATE;

export const languages = [EN_LANG_CODE, NL_LANG_CODE];

export const default_language = NL_LANG_CODE;

export function TRANSLATION_PROVIDERS() {
    const dictionary = {
        [enLang]: enTranslate,
        [nlLang]: nlTranslate
    };

    return dictionary;

    // return  {
    //         provide: TRANSLATIONS, useValue: dictionary
    //     };
}