export class Product {
    id: number = 0
    name: string = ''
    price: number = 0
    img: any
    detail: string = ''
}

export interface ItemQuantity {
    productId: number
    quantity : number
}


export class ProductUser {
    id : number = 0
    name : string = ''
    address : string = ''
    cardNumber : number = 123
    holderName : string = ''
    expDate : string = '04/10/2022'
    year : string = '2022'
    cvv : number = 1234
}