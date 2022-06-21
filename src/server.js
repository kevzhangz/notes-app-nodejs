const Hapi = require('@hapi/hapi');
const routes = require('./routes');

console.log('asd');

const startServer = async () => {
    const server = Hapi.server({
        port: 8000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan di ${server.info.uri}`);
};

startServer();
