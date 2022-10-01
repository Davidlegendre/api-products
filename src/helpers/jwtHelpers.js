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
      
      res.status(200).json({
        msg: "Bienvenido",
        token: token,
      });
    }
  );
}

export const __verificartoken = async (token) => {
  try {
    const result = await JWT.verify(
      token,
      process.env.SECRET,
      async (err, authData) => {
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

