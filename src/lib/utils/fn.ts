export function debounce<F extends Function>(
  callback: F,
  wait: number,
  immediate: boolean = false
) {
  let timeout: number = 0;

  return function () {
    const args = arguments as any;
    const callNow = immediate && !timeout;

    const next = () => callback.apply(this, args);

    window.clearTimeout(timeout);
    timeout = window.setTimeout(next, wait);

    if (callNow) next();
  } as F extends (...args: infer A) => infer B ? (...args: A) => B : never;
}
