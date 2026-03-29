import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UtilSwipeDirective } from '../swipe/swipe.directive';
import { UtilGestureService } from '../swipe/gesture.service';

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
  private utilGestureService = inject(UtilGestureService);

  /**
   * manualScrolling not yet implemented - work with IntersectionObserver to update index
   * (manualScrolling = javascriptless / html scrolling like using scroll wheel or the scroll bar)
   */
  protected manualScrolling = true;

  /**
   * swipe gestures is only used if manual scrolling is deactivated
   */
  private swipeSubscription: Subscription = null!;

  @Input() images: Array<{
    src: string;
    alt?: string;
  }> = [];

  index$ = new BehaviorSubject<number>(0);

  ngAfterViewInit(): void {

    const carousel = this.getCarouselSlideElement();
    carousel.addEventListener('scroll', this.onScroll, {capture: true});

    if (!this.manualScrolling) {

      const containerEl = (this.elementRef.nativeElement as HTMLElement).querySelector('.carousel-container') as HTMLElement;
      this.swipeSubscription = this.utilGestureService.getGesturesFrom(containerEl).subscribe(gestures => {
        if (gestures.gesture === 'swipeLeft') {
          this.nextSlide();
        }

        if (gestures.gesture === 'swipeRight') {
          this.prevSlide();
        }
      });
    }

  }


  ngOnDestroy(): void {
    this.swipeSubscription?.unsubscribe();
    const carousel = this.getCarouselSlideElement();
    carousel.removeEventListener('scroll', this.onScroll, {capture: true});
  }

  prevSlide() {
    this.jumpTo(this.index$.value - 1);
  }

  nextSlide() {
    this.jumpTo(this.index$.value + 1);
  }

  jumpTo(num: number) {
    num = this.getCurrentIndex(num);
    const slideEl = this.getSlideElement(num);
    slideEl.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
  }

  private getCurrentIndex(wantedIndex: number = 0): number {

    const maxi = this.images.length - 1;

    if (wantedIndex > maxi) {
      wantedIndex = 0;
    }

    if (wantedIndex < 0) {
      wantedIndex = maxi;
    }

    return wantedIndex;

  }

  private onScroll = (e: Event) => {
    const left = (e.target as HTMLElement).scrollLeft;
    const length = (e.target as HTMLElement).getBoundingClientRect().width;

    const index = Math.round(left / length);

    this.index$.next(index);
  }

  private getSlideElement(i: number) {
    const allSlides = Array.from((this.elementRef.nativeElement as HTMLElement).querySelectorAll('.carousel-slides .carousel-slide')) as HTMLElement[];
    return allSlides[i];
  }

  private getCarouselSlideElement() {
    return (this.elementRef.nativeElement as HTMLElement).querySelector('.carousel-slides') as HTMLElement;
  }

}
