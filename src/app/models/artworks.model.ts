import { Auction } from './auction.model';
import { Bid } from './bid.model';

export class Artworks {
  constructor(
    public artworkID: string,
    public mediumID: any,
    public title: string,
    public description: string,
    public image: string,
    public price: number,
    public status: string, // Ensure status is always defined
    public auction?: Auction,
    public isAuction?: boolean | number,
    public artistID?: string
  ) {}
}
