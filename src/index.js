import express from 'express';
import compression from 'express-compression'
import handlebars from 'express-handlebars';
import  initializePassport  from './config/passport.config.js';
import config from './config/server.config.js';
import { __dirname } from './index.utils.js';
import { addLogger } from './middlewares/log/handler.log.js';
import { isAdmin } from './utils/handlebarsHelpers.util.js'
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import "./daos/factory.dao.js"

const app = express();

//?Inicializo Handlebars
const hbs = handlebars.create({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      isAdmin: isAdmin
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//?Compresión con brotli
app.use(compression({
    brotli: {
        enabled: true,
        zlib:{  }   
    },
}));

app.use(express.json());
app.use(express.urlencoded( { extended:true } ));
app.use(cors());
app.use(addLogger);

//?middleware para utilizar sesiones
app.use(
    session({
        secret: config.hashKey
        ,resave: true
        ,saveUninitialized: true
        ,cookie: {
            maxAge: 600000
        }
        ,store: MongoStore.create({
            mongoUrl: config.mongoUrl,
            ttl: 6 * 60, //Cambio el el primer numero por la cantidad de minutos
            

        })
    })
);

initializePassport();
app.use(passport.initialize());

app.use(passport.session());


//?middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next();
});

//?middleware para utilizar cookies 
app.use(
    cookieParser(
        "1ad1f78ab931039683574d95dce673abae20e29f4e6cac1ab02dea191695082948c82f6e890cca8636a9fde1e4a1e1baa21710353a9f278fb62db53e922961c6"
    )
);

export default app;