// import { function } from './controller.js';

import { getAllProducts } from "../controllers/product_controller.js";

const productsRouter = (app) => {
    app.get('/products', getAllProducts);
}

export default productsRouter;