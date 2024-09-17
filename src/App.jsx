import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState({});

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
      <h1 className="fullName slide-up" style={{padding:"10px"}}>
        {userData ? `${userData.nombre} ${userData.apellido}` : 'Cargando...'}
      </h1>

      
      <h2 className="position slide-up-delay">
      {userData ? (userData.cargo ? userData.cargo.toUpperCase() : 'Cargando cargo...') : 'Cargando cargo...'}
    </h2>


     {/** <div class="banner">
        <span class="banner-text"><b>{userData ? userData.region : 'Cargando...'}</b></span>
      </div> */}

      <div class="banner">
        <span class="banner-text"><b>INVITADO</b></span>
      </div>

      <div className="footerMainer w-full fade-in-delay" style={{padding:0,position:"relative"}}>
        <p style={{color:"white",position:"absolute",left:"15px",top:"8px"}}><b>25 / 27 SEPTIEMBRE</b></p>
        <img style={{width:'100%'}} src="https://raw.githubusercontent.com/Integra-Meetings/batresCorreoImagenes/main/BANNER%20BOTTOM%20GAFETE%201921X258%20PX.jpg" alt="footerImg" />
      </div>
    </section>
  );
};

export default App;
