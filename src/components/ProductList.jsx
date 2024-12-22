import { products } from '../lib/products';
import Card from './Card';

const ProductList = () => {
  return (
    <div className='mt-2 p-4' id='explore'>
      <h2 className="text-2xl font-bold text-center mb-6 text-neutral-900 dark:text-neutral-100">
        Explore Our Products
      </h2>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-[1200px]">
        {products.map((product) => (
          <Card
            key={product.name}
            className="relative border cursor-pointer border-neutral-300 dark:border-neutral-700 rounded-lg p-4 transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
              {product.name}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              {product.description}
            </p>
            <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-100">
              Features:
            </h4>
            <ul className="list-disc list-inside">
              {product.features.map((feature, index) => {
                const Icon = feature.icon; 
                return (
                  <li key={index} className="flex items-center mb-2">
                    <Icon className="w-4 h-4 text-customGreenDark dark:text-customGreenLight" />
                    <span className="ml-2 text-neutral-700 dark:text-neutral-300">
                      {feature.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
