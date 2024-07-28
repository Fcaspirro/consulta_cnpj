// Função para coletar dados e retorná-los em formato JSON
export function collectData() {
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

// Função para configurar o comportamento do botão de envio
export function setupFormHandler() {
  document.getElementById('submit').addEventListener('click', function() {
    var data = collectData();
    console.log(JSON.stringify(data));
    document.getElementById('message').innerHTML = '<div class="alert alert-success">Dados salvos em formato JSON. Para visualizar, abra o console do seu navegador pressionando F12.</div>';
    setTimeout(function() {
      document.getElementById('message').innerHTML = '';
    }, 6000); // 6 segundos
  });
}
