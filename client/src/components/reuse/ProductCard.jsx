import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlices";
import { toast } from "react-toastify";

const ProductCard = ({ product, viewMode = "grid" }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const item = {
      id: product._id || product.id,
      name: product.title || product.name || "Untitled Product",
      price: Math.round(product.price || 0),
      image:
        product.images?.[0] ||
        product.image ||
        "https://via.placeholder.com/150",
      seller:
        product.seller?.storeName || product.seller?.name || "Unknown Seller",
      quantity: 1,
    };
    dispatch(addItem(item));
    toast.success(`${item.name} added to cart!`); // Show toast notification
  };

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(product.price || 0));

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat("en-NG", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Math.round(product.originalPrice))
    : null;

  return (
    <Link to={`/product/${product._id || product.id}`}>
      <div
        className={`group overflow-hidden rounded-lg bg-card shadow-card hover:shadow-elegant transition-smooth ${
          viewMode === "list" ? "flex flex-row" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden ${
            viewMode === "list" ? "w-1/3 h-48" : "h-64"
          }`}
        >
          <img
            src={
              product.images?.[0] ||
              product.image ||
              "https://via.placeholder.com/150"
            }
            alt={product.title || product.name || "Product"}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {product.isNew && (
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                New
              </span>
            )}
            {product.isSale && (
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium">
                Sale
              </span>
            )}
          </div>
          <button
            className="absolute top-3 right-3 h-8 w-8 bg-background/80 hover:bg-background rounded-md flex items-center justify-center transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div
          className={`p-4 ${
            viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""
          }`}
        >
          <div className="space-y-2">
            <h3 className="font-medium text-sm line-clamp-2">
              {product.title || product.name || "Untitled Product"}
            </h3>
            <p className="text-xs text-muted-foreground">
              by{" "}
              {product.seller?.storeName ||
                product.seller?.name ||
                "Unknown Seller"}
            </p>
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(Math.round(product.rating))].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          <div
            className={`flex items-center ${
              viewMode === "list"
                ? "justify-between mt-4"
                : "justify-between mt-2"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">₦{formattedPrice}</span>
              {formattedOriginalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₦{formattedOriginalPrice}
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
    </Link>
  );
};

export default ProductCard;
