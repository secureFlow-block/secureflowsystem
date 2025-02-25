-- Criar o banco de dados mscontabilidade (executar fora do psql se necessário)
CREATE DATABASE mscontabilidade;

-- Conectar ao banco de dados mscontabilidade
\c mscontabilidade

-- Criar a tabela de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj CHAR(14) UNIQUE NOT NULL,  -- Apenas números do CNPJ
    telefone VARCHAR(15),
    email VARCHAR(100),
    endereco TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar a tabela de serviços
CREATE TABLE servicos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(150) NOT NULL,
    valor_base DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- Criar a tabela de funcionários
CREATE TABLE funcionarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,  -- Apenas números do CPF
    cargo VARCHAR(50),
    salario DECIMAL(10,2),
    data_admissao DATE,
    ativo BOOLEAN DEFAULT TRUE
);

-- Criar a tabela de lançamentos financeiros
CREATE TABLE lancamentos (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES clientes(id) ON DELETE CASCADE,
    servico_id INT REFERENCES servicos(id) ON DELETE CASCADE,
    valor DECIMAL(10,2) NOT NULL,
    data_lancamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT
);
