import Form from './form.js';
import { $ } from './utils.js';

function main() {
  const forms = $('form[action="./"]').map(form => new Form(form));
}

main();
