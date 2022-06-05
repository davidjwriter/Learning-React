import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY = [
  {
    id: 1,
    price: 6,
    title: 'My First Book',
    description: "The first book I ever wrote",
  },
  {
    id: 2,
    price: 10,
    title: "Second book",
    description: "The second books",
  }
];


const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY.map((product) => (
          <ProductItem
            id={product.id}
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
