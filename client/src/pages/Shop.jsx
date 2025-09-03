import { useState } from 'react';
import ProductCard from '../components/reuse/ProductCard';
import { Search, Filter, Grid, List } from 'lucide-react';

const Shop = () => {
  const [viewMode, setViewMode] = useState('grid');
  
  // Mock products data
  const products = [
    {
      id: '1',
      name: 'Elegant Summer Dress',
      price: 89,
      originalPrice: 120,
      image: 'https://i.pinimg.com/1200x/91/21/1d/91211d8810be0fb4456aca94730515f7.jpg',
      seller: 'Boutique Style',
      rating: 4.8,
      isNew: true,
      isSale: true,
    },
    {
      id: '2',
      name: 'Classic Denim Jacket',
      price: 65,
      image: 'https://i.pinimg.com/1200x/91/21/1d/91211d8810be0fb4456aca94730515f7.jpg',
      seller: 'Urban Fashion',
      rating: 4.6,
      isNew: true,
    },
    {
      id: '3',
      name: 'Minimalist Tote Bag',
      price: 45,
      image: 'https://i.pinimg.com/1200x/91/21/1d/91211d8810be0fb4456aca94730515f7.jpg',
      seller: 'Eco Accessories',
      rating: 4.9,
    },
    {
      id: '4',
      name: 'Vintage Blazer',
      price: 125,
      originalPrice: 180,
      image: 'https://i.pinimg.com/1200x/91/21/1d/91211d8810be0fb4456aca94730515f7.jpg',
      seller: 'Retro Vibes',
      rating: 4.7,
      isSale: true,
    },
    {
      id: '5',
      name: 'Bohemian Maxi Skirt',
      price: 55,
      image: 'https://i.pinimg.com/1200x/91/21/1d/91211d8810be0fb4456aca94730515f7.jpg',
      seller: 'Boho Chic',
      rating: 4.5,
    },
    {
      id: '6',
      name: 'Designer Sunglasses',
      price: 150,
      originalPrice: 200,
      image: 'https://i.pinimg.com/1200x/91/21/1d/91211d8810be0fb4456aca94730515f7.jpg',
      seller: 'Luxury Finds',
      rating: 4.9,
      isSale: true,
    },
  ];

  const categories = [
    'All',
    'Dresses',
    'Tops',
    'Bottoms',
    'Outerwear',
    'Accessories',
    'Shoes',
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-bold mb-4">Shop Fashion</h1>
        <p className="text-muted-foreground">
          Discover unique pieces from our community of sellers
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
              <Filter className="h-4 w-4" />
              Filters
            </button>
            
            <div className="flex border rounded-lg p-1">
              <button
                className={`px-3 h-9 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                className={`px-3 h-9 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium transition-smooth ${
                category === 'All' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {products.length} results
        </p>
      </div>

      {/* Products Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1 lg:grid-cols-2'
      }`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 rounded-md text-lg font-medium transition-colors">
          Load More Products
        </button>
      </div>
    </div>
  );
};

export default Shop;