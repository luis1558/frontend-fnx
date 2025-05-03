import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api/products';
import axios from 'axios';

export default function CreateProduct() {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    
    // Validación de tamaño (opcional)
    if (file.size > 5 * 1024 * 1024) { // 5MB
      alert('La imagen es muy grande. Máximo 5MB');
      return;
    }
  
    // Optimización en el cliente antes de subir
    const optimizedFile = await compressImage(file, {
      quality: 0.7,
      maxWidth: 1200
    });
  
    const reader = new FileReader();
    reader.readAsDataURL(optimizedFile);
    
    reader.onloadend = async () => {
      try {
        const base64Data = reader.result.split(',')[1];
        const response = await axios.post('https://backend-fnx.vercel.app/api/upload', 
          { image: base64Data },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}` // Si usas autenticación
            }
          }
        );
        
        setImageUrl(response.data.imageUrl);
        setFormData(prev => ({ 
          ...prev, 
          images: [response.data.imageUrl] 
        }));
      } catch (error) {
        console.error('Error al subir imagen:', error);
        alert(`Error: ${error.response?.data?.error || 'Al subir imagen'}`);
      }
    };
  };
  
  // Función para compresión en el cliente (añade este helper)
  async function compressImage(file, options = { quality: 0.8, maxWidth: 800 }) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calcular nuevo tamaño manteniendo aspect ratio
          let width = img.width;
          let height = img.height;
          
          if (width > options.maxWidth) {
            height = Math.round((options.maxWidth / width) * height);
            width = options.maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob(
            (blob) => resolve(new File([blob], file.name, { type: 'image/jpeg' })),
            'image/jpeg',
            options.quality
          );
        };
      };
    });
  }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
    stock: '',
    category: '',
    images: ['https://via.placeholder.com/300']
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Crear Nuevo Producto</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            rows="3"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Marca</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Categoría</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        </div>

        <div className="mb-4">
  <label className="block text-gray-700 mb-2">Imagen</label>
  <input
    type="file"
    onChange={handleImageUpload}
    accept="image/*"
    className="w-full px-4 py-2 border rounded-lg"
  />
  {imageUrl && (
    <img src={imageUrl} alt="Preview" className="mt-2 h-24 object-cover rounded" />
  )}
</div>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
}