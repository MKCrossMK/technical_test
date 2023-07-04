import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import React from 'react';

import  img_item from '../../../public/img/img_items.png'

const ProductCard = ({ product }) => {

    const {post} = useForm();

    const onAddToCart = (e , productId) => {
        e.preventDefault();

        post(`cart/add/${productId}`);
    }
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img src={img_item} alt={product.name} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.description}</div>
        <p className="text-gray-700 text-base">${product.price}</p>
      </div>
      <div className="px-6 py-4">
        <InertiaLink href=''>

        </InertiaLink>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={(e) => onAddToCart(e , product.id)}>
          Agregar a carrito
        </button>
        
      </div>
    </div>
  );
};

export default ProductCard;