import { formatCEP, formatPhoneNumber } from '../Replacers/index.module.js';

export function fetchCNPJ(cnpj) {
  return fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('CNPJ não encontrado. Verifique se o CNPJ está correto e tente novamente!');
      }
      return response.json();
    }
  );
}

export function displayData(data) {
  let empresaHtml = `
    <div class="wrapperCompany">
      <h2 class="mb-4">Dados da Empresa</h2>
      <div>
          <label for="nomeFantasia" class="form-label">Nome Fantasia:</label>
          <input type="text" id="nomeFantasia" class="form-control" value="${data.nome_fantasia || 'N/A'}">
      </div>
      <div>
          <label for="razaoSocial" class="form-label">Razão Social:</label>
          <input type="text" id="razaoSocial" class="form-control" value="${data.razao_social || 'N/A'}">
      </div>
      <div>
          <label for="dataAbertura" class="form-label">Data de Abertura:</label>
          <input type="text" id="dataAbertura" class="form-control" value="${data.data_inicio_atividade || 'N/A'}">
      </div>
      <div>
          <label for="situacaoCadastral" class="form-label">Situação:</label>
          <input type="text" id="situacaoCadastral" class="form-control" value="${data.descricao_situacao_cadastral || 'N/A'}">
      </div>
      <div>
          <label for="atividadePrincipal" class="form-label">Atividade Principal:</label>
          <input type="text" id="atividadePrincipal" class="form-control" value="${data.cnae_fiscal_descricao || 'N/A'}">
      </div>
      <div>
          <label for="enderecoCompleto" class="form-label">Endereço Completo:</label>
          <input type="text" id="enderecoCompleto" class="form-control" value="${data.logradouro || 'N/A'}, ${data.numero || 'N/A'}, ${data.bairro || 'N/A'}, ${data.municipio || 'N/A'} - ${data.uf || 'N/A'}, ${formatCEP(data.cep) || 'N/A'}">
      </div>
      <div>
          <label for="telefonePrimario" class="form-label">Telefone Primário:</label>
          <input type="text" id="telefonePrimario" class="form-control" value="${formatPhoneNumber(data.ddd_telefone_1) || 'N/A'}">
      </div>
      <div>
          <label for="telefoneSecundario" class="form-label">Telefone Secundário:</label>
          <input type="text" id="telefoneSecundario" class="form-control" value="${formatPhoneNumber(data.ddd_telefone_2) || 'N/A'}">
      </div>
      <div>
          <label for="email" class="form-label">E-mail:</label>
          <input type="text" id="email" class="form-control" value="${data.email || 'N/A'}">
      </div>
    </div>
  `;

  // HTML com dados do quadro societário
  let sociosHtml = '';
  if (Array.isArray(data.qsa) && data.qsa.length > 0) {
    sociosHtml = `
      <h2 class="mb-4">Quadro Societário</h2>
      <div class="wrapperPartners">
        ${data.qsa.map(socio => `
        <div class="card">
          <div class="card-body">
            <div>
              <label for="nomeSocio" class="form-label">Nome do Sócio:</label>
              <input type="text" id="nomeSocio" class="form-control" value="${socio.nome_socio || 'N/A'}">
            </div>
            <div>
              <label for="qualificacao" class="form-label">Qualificação:</label>
              <input type="text" id="qualificacao" class="form-control" value="${socio.qualificacao_socio || 'N/A'}">
            </div>
            <div>
              <label for="percentualCapitalSocial" class="form-label">Percentual do Capital Social:</label>
              <input type="text" id="percentualCapitalSocial" class="form-control" value="${socio.percentual_capital_social || 'N/A'}">
            </div>
            <div>
              <label for="entradaSociedade" class="form-label">Entrada na Sociedade:</label>
              <input type="text" id="entradaSociedade" class="form-control" value="${socio.data_entrada_sociedade || 'N/A'}">
            </div>
          </div>
        </div>`).join('')}
      </div>
    `;
  }

  document.getElementById('result').innerHTML = empresaHtml + sociosHtml;
}

export function showLoader() {
  document.getElementById('loader').style.display = 'block';
}

export function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

export function showMessage(message, type) {
  const result = document.getElementById('result');
  result.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
}
