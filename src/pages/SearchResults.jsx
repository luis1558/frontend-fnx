import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProducts } from '../api/products';
import ProductList from '../components/ProductList';
import Spinner from '../components/Spinner'

export default function SearchResults() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await searchProducts(query);
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      {loading ? <Spinner /> : <ProductList products={products} />}
    </div>
  );
}