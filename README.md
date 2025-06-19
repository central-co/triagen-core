# Triagen

## Description

Triagen é uma aplicação NestJS desenvolvida para gerenciar autenticação e integração com o LiveKit, fornecendo tokens JWT para participantes em salas de videoconferência. O projeto implementa uma arquitetura limpa (Clean Architecture) com separação clara entre camadas de domínio, aplicação, infraestrutura e interface.

### Funcionalidades

- **Autenticação JWT**: Geração de tokens de acesso para o LiveKit
- **Health Check**: Endpoint para verificação do status da aplicação
- **Integração LiveKit**: Criação de tokens com permissões para publicar e entrar em salas
- **Arquitetura Limpa**: Organização do código seguindo princípios SOLID e Clean Architecture

### Estrutura do Projeto

```
src/
├── application/         # Casos de uso da aplicação
├── domain/             # Entidades e interfaces do domínio
├── infrastructure/     # Implementações de infraestrutura
└── interface/          # Controllers e serviços da API
```

## Configuração do Projeto

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
PORT=3000
```

## Executando com NPM

### 1. Instalação das dependências

```bash
npm install
```

### 2. Executar em desenvolvimento

```bash
# Modo watch (recarrega automaticamente)
npm run start:dev

# Modo debug
npm run start:debug
```

### 3. Executar em produção

```bash
# Build da aplicação
npm run build

# Executar versão de produção
npm run start:prod
```

## Executando com Docker

### 1. Build da imagem Docker

```bash
docker build -t triagen .
```

### 2. Executar o container

```bash
docker run --name triagen -p 3000:3000 --env-file .env triagen
```

### 3. Usando Docker Compose (opcional)

Crie um arquivo `docker-compose.yml`:

```yaml
version: '3.8'
services:
  triagen:
    build: .
    ports:
      - "3000:3000"
    environment:
      - LIVEKIT_API_KEY=your_livekit_api_key
      - LIVEKIT_API_SECRET=your_livekit_api_secret
      - PORT=3000
```

Execute com:
```bash
docker-compose up
```

## API Endpoints

### Health Check
```http
GET /health
```
Retorna o status da aplicação.

### Autenticação
```http
POST /auth
```
Gera um token JWT para acesso ao LiveKit.

## Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov

# Testes em modo watch
npm run test:watch
```

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construção de aplicações server-side eficientes e escaláveis
- **TypeScript**: Para tipagem estática e melhor experiência de desenvolvimento
- **LiveKit Server SDK**: Para integração com a plataforma de videoconferência LiveKit
- **JWT**: Para autenticação e autorização
- **Docker**: Para containerização da aplicação

## Desenvolvimento

### Estrutura de Pastas

- `src/application/usecases/`: Contém os casos de uso da aplicação
- `src/domain/entities/`: Entidades do domínio
- `src/domain/interfaces/`: Interfaces e contratos
- `src/infrastructure/providers/`: Implementações de infraestrutura
- `src/interface/`: Controllers e serviços da API

### Linting e Formatação

```bash
# Verificar e corrigir problemas de linting
npm run lint

# Formatar código
npm run format
```
