export class FuturePosition{
    id: number;
    symbol = "";
    price: number;
    quanity: number;
    positionSize: number;
    total: number;
    orderType: OrderType;
    date: Date;    
    leverage: number;
}
export enum OrderType{
    Short,
    Long
}