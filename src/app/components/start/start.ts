import { Component } from '@angular/core';
import { LogoSvg } from '../../shared/logo-svg/logo-svg';
import { SvgIcon } from "../../shared/svg-icon/svg-icon";
import { Carousel } from '../../shared/carousel/carousel';
import { UtilTooltipModule } from '../../shared/util-tooltip/util-tooltip.module';

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

}
