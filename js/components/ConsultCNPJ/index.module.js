import { fetchCNPJ, displayData, showLoader, hideLoader, showMessage } from '../ShowResult/index.module.js';
import { formatCNPJ } from '../Replacers/index.module.js';

function unformatCNPJ(cnpj) {
  return cnpj.replace(/[^\d]+/g, '');
}

// Consulta de CNPJ
export function setupConsultaCNPJ() {
  const cnpjInput = document.getElementById('cnpj-input');
  const submitButton = document.getElementById('submit');

  // Inicialmente escondendo o botão de submit
  submitButton.style.display = 'none';

  // Adiciona formatação enquanto o usuário digita
  cnpjInput.addEventListener('input', function() {
    this.value = formatCNPJ(this.value);
  });

  document.getElementById('consultar-btn').addEventListener('click', function() {
    let cnpj = cnpjInput.value;
    
    // Remover formatação para consulta
    const cleanCNPJ = unformatCNPJ(cnpj);

    if (!isValidCNPJ(cleanCNPJ)) {
      showMessage('CNPJ inválido. Por favor, digite um CNPJ válido no formato: 12.345.678/0001-00.', 'danger');
      return;
    }

    showLoader();

    fetchCNPJ(cleanCNPJ)
      .then(data => {
        displayData(data);
        submitButton.style.display = 'block';
      })
      .catch(error => {
        showMessage(error.message, 'danger');
        submitButton.style.display = 'none';
      })
      .finally(() => {
        hideLoader();
      });
  });
}

function isValidCNPJ(cnpj) {
  const cnpjPattern = /^\d{14}$/;
  return cnpjPattern.test(cnpj);
}
