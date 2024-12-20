import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile, deleteFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import { convertToBoolean } from "../utils/converter.js";
import ErrorManager from "./ErrorManager.js";
export default class cartsManager{
    #jsonFilename;
    #carts;
    constructor(){
        this.#jsonFilename="carts.json";
    }
    async #findOneById(id) {
        this.#carts = await this.getAll();
        const cartFound = this.#carts.find((item) => item.id === Number(id));

        if (!cartFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return cartFound;
    }
    async getAll() {
        try {
            this.#carts = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#carts;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
    async getOneById(id) {
        try {
            const cartFound = await this.#findOneById(id);
            return cartFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
    async insertOne(data) {
        try {
            const products = data?.products?.map((item) => {
                return { idProducto: Number(item.idProducto), quantity: 1 };
            });
            const cart = {
                id: generateId(await this.getAll()),
                products: products ?? [],
            };
            this.#carts.push(cart);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);
            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
    addOneProduct = async (id, productId) => {
        try {
            const cartFound = await this.#findOneById(id);
            const productIndex = cartFound.products.findIndex((item) => item.idProducto === Number(productId));
            if (productIndex >= 0) {
                cartFound.products[productIndex].quantity++;
            } else {
                cartFound.products.push({ idProducto: Number(productId), quantity: 1 });
            }
            const index = this.#carts.findIndex((item) => item.id === Number(id));
            this.#carts[index] = cartFound;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);
            return cartFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    };
}