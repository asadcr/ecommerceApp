import { Product } from "../models/Product";

class ProductDataService {


    getProducts = () : Product[] => {

        return  [
            {
              id: 1,
              name: 'hero Product',
              price: '3.99',
              img: require('../assets/plant1.png'),
              detail:
                'OMG This just came out today!',
            },
          
            {
              id: 2,
              name: 'Product 1',
              price: '2.99',
              img: require('../assets/plant2.png'),
              detail:
                'This is the latest and greatest product from Derp corp.',
            },
            {
              id: 3,
              name: 'Product 2',
              price: '5.99',
              img: require('../assets/plant3.png'),
              detail:
                'Plant one of the most popular and beautiful species that will produce clumpms.',
            },
          
            {
              id: 4,
              name: 'Product 3',
              price: '10.99',
              img: require('../assets/plant4.png'),
              detail:
                'Plant one of the most popular and beautiful species that will produce clumpms.',
            },
            {
              id: 5,
              name: 'Product 4',
              price: '30.99',
              img: require('../assets/plant5.png'),
              detail:
                'Plant one of the most popular and beautiful species that will produce clumpms.',
            },
            {
              id: 6,
              name: 'Product 5',
              price: '60.99',
              img: require('../assets/plant6.png'),
              detail:
                'Plant one of the most popular and beautiful species that will produce clumpms.',
            },
          ];
    }


}

var seedService = new ProductDataService();

export { seedService };