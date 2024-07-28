﻿﻿﻿﻿﻿<h3 align="center">
	<img height="60px" alt="Logo CNPJ" title="logo CNPJ" src="/assets/img/brand.jpg"/>
</h3>
 
<h5 align="center"> 
  <b>✅ Completo</b> | <b>✅ Versão mobile Disponível 
</h5> 

---

## Descrição
Projeto desenvolvido para consulta de CNPJ utilizando a <a href="https://brasilapi.com.br/">Brasil API</a>. Este projeto permite que os usuários insiram um CNPJ, consultem os dados da empresa correspondente e salvem essas informações.

---
 
<h2 align="left"> 
  <b>Índice</b> |
</h2> 
  
- :dizzy: [Interface](#funcionalidades)
- :computer: [Tecnologias](#tecnologias-e-ferramenta-utilizadas)
- :mag_right: [Como Usar](#como-rodar-o-projeto)
- :file_folder: [Estrutura do Projeto](#estrutura-do-projeto)
  
---

## Funcionalidades
- **Consulta de CNPJ:** Permite que os usuários insiram um CNPJ e obtenham os dados da empresa.
- **Validação de CNPJ:** Verifica se o CNPJ inserido é válido antes de realizar a consulta.
- **Formatação de Entrada:** Formata automaticamente o CNPJ conforme o usuário digita.
- **Exibição de Dados:** Mostra os dados da empresa e dos sócios de forma estruturada.
- **Salvamento de Dados:** Permite salvar os dados consultados.

## Usabilidade

- **Campo de Entrada:** O usuário deve inserir o CNPJ no campo designado.
- **Botão Consultar:** Ao clicar, o CNPJ é validado e os dados são buscados na API.
- **Exibição dos Resultados:** Os dados da empresa são exibidos em um formulário dinâmico.
- **Botão Salvar:** Permite que os dados exibidos sejam salvos.

---

## Tecnologias e ferramenta utilizadas

#### Tecnologias:

- **HTML**
- **CSS**
  
- [Javascript](https://javascript.com)
 
</p>

#### IDE:
  
- [Visual Studio Code](https://code.visualstudio.com/)

---

## Como Rodar o Projeto

#### Confira o link:
```bash
  https://fcaspirro.github.io/consulta_cnpj/
```

## ou rode localmente em sua máquina seguindo os passos abaixo

#### Pré-requisitos:
- XAMPP ou qualquer servidor Apache + PHP.

#### Instruções:
##### Clone o projeto em sua máquina:

```bash
  git clone https://github.com/Fcaspirro/consulta_cnpj.git
```

#### Configuração e visualização do projeto:
1. Baixe e instale o XAMPP no seu computador.
2. Inicie o Apache pelo painel de controle do XAMPP.
3. Coloque a pasta clonada `consulta_cnpj` dentro da pasta `htdocs` do diretório de instalação do XAMPP.
4. Abra o navegador e digite `http://localhost/consulta_cnpj` para acessar a aplicação.

---

## Estrutura do Projeto

#### Branch `main`

- Estrutura simples de arquivos.

```
  consulta_cnpj/
    ├── index.html
    ├── script.js
    ├── style.css
    └── assets/
         ├── img/
         │    ├── brand.jpg
         │    └── favicon.ico
         └── svg/
              └── heart.svg
```

---

#### Branch `refactorValidateCNPJ`
- Estrutura focada em clean code, baseada em  CSS modules e JS modules.
- Modularização do código JavaScript e style CSS para melhor visualização e manutenibilidade.

```
  consulta_cnpj/
    ├── index.html
    ├── assets/
    │    ├── img/
    │    │    ├── brand.jpg
    │    │    └── favicon.ico
    │    └── svg/
    │    │    └── heart.svg
    ├── css/
    │    └── global.css
    └── js/
         ├── components/
         │   ├── ButtonSubmit/
         │   │   ├── index.module.js
         │   │   └── index.module.css
         │   ├── ConsultCNPJ/
         │   │   ├── index.module.js
         │   │   └── index.module.css
         │   ├── Replacers/
         │   │   ├── index.module.js
         │   │   └── index.module.css
         │   └── showResult/
         │       ├── index.module.js
         │       └── index.module.css
         └── script.js
```

<div align="center">

## 👩🏻‍💻 Autor | <i>Author</i> <br>

  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/fcaspirro">
          <img src="https://avatars.githubusercontent.com/u/89426460?v=4" width="100px;" title="Autor Fabio Caspirro" alt="Foto de Perfil do GitHub - Fabio Caspirro"/><br>
          <sub>
            <b>Fabio Caspirro</b>
          </sub>
        </a>
      </td>
    </tr>
  </table>
</div>
 
<h4 align="center">
Made by: Fabio Caspirro 😄 <a href="mailto:fabio_caspirro@hotmail.com">Entre em contato | <i>Contact</i></a>
</h4>
<p align="center">
  <a href="https://www.linkedin.com/in/fabio-caspirro/">
    <img alt="Fabio Caspirro" src="https://img.shields.io/badge/LinkedIn-Fabio_Caspirro-0e76a8?style=flat&logoColor=white&logo=linkedin">
  </a>
</p>
