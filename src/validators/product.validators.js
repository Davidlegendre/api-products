const {check} = require("express-validator");
const {validateResult} = require('../helpers/validationHelper');

export const validarCreateCampos = [
    check('productName').exists().notEmpty(),
    check('description').exists().notEmpty(),
    check('price').exists().notEmpty().isNumeric(),
    (res, req, next) => {
        validateResult(res, req, next)
    }
];
export const validarUpdateCampos = [
    check('productName').exists().notEmpty(),
    check('description').exists().notEmpty(),
    check('price').exists().notEmpty().isNumeric(),
    (res, req, next) => {
        validateResult(res, req, next)
    }
];

export const validateIDParams = [
    (req, res, next) => {
       const id = req.params.id;
       if(typeof id !== undefined)
       {
          next();
       }else{
           res.status(403);
       }

    }
];