import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import React from 'react';
import img_box from '../../../public/img/img_box.jpg'

const CartProductsCard = ({ product }) => {

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img src={img_box} alt={product.name} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.description}</div>
        <p className="text-gray-700 text-base">${product.price}</p>
      </div>
     
    </div>
  );
};

export default CartProductsCard;