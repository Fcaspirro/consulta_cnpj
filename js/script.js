import { setupConsultaCNPJ } from './components/ConsultCNPJ/index.module.js';
import { setupFormHandler } from './components/ButtonSubmit/index.module.js';

document.addEventListener("DOMContentLoaded", function() {
  setupConsultaCNPJ();
  setupFormHandler();
});