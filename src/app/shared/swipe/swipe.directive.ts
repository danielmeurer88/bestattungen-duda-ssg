import { Directive, ElementRef, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilGestureService, UtilTouchGestureObject } from './gesture.service';


@Directive({
  selector: '[swipeLeft],[swipeRight],[swipeUp],[swipeDown]',
  standalone: true
})
export class UtilSwipeDirective implements OnInit, OnDestroy {

  private readonly utilGestureService = inject(UtilGestureService);
  private readonly elementRef = inject(ElementRef);

  private subscription!: Subscription;

  @Output()
  readonly swipeLeft = new EventEmitter<UtilTouchGestureObject>();

  @Output()
  readonly swipeRight = new EventEmitter<UtilTouchGestureObject>();

  @Output()
  readonly swipeUp = new EventEmitter<UtilTouchGestureObject>();

  @Output()
  readonly swipeDown = new EventEmitter<UtilTouchGestureObject>();


  ngOnInit(): void {
    const host = this.elementRef.nativeElement as HTMLElement;

    this.subscription = this.utilGestureService.getGesturesFrom(host).subscribe(obj => {
      if (obj.gesture === 'swipeLeft') {
        this.swipeLeft.emit(obj);
      }

      if (obj.gesture === 'swipeRight') {
        this.swipeRight.emit(obj);
      }

      if (obj.gesture === 'swipeDown') {
        this.swipeDown.emit(obj);
      }

      if (obj.gesture === 'swipeUp') {
        this.swipeUp.emit(obj);
      }
    });

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
