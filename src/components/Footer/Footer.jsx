import React from "react";
import logoQuodem from '../../assets/logo-quodem-color.png';

const Footer = () => {
  return <footer>
          <div className="content-footer-full">
            <img src={logoQuodem} alt="logo-Quodem" className="logo-footer"/>
            <div className="content-iso">
              <p>ISO 27001 Certified Company:</p>
              <img src="https://quogame.quodem.net/wp-content/themes/quodem-theme/img/logos/logo-aenor.jpg" alt="aenor-logo" />
            </div>
            <div className="content-partner">
              <p>Partner:</p>
              <img src="https://quogame.quodem.net/wp-content/themes/quodem-theme/img/logos/md-vip.png" alt="WPVip" /><img src="https://quogame.quodem.net/wp-content/themes/quodem-theme/img/logos/ui-path.png" alt="UI-Path" /><img src="https://quogame.quodem.net/wp-content/themes/quodem-theme/img/logos/validated-id.png" alt="Validated-ID" />
            </div>
          </div>
          <div className="content-footer-full blue border-bot">
            <div className="content-redes">
              <a href="https://twitter.com/_quodem_" class="icon-twitter" rel="noreferrer" target="_blank"> </a>
              <a href="https://es.linkedin.com/company/quodem-consultores" rel="noreferrer" class="icon-linkedin" target="_blank"> </a>
              <a href="https://www.youtube.com/channel/UC_iuhbn0F04cgo4nqjVTNyA" rel="noreferrer" class="icon-youtube" target="_blank"> </a>
            </div>
            <div className="content-privacy">
              <a href="https://quodem.com/en/use-of-cookies/" target="_blank" rel="noreferrer">Use of Cookies</a>
              <a href="https://quodem.com/en/privacy-policy/" target="_blank" rel="noreferrer">Privacy Policy</a>
              <a href="https://quodem.com/en/terms-and-conditions/" class="" target="_blank" rel="noreferrer">Terms and Conditions</a>
              <a href="https://quodem.com/en/security-policy/" class="" target="_blank" rel="noreferrer">Security Policy</a>
            </div>
          </div>
          <div className="content-footer-full blue">
            <div class="content-copy">© 2022 All Rights Reserved. Quodem Global Digital Company</div>
          </div>
        </footer>;
};

export default Footer;
