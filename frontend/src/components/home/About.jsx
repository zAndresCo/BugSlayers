import React from 'react';
import { FaShieldAlt, FaCrosshairs, FaHeadset, FaChartBar } from 'react-icons/fa';
import './About.css';

const About = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: 'Experiencia Comprobada',
      subtitle: 'Años de experiencia en el sector de ciberseguridad.',
    },
    {
      icon: <FaCrosshairs />,
      title: 'Enfoque en Prevención',
      subtitle: 'Anticipamos amenazas con inteligencia predictiva.',
    },
    {
      icon: <FaHeadset />,
      title: 'Soporte Especializado',
      subtitle: 'Equipo disponible 24/7 para emergencias.',
    },
    {
      icon: <FaChartBar />,
      title: 'Innovación Constante',
      subtitle: 'Actualizamos con tecnología de punta.',
    },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-subtitle-wrapper">
          <span className="section-line"></span>
          <span className="section-label">¿QUIÉNES SOMOS?</span>
          <span className="section-line"></span>
        </div>
        <h2 className="section-title">
          Comprometidos con tu <span className="highlight">seguridad digital</span>
        </h2>
        <p className="about-description">
          Somos un equipo de expertos en ciberseguridad dedicados a proteger organizaciones
          frente a las amenazas digitales, con tecnología de punta y un enfoque humano.
        </p>
        <div className="about-divider" />
        <div className="features-row">
          {features.map((feature, index) => (
            <div key={index} className="feature-benefit">
              <div className="benefit-icon">{feature.icon}</div>
              <div className="benefit-text">
                <h4>{feature.title}</h4>
                <p>{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
