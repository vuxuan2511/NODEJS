import express from 'express';
import homeController from '../controller/homeController';

//
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutpage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);

    return app.use('/', router);
};
module.exports = initWebRoutes;
