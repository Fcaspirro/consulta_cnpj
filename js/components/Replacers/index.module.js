// Função para formatar o CNPJ
export function formatCNPJ(cnpj) {
  // Remove qualquer caractere não numérico
  cnpj = cnpj.replace(/[^\d]+/g, '');

  // Limita o CNPJ a 14 caracteres
  if (cnpj.length > 14) {
    cnpj = cnpj.substring(0, 14);
  }

  // Formata o CNPJ conforme o comprimento
  if (cnpj.length <= 2) {
    return cnpj;
  } else if (cnpj.length <= 5) {
    return cnpj.replace(/(\d{2})(\d{0,3})/, '$1.$2');
  } else if (cnpj.length <= 8) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
  } else if (cnpj.length <= 12) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
  } else {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
  }
}


// Função para formatar o CEP
export function formatCEP(cep) {
  return cep ? cep.replace(/(\d{5})(\d{3})/, '$1-$2') : 'N/A';
}

// Função para formatar números de telefone
export function formatPhoneNumber(phoneNumber) {
  if (phoneNumber.length <= 2) {
    return phoneNumber;
  } else if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
  } else if (phoneNumber.length <= 10) {
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
  } else {
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
  }
}