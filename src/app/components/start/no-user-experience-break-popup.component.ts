import { Component } from '@angular/core';
import { UtilDefaultTooltipComponent } from '../../shared/util-tooltip/util-default-tooltip.component';
import { SvgIcon } from '../../shared/svg-icon/svg-icon';

export type NoUserExperienceBreakPopupData = {
  context: string;
  copyText: string;
  href: string;
  extern?: boolean;
};


@Component({
  selector: 'app-no-user-experience-break-popup',
  imports: [
    SvgIcon
  ],
  template: `
    <div class="popup-box">
      <div class="popup-line">
        <span>{{ data?.context }} kopieren</span>
        <button (click)="copyText()">
          <app-svg-icon type="copy"></app-svg-icon>
        </button>
      </div>
      <div class="popup-line">
        <span>Extern ausführen</span> <a [href]="data?.href" [target]="data?.extern ? '_blank' : '_self'"><app-svg-icon type="external"></app-svg-icon></a>
      </div>
    </div>
  `,
  styles: `
    :host {

      display: block;
      padding: 1ch;
      background-color: black;
      color: white;
      border-radius: .33rem;

      .popup-box {
        font-size: calc(0.25 * var(--logo-height));
        display: flex;
        flex-direction: column;
        .popup-line {
          display: flex;
          gap: 1ch;
          align-items: center;
        }
      }
    }
  `
})
export class NoUserExperienceBreakPopupComponent extends UtilDefaultTooltipComponent<NoUserExperienceBreakPopupData> {

  copyText() {
    navigator.clipboard.writeText(this.data!.copyText);
  }

}
