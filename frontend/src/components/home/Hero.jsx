import "./Hero.css";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaLock,
  FaUsers,
  FaArrowRight
} from "react-icons/fa";

import heroImage from "../../assets/images/hero-illustration.jpg";

function Hero() {
  return (
    <section className="hero-section">
      <div className="container-fluid px-0">

        <div className="row g-0 align-items-center">

          {/* LADO IZQUIERDO */}
          <div className="col-lg-5 hero-left">

            <div className="hero-content">

              <h1 className="hero-title">
                Protegemos lo que
                <br />
                más te <span>importa</span>
              </h1>

              <p className="hero-description">
                Soluciones avanzadas de ciberseguridad para proteger tu empresa,
                tus datos y tu futuro en un mundo digital.
              </p>

              <div className="hero-features">

                <div className="feature-item">
                  <div className="feature-circle">
                    <FaShieldAlt />
                  </div>

                  <div>
                    <h6>Protección</h6>
                    <p>Avanzada</p>
                  </div>
                </div>

                <div className="feature-divider"></div>

                <div className="feature-item">
                  <div className="feature-circle">
                    <FaLock />
                  </div>

                  <div>
                    <h6>Seguridad</h6>
                    <p>Confiable</p>
                  </div>
                </div>

                <div className="feature-divider"></div>

                <div className="feature-item">
                  <div className="feature-circle">
                    <FaUsers />
                  </div>

                  <div>
                    <h6>Monitoreo</h6>
                    <p>24/7</p>
                  </div>
                </div>

              </div>

              <Link
                to="/signup"
                className="btn hero-btn"
              >
                <FaShieldAlt />
                Conoce nuestras soluciones
                <FaArrowRight />
              </Link>

            </div>

          </div>

          {/* LADO DERECHO */}
          <div className="col-lg-7">

            <div className="hero-image-container">

              <img
                src={heroImage}
                alt="Ciberseguridad"
                className="hero-image"
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
