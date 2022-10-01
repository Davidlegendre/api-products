
import userSchema from '../../Models/user.model'
import {__generarToken, __verificartoken} from '../../helpers/jwtHelpers'
export const register = async (req, res)=>{
    try {
        const {
            email,
            password,
            name
        } = req.body
        const result = await userSchema.findOne({email: email})
        if(!result)
        {
            const user = new userSchema({email: email, password: password, name: name})
            await user.save()
            res.status(200).json({msg: "usuario registrado"})
        }else {
            res.status(500).json({msg: "usuario ya existe"});
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({
            msg: "Bad Request"
        })
    }
}

export const login = async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await userSchema.findOne({email: email}).select('+password')
        if(!user || password !== user.password)
        {
            res.status(500).json({msg: "Credenciales invalidos"})
        }else
        {
            const dataUser = user.map(e=>{
                user._id,
                user.email
            })
            const token = __generarToken(dataUser)
            res.status(200).json({
                msg: "Bienvenido",
                token
            })
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({
            msg: "Bad Request"
        })
    }
}

export const getDataUser = async (req,res)=>{
    try {
        const token = req.headers['authorization']
        token = token.replace("Bearer ", "")
        const data = __verificartoken(token)
        if(!data)
        {
            res.status(400).json({
                msg: "token invalido"
            })
        }
        const userdata = userSchema.findOne({_id: data._id })
        res.status(200).json({user: userdata})
    } catch (error) {
        console.error(error)
        res.status(400).json({
            msg: "Bad Request"
        })
    }
}