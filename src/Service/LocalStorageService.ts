import { CartItem, Product } from '../models/Product';
import { seedService } from "./ProductSeedService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventEmitter, { Events } from '../Service/eventemitter';

class LocalStorageService {

    private productsKey: string = '@products';
    private cartItemsKey: string = '@cart';

    getProducts = async (): Promise<Product[]> => {
        let list = this.getLocalItem(this.productsKey);

        if ((await list).length == 0) {
            await AsyncStorage.setItem(this.productsKey, JSON.stringify(seedService.getProducts()));
            return this.getLocalItem(this.productsKey);
        }

        return list;
    }

    getCartItems = async (): Promise<CartItem[]> => {
        return this.getLocalItem(this.cartItemsKey);
    }

    addOrUpdateCartItems = async (product: Product, newQuantityCallBack: ((oldQuantity: number) => number)) => {
        let items = await this.getCartItems();

        var itemfound = false;
        items.forEach((item) => {
            if (item.product.id === product.id) {
                itemfound = true;
                item.quantity = newQuantityCallBack(item.quantity);
            }
        });

        if(itemfound == false) {
            items.push({ product: product, quantity : newQuantityCallBack(0) });
        }
        
        await AsyncStorage.setItem(this.cartItemsKey, JSON.stringify(items));

        EventEmitter.emit(Events.onCartUpdate);
    }

    deleteItemsFromCart = async (item: Product): Promise<void> => {
        var existingItems = this.getCartItems();
        await AsyncStorage.setItem(this.cartItemsKey, JSON.stringify((await existingItems).filter(f => f.product.id != item.id)));
    }

    private getLocalItem = async (key: string): Promise<[]> => {
        var items = await AsyncStorage.getItem(key);

        if (items == null || items == undefined) {
            return [];
        }

        return JSON.parse(items);
    }
}

var localStorageService = new LocalStorageService();

export { localStorageService };