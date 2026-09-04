const validaVin = (req, res, next) => {
    const { vin } = req.body;

    if (!vin || vin.length !== 12) {
        return res.status(400).json({
            erro: "O VIN deve possuir exatamente 12 caracteres."
        });
    }

    next();
};

module.exports = validaVin;
