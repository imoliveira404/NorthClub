# Hello Friend

Loja de camisas de futebol (North) construída com TanStack Start.

## Funcionalidades

- Vitrine com catálogo de produtos, busca e filtros.
- Carrinho e checkout via WhatsApp.
- Painel `/admin` para cadastrar e editar produtos — salvo no navegador
  (localStorage), protegido por senha simples.
- Integração com Mercado Pago (server functions).

## Desenvolvimento

Você precisa de Node.js e npm.

```sh
npm install
npm run dev
```

O servidor de desenvolvimento fica disponível em http://localhost:3000.

## Scripts

| Comando           | Descrição                   |
| ----------------- | --------------------------- |
| `npm run dev`     | Servidor de desenvolvimento |
| `npm run build`   | Build de produção           |
| `npm run preview` | Pré-visualiza o build       |
| `npm run lint`    | Lint com ESLint             |

## Painel admin

Acesse `/admin` e use a senha de administrador. A senha padrão é `futz-admin` e
pode ser alterada com a variável de ambiente `VITE_ADMIN_PASSWORD` (veja o
`.env.example`). Produtos e imagens ficam salvos apenas no navegador usado para
gerenciar o painel.

## Variáveis de ambiente

Copie o `.env.example` para `.env` e preencha apenas o que for usar. A loja
funciona sem nenhuma variável; elas só habilitam o pagamento pelo Mercado Pago
e a senha customizada do painel.
