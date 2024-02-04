import { NInput, NSelect, NCheckbox, NInputNumber, NSwitch, NDatePicker, NTimePicker, } from 'naive-ui';
export var EventEnum;
(function (EventEnum) {
    EventEnum["NInput"] = "on-input";
    EventEnum["NInputNumber"] = "on-input";
    EventEnum["NSelect"] = "on-update:value";
    EventEnum["NSwitch"] = "on-update:value";
    EventEnum["NCheckbox"] = "on-update:value";
    EventEnum["NDatePicker"] = "on-update:value";
    EventEnum["NTimePicker"] = "on-update:value";
})(EventEnum || (EventEnum = {}));
const componentMap = new Map();
componentMap.set('NInput', NInput);
componentMap.set('NInputNumber', NInputNumber);
componentMap.set('NSelect', NSelect);
componentMap.set('NSwitch', NSwitch);
componentMap.set('NCheckbox', NCheckbox);
componentMap.set('NDatePicker', NDatePicker);
componentMap.set('NTimePicker', NTimePicker);
export function add(compName, component) {
    componentMap.set(compName, component);
}
export function del(compName) {
    componentMap.delete(compName);
}
export { componentMap };
