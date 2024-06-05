import { Bid } from './bid.model';

export class Auction {
  constructor(
    public auctionID: string,
    public artworkID: any,
    public startDate: Date,
    public endDate: Date,
    public bids: Bid[]
  ) {}
}
