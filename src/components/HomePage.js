import React from 'react';
import CallToAction from './CallToAction';
import Specials from './Specials';
import CustomersSay from './CustomersSay';
import Chicago from './Chicago';
import '../styles/styles.css';

function HomePage() {
  return (
    <div className="container">
      <CallToAction />
      <Specials />
      <CustomersSay />
      <Chicago />
    </div>
  );
}

export default HomePage;