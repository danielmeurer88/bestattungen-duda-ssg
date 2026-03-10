import { InjectionToken, Component, inject, TemplateRef } from '@angular/core';

export type UtilTooltipComponentData = {text: string;};

export const UTIL_TOOLTIP_COMPONENT_DATA_INJECTION_TOKEN = new InjectionToken<UtilTooltipComponentData>('UTIL_TOOLTIP_COMPONENT_DATA_INJECTION_TOKEN');

@Component({
  selector: 'util-default-tooltip-component',
  template: '<div>{{ text }}</div>',
  styles: [],
  standalone: false
})
export class UtilDefaultTooltipComponent<T extends any = any> {
  _ = inject(UTIL_TOOLTIP_COMPONENT_DATA_INJECTION_TOKEN) as UtilTooltipData<T>;
  text = this._?.text || '';
  data = this._.componentData?.data;
}

export type UtilTooltipComponentType<T extends any = any> = new (...args: any[]) => UtilDefaultTooltipComponent<T>;

export type UtilTooltipData<T extends any = any> = {
  text: string;
  templateRef?: TemplateRef<any>;
  componentData?: {
    cmp: UtilTooltipComponentType<T>;
    data?: T;
  };
  simulatePopup?: boolean;
};
