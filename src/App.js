import { computeHeadingLevel } from "@testing-library/react";
import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Info from "./components/Info";

import axios from "axios";

function App() {
  //Definir el State
  const [busquedaletra, setBusquedaLetra] = useState({});
  const [letra, setLetra] = useState("");
  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarAPILetra = async () => {
      const { artista, cancion } = busquedaletra;

      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([axios(url), axios(url2)]);
      if (informacion.data.artists === null) {
        setError(true);
        return;
      } else {
        setError(false);
      }

      setLetra(letra.data.lyrics);
      setInfo(informacion.data.artists[0]);
    };
    consultarAPILetra();
  }, [busquedaletra, info]);

  const { artista, cancion } = busquedaletra;
  return (
    <Fragment>
      <Formulario setBusquedaLetra={setBusquedaLetra} />
      <div className="container mt-5 ">
        {error ? (
          <div className="row">
            <div className="col-md-6">
              <p className="alert alert-primary text-center">
                No se encontró el artista
              </p>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <Info info={info} />
            </div>
            <div className="col-md-6">
              {letra.length === 0 && Object.keys(info).length !== 0 ? (
                <p className="alert alert-primary text-center">
                  No se encontró la letra de la canción {cancion} para el
                  artista: {artista}
                </p>
              ) : (
                <Cancion letra={letra} />
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default App;
