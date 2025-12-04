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
      <Card className="group relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="flex items-center gap-2 font-semibold text-white">
            {category.name}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </h3>
          <p className="text-sm text-white/80">{category.description}</p>
        </div>
      </Card>
    </Link>
  );
}


