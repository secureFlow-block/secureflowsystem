package com.secureflow.secureflowsystem.model;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class Criptografia {
    

    private final SecretKey chaveAES;

    // Construtor para inicializar a chave AES
    public Criptografia() throws Exception {
        this.chaveAES = gerarChaveAES();
    }

    // Gera uma chave AES de 256 bits
    private SecretKey gerarChaveAES() throws Exception {
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(256); // AES-256
        return keyGen.generateKey();
    }

    // Criptografa os dados usando AES
    public String criptografar(String dados) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, chaveAES);
        byte[] dadosCriptografados = cipher.doFinal(dados.getBytes());
        return Base64.getEncoder().encodeToString(dadosCriptografados);
    }

    // Descriptografa os dados criptografados
    public String descriptografar(String dadosCriptografados) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, chaveAES);
        byte[] dadosDecodificados = Base64.getDecoder().decode(dadosCriptografados);
        byte[] dadosDescriptografados = cipher.doFinal(dadosDecodificados);
        return new String(dadosDescriptografados);
    }

    // Retorna a chave AES em formato Base64 para armazenamento, se necessário
    public String getChaveAESBase64() {
        return Base64.getEncoder().encodeToString(chaveAES.getEncoded());
    }

    // Permite configurar uma chave AES a partir de uma string Base64
    public static SecretKey criarChaveAESDeBase64(String chaveBase64) {
        byte[] chaveDecodificada = Base64.getDecoder().decode(chaveBase64);
        return new SecretKeySpec(chaveDecodificada, 0, chaveDecodificada.length, "AES");
    }
}
