export default (fn, delay) => {
  let timer = null;
  return () => {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};
