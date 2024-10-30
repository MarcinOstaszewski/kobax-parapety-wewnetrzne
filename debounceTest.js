const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  }
}

function savingForm() {
  console.log('saving form');
}

const debounced = debounce(() => savingForm(), 400);

