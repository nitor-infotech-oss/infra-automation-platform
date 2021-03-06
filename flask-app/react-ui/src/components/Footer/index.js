import React from 'react';

/* component styles */
import { styles } from './styles.scss';

const Footer = () => (
  <footer className={`${styles}`}>
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <p>Copyright © 2020, Nitor Infotech Pvt. Ltd., All rights reserved, Confidential</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
