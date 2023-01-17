import React from 'react'

export default function Footer() {
  return (
    <footer className="page-footer">
        <div className="wrapper">
          <div className="back-to-top">
            <a
              className="btn-back-to-top"
              href="javascript:void(0)"
              aria-label="back to top button"
            ></a>
          </div>
          <section className="footer-top">
            <nav className="footer-primary-navigation"></nav>
            <nav className="footer-social-navigation hide-on-mobile">
              <ul>
                <li>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/payu-sa"
                    aria-label="find us on linkedin"
                    className="ico-linkedin"
                  ></a>
                </li>
              </ul>
            </nav>
          </section>
          <div className="footer-secondary-navigation hide-on-desktop">
            <ul id="menu-additional-footer-menu-1" className="">
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-5439">
                <a href="https://southafrica.support.payu.com/s/?language=en_US">
                  Support
                </a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2521">
                <a href="https://southafrica.payu.com/contact/">Contact Us</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2522">
                <a href="https://southafrica.payu.com/legal/">Legal</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3572">
                <a href="https://southafrica.payu.com/certificate-downloads/">
                  Certificates
                </a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2528">
                <a href="https://southafrica.payu.com/privacy-portal/">
                  Privacy Portal
                </a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5086">
                <a href="https://southafrica.payu.com/cookie-policy/">
                  Cookie Policy
                </a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2922">
                <a href="https://southafrica.payu.com/press-enquiries/">
                  Press Enquiries
                </a>
              </li>
            </ul>{" "}
          </div>
          <div className="bottom-vector">
            <section className="footer-bottom">
              <div className="company-logo-description">
                <img
                  src="https://southafrica.payu.com/wp-content/themes/global-website/assets/src/images/logo.png"
                  alt=""
                />
                <p>
                  Operating in over 50 countries and home to more than 43
                  nationalities, PayU is a leader in global payments and
                  innovative fintech.{" "}
                </p>
              </div>
              <div className="footer-secondary-navigation hide-on-mobile">
                <ul id="menu-additional-footer-menu-2" className="">
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-5439">
                    <a href="https://southafrica.support.payu.com/s/?language=en_US">
                      Support
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2521">
                    <a href="https://southafrica.payu.com/contact/">
                      Contact Us
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2522">
                    <a href="https://southafrica.payu.com/legal/">Legal</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3572">
                    <a href="https://southafrica.payu.com/certificate-downloads/">
                      Certificates
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2528">
                    <a href="https://southafrica.payu.com/privacy-portal/">
                      Privacy Portal
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5086">
                    <a href="https://southafrica.payu.com/cookie-policy/">
                      Cookie Policy
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2922">
                    <a href="https://southafrica.payu.com/press-enquiries/">
                      Press Enquiries
                    </a>
                  </li>
                </ul>{" "}
              </div>
            </section>
            <div className="copyright">
              <div className="footer-social-navigation hide-on-desktop">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/company/payu-sa"
                  aria-label="find us on LinkedIn opens in new window"
                  className="ico-linkedin"
                ></a>
              </div>
              <span> © Copyright 2023, PayU. All rights are reserved </span>
            </div>
          </div>
        </div>
      </footer>
  )
}
