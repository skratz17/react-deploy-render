const path = require('path')

const initialDbPath = './api/database.json';
const dbPath = '/var/data/database.json';

const fs = require('fs');
if (!fs.existsSync(dbPath)) {
    fs.copyFileSync(initialDbPath, dbPath);
}

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(dbPath)
const middlewares = jsonServer.defaults({
    static: "./build"
});

const port = process.env.PORT || 8088

server.use(middlewares)
server.use(jsonServer.rewriter({
    "/api/*": "/$1"
}))

server.use((req, res, next) => {
    // use originalUrl since other middleware is likely reassigning req.url
    const isApiRoute = req.originalUrl.includes('/api/');
    console.log(req.originalUrl)
    console.log(isApiRoute)
    if (isApiRoute) return next();

    return res.sendFile(path.join(__dirname, './build/index.html'));
});

server.use(router)

server.listen(port, () => {
    console.log('JSON Server is running')
})
