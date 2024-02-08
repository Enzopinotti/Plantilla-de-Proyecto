//? Gerarquía de niveles (Si pongo un nivel determinado, puedo acceder a los de nivel superior)
//? fatal: 0 error: 1, warn: 2, info: 3, http: 4, verbose: 5, debug: 6, 

import { getLogger } from "./factory.log.js";

export const addLogger = async (req, res, next) => {
    const { logger }   = await getLogger();
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`);

    next();
};
