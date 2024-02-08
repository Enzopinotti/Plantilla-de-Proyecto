//?Importaciones generales
import http from 'http';
import dotenv from 'dotenv';
import { Server }  from 'socket.io';
import config from './config/server.config.js';
import app from './index.js';


const port = config.port;
const mode = config.mode;

//? Escucha de eventos de proceso (process.on)
process.on('exit', code => {
    console.log('Este código se ejecutará justo antes de salir del proceso');
    console.error('Código de salida:', code);
});

process.on('uncaughtException', exception => {
    console.log('Este código atrapa todas las excepciones no controladas, como llamar a una función no declarada');
    console.error('excepción: ',exception);
});

process.on('message', message => {
    console.log('Este código se ejecutará cuando reciba un mensaje de otro proceso, mensaje: ', message);
});

dotenv.config();

const server = http.Server(app);
export const io = new Server(server);    


if(port){
    server.listen(port, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${port} en modo ${mode}`)
});
}else{
    console.log("No hay variables de entorno configuradas")
}