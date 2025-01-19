CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    telefone VARCHAR(15),
    email VARCHAR(100),
    endereco TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE servicos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(150) NOT NULL,
    valor_base DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE funcionarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    cargo VARCHAR(50),
    salario DECIMAL(10,2),
    data_admissao DATE,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE lancamentos (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES clientes(id),
    servico_id INT REFERENCES servicos(id),
    valor DECIMAL(10,2) NOT NULL,
    data_lancamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT
);

