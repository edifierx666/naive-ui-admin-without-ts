import { ref, watch } from 'vue';
import { tryOnUnmounted } from '@vueuse/core';
import { isFunction } from '@/utils/is';

export function useTimeoutFn(handle, wait, native = false) {
  if (!isFunction(handle)) {
    throw new Error('handle is not Function!');
  }
  const { readyRef, stop, start } = useTimeoutRef(wait);
  if (native) {
    handle();
  } else {
    watch(
      readyRef,
      (maturity) => {
        maturity && handle();
      },
      { immediate: false }
    );
  }
  return {
    readyRef,
    stop,
    start,
  };
}

export function useTimeoutRef(wait) {
  const readyRef = ref(false);
  let timer;

  function stop() {
    readyRef.value = false;
    timer && window.clearTimeout(timer);
  }

  function start() {
    stop();
    timer = setTimeout(() => {
      readyRef.value = true;
    }, wait);
  }

  start();
  tryOnUnmounted(stop);
  return {
    readyRef,
    stop,
    start,
  };
}
