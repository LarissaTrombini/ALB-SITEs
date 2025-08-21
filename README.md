# ALB Sistemas - Site Jekyll

Site institucional da ALB Sistemas desenvolvido em Jekyll para hospedagem no GitHub Pages.

## 🚀 Como usar

### Hospedagem no GitHub Pages

1. Faça fork ou clone este repositório
2. Vá em Settings > Pages
3. Selecione "Deploy from a branch"
4. Escolha "main" branch e "/ (root)"
5. Seu site estará disponível em `https://seu-usuario.github.io/nome-do-repo`

### Desenvolvimento Local

\`\`\`bash
# Instalar dependências
bundle install

# Executar servidor local
bundle exec jekyll serve

# Acessar em http://localhost:4000
\`\`\`

## 📁 Estrutura

\`\`\`
├── _config.yml          # Configurações do site
├── _data/
│   └── sistemas.yml     # Dados dos sistemas
├── _includes/
│   ├── header.html      # Cabeçalho
│   └── footer.html      # Rodapé
├── _layouts/
│   └── default.html     # Layout padrão
├── assets/
│   ├── css/
│   │   └── main.scss    # Estilos principais
│   ├── js/
│   │   └── main.js      # JavaScript
│   └── images/          # Imagens
├── index.html           # Página inicial
├── contato.html         # Página de contato
└── README.md
\`\`\`

## ⚙️ Personalização

### Dados da Empresa
Edite `_config.yml` para alterar informações da empresa:

\`\`\`yaml
company:
  name: "Sua Empresa"
  phone: "(11) 99999-9999"
  email: "contato@suaempresa.com.br"
\`\`\`

### Sistemas
Edite `_data/sistemas.yml` para adicionar/remover sistemas.

### Cores e Design
Edite as variáveis CSS em `assets/css/main.scss`:

\`\`\`scss
:root {
  --primary-color: #1f2937;
  --secondary-color: #6366f1;
  // ...
}
\`\`\`

## 📱 Funcionalidades

- ✅ Design responsivo
- ✅ Carrinho de compras (localStorage)
- ✅ Integração com WhatsApp
- ✅ Formulário de contato
- ✅ SEO otimizado
- ✅ Performance otimizada

## 🛠️ Tecnologias

- Jekyll 4.3
- SCSS
- JavaScript Vanilla
- GitHub Pages
