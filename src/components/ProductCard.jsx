import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

export default function ProductCard({ product }) {
  // Función para renderizar estrellas de rating
  const renderStars = () => {
    const stars = [];
    const rating = product.rating || 0;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i}
          className={`${i <= rating ? 'text-yellow-400' : 'text-gray-300'} mr-1`}
        />
      );
    }
    
    return stars;
  };

  return (
    <Link 
    to={`/items/${product._id}`}
    state={{ fromSearchResults: location.pathname + location.search }} // Guarda la ruta actual
    className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full"
  >
      <div className="p-4 flex flex-col h-full">
        <div className="flex-grow">
          <img 
            src={product.images?.[0] || 'https://via.placeholder.com/300'} 
            alt={product.title}
            className="w-full h-48 object-cover mb-4 rounded-lg"
          />
          <h3 className="font-bold text-lg mb-1 truncate">{product.title}</h3>
          <div className="flex items-center mb-2">
            {renderStars()}
            <span className="ml-1 text-sm text-gray-600">
              ({product.rating?.toFixed(1) || '0.0'})
            </span>
          </div>
          <p className="text-gray-600 mb-2 line-clamp-2 text-sm">{product.description}</p>
        </div>
        <div className="mt-auto">
          <p className="text-green-600 font-bold text-lg">${product.price?.toFixed(2)}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}