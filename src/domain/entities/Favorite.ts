export class Favorite {
  constructor(
    public id: number,
    public userId: number,
    public restaurantId: number,
    public restaurantName: string,
    public restaurantLogo: string | null,
    public restaurantDescription: string,
    public createdAt: string,
  ) {}
}
