import React, { Fragment,useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';


function App() {

  // State para el form
  const [ busqueda, setGuardarBusqueda ] = useState({
    ciudad: '',
    pais: ''
  });

  const {ciudad, pais} = busqueda;

  const[ consultar, setGuardarConsultar] = useState(false);
  const [resultado, setGuardarResultado] = useState({});
  const [error, setGuardarError] = useState(false);

  useEffect(()=>{
    
    const consultarAPI = async () => {

      if(consultar){
        const appId = process.env.REACT_APP_API_ID;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
        const respuesta = await fetch(url);
        const resultado = await respuesta.json()
        
        setGuardarResultado(resultado);
        setGuardarConsultar(false);
        
        // Si la ciudad no existe  o esta mal escrita
        if(resultado.cod === "404"){
          setGuardarError(true);
        }else{
          setGuardarError(false);
        }


      }

    }
    consultarAPI();
    // eslint-disable-next-line
  },[consultar])

  let componente;
  if(error){
    componente = <Error mensaje="No hay Resultados"/>
  }else{
    componente =  <Clima resultado = {resultado}/>
  }


  return (
    <Fragment>
      <Header
        titulo={"Clima React App"}
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setGuardarBusqueda={setGuardarBusqueda}
                setGuardarConsultar={setGuardarConsultar}
              />
            </div>
            <div className="col m6 s12">
                {componente}
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
