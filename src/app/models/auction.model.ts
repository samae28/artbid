import { Bid } from './bid.model';
import firebase from 'firebase/compat/app';

export class Auction {
  constructor(
    public auctionID: string,
    public artworkID: any,
    public startDate: Date | firebase.firestore.Timestamp,
    public endDate: Date | firebase.firestore.Timestamp,
    public currentBid: number,
    public highestBid: number,
    public bids: Bid[]
  ) {}
}
