import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FinalCard extends Component {
  render() {
    const {
      title,
      price,
      image,
      itemCounter,
    } = this.props;
    return (
      <div className="items-cart-container">
        <div className="cart-img">
          <img src={ image } alt="imagem do produto" />
        </div>
        <p data-testid="shopping-cart-product-name" className="cart-name">{title}</p>
        <div className="btn-increment-wrapper">
          <p data-testid="shopping-cart-product-quantity">{ itemCounter }</p>
        </div>
        <p className="cart-price">
          {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </div>
    );
  }
}

FinalCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  itemCounter: PropTypes.number.isRequired,
};

export default FinalCard;
