const JWT = require("jsonwebtoken");
export function __generarToken(userobject) {
    JWT.sign({
        user: userobject
    }, process.env.SECRET, {
        expiresIn: "1d"
    }, (err, token) => {
        console.error(err)
        return token;
    });
}

export function __verificartoken(token){
    JWT.verify(token, process.env.SECRET, async (err, authData) =>{
        if(err)
        {
            console.error(err)
            return null
        }
        return authData
    })
}