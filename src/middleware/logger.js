const redis = require('redis');
const client = redis.createClient({
    socket:{
        port:6379,
        //host:'127.0.0.1'
        host:'redis_stack'
    }
});

module.exports = (req, res, next) => {
    res.on('finish', async () => {

        const key = req.method +":"+ Date.now()+ ":"+ req.originalUrl;
        const valor = JSON.stringify({
            clave: key,
            time: new Date(),
            req: {
                method: req.method,
                url: req.originalUrl,
                headers: req.headers,
                body: req.body
            },
            res: {
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
                response: req.method === 'GET' ? res.data : null
            }
        });
        await client.connect();
        await client.set(key, valor);
        await client.disconnect();
    });
    next();
};