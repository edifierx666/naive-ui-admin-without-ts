import { componentMap } from '@/components/Table/src/componentMap';
import { h } from 'vue';
import { NPopover } from 'naive-ui';
export const CellComponent = ({ component = 'NInput', rule = true, ruleMessage, popoverVisible }, { attrs }) => {
    const Comp = componentMap.get(component);
    const DefaultComp = h(Comp, attrs);
    if (!rule) {
        return DefaultComp;
    }
    return h(NPopover, { 'display-directive': 'show', show: !!popoverVisible, manual: 'manual' }, {
        trigger: () => DefaultComp,
        default: () => h('span', {
            style: {
                color: 'red',
                width: '90px',
                display: 'inline-block',
            },
        }, {
            default: () => ruleMessage,
        }),
    });
};
