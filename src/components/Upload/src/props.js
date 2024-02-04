import { NUpload } from 'naive-ui';
export const basicProps = {
    ...NUpload.props,
    accept: {
        type: String,
        default: '.jpg,.png,.jpeg,.svg,.gif',
    },
    helpText: {
        type: String,
        default: '',
    },
    maxSize: {
        type: Number,
        default: 2,
    },
    maxNumber: {
        type: Number,
        default: Infinity,
    },
    value: {
        type: Array,
        default: () => [],
    },
    width: {
        type: Number,
        default: 104,
    },
    height: {
        type: Number,
        default: 104, //建议不小于这个尺寸 太小页面可能显示有异常
    },
};
