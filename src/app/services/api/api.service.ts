import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  banners = [
    { banner: 'assets/images/image1.png' },
    { banner: 'assets/images/image2.png' },
    { banner: 'assets/images/image3.png' },
  ];
  artworks = [
    {
      artworkID: 'shdksha',
      title: 'Mystical Forest',
      artistID: "103",
      mediumID: "3",
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
      startDate: new Date('2024-06-15T10:00:00'),
      endDate: new Date('2024-06-28T15:45:00'),
      isActive: true,
    },
    {
      artworkID: 'dsjahkjsh',
      title: 'Celestial Sculpture',
      artistID: "103",
      mediumID: "3",
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
      startDate: new Date('2024-06-15T10:00:00'),
      endDate: new Date('2024-06-28T15:45:00'),
      isActive: true,
    },
    {
      artworkID: 'asdklfja',
      title: 'Serenity Sunset',
      artistID: "102",
      mediumID: "6",
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
      startDate: new Date('2024-06-01T12:00:00'),
      endDate: new Date('2024-06-15T18:00:00'),
      isActive: true,
    },
    {
      artworkID: 'wqeioury',
      title: 'Bronze Beauty',
      artistID: "101",
      mediumID: "3",
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
      startDate: new Date('2024-06-01T12:00:00'),
      endDate: new Date('2024-06-15T18:00:00'),
      isActive: true,
    },
    {
      artworkID: 'wqeiourc',
      title: 'Cart On',
      artistID: "101",
      mediumID: "6",
      description:
        'An exquisite bronze sculpture showcasing the beauty of classical artistry.',
      image: 'assets/images/art8.jpg',
      isAuction: true,
      startingBid: 1200,
      fixedPrice: null,
      bids: [
        { bidder: 'Bidder8', amount: 1250 },
        { bidder: 'Bidder9', amount: 1300 },
      ],
      currentBid: 1300,
      startDate: new Date('2024-06-01T14:00:00'),
      endDate: new Date('2024-06-10T14:00:00'),
      isActive: true,
    },
    {
      artworkID: 'jlskjfhs',
      title: 'Abstract Harmony',
      artistID: "104",
      mediumID: "1",
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
      startDate: new Date('2024-06-01T14:00:00'),
      endDate: new Date('2024-06-10T14:00:00'),
      isActive: true,
    },
    {
      artworkID: 'jlskjfgh',
      title: 'Abstract Harmony',
      artistID: "104",
      mediumID: "1",
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
      startDate: new Date('2024-06-01T14:00:00'),
      endDate: new Date('2024-06-10T14:00:00'),
      isActive: true,
    },
    {
      artworkID: 'jlskjfkk',
      title: 'Abstract Harmony',
      artistID: "104",
      mediumID: "1",
      description:
        'A vibrant abstract painting reflecting the harmony of colors and shapes.',
      image: 'assets/images/art5.jpg',
      isAuction: false,
      startingBid: null,
      fixedPrice: 800,
      bids: [],
      currentBid: null,
      startDate: null,
      endDate: null,
      isActive: true,
    },    
    {
      artworkID: 'shdksdfksjk',
      title: 'Mystical Forest',
      artistID: "103", 
      mediumID: "2",
      description:
        'A mesmerizing painting capturing the essence of a mystical forest.',
      image: 'assets/images/art1.jpg',
      isAuction: false,
      startingBid: null,
      fixedPrice: 1100, 
      bids: [],
      currentBid: null,
      startDate: null,
      endDate: null,
      isActive: true,
    },
    {
      artworkID: 'dsjahfdkljdfk',
      title: 'Celestial Sculpture',
      artistID: "103",
      mediumID: "2",
      description:
        'A celestial-inspired sculpture that captivates the imagination.',
      image: 'assets/images/art2.jpg',
      isAuction: false,
      startingBid: null,
      fixedPrice: 600,
      bids: [],
      currentBid: null,
      startDate: null,
      endDate: null,
      isActive: true,
    },
    {
      artworkID: 'asdkldmsdf',
      title: 'Serenity Sunset',
      artistID: "102",
      mediumID: "6",
      description:
        'A tranquil painting capturing the serenity of a beautiful sunset.',
      image: 'assets/images/art7.jpg',
      isAuction: false,
      startingBid: null,
      fixedPrice: 820,
      bids: [],
      currentBid: null,
      startDate: null,
      endDate: null,
      isActive: true,
    },
    {
      artworkID: 'wqeiodkfsj',
      title: 'Bronze Beauty',
      artistID: "101",
      mediumID: "3",
      description:
        'An exquisite bronze sculpture showcasing the beauty of classical artistry.',
      image: 'assets/images/art4.jpg',
      isAuction: false,
      startingBid: null,
      fixedPrice: 750,
      bids: [],
      currentBid: null,
      startDate: null,
      endDate: null,
      isActive: true,
    },
    {
      artworkID: 'wqeiodjhs',
      title: 'Cart On',
      artistID: "101",
      mediumID: "6",
      description:
        'An exquisite bronze sculpture showcasing the beauty of classical artistry.',
      image: 'assets/images/art8.jpg',
      isAuction: false,
      startingBid: null,
      fixedPrice: 950,
      bids: [],
      currentBid: null,
      startDate: null,
      endDate: null,
      isActive: true,
    },
  ];
  mediums = [
    {
      mediumID: '1',
      artMediumName: 'Charcoal',
      image: 'assets/images/charcoal.jpg',
      description: 'A beautiful artwork created using charcoal painting.',
      artworks: this.artworks.filter(
        (artwork) => artwork.mediumID === '1'
      ),
    },
    {
      mediumID: '2',
      artMediumName: 'Oil Painting',
      image: 'assets/images/oil-paint.jpg',
      description: 'An amazing oil painting capturing the essence of nature.',
      artworks: this.artworks.filter(
        (artwork) => artwork.mediumID === '2'
      ),
    },
    {
      mediumID: '3',
      artMediumName: 'Digital Art',
      image: 'assets/images/digital-art.jpg',
      description:
        'Innovative digital artwork showcasing creativity through technology.',
      artworks: this.artworks.filter(
        (artwork) => artwork.mediumID === '3'
      ),
    },
    {
      mediumID: '4',
      artMediumName: 'Acrylic',
      image: 'assets/images/acrylic.jpg',
      description: 'Vibrant acrylic painting that brings life to the canvas.',
      artworks: this.artworks.filter(
        (artwork) => artwork.mediumID === '4'
      ),
    },
    {
      mediumID: '5',
      artMediumName: 'Sculpture',
      image: 'assets/images/sculpture.jpg',
      description: 'A captivating sculpture that explores form and texture.',
      artworks: this.artworks.filter(
        (artwork) => artwork.mediumID === '5'
      ),
    },
    {
      mediumID: '6',
      artMediumName: 'Watercolor',
      image: 'assets/images/watercolor.jpg',
      description: 'A watercolor.',
      artworks: this.artworks.filter(
        (artwork) => artwork.mediumID === '6'
      ),
    },
  ];

  artists = [
    {
      artistID: "101",
      artistName: 'Gabriel Corpuz',
      bio: 'A passionate artist with a love for traditional art mediums. Specializes in charcoal and oil painting.',
      image: 'assets/images/user3.jpg',
      artworks: this.artworks.filter(
        (artwork) => artwork.artistID === '101'
      ),
    },
    {
      artistID: "102",
      artistName: 'Vhee Valencia',
      bio: 'An innovative artist exploring the realm of digital art. Pushing boundaries with creativity and technology.',
      image: 'assets/images/user2.jpg',
      artworks: this.artworks.filter(
        (artwork) => artwork.artistID === '102'
      ),
    },
    {
      artistID: "103",
      artistName: 'Leandro Sebastian',
      bio: 'Expressing vibrancy through acrylics and bringing life to the canvas. Captivating viewers with color and form.',
      image: 'assets/images/user4.jpg',
      artworks: this.artworks.filter(
        (artwork) => artwork.artistID === '103'
      ),
    },
    {
      artistID: "104",
      artistName: 'Francis Sagun',
      bio: 'Mastering the art of sculpture, Sophia explores form and texture, creating captivating three-dimensional artworks.',
      image: 'assets/images/user6.jpg',
      artworks: this.artworks.filter(
        (artwork) => artwork.artistID === '104'
      ),
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

  constructor() {}
}
