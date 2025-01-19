-- Criando o banco de dados SecureFlow
CREATE DATABASE SecureFlow;

-- Usando o banco de dados
USE SecureFlow;

-- Tabela para armazenar os administradores da SecureFlow
CREATE TABLE Administradores (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    SenhaHash VARCHAR(255) NOT NULL,
    DataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para registrar empresas contratantes
CREATE TABLE Empresas (
    EmpresaID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    CNPJ CHAR(14) UNIQUE NOT NULL,
    DataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para registrar tabelas sensíveis definidas pela empresa contratante
CREATE TABLE TabelasSensiveis (
    TabelaID INT AUTO_INCREMENT PRIMARY KEY,
    EmpresaID INT NOT NULL,
    NomeTabela VARCHAR(100) NOT NULL,
    DataDefinicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (EmpresaID) REFERENCES Empresas(EmpresaID) ON DELETE CASCADE
);

-- Tabela para armazenar registros de auditoria
CREATE TABLE RegistroAuditoria (
    RegistroID BIGINT AUTO_INCREMENT PRIMARY KEY,
    EmpresaID INT NOT NULL,
    TabelaID INT NOT NULL,
    OperadorID INT NOT NULL,
    TipoAlteracao ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    DetalhesAlteracao TEXT NOT NULL, -- Armazena os dados alterados (criptografados)
    DataHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    HashBlockchain VARCHAR(255) NOT NULL, -- Hash gerado para integridade
    FOREIGN KEY (EmpresaID) REFERENCES Empresas(EmpresaID) ON DELETE CASCADE,
    FOREIGN KEY (TabelaID) REFERENCES TabelasSensiveis(TabelaID) ON DELETE CASCADE
);

-- Tabela para registrar operadores das empresas contratantes
CREATE TABLE Operadores (
    OperadorID INT AUTO_INCREMENT PRIMARY KEY,
    EmpresaID INT NOT NULL,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Cargo VARCHAR(100),
    FOREIGN KEY (EmpresaID) REFERENCES Empresas(EmpresaID) ON DELETE CASCADE
);
