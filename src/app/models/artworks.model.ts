import { Auction } from './auction.model';

export class Artworks {
  constructor(
    public artworkID: string,
    public mediumID: any,
    public title: string,
    public shortname: string,
    public description: string,
    public image: string,
    public price: number,
    public status: string,

    public auction: Auction[],
    public isAuction?: number,
    public artistID?: any
  ) {}
}
