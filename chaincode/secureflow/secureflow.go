package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SecureFlowChaincode define o Chaincode
type SecureFlowChaincode struct {
	contractapi.Contract
}

// RegistroAuditoria representa uma alteração registrada no blockchain
type RegistroAuditoria struct {
	RegistroID    string `json:"registroID"`
	EmpresaID     string `json:"empresaID"`
	Tabela        string `json:"tabela"`
	OperadorID    string `json:"operadorID"`
	TipoAlteracao string `json:"tipoAlteracao"`
	Hash          string `json:"hash"`
	DataHora      string `json:"dataHora"`
}

// RegistrarAlteracao registra uma transação de auditoria na blockchain
func (s *SecureFlowChaincode) RegistrarAlteracao(ctx contractapi.TransactionContextInterface, registroID, empresaID, tabela, operadorID, tipoAlteracao, hash string) error {
	timestamp := time.Now().Format(time.RFC3339)

	// Log para depuração
	fmt.Printf("Tentando registrar alteração: registroID=%s, empresaID=%s, tabela=%s, operadorID=%s, tipoAlteracao=%s, hash=%s, dataHora=%s\n",
		registroID, empresaID, tabela, operadorID, tipoAlteracao, hash, timestamp)

	registro := RegistroAuditoria{
		RegistroID:    registroID,
		EmpresaID:     empresaID,
		Tabela:        tabela,
		OperadorID:    operadorID,
		TipoAlteracao: tipoAlteracao,
		Hash:          hash,
		DataHora:      timestamp,
	}

	// Converter o objeto para JSON
	registroJSON, err := json.Marshal(registro)
	if err != nil {
		fmt.Printf("Erro ao converter para JSON: %v\n", err)
		return fmt.Errorf("erro ao converter para JSON: %v", err)
	}

	// Salvar no blockchain (Hyperledger Fabric Ledger)
	err = ctx.GetStub().PutState(registroID, registroJSON)
	if err != nil {
		fmt.Printf("Erro ao salvar no ledger: %v\n", err)
		return fmt.Errorf("erro ao salvar no ledger: %v", err)
	}

	fmt.Println("Registro salvo com sucesso no ledger!")
	return nil
}

// ConsultarRegistros retorna os registros armazenados no blockchain
func (s *SecureFlowChaincode) ConsultarRegistros(ctx contractapi.TransactionContextInterface, empresaID string) ([]*RegistroAuditoria, error) {
	fmt.Printf("Consultando registros para empresaID=%s\n", empresaID)

	iterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		fmt.Printf("Erro ao buscar registros: %v\n", err)
		return nil, fmt.Errorf("erro ao buscar registros: %v", err)
	}
	defer iterator.Close()

	var registros []*RegistroAuditoria
	for iterator.HasNext() {
		queryResponse, err := iterator.Next()
		if err != nil {
			fmt.Printf("Erro ao iterar registros: %v\n", err)
			return nil, fmt.Errorf("erro ao iterar registros: %v", err)
		}

		var registro RegistroAuditoria
		err = json.Unmarshal(queryResponse.Value, &registro)
		if err != nil {
			fmt.Printf("Erro ao desserializar JSON: %v\n", err)
			return nil, fmt.Errorf("erro ao desserializar JSON: %v", err)
		}

		fmt.Printf("Registro encontrado: %+v\n", registro)

		if empresaID == "" || registro.EmpresaID == empresaID {
			registros = append(registros, &registro)
		}
	}

	fmt.Printf("Total de registros encontrados: %d\n", len(registros))
	return registros, nil
}

// ValidarIntegridade compara o hash armazenado com o informado
func (s *SecureFlowChaincode) ValidarIntegridade(ctx contractapi.TransactionContextInterface, registroID, hashBanco string) (bool, error) {
	fmt.Printf("Validando integridade do registro: registroID=%s\n", registroID)

	registroJSON, err := ctx.GetStub().GetState(registroID)
	if err != nil {
		fmt.Printf("Erro ao buscar registro: %v\n", err)
		return false, fmt.Errorf("erro ao buscar registro: %v", err)
	}
	if registroJSON == nil {
		fmt.Printf("Registro %s não encontrado\n", registroID)
		return false, fmt.Errorf("registro %s não encontrado", registroID)
	}

	var registro RegistroAuditoria
	err = json.Unmarshal(registroJSON, &registro)
	if err != nil {
		fmt.Printf("Erro ao desserializar JSON: %v\n", err)
		return false, fmt.Errorf("erro ao desserializar JSON: %v", err)
	}

	fmt.Printf("Registro recuperado: %+v\n", registro)
	return registro.Hash == hashBanco, nil
}

// Main inicializa o Chaincode
func main() {
	chaincode, err := contractapi.NewChaincode(new(SecureFlowChaincode))
	if err != nil {
		fmt.Printf("Erro ao criar o Chaincode: %s", err)
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Erro ao iniciar o Chaincode: %s", err)
	}
}

