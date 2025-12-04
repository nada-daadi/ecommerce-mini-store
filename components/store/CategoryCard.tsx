import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Category } from "@/lib/store-data";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.name}`}>
      <Card className="group relative h-48 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="flex items-center gap-2 font-semibold text-card">
            {category.name}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </h3>
          <p className="text-sm text-card/80">{category.productCount} products</p>
        </div>
      </Card>
    </Link>
  );
}


