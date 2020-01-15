export default class Product {
  constructor(
    public id: number,
    public productName: string,
    public specialOffer: number,
    public normalPrice: number,
    public imageName: string,
    public description: string
  ) {}
}
