import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

export default function ProductCard({ product }) {
  return (
    <Link to={`/items/${product._id}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <img 
          src={product.images?.[0] || 'https://via.placeholder.com/300'} 
          alt={product.title}
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <h3 className="font-bold text-lg mb-1 truncate">{product.title}</h3>
        <div className="flex items-center mb-2">
          <FaStar className="text-yellow-400 mr-1" />
          <span>{product.rating || 'N/A'}</span>
        </div>
        <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <p className="text-green-600 font-bold">${product.price}</p>
        <p className="text-sm text-gray-500">{product.category}</p>
      </div>
    </Link>
  );
}