import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-carousel',
  imports: [
    CommonModule
  ],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel implements AfterViewInit, OnDestroy {

  private elementRef = inject(ElementRef);

  /**
   * manualScrolling not yet implemented - work with IntersectionObserver to update index
   * (manualScrolling = javascriptless / html scrolling like using scroll wheel or the scroll bar)
   */
  protected manualScrolling = false;

  @Input() images: Array<{
    src: string;
    alt?: string;
  }> = [];

  index$ = new BehaviorSubject<number>(0);

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

  prevSlide() {
    this.jumpTo(this.index$.value - 1);
  }

  nextSlide() {
    this.jumpTo(this.index$.value + 1);
  }

  jumpTo(num: number) {
    num = this.updateCurrentIndex(num);
    const slideEl = this.getSlideElement(num);
    slideEl.focus({});
  }

  private updateCurrentIndex(wantedIndex: number = 0): number {

    const maxi = this.images.length - 1;

    if (wantedIndex > maxi) {
      wantedIndex = 0;
    }

    if (wantedIndex < 0) {
      wantedIndex = maxi;
    }

    this.index$.next(wantedIndex);
    return wantedIndex;

  }

  private getSlideElement(i: number) {
    return this.getAllSlides()[i];
  }

  private getAllSlides() {
    return Array.from((this.elementRef.nativeElement as HTMLElement).querySelectorAll('.carousel-slides .carousel-slide')) as HTMLElement[];
  }

  private getCarouselSlideElement() {
    return (this.elementRef.nativeElement as HTMLElement).querySelector('.carousel-slides') as HTMLElement;
  }

}
