[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ori1I0wD)

# Trabalho 2 Bancos de Dados NoSQL
**Grupo:**

- Joaquim Chianca Dantas Beserra
- Pedro Lucas Gois Costa

## Como rodar o projeto localmente

**Pré-requisitos:**

- Node.js
- Docker

1. Rodar container Docker com o MongoDB
```
docker run -p 27017:27017 --name nosql-mongo -v mongo-data:/data/ -d mongo
```

2. Instalar as dependências necessárias do projeto
```
npm install
```

3. Iniciar servidor
```
npm run server
```