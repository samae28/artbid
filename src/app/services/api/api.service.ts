import { Artworks } from './../../models/artworks.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Mediums } from 'src/app/models/mediums.model';
import { Auction } from 'src/app/models/auction.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  firestore = firebase.firestore();

  constructor(private adb: AngularFirestore) {}

  collection(path) {
    return this.adb.collection(path);
  }

  randomString() {
    const id = Math.floor(100000000 + Math.random() * 900000000);
    return id.toString();
  }

  // banner apis
  async addBanner(data) {
    try {
      const id = this.randomString();
      data.id = id;
      await this.collection('banners').doc(id).set(data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async addMedium(data: any, mediumID) {
    try {
      const id = this.randomString();
      let mediums: any = Object.assign({}, data); // Create a shallow copy of data
      mediums.id = id; // Add the ID to the copy
      await this.collection('mediums').doc(id).set(mediums);
      return { id }; // Return an object containing the ID
    } catch (error) {
      console.error('Error adding medium: ', error);
      throw error;
    }
  }

  async getBanners() {
    try {
      const banners = await this.collection('banners')
        .get()
        .pipe(
          switchMap(async (data: any) => {
            let bannerData = await data.docs.map((element) => {
              const item = element.data();
              return item;
            });
            console.log(bannerData);
            return bannerData;
          })
        )
        .toPromise();
      console.log(banners);
      return banners;
    } catch (e) {
      throw e;
    }
  }

  getMediums(): Observable<Mediums[]> {
    return this.collection('mediums')
      .valueChanges({ idField: 'mediumID' }) // Ensure 'id' field is included as 'mediumID'
      .pipe(
        map((data: any[]) =>
          data.map(
            (item) =>
              new Mediums(
                item.mediumID,
                item.mediumType,
                item.image,
                item.description,
                item.remarks
              )
          )
        )
      );
  }

  getArtworks(): Observable<Artworks[]> {
    return this.collection('allArtworks')
      .valueChanges()
      .pipe(
        map((data: any[]) =>
          data.map((item) => {
            let auction = item.auction
              ? new Auction(
                  item.auction.auctionID,
                  item.auction.artworkID,
                  new Date(item.auction.startDate.seconds * 1000),
                  new Date(item.auction.endDate.seconds * 1000),
                  item.auction.bids
                )
              : null;

            return new Artworks(
              item.artworkID,
              item.mediumID,
              item.title,
              item.description,
              item.image,
              item.price,
              item.status,
              auction,
              item.isAuction,
              item.artistID
            );
          })
        )
      );
  }

  async addArtworkItem(data: any): Promise<boolean> {
    try {
      const id = this.randomString();
      const auction = data.isAuction
        ? new Auction(
            this.randomString(),
            id, // Set the artwork ID here
            new Date(data.startDate), // Convert to Date object
            new Date(data.endDate), // Convert to Date object
            [] // Initialize with an empty array of bids
          )
        : null;

      const artwork = new Artworks(
        id,
        this.firestore.collection('mediums').doc(data.mediumID),
        data.title,
        data.description,
        data.image,
        data.price,
        'active', // Ensure status is always defined
        auction,
        data.isAuction ? 1 : 0,
        data.artistID || 'defaultArtistID' // Provide a default value if artistID is missing
      );

      // Convert instances to plain objects
      let plainArtwork = Object.assign({}, artwork);
      if (plainArtwork.auction) {
        plainArtwork.auction = Object.assign({}, plainArtwork.auction);
      }

      await this.firestore.collection('allArtworks').doc(id).set(plainArtwork);
      return true;
    } catch (e) {
      throw e;
    }
  }

  mediums: Mediums[] = [
    {
      mediumID: '1',
      mediumType: 'Charcoal',
      image: 'assets/images/charcoal.jpg',
      description: 'A beautiful artwork created using charcoal painting.',
      remarks: 'null',
    },
    {
      mediumID: '2',
      mediumType: 'Oil Painting',
      image: 'assets/images/oil-paint.jpg',
      description: 'An amazing oil painting capturing the essence of nature.',
      remarks: 'null',
    },
    {
      mediumID: '3',
      mediumType: 'Digital Art',
      image: 'assets/images/digital-art.jpg',
      description:
        'Innovative digital artwork showcasing creativity through technology.',
      remarks: 'null',
    },
    {
      mediumID: '4',
      mediumType: 'Acrylic',
      image: 'assets/images/acrylic.jpg',
      description: 'Vibrant acrylic painting that brings life to the canvas.',
      remarks: 'null',
    },
    {
      mediumID: '5',
      mediumType: 'Sculpture',
      image: 'assets/images/sculpture.jpg',
      description: 'A captivating sculpture that explores form and texture.',
      remarks: 'null',
    },
    {
      mediumID: '6',
      mediumType: 'Watercolor',
      image: 'assets/images/watercolor.jpg',
      description: 'A watercolor.',
      remarks: 'null',
    },
  ];

  artworks: Artworks[] = [];

  artists = [
    {
      artistID: '101',
      artistName: 'Gabriel Corpuz',
      bio: 'A passionate artist with a love for traditional art mediums. Specializes in charcoal and oil painting.',
      image: 'assets/images/user3.jpg',
      remarks: 'null',
    },
    {
      artistID: '102',
      artistName: 'Vhee Valencia',
      bio: 'An innovative artist exploring the realm of digital art. Pushing boundaries with creativity and technology.',
      image: 'assets/images/user2.jpg',
      remarks: 'null',
    },
    {
      artistID: '103',
      artistName: 'Leandro Sebastian',
      bio: 'Expressing vibrancy through acrylics and bringing life to the canvas. Captivating viewers with color and form.',
      image: 'assets/images/user4.jpg',
      remarks: 'null',
    },
    {
      artistID: '104',
      artistName: 'Francis Sagun',
      bio: 'Mastering the art of sculpture, Sophia explores form and texture, creating captivating three-dimensional artworks.',
      image: 'assets/images/user6.jpg',
      remarks: 'null',
    },
  ];

  allArtworks: any[] = [
    {
      uid: 'shdksha',
      title: 'Mystical Forest',
      short_name: 'mystical forest',
      artist: 'Sophie Walker',
      artistImage: 'assets/images/user1.jpg',
      artMedium: 'Oil Painting',
      mediumImage: 'assets/images/oil-paint.jpg',
      description:
        'A mesmerizing painting capturing the essence of a mystical forest.',
      image: 'assets/images/art1.jpg',
      isAuction: true,
      startingBid: 700,
      fixedPrice: 1100,
      bids: [
        { bidder: 'Bidder5', amount: 750 },
        { bidder: 'Bidder6', amount: 820 },
      ],
      currentBid: 820,
      endDate: new Date('2024-03-15T18:00:00'),
      isActive: true,
    },
    {
      uid: 'dsjahkjsh',
      title: 'Celestial Sculpture',
      short_name: 'celestial sculpture',
      artist: 'Leandro Sebastian',
      artistImage: 'assets/images/user2.jpg',
      artMedium: 'Oil Painting',
      mediumImage: 'assets/images/oil-paint.jpg',
      description:
        'A celestial-inspired sculpture that captivates the imagination.',
      image: 'assets/images/art2.jpg',
      isAuction: true,
      startingBid: 800,
      fixedPrice: null,
      bids: [
        { bidder: 'Bidder7', amount: 850 },
        { bidder: 'Bidder8', amount: 920 },
      ],
      currentBid: 920,
      endDate: new Date('2024-04-01T18:00:00'),
      isActive: true,
    },
    {
      uid: 'asdklfja',
      title: 'Serenity Sunset',
      short_name: 'serenity sunset',
      artist: 'Vhee Valencia',
      artistImage: 'assets/images/user2.jpg',
      artMedium: 'Watercolor Painting',
      mediumImage: 'assets/images/acrylic.jpg',
      description:
        'A tranquil painting capturing the serenity of a beautiful sunset.',
      image: 'assets/images/art7.jpg',
      isAuction: true,
      startingBid: 1200,
      fixedPrice: null,
      bids: [
        { bidder: 'Bidder8', amount: 1250 },
        { bidder: 'Bidder9', amount: 1300 },
      ],
      currentBid: 1300,
      endDate: new Date('2024-04-20T20:30:00'),
      isActive: true,
    },
    {
      uid: 'wqeioury',
      title: 'Bronze Beauty',
      short_name: 'bronze beauty',
      artist: 'Gabriel Corpuz',
      artistImage: 'assets/images/user3.jpg',
      artMedium: 'Digital Art',
      mediumImage: 'assets/images/digital-art.jpg',
      description:
        'An exquisite bronze sculpture showcasing the beauty of classical artistry.',
      image: 'assets/images/art4.jpg',
      isAuction: true,
      startingBid: 1200,
      fixedPrice: null,
      bids: [
        { bidder: 'Bidder8', amount: 1250 },
        { bidder: 'Bidder9', amount: 1300 },
      ],
      currentBid: 1300,
      endDate: new Date('2024-04-20T20:30:00'),
      isActive: true,
    },
    {
      uid: 'jlskjfhs',
      title: 'Abstract Harmony',
      short_name: 'abstract harmony',
      artist: 'Francis Sagun',
      artistImage: 'assets/images/user4.jpg',
      artMedium: 'Charcoal Painting',
      mediumImage: 'assets/images/charcoal.jpg',
      description:
        'A vibrant abstract painting reflecting the harmony of colors and shapes.',
      image: 'assets/images/art5.jpg',
      isAuction: true,
      startingBid: 500,
      fixedPrice: null,
      bids: [
        { bidder: 'Bidder10', amount: 550 },
        { bidder: 'Bidder11', amount: 600 },
      ],
      currentBid: 600,
      endDate: new Date('2024-02-28T15:45:00'),
      isActive: true,
    },
  ];

  orders = [
    {
      address: {
        address: 'Pag-asa, Olongapo City, Philippines',
        house: 'dsgd',
        id: 'cLQdnS8YXk5HTDfM3UQC',
        landmark: 'fdgs',
        lat: 26.108991978867923,
        lng: 91.79069981213378,
        title: 'yui',
        user_id: '1',
      },
      deliveryCharge: 20,
      grandTotal: 540.0,
      id: '5aG0RsPuze8NX00B7uRP',
      order: [
        {
          category_id: 'e0',
          cover: 'assets/imgs/salad.jpg',
          desc: 'Great in taste',
          id: 'i2',
          name: 'Caprese Salad',
          price: 200,
          rating: 0,
          status: true,
          uid: '12wefdefsdss',
          variation: false,
          veg: true,
          quantity: 1,
        },
      ],
      paid: 'COD',
      restaurant:
        // {address: "Christan Basti, India",  city: "909090567", closeTime: "21:00", cover: "", cuisines: ["Caribbean food", "North Indian", "Vietnamese"], delivery_time: 25, description: "dd", email: "DosaPlaza@gmail.com", latitude: 26.1286243, longitude: 91.8012675, uid: "12wefdefsdss", isClose: true, name: "DosaPlaza", openTime: "07:00", phone: 6619563867, price: 27, rating: 4.7, short_name: "stayfit", status: "open", totalRating: 13},
        {
          artworkID: 'dsjahfdkljdfk',
          title: 'Celestial Sculpture',
          description:
            'A celestial-inspired sculpture that captivates the imagination.',
          cover: 'assets/images/art2.jpg',
          artistID: '103',
          mediumID: '2',
        },
      restaurant_id: '12wefdefsdss',
      status: 'created',
      time: 'Apr 11, 2024 12:00 PM',
      total: 1200.0,
      user_id: '1',
    },
  ];

  addresses = [
    {
      address: 'Fancy Bazaar, India',
      house: '2nd Floor',
      id: '7Kox63KlggTvV7ebRKar',
      landmark: 'Fancy Bazar',
      lat: 26.1830738,
      lng: 91.74049769999999,
      title: 'Fancy',
      user_id: '1',
    },
    {
      address: 'Kanuat palace, India',
      house: 'Ground Floor',
      id: '8Kox63KlggTvV7ebRKar',
      landmark: 'Bazar',
      lat: 26.1830738,
      lng: 91.74049769999999,
      title: 'Work',
      user_id: '1',
    },
    {
      address: 'Delhi, India',
      house: '2nd Floor',
      id: '7Kox63KlggTvV7ebRDelhi',
      landmark: 'Delhi',
      lat: 28.649944693035188,
      lng: 77.23961776224988,
      title: 'Delhi',
      user_id: '1',
    },
  ];

  getAuctionArtworks(): any[] {
    return this.artworks.filter((artwork) => artwork.isAuction);
  }

  getFixedPriceArtworks(): any[] {
    return this.artworks.filter((artwork) => !artwork.isAuction);
  }
  getArtistProfile(artistID: string): any {
    return this.artists.find((artist) => artist.artistID === artistID);
  }
}
