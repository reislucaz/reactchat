<p align="center">
<img src="https://cdn.discordapp.com/attachments/961837559980372009/1075806909619253328/image.png" width="350" />
</p>

  <p align="center">Aplicação Full-stack ReactChat</p>

## Description
ReactChat é uma aplicação Full-Stack em React + NestJS que visa criar um chat para comunicação em tempo real entre os usuários do sistema.

## Tecnologias
- MYSQL (Banco de dados relacional)
- Redis (Banco de dados não relacional)
- NestJS (Back-end)
- React (Front-end)
- Docker (Containerização)
- MikroORM (ORM)
- Socket.IO (Comunicação em tempo real)

## Features

- [x] Login de usuários
- [ ] Cadastro de usuários
- [ ] Criação de salas
- [ ] Comunicação em tempo real
- [ ] Upload de arquivos
- [ ] Notificações
- [ ] Adicionar como amigo
- [ ] Dark Mode
- [x] Responsividade
- [x] Documentação OpenAPI
- [x] Validações de campos
- [x] Estilização Completa
- [x] Testes unitários
- [x] Testes de integração

## Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation
#### Construa os contêineres do Docker:
```bash
$ docker-compose up
```
#### Crie seu .env no server
```bash
DATABASE_URL="mysql://root:root@localhost:3307/chat"
REDIS_HOST="localhost"
REDIS_PORT="6379"
PORT="3000"
MODE="DEV"
JWT_SECRET="secret"
```

#### Crie seu .env no app
```bash
VITE_API_URL="http://localhost:3000"
```

## Docs

A documentação pode ser acessada ao iniciar o servidor, ir para a rota /docs.

## Acompanhe:

- Author - [Lucas Reis](https://www.linkedin.com/in/lucasreis30/)
