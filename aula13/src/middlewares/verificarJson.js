const verificarJson = (req, res, next) => {
  // 1. Verifica se a requisição é POST E se o cabeçalho NAO é JSON
  if (req.method === 'POST' && !req.is('application/json')) {
    
    // 2. Se for POST e não for JSON, interrompe e devolve HTTP 400
    return res.status(400).json({
      status: "REQUISICAO_INVALIDA",
      mensagem: "Requisições POST devem conter o cabeçalho 'Content-Type: application/json'."
    });
  }
  
  // 3. Se estiver tudo certo (ou se for GET, DELETE, etc.), deixa a requisição passar
  next();
};

module.exports = verificarJson;
