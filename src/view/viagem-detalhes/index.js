import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar/';
//import da api de pagto de terceiros
import apiDeTerceiros from '../../config/firebase';

import './viagem-detalhes.css';


export default function ViagemDetalhes(props) {

  const [viagem, setViagem] = useState({});
  const [urlImg, setUrlImg] = useState({});
  const [qtde, setQtde] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const usuarioLogado = useSelector(state => state.usuarioEmail);
  const [excluido, setExcluido] = useState();

  function remover() {
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

  const geraPedido = () => {
    if (!qtde || qtde <= 0) {
      console.log('Exibir mensagem de erro informando que a quantidade ou valor estão incorretos');
    }
    let valorTotal = qtde*viagem.valorPassageiro;
    //Verificar na api do gateway de pagto como devemos passar os dados
    const objPedido = {
      valorTotal
    }
    //chamar API e passar o objPedido
    apiDeTerceiros.comprar(objPedido);
  }

  return (
    <>
      <Navbar />
      {excluido ? <Redirect to="/" /> : null}
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
                <div className="col-md-2 col-sm-12 box-info p3 my-3">
                  <img src="../assets/cash.svg" alt="" />
                  <h5>
                    <strong>
                      Valor
                  </strong>
                  </h5>
                  <span className="mb-3">R$ {viagem.valorPassageiro},00</span>
                </div>
              </div>
              <div className="row mt-3 mb-4 d-flex justify-content-around text-center">
                <div className="container">
                  <div className="col-md-12">
                    <div className="box-detalhes mt-5">
                      <h5 className="mx-auto"><strong>Detalhes da viagem</strong></h5>
                      <p className="text-justify">{viagem.descricao}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3 mb-4 d-flex justify-content-around text-center">
                <div className="d-flex container">
                  <div className="col-md-5 vertical-bar-r">
                    <div className="box-detalhes mt-5">
                      <h5 className="mx-auto"><strong>Características viagem</strong></h5>
                      <ul>
                        <li className="text-justify">Possui lugares para pessoas com necessidades especiais? <strong>{viagem.acessibilidade ? "Sim" : "Não"}</strong></li>
                        <li className="text-justify">Haverá comodidades? <strong>{(viagem.comodidades != "") ? "Sim" : "Não"}</strong></li>
                        {
                          viagem.comodidades != "" ?
                            <p className="text-justify">Quais? <strong>{viagem.comodidades}</strong></p>
                            :
                            null
                        }

                      </ul>

                    </div>
                    <div className="box-detalhes mt-5">
                      <h5 className="mx-auto"><strong>Previsão do tempo</strong></h5>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="box-detalhes mt-5">
                      <h5 className="mx-auto"><strong>Mapa</strong></h5>
                    </div>

                  </div>
                </div>
              </div>
              {
                usuarioLogado !== viagem.usuario ?
                  <>
                    <button type="button" className="btn btn-adesao" data-toggle="modal" data-target="#pagamento">
                      <img src="../assets/tickets.svg" alt="Quero participar" className="ico-btn-adesao" /> <span className="txt-btn-adesao">Quero viajjar</span>
                    </button>

                    <div className="modal fade" id="pagamento" tabIndex="-1" role="dialog" aria-labelledby="mdl-pagameto" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="pagameto">Pagamento</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body d-flex">
                            <div className="col-md-6">
                              <p>Escolha quantas passagens deseja adquirir</p>
                              <input type="number" className="form-control" onChange={(e) => setQtde(e.target.value)} value={qtde && qtde} />
                            </div>
                            <div className="col-md-6">
                              <p><strong>Detalhe da compra</strong></p>
                              <p>
                                Valor por passageiro: {viagem.valorPassageiro}
                              </p>
                              <p>
                                Quantidade: {qtde}
                              </p>
                              <p>Total: R$ {viagem.valorPassageiro * qtde},00</p>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-fechar" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-comprar" onClick={geraPedido}>Comprar</button>
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
