import { Component, inject } from '@angular/core';
import { LogoSvg } from '../../shared/logo-svg/logo-svg';
import { SvgIcon } from "../../shared/svg-icon/svg-icon";
import { Carousel } from '../../shared/carousel/carousel';
import { UtilTooltipModule } from '../../shared/util-tooltip/util-tooltip.module';
import { PageService } from '../../shared/page-service';

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

  constructor() {
    this.pageService.name$.next('Startseite');
  }

}
