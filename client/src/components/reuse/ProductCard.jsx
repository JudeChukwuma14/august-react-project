import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';


const ProductCard = ({ product }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      seller: product.seller,
    });
    
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="group overflow-hidden rounded-lg bg-card shadow-card hover:shadow-elegant transition-smooth">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {product.isNew && (
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">New</span>
            )}
            {product.isSale && (
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium">Sale</span>
            )}
          </div>
          <button
            className="absolute top-3 right-3 h-8 w-8 bg-background/80 hover:bg-background rounded-md flex items-center justify-center transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
            <p className="text-xs text-muted-foreground">by {product.seller}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <button 
                className="h-8 bg-primary text-primary-foreground hover:bg-primary/90 px-3 rounded-md text-sm font-medium flex items-center gap-1 transition-colors" 
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-3 w-3" />
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;