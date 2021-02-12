import { computeHeadingLevel } from "@testing-library/react";
import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";

import axios from "axios";

function App() {
  //Definir el State
  const [busquedaletra, setBusquedaLetra] = useState({});
  const [letra, setLetra] = useState("");

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarAPILetra = async () => {
      const { artista, cancion } = busquedaletra;

      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

      const resultado = await axios(url);

      setLetra(resultado.data.lyrics);
    };
    consultarAPILetra();
  }, [busquedaletra]);

  return (
    <Fragment>
      <Formulario setBusquedaLetra={setBusquedaLetra} />
      <div className="container mt-5 ">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
