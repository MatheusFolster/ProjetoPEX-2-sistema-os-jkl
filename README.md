# Sistema de Gestão de Ordens de Serviço - JKL (ProjetoPEX-2)

Este é o segundo Projeto de Extensão (PEX-2) do curso de Análise e Desenvolvimento de Sistemas, focado na criação de uma aplicação web Full Stack para a gestão de clientes e ordens de serviço (OS) para a empresa industrial JKL.

O projeto foi construído do zero, cobrindo desde a modelagem do banco de dados relacional no PostgreSQL, passando pelo desenvolvimento de uma API REST robusta com Spring Boot (Java), até a criação de uma interface de usuário (frontend) interativa com JavaScript puro.

## 🚀 Funcionalidades Principais

O sistema permite o gerenciamento completo do ciclo de vida dos clientes e suas respectivas ordens de serviço.

* **Gestão de Clientes (CRUD Completo):**
    * **C**riar: Adicionar novos clientes através de um formulário.
    * **R**ecuperar (Read): Listar todos os clientes cadastrados.
    * **U**pdate (Editar): Modificar os dados de um cliente existente.
    * **D**elete (Excluir): Remover um cliente (com proteção de integridade para não excluir clientes que possuam OS atreladas).

* **Gestão de Ordens de Serviço (CR):**
    * **C**riar: Criar novas ordens de serviço, associando-as a um cliente existente.
    * **R**ecuperar (Read): Listar todas as ordens de serviço cadastradas, exibindo os detalhes do cliente relacionado.

* **Interface Reativa:** O frontend, construído com JavaScript puro, atualiza as listas dinamicamente após cada operação (criação, edição ou exclusão), sem a necessidade de recarregar a página.

---

## 🛠️ Tecnologias Utilizadas

O projeto é dividido em duas partes principais: `backend-java` e `frontend-JS`.

### Backend (`backend-java`)
* **Java 17+**
* **Spring Boot 3:** Framework principal para a criação da API REST.
* **Spring Data JPA (Hibernate):** Para o mapeamento objeto-relacional (ORM) e comunicação com o banco de dados.
* **PostgreSQL:** Banco de dados relacional para a persistência dos dados.
* **Maven:** Gerenciador de dependências do projeto.
* **Lombok:** Para reduzir o código boilerplate nas classes de modelo.

### Frontend (`frontend-JS`)
* **HTML5:** Para a estrutura semântica da página.
* **CSS3:** Para a estilização e layout (utilizando Flexbox).
* **JavaScript (ES6+):** Para a manipulação dinâmica do DOM e comunicação assíncrona com o backend através da **`fetch API`**.

### Ferramentas de Desenvolvimento
* **IntelliJ IDEA:** IDE para o desenvolvimento do backend Spring Boot.
* **Visual Studio Code:** Editor para o desenvolvimento do frontend.
* **pgAdmin 4:** Interface gráfica para gerenciamento do banco de dados PostgreSQL.
* **Postman:** Ferramenta para testes e validação dos endpoints da API.
* **Git & GitHub:** Para o controle de versão e hospedagem do código.

---

## 🏁 Como Executar o Projeto

Para executar o projeto localmente, você precisará ter o backend e o frontend rodando simultaneamente.

### 1. Pré-requisitos

* **Java 17 (ou superior)** instalado.
* **PostgreSQL** instalado e rodando.
* Uma IDE Java (ex: **IntelliJ IDEA**).
* Um editor de código (ex: **VS Code**) com a extensão **Live Server**.

### 2. Configurando o Banco de Dados

1.  Abra o **pgAdmin** e crie um novo banco de dados. (Neste projeto, usamos o nome `jkl_db`).
2.  O sistema **não** precisa que você crie as tabelas. O Spring Data JPA (`ddl-auto=update`) fará isso automaticamente na primeira vez que o backend for executado.

### 3. Executando o Backend (`backend-java`)

1.  Abra a pasta `backend-java` com o IntelliJ IDEA.
2.  Espere o Maven baixar todas as dependências (pode levar um minuto).
3.  Navegue até `src/main/resources/` e abra o arquivo `application.properties`.
4.  **Configure suas credenciais** do PostgreSQL:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/jkl_db
    spring.datasource.username=seu_usuario_postgres
    spring.datasource.password=sua_senha_postgres
    ```
5.  Encontre e execute a classe principal `BackendJavaApplication.java`.
6.  O servidor backend estará rodando em `http://localhost:8080`.

### 4. Executando o Frontend (`frontend-JS`)

1.  Abra a pasta `frontend-JS` com o Visual Studio Code.
2.  Clique com o botão direito no arquivo `index.html`.
3.  Selecione **"Open with Live Server"**.
4.  Seu navegador abrirá automaticamente a aplicação (em um endereço como `http://127.0.0.1:5500/frontend-JS/index.html`) e ela já estará conectada ao seu backend.

Agora você pode usar o sistema!
