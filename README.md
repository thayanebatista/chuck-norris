# Chuck Norris Jokes Search

Uma aplicação web moderna para buscar e exibir piadas do Chuck Norris, desenvolvida com Vue 3, TypeScript e Vite.

## 🛠️ Tecnologias

- **Vue 3**: Framework JavaScript progressivo para construção de interfaces de usuário.
- **Pinia**: Gerenciamento de estado simples e intuitivo.
- **TypeScript**: Tipagem estática para maior segurança e escalabilidade.
- **Vite**: Build tool moderna e ultrarrápida.
- **SCSS**: Pré-processador CSS para estilos mais poderosos e organizados.
- **Vitest**: Framework de testes unitários rápido e moderno.
- **Vue Test Utils**: Biblioteca de utilitários para testes de componentes Vue.

## 🚀 Funcionalidades Principais

- **Busca de Piadas**:
  - Realiza busca de piadas na API do Chuck Norris.
  - Exibe os resultados em cards.
- **Feature "I'm Feeling Lucky"**:
  - Busca e exibe uma piada aleatória ao clicar no botão.
- **Destaque de Termos**:
  - O termo pesquisado é destacado nos resultados da busca.
- **Design Responsivo**:
  - Interface adaptável para diferentes tamanhos de tela.
- **PWA (Progressive Web App)**:
  - Permite a instalação da aplicação no dispositivo e funcionamento offline.
- **Acessibilidade**:
  - Suporte a leitores de tela, navegação por teclado e outras diretrizes da WCAG.

## 📂 Estrutura do Projeto

A estrutura principal do projeto está organizada da seguinte forma:

```
chuck-norris/
├── src/
│   ├── api/
│   │   ├── api.service.ts
│   │   └── chuckNorris.service.ts
│   ├── assets/
│   ├── components/
│   │   ├── ErrorMessage.vue
│   │   ├── FeelingLuckyButton.vue
│   │   ├── Header.vue
│   │   ├── HighlightedText.vue
│   │   ├── JokeCard.vue
│   │   ├── LoadingSpinner.vue
│   │   ├── MdiIcon.vue
│   │   ├── NoResultsCard.vue
│   │   ├── SearchInput.vue
│   │   └── WesternButton.vue
│   ├── composables/
│   │   └── useTextHighlight.ts
│   ├── interfaces/
│   ├── pages/
│   │   └── Home.vue
│   ├── store/
│   │   └── chuckNorrisStore.ts
│   ├── utils/
│   ├── App.vue
│   └── main.ts
├── tests/
└── vite.config.ts
```

### Principais Componentes

- **`Header.vue`**: Barra de navegação localizada no topo da aplicação.
- **`SearchInput.vue`**: Componente de busca para pesquisar piadas.
- **`FeelingLuckyButton.vue`**: Botão para buscar uma piada aleatória.
- **`JokeCard.vue`**: Card para exibir uma piada do Chuck Norris.
- **`NoResultsCard.vue`**: Componente exibido quando a busca não retorna resultados.
- **`ErrorMessage.vue`**: Componente para exibir mensagens de erro de forma clara.
- **`LoadingSpinner.vue`**: Indicador de carregamento para feedback visual durante requisições.
- **`WesternButton.vue`**: Botão estilizado reutilizável.
- **`HighlightedText.vue`**: Componente que destaca um texto específico, usado para o termo de busca.
- **`MdiIcon.vue`**: Componente para renderizar ícones.

### Gerenciamento de Estado

- **Pinia**: O store `chuckNorrisStore` gerencia o estado da aplicação, incluindo a lista de piadas, o termo de busca, estados de carregamento e erros.

## 📦 Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:
   ```bash
   cp .env.example .env
   ```
   _Observação: O arquivo `.env.example` pode não existir. Se for o caso, você pode pular esta etapa._

## 🚀 Executando o Projeto

### Desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 🧪 Testes

O projeto utiliza **Vitest** e **Vue Test Utils** para testes unitários e de componentes.

Para executar os testes:

```bash
npm run test
```

Para verificar a cobertura de testes:

```bash
npm run test:coverage
```

## 🤝 Contribuindo

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`).
3. Commit suas mudanças (`git commit -m '[TAG]: message'`).
4. Push para a branch (`git push origin feature/AmazingFeature`).
5. Abra um Pull Request.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
