import React, { Component } from 'react';
import { MdPayment } from 'react-icons/md';
import { RiBarcodeFill } from 'react-icons/ri';
import FinalCard from '../Components/FinalCard';

const uf = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF',
  'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ',
  'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

class ClosePurchase extends Component {
  constructor() {
    super();
    this.state = { value: 'Estado' };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    const { value } = this.state;
    const localStorageItems = JSON.parse(localStorage.getItem('cartItems'));
    return (
      <form>
        <fieldset>
          <legend>Revise seus Produtos</legend>
          {localStorageItems.map(({ thumbnail, price, title, itemCounter, id }) => (
            <FinalCard
              key={ id }
              image={ thumbnail }
              price={ price }
              title={ title }
              itemCounter={ itemCounter }
            />
          ))}
          <p>Total: R$</p>
        </fieldset>
        <fieldset>
          <legend>Informações do Comprador</legend>
          <input
            data-testid="checkout-fullname"
            type="text"
            placeholder="Nome Completo"
            required
          />
          <input data-testid="checkout-cpf" type="text" placeholder="CPF" required />
          <input data-testid="checkout-email" type="email" placeholder="Email" required />
          <input
            data-testid="checkout-phone"
            type="tel"
            placeholder="Telefone"
            required
          />
          <input data-testid="checkout-cep" type="text" placeholder="CEP" required />
          <input
            data-testid="checkout-address"
            type="text"
            placeholder="Endereço"
            required
          />
          <input type="text" placeholder="Complemento" required />
          <input type="text" placeholder="Número" required />
          <input type="text" placeholder="Cidade" required />
          <label htmlFor="state">
            <select id="state" value={ value } onChange={ this.handleChange }>
              <option value="Estado" disabled>Estado</option>
              {
                uf.map((elem) => <option key={ elem }>{ elem }</option>)
              }
            </select>
          </label>
        </fieldset>
        <fieldset>
          <legend>Método de Pagamento</legend>
          <input type="radio" name="payment" required />
          <RiBarcodeFill />
          <input type="radio" name="payment" required />
          Visa
          <MdPayment />
          <input type="radio" name="payment" required />
          MasterCard
          <MdPayment />
          <input type="radio" name="payment" required />
          Elo
          <MdPayment />
        </fieldset>
        <button type="submit">Comprar</button>
      </form>
    );
  }
}

export default ClosePurchase;
