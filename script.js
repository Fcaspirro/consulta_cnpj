document.addEventListener("DOMContentLoaded", function() {
  // Ocultar botão de submit inicialmente
  document.getElementById('submit').style.display = 'none';

  // Ação para o botão de consulta
  document.getElementById('consultar-btn').addEventListener('click', function() {
    let cnpj = document.getElementById('cnpj-input').value.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (!isValidCNPJ(cnpj)) {
      document.getElementById('result').innerHTML = '<div class="alert alert-danger">CNPJ inválido. Por favor, digite um CNPJ válido no formato: 12.345.678/0001-00.</div>';
      return;
    }

    document.getElementById('loader').style.display = 'block';

    fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then(data => {
        displayData(data);
        document.getElementById('submit').style.display = 'block';
      })
      .catch(error => {
        if (error.status === 400 || error.status === 404) { 
          document.getElementById('result').innerHTML = '<div class="alert alert-danger">CNPJ não encontrado. Verifique se o CNPJ está correto e tente novamente!</div>';
        } else if (error.status === 500) {
          document.getElementById('result').innerHTML = '<div class="alert alert-danger">Serviço indisponível no momento, tente novamente mais tarde!</div>';
        } else {
          document.getElementById('result').innerHTML = '<div class="alert alert-danger">Ocorreu um erro ao buscar o CNPJ. Por favor, tente novamente mais tarde!</div>';
        } 
        document.getElementById('submit').style.display = 'none';
      })
      .finally(() => {
        document.getElementById('loader').style.display = 'none';
      });
  });

  // Função de validação do CNPJ
  function isValidCNPJ(cnpj) {
    const cnpjPattern = /^\d{14}$/;
    return cnpjPattern.test(cnpj);
  }

  // Formatação do campo CNPJ
  document.getElementById('cnpj-input').addEventListener('input', function() {
    let cnpj = this.value.replace(/[^\d]+/g, '');
    if (cnpj.length > 14) {
      cnpj = cnpj.substring(0, 14); // Limita o CNPJ a 14 dígitos
    }
    if (cnpj.length <= 2) {
      this.value = cnpj;
    } else if (cnpj.length <= 5) {
      this.value = cnpj.replace(/(\d{2})(\d{0,3})/, '$1.$2');
    } else if (cnpj.length <= 8) {
      this.value = cnpj.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (cnpj.length <= 12) {
      this.value = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
    } else {
      this.value = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
    }
  });

  // Função para formatar o CEP
  function formatCEP(cep) {
    return cep ? cep.replace(/(\d{5})(\d{3})/, '$1-$2') : 'N/A';
  }

  // Função para formatar números de telefone
  function formatPhoneNumber(phoneNumber) {
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

  // Exibir dados da empresa
  function displayData(data) {
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

  // Ação para coleta dos dados em json e mostrar no console.log (posteriormente para utilização em banco de dados)
  document.getElementById('submit').addEventListener('click', function() {
    var data = collectData();
    console.log(JSON.stringify(data));
    document.getElementById('message').innerHTML = '<div class="alert alert-success">Dados salvos em formato JSON. Para visualizar, abra o console do seu navegador pressionando F12.</div>';
    setTimeout(function() {
      document.getElementById('message').innerHTML = '';
    }, 6000); // 6 segundos
  });

  function collectData() {
    var data = {
      cnpj: document.getElementById('cnpj-input').value.replace(/[^\d]+/g, ''),
      nome_fantasia: document.getElementById('nomeFantasia').value,
      razao_social: document.getElementById('razaoSocial').value,
      data_abertura: document.getElementById('dataAbertura').value,
      situacao_cadastral: document.getElementById('situacaoCadastral').value,
      atividade_principal: document.getElementById('atividadePrincipal').value,
      endereco_completo: document.getElementById('enderecoCompleto').value,
      telefone_primario: document.getElementById('telefonePrimario').value,
      telefone_secundario: document.getElementById('telefoneSecundario').value,
      email: document.getElementById('email').value,
      qsa: []
    };

    document.querySelectorAll('.wrapperPartners .card').forEach(function(card) {
      var socio = {
        nome_socio: card.querySelector('#nomeSocio').value,
        qualificacao: card.querySelector('#qualificacao').value,
        percentual_capital_social: card.querySelector('#percentualCapitalSocial').value,
        entrada_sociedade: card.querySelector('#entradaSociedade').value
      };
      data.qsa.push(socio);
    });

    return data;
  }
});