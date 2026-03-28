import { inject, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, skip, Observable, filter, finalize } from 'rxjs';

interface UtilFinger {
  identfier: number;
  startEvent: TouchEvent;
  endEvent?: TouchEvent;
}

type TapGesture = 'tap' | 'secondaryTap';
type SwipeGesture = 'swipeUp' | 'swipeRight' | 'swipeDown' | 'swipeLeft';
type SecondarySwipeGesture = 'swipeUpSecondary' | 'swipeRightSecondary' | 'swipeDownSecondary' | 'swipeLeftSecondary';

export type UtilTouchGesture = 'unknown' | TapGesture | SwipeGesture | SecondarySwipeGesture;

export interface UtilTouchGestureObject {
  element: HTMLElement,
  f1?: UtilFinger;
  f2?: UtilFinger;
  gesture?: UtilTouchGesture;
}

@Injectable({
  providedIn: 'root'
})
export class UtilGestureService {

  private ngZone = inject(NgZone);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers, no-magic-numbers
  deltaTimeMaxLimit = 400;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  deltaDirectionMinLimit = 50;

  elementTouchGestureMap = new WeakMap<HTMLElement, UtilTouchGestureObject>();
  elementHandlerCounterMap = new WeakMap<HTMLElement, number>();

  private gestureBehaviorSubject = new BehaviorSubject<UtilTouchGestureObject>(null!);

  gesture$ = this.gestureBehaviorSubject.asObservable().pipe(skip(1));


  addHandler(element: HTMLElement, where: 'inside' | 'outside' = 'inside') {

    const registerCounter = this.elementHandlerCounterMap.get(element) || 0;

    if (!registerCounter) {
      const fn = () => {
        element!.addEventListener('touchstart', this.touchStartHandler);
        element!.addEventListener('touchmove', this.touchMoveHandler);
        element!.addEventListener('touchend', this.touchEndHandler);
        element!.addEventListener('touchcancel', this.touchCancelHandler);

        this.elementTouchGestureMap.set(element!, {element: element!});

      };

      if (where === 'inside') {
        fn();
      } else {
        this.ngZone.runOutsideAngular(() => { fn(); });
      }
    }

    this.elementHandlerCounterMap.set(element, registerCounter + 1);

  }

  removeHandler(element: HTMLElement, where: 'inside' | 'outside' = 'outside') {

    const registerCounter = this.elementHandlerCounterMap.get(element) as number;

    if (registerCounter === 1) {

      const fn = () => {
        element!.removeEventListener('touchstart', this.touchStartHandler);
        element!.removeEventListener('touchmove', this.touchMoveHandler);
        element!.removeEventListener('touchend', this.touchEndHandler);
        element!.removeEventListener('touchcancel', this.touchCancelHandler);

        this.elementTouchGestureMap.delete(element!);
      };

      if (where === 'inside') {
        fn();
      } else {
        this.ngZone.runOutsideAngular(() => { fn(); });
      }

    }

    this.elementHandlerCounterMap.set(element, registerCounter - 1);

  }

  getGesturesFrom(element: HTMLElement): Observable<UtilTouchGestureObject> {
    this.addHandler(element);
    return this.gesture$.pipe(filter(_ => _?.element === element), finalize(() => (this.removeHandler(element))));
  }

  private touchStartHandler = (e: TouchEvent) => {

    const thisIdentifier = e.changedTouches[0].identifier;
    let obj = this.elementTouchGestureMap.get(e.currentTarget as HTMLElement)!;

    if (thisIdentifier === 0) {
      obj.f1 = {
        identfier: e.touches[0].identifier,
        startEvent: e
      };
    }

    if (thisIdentifier === 1) {
      obj.f2 = {
        identfier: e.touches[1].identifier,
        startEvent: e
      };
    }
  };

  private touchMoveHandler = (e: TouchEvent) => {

    const thisIdentifier = e.changedTouches[0].identifier;

    // prevent touchcancel of first finger because browser wants to scroll
    if (thisIdentifier === 0) {
      // only prevent default if it is cancelable or browser may throw
      // intervantion error
      if (e.cancelable) {
        e.preventDefault();
        e.stopPropagation();
      }
    }

  };

  private touchEndHandler = (e: TouchEvent) => {
    const thisIdentifier = e.changedTouches[0].identifier;
    let obj = this.elementTouchGestureMap.get(e.currentTarget as HTMLElement)!;

    if (thisIdentifier === 0) {
      obj.f1!.endEvent = e;
    }

    if (thisIdentifier === 1) {
      obj.f2!.endEvent = e;
    }

    this.findOutGesture(Object.assign({}, obj), thisIdentifier);

    if (e.touches.length === 0) {
      obj.f1 = null!;
      obj.f2 = null!;
    }

  };

  private touchCancelHandler = (e: TouchEvent) => {
    const thisIdentifier = e.changedTouches[0].identifier;
  };

  private findOutGesture(obj: UtilTouchGestureObject, fingerIndex: number) {

    const finger = fingerIndex === 0 ? obj.f1 : obj.f2;
    const secondaryFingerTouches = (finger?.endEvent?.touches.length || 0) > 0;

    const sx = finger?.startEvent.changedTouches[0].pageX;
    const ex = finger?.endEvent?.changedTouches[0].pageX;

    let deltaX = (typeof sx === 'number' && typeof ex === 'number') ? (ex - sx) : void 0;

    const sy = finger?.startEvent.changedTouches[0].pageY;
    const ey = finger?.endEvent?.changedTouches[0].pageY;

    let deltaY = (typeof sy === 'number' && typeof ey === 'number') ? (ey - sy) : void 0;

    const st = finger?.startEvent.timeStamp;
    const et = finger?.endEvent?.timeStamp;

    let deltaT = (typeof st === 'number' && typeof et === 'number') ? (et - st) : void 0;

    // if the duration is too high -> it was not a gesture
    if (deltaT! <= this.deltaTimeMaxLimit) {

      obj.gesture = 'unknown';

      const xPasses = Math.abs(deltaX || 0) >= this.deltaDirectionMinLimit;
      const yPasses = Math.abs(deltaY || 0) >= this.deltaDirectionMinLimit;

      if (!xPasses && !yPasses) {
        // it is a tap
        obj.gesture = secondaryFingerTouches ? 'secondaryTap' : 'tap';
      }

      // swipe x gesture
      if (Math.abs(deltaX || 0) > Math.abs(deltaY || 0)) {
        // swipe left
        if (deltaX! < 0) {
          obj.gesture = secondaryFingerTouches ? 'swipeLeftSecondary' : 'swipeLeft';
        } else {
          // swipe right
          obj.gesture = secondaryFingerTouches ? 'swipeRightSecondary' : 'swipeRight';
        }
      }

      // swipe y gesture
      if (Math.abs(deltaX || 0) < Math.abs(deltaY || 0)) {
        // swipe up
        if (deltaY! < 0) {
          obj.gesture = secondaryFingerTouches ? 'swipeUpSecondary' : 'swipeUp';
        } else {
          // swipe down
          obj.gesture = secondaryFingerTouches ? 'swipeDownSecondary' : 'swipeDown';
        }
      }

      this.gestureBehaviorSubject.next(obj);

    }

  }
}
