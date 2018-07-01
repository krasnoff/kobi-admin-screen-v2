import { Component, AfterViewChecked } from '@angular/core';
import {AppService} from './app.service';

import {TranslateService} from '@ngx-translate/core';
import { GlobalDataService } from './global-data.service';

import { LanguagesAware } from './languages-aware.decorator';
import { Languages } from './languages.enum';

//declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
@LanguagesAware
export class AppComponent {
  title = 'app';
  public codes: Array<any> = [];
  public numOfMails: number = 3;

  constructor(private _httpService:AppService, private translate: TranslateService, public gd: GlobalDataService) {
    if (this.translate.currentLang == undefined)
      this.translate.currentLang = Languages.English;
    translate.setDefaultLang(this.translate.currentLang);

    /*router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if (event.url.indexOf("/login") > -1) {
          document.getElementById("topNav").style.display = "none";
          document.getElementById("sidebar").style.display = "none";
          
        }
        else {
          document.getElementById("topNav").style.display = "flex";
          document.getElementById("sidebar").style.display = "block";
        }
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });*/
  }

  useLanguage(language: string) {
    this.translate.use(language); 
    this.gd.changeLanguage(language);  
  }

  ngOnInit() {
    this._httpService.getMethod('/json/mailList.json')
    .subscribe (
      data => {
        data.forEach(element => {
          this.codes.push(element);
        });
      }
    );
  }

  ngAfterViewChecked() {
    // here we call jquery functions
    /*$('#exampleModal').on('hidden.bs.modal', function (e) {
      debugger;
    })*/
  }

  private truncate(str: string, numofChars: number) {
    if (str.length > numofChars)
      return str.substring(0,numofChars)+'...';
    else
      return str;
  }
}
