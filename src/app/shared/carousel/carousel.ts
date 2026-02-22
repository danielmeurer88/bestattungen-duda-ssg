import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-carousel',
  imports: [
    CommonModule
  ],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel {

  @Input() images: Array<{
    src: string;
    alt?: string;
  }> = [];

  currentIndex$ = new BehaviorSubject<number>(0);

  prevSlide(slidesEl: HTMLDivElement) {
    console.log('prevSlide', slidesEl);

    let scrollTarget = slidesEl.scrollWidth;
    const slideLength = slidesEl.clientWidth;

    // is scroll End reached?
    // true if current scroll indicator's position is 0
    const scrollStartReached = slidesEl.scrollLeft - 1 <= 0;

    if (!scrollStartReached) {
      // target
      scrollTarget = slidesEl.scrollLeft - slideLength;
    }

    slidesEl.scrollTo({behavior: 'smooth', left: scrollTarget});
  }

  nextSlide(slidesEl: HTMLDivElement) {
    console.log('nextSlide', slidesEl);

    let scrollTarget = 0;
    const slideLength = slidesEl.clientWidth;

    // is scroll End reached?
    // true if current scroll indicator's position + the length of one slide is equal or taller then the whole scroll width
    const scrollEndReached = Math.ceil(slidesEl.scrollLeft + slideLength + 1) >= Math.ceil(slidesEl.scrollWidth);

    if (!scrollEndReached) {
      // target
      scrollTarget = slidesEl.scrollLeft + slideLength;
    }

    slidesEl.scrollTo({behavior: 'smooth', left: scrollTarget});

  }

}
