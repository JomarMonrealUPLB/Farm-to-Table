// import { function } from './controller.js';

import { getAllProducts,  getProductById , createProduct, updateProduct, deleteProduct} from "../controllers/product_controller.js";

const productsRouter = (app) => {
    app.get('/products', getAllProducts);
    app.get('/products/:id', getProductById);
    app.post('/products', createProduct);
    app.patch('/products/:id', updateProduct);
    app.delete('/products/:id', deleteProduct);
}

export default productsRouter;