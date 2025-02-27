package main



import (

	"encoding/json"

	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"

	"time"

)



// SecureFlowChaincode define o Chaincode

type SecureFlowChaincode struct {

	contractapi.Contract

}



// RegistroAuditoria representa uma alteração registrada no blockchain

type RegistroAuditoria struct {
	RegistroID   string `json:"registroID"`
	EmpresaID    string `json:"empresaID"`
	Tabela       string `json:"tabela"`
	OperadorID   string `json:"operadorID"`
	TipoAlteracao string `json:"tipoAlteracao"`
	Hash         string `json:"hash"`
	DataHora     string `json:"dataHora"`
}




// RegistrarAlteracao registra uma transação de auditoria na blockchain

func (s *SecureFlowChaincode) RegistrarAlteracao(ctx contractapi.TransactionContextInterface, registroID, empresaID, tabela, operadorID, tipoAlteracao, hash string) error {

	timestamp := time.Now().Format(time.RFC3339)



	registro := RegistroAuditoria{

		RegistroID:   registroID,

		EmpresaID:    empresaID,

		Tabela:       tabela,

		OperadorID:   operadorID,

		TipoAlteracao: tipoAlteracao,

		Hash:         hash,

		DataHora:     timestamp,

	}



	registroJSON, err := json.Marshal(registro)

	if err != nil {

		return fmt.Errorf("erro ao converter para JSON: %v", err)

	}



	return ctx.GetStub().PutState(registroID, registroJSON)

}



// ConsultarRegistros retorna os registros armazenados no blockchain

func (s *SecureFlowChaincode) ConsultarRegistros(ctx contractapi.TransactionContextInterface, empresaID string) ([]*RegistroAuditoria, error) {

	iterator, err := ctx.GetStub().GetStateByRange("", "")

	if err != nil {

		return nil, fmt.Errorf("erro ao buscar registros: %v", err)

	}

	defer iterator.Close()



	var registros []*RegistroAuditoria

	for iterator.HasNext() {

		queryResponse, err := iterator.Next()

		if err != nil {

			return nil, fmt.Errorf("erro ao iterar registros: %v", err)

		}



		var registro RegistroAuditoria

		err = json.Unmarshal(queryResponse.Value, &registro)

		if err != nil {

			return nil, fmt.Errorf("erro ao desserializar JSON: %v", err)

		}



		if registro.EmpresaID == empresaID {

			registros = append(registros, &registro)

		}

	}



	return registros, nil

}



// ValidarIntegridade compara o hash armazenado com o informado

func (s *SecureFlowChaincode) ValidarIntegridade(ctx contractapi.TransactionContextInterface, registroID, hashBanco string) (bool, error) {

	registroJSON, err := ctx.GetStub().GetState(registroID)

	if err != nil {

		return false, fmt.Errorf("erro ao buscar registro: %v", err)

	}

	if registroJSON == nil {

		return false, fmt.Errorf("registro %s não encontrado", registroID)

	}



	var registro RegistroAuditoria

	err = json.Unmarshal(registroJSON, &registro)

	if err != nil {

		return false, fmt.Errorf("erro ao desserializar JSON: %v", err)

	}



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
