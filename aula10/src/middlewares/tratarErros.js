function tratarErros(err, req, res, next) {
        console.error(`[ERRO LOG]: ${err.message}`);

        
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
                return res.status(400).json({ erro: "Sintaxe do JSON invalida no corpo da requisicao." });
        }

        if (err.message && err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ erro: "Conflito: Ja existe um registro com esta chave/placa." });
        }

        if (err.message && err.message.includes('FOREIGN KEY constraint failed')) {
                return res.status(409).json({ erro: "Conflito de dados: O registro pai fornecido nao existe." });
        }

        return res.status(500).json({ erro: "Erro interno no servidor da Binario Tech." });
}

module.exports = tratarErros;
