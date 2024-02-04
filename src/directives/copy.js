const copy = {
    mounted(el, binding) {
        el.copyData = binding.value;
        el.addEventListener('click', handleClick);
    },
    updated(el, binding) {
        el.copyData = binding.value;
    },
    beforeUnmount(el) {
        el.removeEventListener('click', el.__handleClick__);
    },
};
function handleClick() {
    const input = document.createElement('input');
    input.value = this.copyData.toLocaleString();
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
    console.log('复制成功', this.copyData);
}
export default copy;
