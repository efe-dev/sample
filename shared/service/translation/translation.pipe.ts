import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';

@Pipe({
    name: 'translate',
    pure: false
})
export class TranslationPipe implements PipeTransform {
    
    constructor(private translationService: TranslationService) { }

    transform(value: string, args: any[]) {
        if (!value)
                return;
        
        return this.translationService.instant(value);
    }

}