import { Component, inject, OnInit } from '@angular/core';
import { HtmlDocumentService } from '../html-document.service';
import { Page } from './components/page/page';

@Component({
  selector: 'app-root',
  imports: [
    Page
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  protected htmlDocumentService = inject(HtmlDocumentService);

  constructor() {

    this.htmlDocumentService.setDocumentInfo({
      lang: 'de',
      title: 'Bestattungen Duda',
      description: 'Ihr Bestattungsunternehmen in Guntersblum',
      themeColor: '#790b0b',
      url: 'https://bestattungen-duda.de'
    });

  }


  ngOnInit(): void {

  }

}
