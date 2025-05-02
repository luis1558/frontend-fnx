import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/products';
import { FaStar, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (!product) return <div className="text-center py-8">Producto no encontrado</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link to="/" className="flex items-center text-blue-500 mb-4">
        <FaArrowLeft className="mr-2" /> Volver
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <img 
              src={product.images?.[0] || 'https://via.placeholder.com/500'} 
              alt={product.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center mb-4">
              <FaStar className="text-yellow-400 mr-1" />
              <span>{product.rating || 'Sin calificaciones'}</span>
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="mb-4">
              <span className="font-bold">Precio: </span>
              <span className="text-green-600 font-bold text-xl">${product.price}</span>
            </div>
            <div className="mb-4">
              <span className="font-bold">Marca: </span>
              <span>{product.brand}</span>
            </div>
            <div className="mb-4">
              <span className="font-bold">Stock: </span>
              <span>{product.stock} unidades disponibles</span>
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Comprar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}