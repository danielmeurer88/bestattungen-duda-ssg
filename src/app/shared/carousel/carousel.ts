import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
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
    width?: number;
    height?: number;
    thumbnailSrc?: string;
    thumbnailWidth?: number;
    thumbnailHeight?: number;
  }> = [];

  currentIndex$ = new BehaviorSubject<number>(0);

  private updateCarouselPosition() {

  }

  goToSlide(index: number) {
    this.currentIndex$.next(index);
    this.updateCarouselPosition();
  }

  nextSlide() {
    if (this.currentIndex$.value < this.images.length - 1) {
      this.currentIndex$.next(this.currentIndex$.value + 1);
      this.updateCarouselPosition();
    }
  }

  prevSlide() {
    if (this.currentIndex$.value > 0) {
      this.currentIndex$.next(this.currentIndex$.value - 1);
      this.updateCarouselPosition();
    }
  }

}
