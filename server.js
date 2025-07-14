import * as dotenv from 'dotenv'
dotenv.config()

import {server} from './src/app.js'

server.listen({host:'0.0.0.0', port:process.env.PORT},(err, address) =>{
    if(err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`servidor rodando em ${address}`)
})    