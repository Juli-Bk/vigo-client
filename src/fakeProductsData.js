const fakeProductsData = [
  {
    _id: '3asad342453786492',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/07_002.jpg'],
    salePrice: 405,
    date: Date.now()
  },
  {
    _id: 'adad3342453786493',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/01_002.jpg'],
    salePrice: 405,
    date: Date.now()
  },
  {
    _id: 'adadad3342453786494',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/02_002.jpg'],
    salePrice: 405,
    date: Date.now()
  },
  {
    _id: 'adadad334243786495',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/03_002.jpg'],
    salePrice: 405,
    date: Date.now()
  },
  {
    _id: '3asad342453786496',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/04_002.jpg'],
    salePrice: 405,
    date: Date.now()
  },
  {
    _id: 'adad3342453786497',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/05_002.jpg'],
    salePrice: 405,
    date: Date.now()
  },
  {
    _id: 'adadad334245378649',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/06_002.jpg'],
    salePrice: 405,
    date: Date.now()
  },
  {
    _id: 'adadad334243786498',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/08_002.jpg'],
    salePrice: 405,
    date: Date.now()
  },
  {
    _id: 'adadad334243786498',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/08_002.jpg'],
    salePrice: 405,
    featured: true,
    date: Date.now()
  },
  {
    _id: '3asad342453786492',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/07_002.jpg'],
    salePrice: 405,
    featured: true,
    date: Date.now()
  },
  {
    _id: 'adad3342453786493',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/01_002.jpg'],
    salePrice: 405,
    featured: true,
    date: Date.now()
  },
  {
    _id: 'adadad3342453786494',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/02_002.jpg'],
    salePrice: 405,
    featured: true,
    date: Date.now()
  },
  {
    _id: 'adadad334243786495',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/03_002.jpg'],
    salePrice: 405,
    featured: true,
    date: Date.now()
  },
  {
    _id: '3asad342453786496',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/04_002.jpg'],
    salePrice: 405,
    featured: true,
    date: Date.now()
  },
  {
    _id: 'adad3342453786497',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/05_002.jpg'],
    salePrice: 405,
    featured: true,
    date: Date.now()
  },
  {
    _id: 'adadad334245378649',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/06_002.jpg'],
    salePrice: 405,
    special: true,
    date: Date.now()
  },
  {
    _id: 'adadad334243786498',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/08_002.jpg'],
    salePrice: 405,
    special: true,
    date: Date.now()
  },
  {
    _id: 'adad3342453786497',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/05_002.jpg'],
    salePrice: 405,
    spacial: true,
    date: Date.now()
  },
  {
    _id: 'adadad334245378649',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/06_002.jpg'],
    salePrice: 405,
    special: true,
    date: Date.now()
  },
  {
    _id: 'adadad334243786498',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/08_002.jpg'],
    salePrice: 405,
    special: true,
    date: Date.now()
  },
  {
    _id: 'adadad334243786498',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/17.jpg'],
    salePrice: 405,
    special: true,
    date: Date.now()
  },
  {
    _id: 'adadad334243786498',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/18.jpg'],
    salePrice: 405,
    special: true,
    date: Date.now()
  },
  {
    _id: 'adadad334243786498',
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/19.jpg'],
    salePrice: 405,
    special: true,
    date: Date.now()
  }
];
export default fakeProductsData;