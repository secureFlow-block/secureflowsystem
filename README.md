# 🏡 SecureFlow System

## 📌 Descrição
O **SecureFlow** é um sistema de auditoria e rastreamento de alterações em bancos de dados, garantindo a integridade dos dados por meio de **Blockchain**. O sistema utiliza **Hyperledger Fabric** para armazenar os registros de auditoria de maneira imutável, aumentando a segurança e a transparência.

Atualmente, o sistema possui:
- **Módulo de CRUD de Empresas**: gerenciamento das empresas cadastradas no sistema.
- **Registro de Auditoria via Blockchain**: cada alteração no banco é registrada na blockchain para garantir integridade e rastreabilidade.

---

## 🚀 Funcionalidades
### 📂 **Gestão de Empresas (CRUD)**
O sistema permite:
- Criar uma nova empresa
- Listar todas as empresas
- Buscar uma empresa por ID
- Atualizar os dados de uma empresa

### 🔗 **Registro de Auditoria na Blockchain**
- Registrar alterações no banco de dados
- Consultar registros auditados
- Validar a integridade dos registros armazenados na blockchain

---

## 🟤 Configuração do Banco de Dados
1. Certifique-se de que o **PostgreSQL** está instalado e rodando.
2. Crie os bancos de dados necessários:
   ```sql
   CREATE DATABASE secureFlow;
   CREATE DATABASE mscontabilidade;
   ```
3. Execute os arquivos SQL iniciais localizados em:
   ```
   src/main/resources/sql
   ```

---

## ⚙️ Executando o Projeto

### ✅ **Pré-requisitos**
- Java 17 (ou superior)
- Maven
- Docker e Docker Compose (para o Hyperledger Fabric)

### 📅 **Instalação e Configuração**
1. Clone o repositório:
   ```sh
   git clone https://github.com/secureFlow-block/secureflowsystem
   cd secureflowsystem
   ```

2. Instale as dependências e compile o projeto:
   ```sh
   mvn clean install
   ```

3. Inicie a aplicação:
   ```sh
   mvn spring-boot:run
   ```

---

## 🔍 Testando os Endpoints

Use Postman, cURL ou qualquer cliente HTTP para testar os endpoints.

### 📌 **Endpoints disponíveis**
#### 📌 Consultar o último hash registrado na Blockchain:
```sh
curl -X GET http://localhost:8081/blockchain/ultimo-hash
```

#### 📌 Registrar um novo bloco na Blockchain:
```sh
curl -X POST http://localhost:8081/blockchain/registrar \
     -H "Content-Type: application/json" \
     -d '{
           "empresaId": 1,
           "tabelaId": 1,
           "operadorId": 1,
           "tipoAlteracao": "INSERÇÃO",
           "detalhesAlteracao": "Registro de teste na blockchain"
         }'
```

#### 📌 Consultar registros auditados por empresa:
```sh
curl -X GET "http://localhost:8081/blockchain/consultar?empresaId=1"
```

---

## 🔗 Links Importantes

- 📌 **Trello (Gerenciamento de Tarefas):**  
  [🔗 Acesse aqui](#)

- 📌 **Figma (Design e Protótipos):**  
  [🔗 Acesse aqui](#)

---

## 🛠️ Tecnologias Utilizadas

### 📌 **Back-end**
- Java 17 + Spring Boot
- PostgreSQL
- Maven (Gerenciador de dependências)
- Hyperledger Fabric (Blockchain)

### 📌 **Front-end**
*(Caso tenha, adicionar informações relevantes sobre as tecnologias utilizadas)*

### 📌 **Infraestrutura**
- Docker + Docker Compose
- Kubernetes (se aplicável)

---

## 🛠️ Comandos Úteis

### 🔧 **Banco de Dados**
```sh
psql -U postgres -d secureFlow
```

### 🔗 **Hyperledger Fabric**
#### 📌 Iniciar a rede Blockchain:
```sh
cd fabric-samples/test-network
./network.sh up createChannel -ca -c mychannel
```

#### 📌 Deploy do Chaincode:
```sh
./network.sh deployCC -ccn secureflow -ccp ~/Documentos/codifica/secureflowsystem/chaincode/secureflow/ -ccl go
```

#### 📌 Consultar registros na Blockchain:
```sh
peer chaincode query -C mychannel -n secureflow -c '{"Args":["ConsultarRegistros", "1"]}'
```

---

## 🏆 Equipe SecureFlow
🔹 *(Eliane, Emerson, Felipe Cordeiro, Guilherme, Isabela, Jéssica, João Victor, Marcelo, Mayumi)*

---

