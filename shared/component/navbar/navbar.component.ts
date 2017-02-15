import { Component } from '@angular/core';
import { TranslationService } from '../../service/';
import { AuthService } from '../../../service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  lang: string;  
  user: string;
  public isTenant: boolean;
  public get SupportedLanguages(): string[] {return this.translation.SupportedLanguages;}
  public get CurrentLanguage(): string {return this.translation.CurrentLanguage;}

  constructor(private translation: TranslationService,
              private authService: AuthService) {
     this.isTenant = false;
  }

  ngOnInit() {
   this.lang = this.translation.CurrentLanguage;
   if(this.authService.getClaims().address !== null) {
     this.isTenant = true;
   } else {
     this.isTenant = false;
   }
  }

  changeLanguage(newLanguage: string){
    this.translation.use(newLanguage);
  }
  
  toEng() {  
    this.lang = 'en';
    this.translation.use('en');
  }

  toNl() {
    this.lang = 'nl';
    this.translation.use(this.lang);
  }

  public logout(){
    this.authService.logout();
  }

}
