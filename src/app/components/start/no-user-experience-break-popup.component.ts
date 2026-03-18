import { Component } from '@angular/core';
import { UtilDefaultTooltipComponent, UtilTooltipData } from '../../shared/util-tooltip/util-default-tooltip.component';
import { SvgIcon } from '../../shared/svg-icon/svg-icon';
import { BehaviorSubject } from 'rxjs';
import { UtilTooltipModule } from '../../shared/util-tooltip/util-tooltip.module';

export type NoUserExperienceBreakPopupData = {
  context: string;
  copyText: string;
  href: string;
  extern?: boolean;
};


@Component({
  selector: 'app-no-user-experience-break-popup',
  imports: [
    SvgIcon,
    UtilTooltipModule
  ],
  template: `
    <div class="popup-box">
      <div class="popup-line">
        <button utilTooltip="x" [utilTooltipData]="copiedData" (click)="copyText($event)">
          <app-svg-icon type="copy"></app-svg-icon>
          <span>{{ data?.context }} kopieren</span>
        </button>
      </div>
      <div class="popup-line">
        <a [href]="data?.href" [target]="data?.extern ? '_blank' : '_self'">
          <app-svg-icon type="external"></app-svg-icon>
          <span>Extern ausführen</span>
        </a>
      </div>
    </div>
  `,
  styles: `
    :host {

      display: block;
      padding: 1ch;
      background-color: black;
      color: white;
      border: 1px solid white;
      border-radius: .33rem;

      .popup-box {
        font-size: calc(0.25 * var(--logo-height));
        display: flex;
        flex-direction: column;
        gap: 1ch;

        .popup-line {

          a, button {
            display: flex;
            gap: 1ch;
            align-items: center;
          }

          button {
            cursor: pointer;
            border: 1px solid transparent;
            background-color: transparent;
            color: white;
            transition: background-color 200ms ease-in-out;
            &:hover, &:focus-visible {
              color: oklch(from currentColor calc(l - 0.25) c h)
            }
          }
        }
      }
    }
  `
})
export class NoUserExperienceBreakPopupComponent extends UtilDefaultTooltipComponent<NoUserExperienceBreakPopupData> {

  trigger$ = new BehaviorSubject<boolean>(false);

  protected copiedData: UtilTooltipData = {
    text: 'Kopiert',
    showAndHideTrigger$: this.trigger$.pipe(),
    triggerCauses: ['trigger'],
  };

  copyText(event: UIEvent) {
    navigator.clipboard.writeText(this.data!.copyText).then(() => {
      this.trigger$.next(true);
      setTimeout(() => {
        this.trigger$.next(false);
      }, 3000);
    });
  }

}
