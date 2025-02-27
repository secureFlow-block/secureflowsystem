SecureFlow System
Descrição
O SecureFlow é um sistema projetado para oferecer auditoria e rastreamento de alterações em bancos de dados, utilizando técnicas modernas como blockchain para garantir a integridade dos dados.
Atualmente, o sistema possui um módulo de CRUD de Empresas, permitindo o gerenciamento das empresas cadastradas no sistema.
________________________________________
Funcionalidade: Empresa (CRUD)
O módulo de Empresa permite:
•	Criar Empresa
•	Listar Empresas
•	Buscar Empresa por ID
•	Atualizar Empresa
•	Excluir Empresa
Essa funcionalidade é essencial para gerenciar as empresas que serão monitoradas pelo sistema SecureFlow.
________________________________________
Configuração do Banco de Dados
1.	Certifique-se de que o PostgreSQL está instalado e rodando.
2.	Crie o banco de dados: 
3.	CREATE DATABASE secureFlow e CREATE DATABASE M&SContabilidade;
4.	Execute os arquivos SQL iniciais localizados em src/main/resources/sql.
________________________________________
Executando o Projeto
1.	Certifique-se de que você tem o Java 17 (ou superior) e o Maven instalados.
2.	Clone o repositório: 
3.	git clone <https://github.com/secureFlow-block/secureflowsystem>
4.	cd secureflowsystem
5.	Instale as dependências e compile o projeto: 
6.	mvn clean install
7.	Execute o projeto: 
8.	mvn spring-boot:run
________________________________________
Testando os Endpoints
Use ferramentas como Postman ou cURL para testar os endpoints. A URL base é:
http://localhost:8081
________________________________________
Tecnologias Usadas
•	Spring Boot: Framework para desenvolvimento de aplicações Java.
•	PostgreSQL: Banco de dados relacional.
•	Maven: Gerenciador de dependências.



Executar aplicação
no terminal
mvn clean install - para instalar dependencias
mvn spring-boot:run - para subir servidor spring

curl -X GET http://localhost:8081/blockchain/ultimo-hash - Listar todos os endpoints disponíveis na sua aplicação.

execute os endpoints encontrados

curl -X POST http://localhost:8081/blockchain/registrar \
     -H "Content-Type: application/json" \
     -d '{
           "empresaId": 1,
           "tabelaId": 1,
           "operadorId": 1,
           "tipoAlteracao": "INSERÇÃO",
           "detalhesAlteracao": "Registro de teste na blockchain"
         }'


esse comando acima registra um bloco