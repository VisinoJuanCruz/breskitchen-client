import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom'
import './footer.css';

export default function Footer() {
  return (
    <div className="footer-container">
      <Link className="link-instagram" to="http://www.instagram.com/breskitchenn">
      <p> <i className="social-icon fa-brands fa-instagram fa-2xl" ></i>
      Instagram</p>
      </Link>


      <Link className="link-whatsapp" to="https://wa.me/2215113411">
      <p><i className="social-icon fa-brands fa-whatsapp fa-2xl" ></i>
      Contacto</p>
      </Link>
     
    </div>
  );
}
