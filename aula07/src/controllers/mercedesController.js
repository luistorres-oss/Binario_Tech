let frotaMercedes = [
    {
        id: 1,
        modelo: "Actros",
        vin: "MB123456789",
        temperatura_motor: 90,
        status: "OK"
    },
    {
        id: 2,
        modelo: "Atego",
        vin: "MB987654321",
        temperatura_motor: 98,
        status: "ALERTA_AQUECIMENTO"
    }
];

const mercedesController = {

    listarFrota: (req, res) => {
        res.status(200).json({
            montadora: "Mercedes-Benz",
            dados: frotaMercedes
        });
    },

    registrarCaminhao: (req, res) => {
        const { modelo, vin, temperatura_motor } = req.body;

        if (!modelo || !vin) {
            return res.status(400).json({
                erro: "Campos 'modelo' e 'vin' são obrigatórios."
            });
        }

        const novoCaminhao = {
            id: frotaMercedes.length + 1,
            modelo,
            vin,
            temperatura_motor: temperatura_motor || 85,
            status: temperatura_motor > 95
                ? "ALERTA_AQUECIMENTO"
                : "OK"
        };

        frotaMercedes.push(novoCaminhao);

        res.status(201).json(novoCaminhao);
    }
};

module.exports = mercedesController;
