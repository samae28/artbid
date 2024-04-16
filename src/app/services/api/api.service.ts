import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private adb: AngularFirestore
  ) {}

  collection(path) {
    return this.adb.collection(path);
  }

  banners = [
    { banner: 'assets/images/image1.png' },
    { banner: 'assets/images/image2.png' },
    { banner: 'assets/images/image3.png' },
  ];

  artworks = [
    {
      artworkID: 'shdksha',
      artistID: "103",
      mediumID: "2",
      title: 'Mystical Forest',
      description:
        'A mesmerizing painting capturing the essence of a mystical forest.',
      image: 'assets/images/art1.jpg',
      price: 700,
      status: 'available',
      isAuction: 1,
      auction: [
        {
          auctionID: "10a",
          artworkID: 'shdksha',
          startDate: new Date('2024-03-12T10:00:00'),
          endDate: new Date('2024-06-28T15:45:00'),
          bids: [
            { bidderID: "001", bidAmount: "1000", bidTime: "" },
            { bidderID: "002", bidAmount: "1050", bidTime: "" }
          ]
        }
      ]
    },
    {
      artworkID: 'asdklfja',
      artistID: "102",
      mediumID: "6",
      title: 'Serenity Sunset',
      description:
          'A tranquil painting capturing the serenity of a beautiful sunset.',
      image: 'assets/images/art7.jpg',
      price: 1200,
      status: 'available',
      isAuction: 1,
      auction: [
        {
      auctionID: "10b",
      artworkID: 'asdklfja',
          startDate: new Date('2024-06-01T12:00:00'),
          endDate: new Date('2024-06-15T18:00:00'),
      bids: [
        { bidderID: "001", bidAmount: "1200", bidTime: "" },
        { bidderID: "002", bidAmount: "1350", bidTime: "" }	
      ]
    }
    ]
    },
    {
      artworkID: 'dsjahkjsh',
      artistID: "103",
      mediumID: "2",
      title: 'Celestial Sculpture',
      description:
          'A celestial-inspired sculpture that captivates the imagination.',
      image: 'assets/images/art2.jpg',
      price: 800,
      status: 'available',
      isAuction: 1,
      auction: [
        {
      auctionID: "10c",
      artworkID: 'dsjahkjsh',
          startDate: new Date('2024-02-15T10:00:00'),
          endDate: new Date('2024-02-28T15:45:00'),
      bids: [
        { bidderID: "001", bidAmount: "850", bidTime: "" },
        { bidderID: "002", bidAmount: "900", bidTime: "" }
      ]
    }
    ]
    },
    {
      artworkID: 'wqeioury',
      artistID: "101",
      mediumID: "3",
      title: 'Bronze Beauty',
      description:
          'An exquisite bronze sculpture showcasing the beauty of classical artistry.',
      image: 'assets/images/art4.jpg',
      price: 1200,
      status: 'available',
      isAuction: 1,
      auction: [
        {
        auctionID: "10d",
        artworkID: 'wqeioury',
            startDate: new Date('2024-02-15T10:00:00'),
            endDate: new Date('2024-02-28T15:45:00'),
        bids: [
          { bidderID: "001", bidAmount: "1350", bidTime: "" },
          { bidderID: "002", bidAmount: "1400", bidTime: "" }
        ]
      }
      ]
    },
    {
      artworkID: 'wqeiourc',
      artistID: "101",
      mediumID: "6",
      title: 'Cart On',
      description:
          'An exquisite bronze sculpture showcasing the beauty of classical artistry.',
      image: 'assets/images/art8.jpg',
      price: 1200,
      status: 'available',
      isAuction: 1,
      auction: [
        {
        auctionID: "10e",
        artworkID: 'wqeiourc',
            startDate: new Date('2024-02-15T10:00:00'),
            endDate: new Date('2024-02-28T15:45:00'),
        bids: [
          { bidderID: "001", bidAmount: "1350", bidTime: "" },
          { bidderID: "002", bidAmount: "1400", bidTime: "" }
        ]
      }
      ]
    },
    {
      artworkID: 'jlskjfhs',
      artistID: "104",
      mediumID: "1",
      title: 'Cart On',
      description:
          'A vibrant abstract painting reflecting the harmony of colors and shapes.',
      image: 'assets/images/art5.jpg',
      price: 1200,
      status: 'available',
      isAuction: 1,
      auction: [
        {
        auctionID: "10f",
        artworkID: 'jlskjfhs',
            startDate: new Date('2024-02-15T10:00:00'),
            endDate: new Date('2024-02-28T15:45:00'),
        bids: [
          { bidderID: "001", bidAmount: "1350", bidTime: "" },
          { bidderID: "002", bidAmount: "1400", bidTime: "" }
        ]
      }
      ]
    },
    {
      artworkID: 'jlskjfgh',
      artistID: "104",
      mediumID: "1",
      title: 'Abstract Harmony',
      description:
          'A vibrant abstract painting reflecting the harmony of colors and shapes.',
      image: 'assets/images/art5.jpg',
      price: 1200,
      status: 'available',
      isAuction: 1,
      auction: [
        {
        auctionID: "10g",
        artworkID: 'jlskjfgh',
            startDate: new Date('2024-02-15T10:00:00'),
            endDate: new Date('2024-02-28T15:45:00'),
        bids: [
          { bidderID: "001", bidAmount: "1350", bidTime: "" },
          { bidderID: "002", bidAmount: "1400", bidTime: "" }
        ]
      }
      ]
    },
    {
      artworkID: 'jlskjfkk',
      artistID: "104",
      mediumID: "1",
      title: 'Abstract Harmony',
      description:
          'A vibrant abstract painting reflecting the harmony of colors and shapes.',
      image: 'assets/images/art5.jpg',
      price: 1200,
      status: 'available',
      isAuction: 0,
      auction: []
    },
    {
      artworkID: 'shdksdfksjk',
      artistID: "104",
      mediumID: "1",
      title: 'Mystical Forest',
      description:
          'A mesmerizing painting capturing the essence of a mystical forest.',
      image: 'assets/images/art5.jpg',
      price: 1200,
      status: 'available',
      isAuction: 0,
      auction: []
    },
    {
      artworkID: 'dsjahfdkljdfk',
      artistID: "103",
      mediumID: "2",
      title: 'Celestial Sculpture',
      description:
          'A celestial-inspired sculpture that captivates the imagination.',
      image: 'assets/images/art2.jpg',
      price: 1200,
      status: 'available',
      isAuction: 0,
      auction: []
    },
    {
      artworkID: 'asdkldmsdf',
      artistID: "102",
      mediumID: "6",
      title: 'Serenity Sunset',
      description:
          'A tranquil painting capturing the serenity of a beautiful sunset.',
      image: 'assets/images/art7.jpg',
      price: 1200,
      status: 'available',
      isAuction: 0,
      auction: []
    },
    {
      artworkID: 'wqeiodkfsj',
      artistID: "101",
      mediumID: "3",
      title: 'Bronze Beauty',
      description:
          'An exquisite bronze sculpture showcasing the beauty of classical artistry.',
      image: 'assets/images/art4.jpg',
      price: 1200,
      status: 'available',
      isAuction: 0,
      auction: []
    },
    {
      artworkID: 'wqeiodjhs',
      artistID: "101",
      mediumID: "6",
      title: 'Cart On',
      description:
          'An exquisite bronze sculpture showcasing the beauty of classical artistry.',
      image: 'assets/images/art8.jpg',
      price: 1200,
      status: 'available',
      isAuction: 0,
      auction: []
    }]
    mediums = [
      {
        mediumID: '1',
        mediumType: 'Charcoal',
        image: 'assets/images/charcoal.jpg',
        description: 'A beautiful artwork created using charcoal painting.',
        remarks: "null",
      },
      {
        mediumID: '2',
        mediumType: 'Oil Painting',
        image: 'assets/images/oil-paint.jpg',
        description: 'An amazing oil painting capturing the essence of nature.',
        remarks: "null",
      },
      {
        mediumID: '3',
        mediumType: 'Digital Art',
        image: 'assets/images/digital-art.jpg',
        description:
          'Innovative digital artwork showcasing creativity through technology.',
        remarks: "null",
      },
      {
        mediumID: '4',
        mediumType: 'Acrylic',
        image: 'assets/images/acrylic.jpg',
        description: 'Vibrant acrylic painting that brings life to the canvas.',
        remarks: "null",
      },
      {
        mediumID: '5',
        mediumType: 'Sculpture',
        image: 'assets/images/sculpture.jpg',
        description: 'A captivating sculpture that explores form and texture.',
        remarks: "null",
      },
      {
        mediumID: '6',
        mediumType: 'Watercolor',
        image: 'assets/images/watercolor.jpg',
        description: 'A watercolor.',
        remarks: "null",
      },
    ];
  
    artists = [
      {
        artistID: "101",
        artistName: 'Gabriel Corpuz',
        bio: 'A passionate artist with a love for traditional art mediums. Specializes in charcoal and oil painting.',
        image: 'assets/images/user3.jpg',
        remarks: "null",
      },
      {
        artistID: "102",
        artistName: 'Vhee Valencia',
        bio: 'An innovative artist exploring the realm of digital art. Pushing boundaries with creativity and technology.',
        image: 'assets/images/user2.jpg',
        remarks: "null",
      },
      {
        artistID: "103",
        artistName: 'Leandro Sebastian',
        bio: 'Expressing vibrancy through acrylics and bringing life to the canvas. Captivating viewers with color and form.',
        image: 'assets/images/user4.jpg',
        remarks: "null",
      },
      {
        artistID: "104",
        artistName: 'Francis Sagun',
        bio: 'Mastering the art of sculpture, Sophia explores form and texture, creating captivating three-dimensional artworks.',
        image: 'assets/images/user6.jpg',
        remarks: "null",
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
        address: "Pag-asa, Olongapo City, Philippines", 
        house: "dsgd", id: "cLQdnS8YXk5HTDfM3UQC", 
        landmark: "fdgs", 
        lat: 26.108991978867923, 
        lng: 91.79069981213378, 
        title: "yui", 
        user_id: "1" }, 
      deliveryCharge: 20,
      grandTotal: 540.00,
      id: "5aG0RsPuze8NX00B7uRP",
      order: [
        {
          category_id: "e0", 
          cover: "assets/imgs/salad.jpg", 
          desc: "Great in taste", 
          id: "i2", 
          name: "Caprese Salad", 
          price: 200, 
          rating: 0, 
          status: true, 
          uid: "12wefdefsdss", 
          variation: false, 
          veg: true, 
          quantity: 1},
      ],
      paid: "COD",  
      restaurant: 
      // {address: "Christan Basti, India",  city: "909090567", closeTime: "21:00", cover: "", cuisines: ["Caribbean food", "North Indian", "Vietnamese"], delivery_time: 25, description: "dd", email: "DosaPlaza@gmail.com", latitude: 26.1286243, longitude: 91.8012675, uid: "12wefdefsdss", isClose: true, name: "DosaPlaza", openTime: "07:00", phone: 6619563867, price: 27, rating: 4.7, short_name: "stayfit", status: "open", totalRating: 13},
      {
        artworkID: 'dsjahfdkljdfk',
        title: 'Celestial Sculpture',
        description: 'A celestial-inspired sculpture that captivates the imagination.',
        cover: 'assets/images/art2.jpg',
        artistID: '103',
        mediumID: '2',
      },
      restaurant_id: "12wefdefsdss",  
      status: "created",
      time: "Apr 11, 2024 12:00 PM",
      total: 1200.00,
      user_id: "1"
    },
  ];

  addresses= [     
    {
      address: "Fancy Bazaar, India", 
      house: "2nd Floor", 
      id: "7Kox63KlggTvV7ebRKar", 
      landmark: "Fancy Bazar", 
      lat: 26.1830738, 
      lng: 91.74049769999999, 
      title: "Fancy", 
      user_id: "1"},
    {address: "Kanuat palace, India", house: "Ground Floor", id: "8Kox63KlggTvV7ebRKar", landmark: "Bazar", lat: 26.1830738, lng: 91.74049769999999, title: "Work", user_id: "1"},
    {
      address: "Delhi, India", 
      house: "2nd Floor", 
      id: "7Kox63KlggTvV7ebRDelhi", 
      landmark: "Delhi", 
      lat: 28.649944693035188, 
      lng: 77.23961776224988,
      title: "Delhi", 
      user_id: "1"
    }
  ];

  getAuctionArtworks(): any[] {
    return this.artworks.filter((artwork) => artwork.isAuction);
  }

  getFixedPriceArtworks(): any[] {
    return this.artworks.filter((artwork) => !artwork.isAuction);
  }
  getArtistProfile(artistID: string): any {
    return this.artists.find(artist => artist.artistID === artistID);
  }
}
