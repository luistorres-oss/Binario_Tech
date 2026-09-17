const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const provaController = require('../controllers/provaController');
const validarJWT = require('../middlewares/validarJWT');

const validarCampos = (req, res, next) => {
  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    return res.status(400).json({
      status: "ERRO",
      erros: erros.array()
    });
  }

  next();
};

router.post(
  '/register',
  [
    body('email')
      .isEmail()
      .withMessage('Email inválido.'),
    body('senha')
      .isLength({ min: 6 })
      .withMessage('A senha deve ter no mínimo 6 caracteres.')
  ],
  validarCampos,
  provaController.registrar
);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Email inválido.'),
    body('senha')
      .notEmpty()
      .withMessage('A senha é obrigatória.')
  ],
  validarCampos,
  provaController.login
);

router.get(
  '/relatorio',
  validarJWT,
  provaController.relatorio
);

module.exports = router;
