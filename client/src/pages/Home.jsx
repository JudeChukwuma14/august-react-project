import ProductCard from '../components/reuse/ProductCard';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Star, Quote, Mail, Instagram, Twitter, Facebook } from 'lucide-react';
import heroImage from '../assets/images/homebg.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  // Mock data for featured products
  const featuredProducts = [
    {
      id: '1',
      name: 'Elegant Summer Dress',
      price: 89,
      originalPrice: 120,
      image: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg',
      seller: 'Boutique Style',
      rating: 4.8,
      isNew: true,
      isSale: true,
    },
    {
      id: '2',
      name: 'Classic Denim Jacket',
      price: 65,
      image: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg',
      seller: 'Urban Fashion',
      rating: 4.6,
      isNew: true,
    },
    {
      id: '3',
      name: 'Minimalist Tote Bag',
      price: 45,
      image: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg',
      seller: 'Eco Accessories',
      rating: 4.9,
    },
    {
      id: '4',
      name: 'Vintage Blazer',
      price: 125,
      originalPrice: 180,
      image: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg',
      seller: 'Retro Vibes',
      rating: 4.7,
      isSale: true,
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'Curated Collection',
      description: 'Hand-picked items from verified sellers',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Shopping',
      description: 'Protected payments and buyer guarantee',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $75',
    },
  ];

  const collections = [
    {
      id: '1',
      name: 'Summer Essentials',
      image: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg',
      itemCount: 24,
    },
    {
      id: '2',
      name: 'Urban Chic',
      image: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg',
      itemCount: 18,
    },
    {
      id: '3',
      name: 'Vintage Vibes',
      image: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg',
      itemCount: 32,
    },
  ];

  const categories = [
    { name: 'Dresses', image: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg', count: 156 },
    { name: 'Tops', image: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg', count: 243 },
    { name: 'Bottoms', image: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg', count: 189 },
    { name: 'Outerwear', image: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg', count: 78 },
    { name: 'Accessories', image: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg', count: 312 },
    { name: 'Shoes', image: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg', count: 167 },
  ];

  const testimonials = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg',
      rating: 5,
      comment: 'Amazing quality and fast shipping! Found my new favorite dress here.',
    },
    {
      id: '2',
      name: 'Emma Davis',
      avatar: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg',
      rating: 5,
      comment: 'Great platform for discovering unique fashion pieces. Highly recommended!',
    },
    {
      id: '3',
      name: 'Maria Garcia',
      avatar: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg',
      rating: 5,
      comment: 'Love the variety and the quality of items. Customer service is excellent.',
    },
  ];

  const brands = [
    { name: 'Boutique Style', logo: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg' },
    { name: 'Urban Fashion', logo: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg' },
    { name: 'Eco Accessories', logo: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg' },
    { name: 'Retro Vibes', logo: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg' },
    { name: 'Luxury Finds', logo: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg' },
    { name: 'Boho Chic', logo: 'https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">
            Your Style, 
            <span className="block text-accent">Your Story</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Discover unique fashion pieces and connect with sellers worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-md text-lg font-medium transition-colors flex items-center justify-center gap-2">
              Shop Now
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 h-11 px-8 rounded-md text-lg font-medium transition-colors">
              Start Selling
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center bg-card rounded-lg shadow-card p-8">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">Featured</span>
          <h2 className="text-4xl font-playfair font-bold mb-4">
            Trending This Week
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the most loved items from our community of sellers
          </p>
        </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
        <div className="text-center mt-12">
          <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 rounded-md text-lg font-medium flex items-center gap-2 mx-auto transition-colors">
            View All Products
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">Trending Now</span>
          <h2 className="text-4xl font-playfair font-bold mb-4">
            What's Hot This Week
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay ahead of the curve with our most popular items
          </p>
        </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Featured Collections
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Curated collections for every style and occasion
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <div key={collection.id} className="group overflow-hidden rounded-lg bg-card shadow-card hover:shadow-elegant transition-smooth cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{collection.name}</h3>
                    <p className="text-sm opacity-90">{collection.itemCount} items</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to="/categories"
                className="group text-center hover:scale-105 transition-smooth"
              >
                <div className="relative w-full aspect-square rounded-full overflow-hidden mb-3 mx-auto">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                </div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">Limited Time</span>
              <h2 className="text-4xl font-playfair font-bold mb-6">
                Special Offers Just for You
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Up to 50% off on selected items</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Extra 10% off for new customers</span>
                </div>
              </div>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-md text-lg font-medium flex items-center gap-2 transition-colors">
              Shop Sale Items
              <ArrowRight className="h-5 w-5" />
            </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Our Customers Say */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real reviews from our fashion community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-card rounded-lg shadow-card p-6">
                <Quote className="h-8 w-8 text-primary mb-4" />
                <p className="mb-4 text-muted-foreground">{testimonial.comment}</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Inspiration */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Style Inspiration
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get inspired by the latest fashion trends and styling tips
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group overflow-hidden rounded-lg bg-card shadow-card hover:shadow-elegant transition-smooth cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://i.pinimg.com/736x/ae/f5/ab/aef5ab486f2e361248cde0722fe2fcac.jpg"
                    alt={`Style inspiration ${i}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold">Summer Outfit Ideas</h3>
                    <p className="text-sm opacity-90">3 min read</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 rounded-md text-lg font-medium flex items-center gap-2 mx-auto transition-colors">
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Featured Brands
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Shop from our trusted seller community
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.map((brand) => (
              <div key={brand.name} className="text-center group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <p className="text-sm font-medium">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay in the Loop */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Subscribe to our newsletter for the latest trends, exclusive offers, and styling tips
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
              </div>
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-lg text-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
            
            <div className="flex justify-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>
{/* 
      CTA Section
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-playfair font-bold mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of sellers and turn your passion into profit
          </p>
          <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 h-11 px-8 rounded-md text-lg font-medium transition-colors">
            Create Seller Account
          </button>
        </div>
      </section> */}
    </div>
  );
};

export default Home;