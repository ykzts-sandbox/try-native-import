export function $(selector, context = document) {
  return [...context.querySelectorAll(selector)];
}

export function log(...args) {
  console.log(...args);
}
