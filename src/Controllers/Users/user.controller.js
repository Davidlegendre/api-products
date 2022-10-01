import userSchema from "../../Models/user.model";
import { __generarToken, __verificartoken } from "../../helpers/jwtHelpers";
import { comparePassword, encryptPassword } from "../../helpers/passwordHelper";
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const result = await userSchema.findOne({ email: email });
    if (!result) {
      const pass = await encryptPassword(password)
      const user = new userSchema({
        email: email,
        password: pass,
        name: name,
      });
      await user.save();
      res.status(200).json({ msg: "usuario registrado" });
    } else {
      res.status(500).json({ msg: "usuario ya existe" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      msg: "Bad Request",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email }).select("+password");
    const compare = await comparePassword(password, user.password)
    if (!user || compare === false) {
      res.status(500).json({ msg: "Credenciales invalidos" });
    } else {
      const dataUser = { _id: user._id, email: user.email, name: user.name };
      await __generarToken(dataUser, res);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      msg: "Bad Request",
    });
  }
};

export const getDataUser = async (req, res) => {
  try {
    let token = req.headers['authorization'];
    token = token.replace("Bearer ", "");
    const data = await __verificartoken(token);
    if (data === undefined) {
      res.status(400).json({
        msg: "token invalido",
      });
    } else {
      const userdata = await userSchema.findOne({ _id: data._id });
      res.status(200).json({ user: {_id: userdata._id,name: userdata.name, email: userdata.email} });
    } 
  } catch (error) {
    console.error(error);
    res.status(400).json({
      msg: "Bad Request",
    });
  }
};


