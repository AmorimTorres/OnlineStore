import React from 'react';
import { Link } from 'react-router-dom';
import ItemsCart from '../Components/ItemsCart';
import Header from '../Components/Hearder';
import Footer from '../Components/Footer';
import './Cart.css';

class Cart extends React.Component {
  state = {
    totalCartValue: 0,
    results: [],
    counterListCart: 0,
  }

  componentDidMount() {
    this.getProductsLocalStorage();
  }

  getProductsLocalStorage = () => {
    const localStorageItems = localStorage.getItem('cartItems');
    const localStorageCounter = localStorage.getItem('Counter');
    this.setState({
      results: localStorageItems ? JSON.parse(localStorageItems) : [],
      counterListCart: JSON.parse(localStorageCounter),
    }, () => { this.calculateTotalCartValue(); });
  }

  calculateTotalCartValue = () => {
    const { results } = this.state;
    const totalCartValue = results
      .reduce((prev, { price, qtd }) => prev + price * qtd, 0);
    this.setState({ totalCartValue });
  }

  addQtd = (productId) => {
    const { results } = this.state;
    const newList = results.map((item) => {
      if (item.id === productId) {
        item.qtd += 1;
      }
      return item;
    });
    this.setState({ results: newList },
      () => {
        localStorage.setItem('cartItems', JSON.stringify(results));
        this.calculateTotalCartValue();
      });
  }

  subQtd = (productId) => {
    const { results } = this.state;
    const newList = results.map((item) => {
      if (item.id === productId && item.qtd > 1) {
        item.qtd -= 1;
      }
      return item;
    });
    this.setState({ results: newList },
      () => {
        localStorage.setItem('cartItems', JSON.stringify(results));
        this.calculateTotalCartValue();
      });
  }

  removeProduct = (productId) => {
    const { results } = this.state;
    const newList = results.filter(({ id }) => id !== productId);
    this.setState({ results: newList },
      () => {
        localStorage.setItem('cartItems', JSON.stringify(newList));
        this.calculateTotalCartValue();
      });
  }

  render() {
    const { results, totalCartValue, counterListCart } = this.state;
    console.log(typeof counterListCart);
    return (
      <div className="page-cart">
        <Header
          counterListCart={ counterListCart }
        />
        <div className="cart-container">
          <h1>Meu carrinho</h1>
          {results.length > 0 ? (
            results.map(({ id, title, price, thumbnail, qtd }) => (
              <ItemsCart
                key={ id }
                id={ id }
                title={ title }
                price={ price }
                image={ thumbnail }
                itemCounter={ qtd }
                addQtd={ () => this.addQtd(id) }
                subQtd={ () => this.subQtd(id) }
                removeProduct={ () => this.removeProduct(id) }
              />
            ))
          ) : (
            <p
              data-testid="shopping-cart-empty-message"
              className="text-empty-cart"
            >
              Seu carrinho está vazio
            </p>
          )}

          <h3>
            {`Valor total: ${totalCartValue
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
          </h3>
          <Link to="./closepurchase">
            <button
              type="button"
              name="go-to-close-purchase"
              className="btn-purchase"
              data-testid="checkout-products"
            >
              Finalizar Compra
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Cart;
