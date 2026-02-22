import { Component, inject, OnInit } from '@angular/core';
import { LogoSvg } from '../../shared/logo-svg/logo-svg';
import { SvgIcon } from "../../shared/svg-icon/svg-icon";
import { Carousel } from '../../shared/carousel/carousel';

@Component({
  selector: 'app-start',
  imports: [
    LogoSvg,
    SvgIcon,
    Carousel
],
  templateUrl: './start.html',
  styleUrl: './start.scss',
})
export class Start {

}
