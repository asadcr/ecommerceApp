import { ItemQuantity, Product } from "../models/Product";
import { seedService } from "./ProductSeedService";
import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorageService {

    private productsKey: string = '@products';
    private cartKey: string = '@cart';
    private totalCartItemKey: string = '@totalCartItem';
    private itemQuantityKey: string = '@itemQuantity';
    getProducts = async (): Promise<Product[]> => {

            //   await AsyncStorage.clear()

        let list = this.getLocalItem(this.productsKey);
        
        if((await list).length == 0) {
             await AsyncStorage.setItem(this.productsKey, JSON.stringify(seedService.getProducts()));
            return this.getLocalItem(this.productsKey);
        }

        return list;
    }

  
    getCartItems = async (): Promise<Product[]> => {
        return this.getLocalItem(this.cartKey);
    }

    saveItemsAddToCart = async (item: Product) => { 
     
        var cartItems = this.getCartItems(); 

        var matchId =  (await cartItems).filter(t => t.id == item.id);

        if (matchId.length > 0) {
            console.log('only one item save')
            return false;
        }

      this.setTotalCartItem((await cartItems).length + 1);
      await  AsyncStorage.setItem(this.cartKey, JSON.stringify([...await cartItems, item]));
      await this.setItemQuantity({productId : item.id , quantity : 1})
    }

    setItemQuantity = async (quantity : ItemQuantity) => {
        await  AsyncStorage.setItem(this.itemQuantityKey, JSON.stringify([...await this.getItemQuantity(), quantity]));
    }

    getItemQuantity = () : Promise<ItemQuantity[]> => {
        return this.getLocalItem(this.itemQuantityKey)
    }

    updateItemQuantity = async (itemQuantity : ItemQuantity) => {
        let item : ItemQuantity[] = await this.getItemQuantity();

        item = item.map((value) => {
            // check if this is the value to be edited
            if (value.productId === itemQuantity.productId) {
                 // return the updated value 
                 return {
                      ...value,
                      quantity: itemQuantity.quantity
                 }
            }
            // otherwise return the original value without editing
            return value;
       })

      await  AsyncStorage.setItem(this.itemQuantityKey, JSON.stringify(item));
    }

    deleteItemQuantity = async (itemId : number) => {
        console.log('id',itemId)
        var existingQuantity = this.getItemQuantity();
        await AsyncStorage.setItem(this.itemQuantityKey, JSON.stringify((await existingQuantity).filter(f => f.productId != itemId)));
    }

    deleteAddToCartItems = async (item: Product): Promise<boolean> => {
        var existingItems = this.getCartItems();
        await AsyncStorage.setItem(this.cartKey, JSON.stringify((await existingItems).filter(f => f.id != item.id)));
        this.setTotalCartItem((await this.getCartItems()).length);
        this.deleteItemQuantity(item.id);
        return true;
    }


    setTotalCartItem =  async (count : number) => {
       return await AsyncStorage.setItem(this.totalCartItemKey, JSON.stringify(count));
    }

    getTotalCartItem = async () : Promise<number> => {
        var items = await AsyncStorage.getItem(this.totalCartItemKey);
        if (items == null || items == undefined) {
            return 0;
        }
        return JSON.parse(items);
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