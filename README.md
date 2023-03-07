# desafio-clicksoft

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
 
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

# Rotas de Alunos:

## Rota <span style="color:yellow"> **POST** </span>/api/students

O Body da requisição deve ser feito no seguinte formato:

```json
{
	"name": "nome_do_aluno", //string
	"email": "email_do_aluno", //string
	"registration": "matricula_do_aluno",//string
	"birth": "data_de_nascimento" //date
}
```

## Rota <span style="color:orange"> **PUT** </span>/api/students/:id

O "id" passado na rota é o id do aluno criado na rota mencionada anteriormente.

O Body da requisição deve ser feito no seguinte formato:

```json
{
	"name": "nome_do_aluno", //string
	"email": "email_do_aluno", //string
	"registration": "matricula_do_aluno",//string
	"birth": "data_de_nascimento" //date
}
```

## Rota <span style="color:green"> **GET** </span>/api/students/:id

Sua função é consultar os dados do aluno.

O "id" passado na rota é o id do aluno criado.

A resposta da requisição virá no seguinte formato:

```json
{
	"data": {
		"id": "id_do_aluno", //string
		"name": "nome_do_aluno",//string
		"email": "email_do_aluno", //string
		"registration": "matrícula_do_aluno", //string
		"birth": "data_de_nascimento", //date
		"created_at": "2023-03-07T10:40:40.000-03:00",
		"updated_at": "2023-03-07T10:40:40.000-03:00"
	}
}
```

## Rotas <span style="color:orange"> **DELETE** </span>/api/students/:id

Rota para a exclusão de alunos.

O "id" passado na rota é o id do aluno criado.


# Rotas de Professores:

## Rota <span style="color:yellow"> **POST** </span>/api/teachers

O Body da requisição deve ser feito no seguinte formato:

```json
{
	"name": "nome_do_professor", //string
	"email": "email_do_professor", //string
	"registration": "matricula_do_professor",//string
	"birth": "data_de_nascimento" //date
}
```

## Rota <span style="color:orange"> **PUT** </span>/api/teachers/:id

O "id" passado na rota é o id do professor criado na rota mencionada anteriormente.

O Body da requisição deve ser feito no seguinte formato:

```json
{
	"name": "nome_do_professor", //string
	"email": "email_do_professor", //string
	"registration": "matricula_do_professor",//string
	"birth": "data_de_nascimento" //date
}
```

## Rota <span style="color:green"> **GET** </span>/api/teachers/:id

Sua função é consultar os dados do professor.

O "id" passado na rota é o id do professor criado.

A resposta da requisição virá no seguinte formato:

```json
{
	"data": {
		"id": "id_do_professor", //string
		"name": "nome_do_professor",//string
		"email": "email_do_professor", //string
		"registration": "matrícula_do_professor", //string
		"birth": "data_de_nascimento", //date
		"created_at": "2023-03-07T10:40:40.000-03:00",
		"updated_at": "2023-03-07T10:40:40.000-03:00"
	}
}
```

## Rotas <span style="color:orange"> **DELETE** </span>/api/teachers/:id

Rota para a exclusão de professores.

O "id" passado na rota é o id do professor criado.

# Rotas de Salas:

## Rota <span style="color:yellow"> **POST** </span>/api/rooms

Esta rota necessita do id do professor para realizar a criação.
Este id deve ser passado no header como "teacher-id"

O Body da requisição deve ser feito no seguinte formato:

```json
{
	"number" : "número_da_sala", //number
	"capacity": "capacidade_da_sala", //number
	"available": "disponibilidade_da_sala", //boolean
}
```

## Rota <span style="color:orange"> **PUT** </span>/api/rooms/:id

O "id" passado na rota é o id da sala criada na rota mencionada anteriormente.

Esta rota necessita do id do professor para realizar a edição.
Este id deve ser passado no header como "teacher-id"

O Body da requisição deve ser feito no seguinte formato:

```json
{
	"number" : "número_da_sala", //number
	"capacity": "capacidade_da_sala", //number
	"available": "disponibilidade_da_sala", //boolean
}
```

## Rota <span style="color:green"> **GET** </span>/api/rooms/:id

Sua função é consultar os dados da sala.

O "id" passado na rota é o id da sala criada.

Esta rota necessita do id do professor para realizar a edição.
Este id deve ser passado no header como "teacher-id"

A resposta da requisição virá no seguinte formato:

```json
{
	"id": 1,
	"number": 1,
	"capacity": 1,
	"available": true,
	"owner_id": 1
}
```

## Rotas <span style="color:orange"> **DELETE** </span>/api/rooms/:id

Rota para a exclusão de salas.

O "id" passado na rota é o id da sala criada.

Esta rota necessita do id do professor para realizar a exclusão.
Este id deve ser passado no header como "teacher-id"

# Rotas de Inscrições:

## Rota <span style="color:yellow"> **POST** </span>/api/enrollments

Rota de alocação de alunos em uma sala.
Esta rota necessita do id do professor para realizar a alocação.
Este id deve ser passado no header como "teacher-id"

O Body da requisição deve ser feito no seguinte formato:

```json
{
	"student_id": "id_do_aluno", //number
	"room_id": "id_da_sala", //number
}
```

## Rota <span style="color:green"> **GET** </span>/api/enrollments/:id

Esta rota necessita do id do professor para realizar a consulta.
Este id deve ser passado no header como "teacher-id"
O "id" passado na rota é o id da sala em que o professor deseja consultar os alunos

A resposta da requisição virá no seguinte formato:

```json
[
	{
		"id": 2,
		"student_id": 2,
		"room_id": 1,
		"created_at": "2023-03-07 13:48:43",
		"updated_at": "2023-03-07 13:48:43"
	}
]
```

## Rota <span style="color:green"> **GET** </span>/api/roomsByStudent/:id

Rota para consulta de todas as salas em que o aluno está alocado.
O "id" passado na rota é o id do aluno que deseja consultar as inscrições

A resposta da requisição virá no seguinte formato:

```json
[
	{
		"name": "Paulo Henrique Lopes Gomes Silva",
		"Rooms": "[{\"teacher\":\"Cintia de Carvalho Baltar\",\"room number\":2},{\"teacher\":\"Cintia Baltar\",\"room number\":100}]"
	}
]
```

## Rotas <span style="color:orange"> **DELETE** </span>/api/enrollments/:id

Rota para a exclusão de professores.

O "id" passado na rota é o id do aluno que se deseja retirar da sala.
No body da requisição é passado o id da sala em que se deseja retirar o aluno.

```json
{
	"room_id": 1
}
```
