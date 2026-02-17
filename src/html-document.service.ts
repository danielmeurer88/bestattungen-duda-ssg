import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';


export type DocInfoOptions = {
  lang?: string;
  title?: string;
  description?: string;
  url?: string;
  themeColor?: string;
};


@Injectable({
  providedIn: 'root'
})
export class HtmlDocumentService {

  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  setDocumentInfo(obj: DocInfoOptions) {

    const tags: MetaDefinition[] = [];
    
    if (obj.lang) {
      const html = this.doc.querySelector('html');
      html?.setAttribute('lang', obj.lang);
    }
    
    if (obj.title) {
      this.title.setTitle(obj.title);
      tags.push({ property: 'og:title', content: obj.title });
    }
    
    if (obj.description) {
      tags.push({ name: 'description', content: obj.description });
    }

    if (obj.url) {
      tags.push({ property: 'og:url', content: obj.url });
    }

    if (obj.themeColor) {
      tags.push({ name: 'theme-color', content: obj.themeColor });
    }

    this.meta.addTags(tags);

  }

}
