"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/store-data";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <div className="text-4xl">📦</div>
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <span className="text-sm text-blue-600 font-medium">{product.category}</span>
          </div>
          <h3 className="mb-2 font-semibold leading-tight line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4">High quality product</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </p>
            <Button
              size="icon"
              variant="secondary"
              onClick={handleAddToCart}
              className="opacity-0 transition-opacity group-hover:opacity-100 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

