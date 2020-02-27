import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';

import './viagem-card.css';

export default function ViagemCard({ id, acessibilidade, comodidades, descricao, diaPartida, horaPartida, diaChegada, horaChegada, img, titulo, organizador, publica, tipo, visualizacoes }) {

  const [urlImagem, setUrlImagem] = useState();

  useEffect(() => {
    firebase.storage().ref(`imagens/${img}`).getDownloadURL()
      .then(url => setUrlImagem(url))
      .catch((erro) => {
        console.log(`Ocorreu um erro na importação da imagem: ${erro.message}`);
      })
  }, [urlImagem]);

  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-3 text-center">
      <div className="container-img-card">
        <img src={urlImagem} alt="Imagem da viagem" className="card-img-top img-cartao" />
      </div>
      <h5 className="font-weight-bold card-title">{titulo}</h5>
      <p className="card-text text-justify">{descricao}</p>
      <hr />
      <p className="options-description">Características:</p>
      <ul className="options-container">
        <li>Acessibilidade: <strong>{acessibilidade ? "Sim" : "Não"} <img className="ico-info" src="../assets/info.svg" alt="Info" /></strong></li>
        <li>Comodidades: <strong>{comodidades ? "Sim" : "Não"} <img className="ico-info" src="../assets/info.svg" alt="Info" /></strong></li>
        <li>Tipo: <strong>{tipo}</strong></li>
        <li>Partida: <strong>{diaPartida} | {horaPartida}</strong></li>
        <li>Chegada: <strong>{diaChegada} | {horaChegada}</strong></li>
      </ul>
      <div className="rodape-card d-flex align-items-center justify-content-between mt-3">
        <Link to={"/viagemdetalhes/" + id} className="btn btn-block btn-detalhes">+ detalhes</Link>
        <div className="d-flex flex-column">
          <img src="../assets/eye.svg" alt="" className="ico-eye mx-2" />
          <span>{visualizacoes}</span>
        </div>
      </div>
    </div>
  );
}
