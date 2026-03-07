import { InjectionToken, Component, inject, TemplateRef } from '@angular/core';

export type UtilTooltipComponentData = {text: string;};

export const UTIL_TOOLTIP_COMPONENT_DATA_INJECTION_TOKEN = new InjectionToken<UtilTooltipComponentData>('UTIL_TOOLTIP_COMPONENT_DATA_INJECTION_TOKEN');

@Component({
  selector: 'util-default-tooltip-component',
  template: '<div>{{ text }}</div>',
  styles: [],
  standalone: false
})
export class UtilDefaultTooltipComponent<T extends UtilTooltipComponentData = UtilTooltipComponentData> {
  data = inject(UTIL_TOOLTIP_COMPONENT_DATA_INJECTION_TOKEN);
  text = this.data?.text || '';
}

export type UtilTooltipComponentType<T extends UtilTooltipComponentData> = new (...args: any[]) => UtilDefaultTooltipComponent<T>;

export type UtilTooltipData<T extends UtilTooltipComponentData = UtilTooltipComponentData> = {
  text: string;
  templateRef?: TemplateRef<any>;
  componentData?: {
    cmp: UtilTooltipComponentType<T>;
    data?: T;
  };
  simulatePopup?: boolean;
};
