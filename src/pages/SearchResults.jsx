import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchProducts } from '../api/products';
import ProductList from '../components/ProductList';
import Spinner from '../components/Spinner';

export default function SearchResults() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search') || '';

  // Agrupar productos por categoría
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category || 'Sin categoría';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/items?search=${encodeURIComponent(searchQuery)}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await searchProducts(query);
        setProducts(data);
        setSearchQuery(query);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    if (query) fetchProducts();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex shadow-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="flex-1 p-3 border-0 rounded-l-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600"
          >
            Buscar
          </button>
        </div>
      </form>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Número de resultados */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">
              {products.length} {products.length === 1 ? 'resultado' : 'resultados'} encontrados
            </h2>
          </div>

          {/* Resultados por categoría */}
          {Object.entries(productsByCategory).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-gray-700 border-b pb-2">
                Categoría: {category} ({items.length})
              </h3>
              <ProductList products={items} 
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}