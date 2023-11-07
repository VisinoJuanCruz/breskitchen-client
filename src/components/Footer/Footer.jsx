import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './footer.css';

export default function Footer() {
  return (
    <div className="footer-container">
      <a href="http://www.instagram.com/breskitchenn">
        <i className="fa-brands fa-instagram fa-2xl"  style={{color: "#ed333b",}}></i>
      </a>


      <a href="https://wa.me/2215113411">
      <i class="fa-brands fa-whatsapp fa-2xl" style={{color: "#26a269"}}></i>
      </a>
     
    </div>
  );
}
