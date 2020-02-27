import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar/';

import './viagem-detalhes.css';


export default function ViagemDetalhes(props) {

  const [viagem, setViagem] = useState({});
  const [urlImg, setUrlImg] = useState({});
  const [carregando, setCarregando] = useState(true);
  const usuarioLogado = useSelector(state => state.usuarioEmail);
  const [excluido, setExcluido] = useState();

  function remover(){
    firebase.firestore().collection('viagem').doc(props.match.params.id).delete()
        .then(() => {
          setExcluido(true);
        });
  }

  useEffect(() => {
    if (carregando) {
      firebase.firestore().collection('viagem').doc(props.match.params.id).get()
        .then(resultado => {
          setViagem(resultado.data());
          firebase.firestore().collection('viagem').doc(props.match.params.id).update('visualizacoes', resultado.data().visualizacoes + 1);
          firebase.storage().ref(`imagens/${resultado.data().foto}`).getDownloadURL()
            .then(url => {
              setUrlImg(url);
              setCarregando(false);
            })
        })
    } else {
      firebase.storage().ref(`imagens/${viagem.foto}`).getDownloadURL()
        .then(url => setUrlImg(url))
    }
  }, []);

  return (
    <>
      <Navbar />
      { excluido ? <Redirect to="/" /> : null }
      <div className="container-fluid">

        {
          carregando ?
            <div className="row mt-5">
              <div className="spinner-border mx-auto" role="status"><span className="sr-only">Loading...</span></div>
            </div>
            :
            <div>
              <div className="row">
                <div className="container-img">
                  <img src={urlImg} alt="Banner" className="img-banner" />
                </div>
                <div className="col-md-12 mt-2 text-right ">
                  <img src="../assets/eye.svg" alt="" className="ico-eye mx-2" />
                  <span>{viagem.visualizacoes + 1}</span>
                </div>
              </div>
              <h4 className="mt-4 text-center font-weigth-bold title">{viagem.titulo}</h4>
              <div className="row mt-3 d-flex justify-content-around text-center">
                <div className="col-md-2 col-sm-12 box-info p3 my-3">
                  <img src="../assets/ways.svg" alt="" />
                  <h5>
                    <strong>
                      Tipo
                  </strong>
                  </h5>
                  <span className="mb-3">{viagem.tipo}</span>
                </div>
                <div className="col-md-2 col-sm-12 box-info p3 my-3">
                  <img src="../assets/date.svg" alt="" />
                  <h5>
                    <strong>
                      Data / Hora
                  </strong>
                  </h5>
                  <em className="detailsTitle">(Partida)</em>
                  <span className="mb-3">{viagem.dataPartida} / {viagem.horaPartida}</span>
                </div>
                <div className="col-md-2 col-sm-12 box-info p3 my-3">
                  <img src="../assets/date.svg" alt="" />
                  <h5>
                    <strong>
                      Data / Hora
                  </strong>
                  </h5>
                  <em className="detailsTitle">(Chegada)</em>
                  <span className="mb-3">{viagem.dataChegada} / {viagem.horaChegada}</span>
                </div>
                <div className="col-md-2 col-sm-12 box-info p3 my-3">
                  <img src="../assets/place.svg" alt="" />
                  <h5>
                    <strong>
                      Local
                  </strong>
                  </h5>
                  <span className="mb-3">{viagem.local}</span>
                </div>
              </div>
              <div className="row mt-3 mb-4 d-flex justify-content-around text-center">
                <div className="col-md-12">
                  <div className="box-detalhes mt-5">
                    <h5 className="mx-auto"><strong>Detalhes da viagem</strong></h5>
                    <p className="text-justify">{viagem.descricao}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="box-detalhes mt-5">
                    <h5 className="mx-auto"><strong>Características viagem</strong></h5>
                    <p className="text-justify">Possui lugares para pessoas com necessidades especiais? <strong>{viagem.acessibilidade ? "Sim" : "Não"}</strong></p>
                    <p className="text-justify">Haverá comodidades? <strong>{(viagem.comodidades != "") ? "Sim" : "Não"}</strong></p>
                    {
                      viagem.comodidades != "" ?
                      <p className="text-justify">Quais? <strong>{viagem.comodidades}</strong></p>
                      :
                      null
                    }

                  </div>
                </div>                          
                <div className="col-md-4 vertical-bar-lr">
                  <div className="box-detalhes mt-5">
                    <h5 className="mx-auto"><strong>Valores</strong></h5>
                    <p className="text-justify">{viagem.valorPassageiro}</p>
                    <h5 className="mx-auto"><strong>Métodos de pagamento</strong></h5>
                    <p className="d-flex flex-column align-items-center">
                      <button className="btn btn-primary btn-block mb-1">PagSeguro</button>
                      <button className="btn btn-primary btn-block">PagSeguro</button>      
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                 <div className="box-detalhes mt-5">
                    <h5 className="mx-auto"><strong>Mapa</strong></h5>
                  </div> 
                  <div className="box-detalhes mt-5">
                    <h5 className="mx-auto"><strong>Previsão do tempo</strong></h5>
                  </div> 
                </div>
              </div>
              {
                usuarioLogado !== viagem.usuario ?
                <>
                  <button type="button" class="btn btn-adesao" data-toggle="modal" data-target="#pagamento">
                   <img src="../assets/tickets.svg" alt="Quero participar"/> Quero participar
                  </button>

                  <div class="modal fade" id="pagamento" tabindex="-1" role="dialog" aria-labelledby="mdl-pagameto" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="pagameto">Modal title</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          ...
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                :
                  ''
              }
              {
                usuarioLogado === viagem.usuario ?
                  <Link to={`/editarviagem/${props.match.params.id}`} className="btn-editar">
                    <img src="../assets/edit.svg" alt="" className="ico-btn-editar" />
                    <span className="txt-btn-editar">Editar viagem</span>
                  </Link>
                :
                  ''
              }
              {
                usuarioLogado === viagem.usuario ?
                  <button
                    className="btn-remover"
                    type="button"
                    onClick={remover}
                  >
                    <img src="../assets/remove.svg" alt="" className="ico-btn-editar" />
                    <span className="txt-btn-editar">Remover viagem</span>
                  </button>
                :
                  null
              }
            </div>

        }
      </div>
    </>
  );
}