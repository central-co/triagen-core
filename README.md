<p align="center">
    <img src="./docs/AIview.png" width="400" height="400" alt="Project Logo" />
</p>

## Description

TriaGen é uma plataforma de entrevistas simuladas com IA que utiliza modelos de linguagem para avaliar candidatos com base na vaga desejada e no currículo fornecido.

Dado o perfil do usuário (currículo) e os requisitos de uma vaga, o sistema conduz uma entrevista simulada via chat, formulando perguntas relevantes e analisando respostas em tempo real.

O objetivo é oferecer uma ferramenta de preparação e triagem inteligente, útil tanto para candidatos quanto para recrutadores.

## Environment variables

Before running the application, configure these variables:

- `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_API_URL`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_API_KEY` for WhatsApp integration.
- `REDIS_HOST`, `REDIS_PORT` for Redis storage.
- `GEMINI_API_KEY` for generating responses using Gemini.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
