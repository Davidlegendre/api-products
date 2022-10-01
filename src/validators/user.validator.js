const {check} = require("express-validator");
const {validateResult} = require('../helpers/validationHelper');

export const ValidateLoginCampos = [
    check('email').exists({checkNull: true, checkFalsy: true}).notEmpty(),
    check('password').exists({checkNull: true, checkFalsy: true}).notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

export const ValidateRegisterCampos =[
    check('email').exists().notEmpty(),
    check('password').exists().notEmpty(),
    check('name').exists().notEmpty().isEmail(),
    (req, res, next) =>
    {
        console.log(req.check)
        validateResult(req, res, next)
    }
];

export const validateToken = [
    (req, res, next) => {
        const token = req.headers['authorization']
       if(typeof token !== undefined)
       {
        next();
       }else{
           res.status(403);
       }

    }
];