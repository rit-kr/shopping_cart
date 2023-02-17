
export default function Product(props) {

    return (
        <>
            <div className="Product basis-3/4 bg-slate-300">
                <ul className="flex justify-between flex-wrap">
                    {
                        props.data.map(product =>
                            <li className="flex flex-col basis-3/12 relative my-8 mx-4" key={product.sku}>
                                <img className="product-img w-60" src={`./products/${product.sku}_1.jpg`} alt="Tshirt" />
                                <span className={product.isFreeShipping ? 'freeShipping' : "hidden"}>Free shipping</span>
                                <div className=" justify-center items-center flex-col">
                                    <h3>{product.title}</h3>
                                    <h3>${product.price}</h3>
                                    <button className="bg-indigo-600 px-2" onClick={() => props.handleAddToCart({ ...product, quantity: 1 })}>Add To Cart</button>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        </>
    );
}