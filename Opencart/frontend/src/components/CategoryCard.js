// src/components/CategoryCard.js
import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category.slug}`} className="border p-4 rounded shadow block">
      <h3 className="font-semibold">{category.title}</h3>
    </Link>
  );
}
