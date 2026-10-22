function validaCnh(req, res, next) {
    const { cnh } = req.body;

    if (!cnh || !/^\d{11}$/.test(String(cnh))) {
        return res.status(400).json({
            erro: "A CNH deve conter exatamente 11 digitos numericos."
        });
    }

    next();
}

module.exports = validaCnh;
