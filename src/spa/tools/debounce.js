/**
 * Debouncer - with default of 300ms delay if not overwritten
 * @param func - the function to debounce
 * @param delay - optinal, time in ms
 * @returns Function
 */
function debounce(func, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
