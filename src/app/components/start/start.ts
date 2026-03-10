import { Component, inject } from '@angular/core';
import { LogoSvg } from '../../shared/logo-svg/logo-svg';
import { SvgIcon } from "../../shared/svg-icon/svg-icon";
import { Carousel } from '../../shared/carousel/carousel';
import { UtilTooltipModule } from '../../shared/util-tooltip/util-tooltip.module';
import { PageService } from '../../shared/page-service';
import { UtilTooltipData } from '../../shared/util-tooltip/util-default-tooltip.component';
import { NoUserExperienceBreakPopupComponent, NoUserExperienceBreakPopupData } from './no-user-experience-break-popup.component';

@Component({
  selector: 'app-start',
  imports: [
    LogoSvg,
    SvgIcon,
    Carousel,
    UtilTooltipModule
],
  templateUrl: './start.html',
  styleUrl: './start.scss',
})
export class Start {

  pageService = inject(PageService);

  phonePopupData: UtilTooltipData<NoUserExperienceBreakPopupData> = {
    text: 'x',
    simulatePopup: true,
    componentData: {
      cmp: NoUserExperienceBreakPopupComponent,
      data: {
        context: 'Telefonnummer',
        copyText: '06249 - 8450',
        href: 'tel:+4962498450'
      }
    }
  };

  emailPopupData: UtilTooltipData<NoUserExperienceBreakPopupData> = {
    text: 'x',
    simulatePopup: true,
    componentData: {
      cmp: NoUserExperienceBreakPopupComponent,
      data: {
        context: 'E-Mail Adresse',
        copyText: 'bestattungen-duda@online.de',
        href: 'mailto:bestattungen-duda@online.de'
      }
    }
  };

  constructor() {
    this.pageService.name$.next('Startseite');
  }

}
