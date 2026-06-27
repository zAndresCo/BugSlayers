import "./Hero.css";
import {
  FaShieldAlt,
  FaLock,
  FaUsers,
  FaArrowRight
} from "react-icons/fa";

import heroImage from "../../assets/images/hero-illustration.jpg";

const Hero = () => {

  const scrollToAbout = (e) => {
    e.preventDefault();
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-content">
            <h1 className="hero-title">
              Protegemos lo que más te <span>importa</span>
            </h1>

            <p className="hero-description hero-para">
              Soluciones avanzadas de ciberseguridad para proteger tu empresa,
              tus datos y tu futuro en un mundo digital.
            </p>

            <div className="hero-features">
              <div className="feature-item">
                <div className="feature-circle">
                  <FaShieldAlt />
                </div>
                <h6>Protección</h6>
                <p className="feature-text">Avanzada</p>
              </div>

              <div className="feature-item">
                <div className="feature-circle">
                  <FaLock />
                </div>
                <h6>Seguridad </h6>
                <p className="feature-text">Confiable</p>
              </div>

              <div className="feature-item">
                <div className="feature-circle">
                  <FaUsers />
                </div>
                <h6>Monitoreo</h6>
                <p className="feature-text">24/7</p>
              </div>
            </div>

            <a href="#about" onClick={scrollToAbout} className="hero-btn">
              <FaShieldAlt />
              ¿Quienes somos?
              <FaArrowRight />
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-container">
            <img
              src={heroImage}
              alt="Ciberseguridad"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
