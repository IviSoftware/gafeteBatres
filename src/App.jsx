import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState(null);

  // Función para obtener el parámetro 'email' de la URL
  const getEmailFromQuery = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('email');
  };

  // Función para obtener los datos desde la API
  const fetchDataFromAPI = async (email) => {
    try {
      const formData = new URLSearchParams({
        evento: '14',
        action: 'getUserByEmail',
        email: email,
      });

      const response = await fetch('https://api.integrameetings.com/v1/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      });

      const data = await response.json();
      console.log(data); // Imprime los datos obtenidos
      setUserData(data.user); // Guarda los datos del usuario en el estado
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const email = getEmailFromQuery();
    if (email) {
      fetchDataFromAPI(email);
    }
  }, []);

  return (
    <section className="containerCardMainer animated-entry">
      <img
        className="headerImage fade-in"
        src="https://raw.githubusercontent.com/Integra-Meetings/batresCorreoImagenes/main/headerRegistro.png"
        alt="Header"
      />
      <h1 className="fullName slide-up">
        {userData ? `${userData.nombre} ${userData.apellido}` : 'Cargando...'}
      </h1>
      <h2 className="position slide-up-delay">{userData ? userData.sucursal : 'Cargando...'}</h2>

      <div className="preFooter fade-in-delay">
        <h3>{userData ? userData.region : 'Cargando...'}</h3>
      </div>

      <div className="footerMainer fade-in-delay">
        <a
          href="https://www.facebook.com/FarmBatres?mibextid=JRoKGi"
          style={{ color: '#ffffff', textDecoration: 'underline' }}
        >
          <img
            alt="logo_facebook"
            src="https://raw.githubusercontent.com/Integra-Meetings/batresCorreoImagenes/main/facebook.png"
            className="icon"
          />
        </a>
        <a
          href="https://www.instagram.com/farmbatres/"
          style={{ color: '#ffffff', textDecoration: 'underline' }}
        >
          <img
            alt="logo_instagram"
            src="https://raw.githubusercontent.com/Integra-Meetings/batresCorreoImagenes/main/ig.png"
            className="icon"
          />
        </a>
        <a
          href="https://www.linkedin.com/authwall?trk=gf&trkInfo=AQEcnEVbLDwmqAAAAZGkpdx4aR91L7moL1dZERknaTasrnWUr3ua2P652amUrfqqY4abb2frP48DZGBk17Sl-0rmEPmNtWjJb4qL-F8cHgjfktekB_EaVMFMK0Vhvvwo7zoMW2g=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fcorporaci%25C3%25B3n-batres-1b4141249%2F"
          style={{ color: '#ffffff', textDecoration: 'underline' }}
        >
          <img
            alt="logo_linkedin"
            src="https://raw.githubusercontent.com/Integra-Meetings/batresCorreoImagenes/main/linkedin.png"
            className="icon"
          />
        </a>
      </div>
    </section>
  );
};

export default App;
