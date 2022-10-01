const JWT = require("jsonwebtoken");
export function __generarToken(userobject, res) {
  JWT.sign(
    {
      user: userobject,
    },
    process.env.SECRET,
    {
      expiresIn: "1h",
    },
    (err, token) => {

      res.cookie({token}).json({success:true,message:'LoggedIn Successfully', token})      
    }
  );
}

export const __verificartoken = (token) => {
  try {
    const result = JWT.verify(
      token,
      process.env.SECRET,
      (err, authData) => {
        if (err) {
          return null;
        } else {
          return authData;
        }
      }
    );
    if (result !== null) {
        
      return result.user;
    }
  } catch (error) {
    console.error(error)
    return null;
  }
};

