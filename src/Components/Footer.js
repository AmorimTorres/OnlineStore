import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="logo-footer">
        <Link
          to="./"
          className="logo-footer"
        >
          <img src="../iconfinder-icon3.svg" alt="logo" />
          <p>trybeStore</p>
        </Link>
      </div>
    );
  }
}

export default Footer;
