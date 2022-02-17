function setLocalStorage(cartItens, counterCart) {
  localStorage.setItem('cartItems', JSON.stringify(cartItens));
  localStorage.setItem('Counter', JSON.stringify(counterCart));
}

export default setLocalStorage;
