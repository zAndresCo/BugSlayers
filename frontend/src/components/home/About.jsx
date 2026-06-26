import React from 'react';
import { FaShieldAlt, FaBrain, FaHeadset, FaRocket } from 'react-icons/fa';
import './About.css';

const About = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: 'Experiencia Comprobada',
      description: 'Contamos con años de experiencia en el sector de ciberseguridad.',
    },
    {
      icon: <FaBrain />,
      title: 'Enfoque en Prevención',
      description: 'Anticipamos las amenazas antes de que ocurran con inteligencia predictiva.',
    },
    {
      icon: <FaHeadset />,
      title: 'Soporte Especializado',
      description: 'Equipo humano disponible 24/7 para resolver tus dudas y emergencias.',
    },
    {
      icon: <FaRocket />,
      title: 'Innovación Constante',
      description: 'Actualizamos nuestras soluciones con tecnología de punta continuamente.',
    },
  ];

  return (
    <section className="about">
      <div className="container">
        <h2 className="section-title">¿QUIÉNES SOMOS?</h2>
        <p className="section-subtitle">Comprometidos con tu seguridad digital</p>
        <p className="about-description">
          Somos un equipo de expertos en ciberseguridad dedicados a proteger organizaciones
          frente a las amenazas digitales, con tecnología de punta y un enfoque humano.
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;