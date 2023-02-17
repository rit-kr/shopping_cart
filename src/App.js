import './App.css';
import data from "./data.json"
import Product from './components/Product';
import Aside from './components/Aside';
import Cart from './components/Cart';
import { useState, useEffect } from 'react';
import { BsCart4 } from 'react-icons/bs';
import { FaRegWindowClose } from 'react-icons/fa';


function App() {

  const [products, setProducts] = useState(data.products);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(JSON.parse(localStorage.getItem("items")) || []);
  const [showCart, setShowCart] = useState(false);


  let sizes = data.products.reduce((acc, cv) => {
    acc = acc.concat(cv.availableSizes);

    return acc.filter((size, i) => acc.indexOf(size) === i);
  }, [])

  console.log(products)


  const handleSize = (size) => {
    if (!selectedSize.includes(size)) {
      setSelectedSize(selectedSize.concat(size));
    } else if (selectedSize.includes(size)) {
      setProducts(data.products);
      setSelectedSize([...selectedSize.filter((item) => item !== size)])
    }
  }
  useEffect(() => {
    if(selectedSize.length){

      const filteredProduct = products.filter((product) => {
        let flag = false;
        product.availableSizes.map(newSize => {
          if ([...selectedSize].includes(newSize)) {
            flag = true;
          }
        })
        return flag;
      })
      setProducts(filteredProduct);
    }
  }, [selectedSize]);

  console.log(selectedSize);


  const handleAddToCart = ((item, quantity = 1) => {
    const data = [...selectedProduct];
    const i = data.findIndex(({ id }) => id === item.id);
    if (i >= 0) {
      data[i].quantity += 1;
      setSelectedProduct(data);
    } else {
      setSelectedProduct([...selectedProduct, item]);
    }
  }
  )

  const handleDecrease = (cartProduct) => {
    const newSelectedProduct = selectedProduct.map((product, i) => {
      if (product.sku === cartProduct.sku) {
        return { ...product, quantity: product.quantity - 1 }
      } else {
        return product;
      }
    })
    setSelectedProduct(newSelectedProduct);
  };
  const handleIncrease = (cartProduct) => {
    const newSelectedProduct = selectedProduct.map((product, i) => {
      if (product.sku === cartProduct.sku) {
        return { ...product, quantity: product.quantity + 1 }
      } else {
        return product;
      }
    })
    setSelectedProduct(newSelectedProduct);
  };

  const handleDelete = (cartProduct) => {
    const deletedProduct = [...selectedProduct.filter((item) => item.id !== cartProduct.id)]
    setSelectedProduct(deletedProduct);
  }

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(selectedProduct));
    // localStorage.setItem("items", JSON.stringify(selectedSize));

  }, [selectedProduct]);

  const handleCheckout = () => {
    const totalAmount = selectedProduct.reduce((total, curVal) => {
      return (total + (curVal.price * curVal.quantity))
    }, 0)
    alert(`checkout- Subtotal: $ ${totalAmount}`)
  };

  console.log(selectedProduct);

  return (
    <>
      <div className="App flex">
        <Aside
          allSizes={sizes}
          handleSize={handleSize}
        />
        <Product
          data={products}
          selectedSize={selectedSize}
          handleAddToCart={handleAddToCart}
        />
        <div className='relative'>
          <div>
            {
              showCart ?
                <FaRegWindowClose onClick={() => setShowCart(!showCart)} />
                :
                <div className='bg-gray-500'>
                  <BsCart4 className="w-8 h-8 mx-4 absolute relative top-0 right-0" onClick={() => setShowCart(!showCart)} />
                  <span className='absolute top-0 right-0 text-purple-900'>{selectedProduct.length}</span>
                </div>

            }

          </div>
          {
            showCart ?
              <div className='relative'>
                <Cart
                  selectedProduct={selectedProduct}
                  handleIncrease={handleIncrease}
                  handleDecrease={handleDecrease}
                  handleCheckout={handleCheckout}
                  handleDelete={handleDelete}
                />
              </div>
              : ""
          }
        </div>
      </div>
    </>
  );
}

export default App;
