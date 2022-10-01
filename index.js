require('dotenv').config()
import {dbConnect} from './src/configs/mongo'
import app from './src/app'

async function main(){
    const port = process.env.PORT || 3000
    const HOST = process.env.HOST || "localhost"
    app.listen(port, ()=>{
        console.log(`server on http://${HOST}:${port}`)
    })
    await dbConnect()
}
main()