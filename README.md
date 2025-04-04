## Sistema de Gerenciamento de Tarefas (To-Do List)

### Descrição
O sistema de gerenciamento de tarefas permite aos usuários criar, visualizar, atualizar e excluir tarefas de maneira eficiente.

### Tecnologias Utilizadas

- Back-end: NestJS

- Front-end: React

- Banco de Dados: SQL Server

### Instalação e Configuração

Clone este repositório:

git clone https://github.com/seu-usuario/todo-list.git

Rode o comando: 
```
docker compose up
```

Após a criação dos containers, acesse no seu navegador: `http://localhost:5173`


### Acesso

Por padrão, o sistema conta com três usuários testes:

```
username: Maria
senha: secret
```

```
username: Eva
senha: secret
```

```
username: João
senha: secret
```


### Funcionalidades


#### Página de Login

- Permite ao usuário acessar o sistema utilizando credenciais (usuário e senha).

- Redireciona para a página principal após login bem-sucedido.

#### Página de Registro

- Cadastro de novos usuários com nome de usuário, senha e confirmação de senha.


#### Página Principal

- Exibição da lista de tarefas cadastradas, com título, descrição, status, paginação e ações.

- Opção para adicionar novas tarefas.

- Opção para concluir, editar ou editar tarefas.


