import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar/';

import './viagem-cadastro.css';

export default function ViagemCadastro(props) {

  const [carregando, setCarregando] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [acessibilidade, setAcessibilidade] = useState();
  const [ciaTransporte, setCiaTransporte] = useState();
  const [comodidades, setComodidades] = useState();
  const [descricao, setDescricao] = useState();
  const [diaPartida, setDiaPartida] = useState();
  const [horaPartida, setHoraPartida] = useState();
  const [diaChegada, setDiaChegada] = useState();
  const [horaChegada, setHoraChegada] = useState();
  const [fotoNova, setFotoNova] = useState();
  const [fotoAtual, setFotoAtual] = useState();
  const [listaEspera, setListaEspera] = useState();
  const [local, setLocal] = useState();
  const [titulo, setTitulo] = useState();
  const [organizador, setOrganizador] = useState();
  const [passageiro, setPassageiro] = useState();
  const [publica, setPublica] = useState();
  const [tipo, setTipo] = useState();
  const [vagas, setVagas] = useState();
  const [valorPassageiro, setValorPassageiro] = useState();


  const usuarioEmail = useSelector(state => state.usuarioEmail);

  const storage = firebase.storage();
  const db = firebase.firestore();

  useEffect(() => {
    if (props.match.params.id) {
      firebase.firestore().collection('viagem').doc(props.match.params.id).get()
        .then(resultado => {
          setAcessibilidade(resultado.data().acessibilidade);
          setCiaTransporte(resultado.data().ciaTransporte);
          setComodidades(resultado.data().comodidades);
          setDescricao(resultado.data().descricao);
          setDiaPartida(resultado.data().diaPartida);
          setHoraPartida(resultado.data().horaPartida);
          setDiaChegada(resultado.data().diaChegada);
          setHoraChegada(resultado.data().horaChegada);          
          setFotoAtual(resultado.data().foto);
          setLocal(resultado.data().local);
          setTitulo(resultado.data().titulo);
          setOrganizador(resultado.data().organizador);
          setPassageiro(resultado.data().passageiro);
          setPublica(resultado.data().publica);
          setTipo(resultado.data().tipo);
          setVagas(resultado.data().vagas);
          setValorPassageiro(resultado.data().valorPassageiro);
          setTipo(resultado.data().tipo);
        })
    }
  }, [carregando]);

  function atualizar() {
    setMsgTipo(null);
    setCarregando(true);

    if (fotoNova) {
      storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);
    }
    db.collection('viagem').doc(props.match.params.id).update({
      acessibilidade: acessibilidade,
      ciaTransporte: ciaTransporte,
      comodidades: comodidades,
      descricao: descricao,
      diaPartida: diaPartida,
      horaPartida: horaPartida,
      diaChegada: diaChegada,
      horaChegada: horaChegada,
      foto: fotoNova ? fotoNova.name : fotoAtual,
      local: local,
      organizador: organizador,
      passageiro: 0,
      publica: publica,
      tipo: tipo,
      titulo: titulo,
      vagas: vagas,
      valorPassageiro: valorPassageiro
    }).then(() => {
      setMsgTipo('sucesso');
      setCarregando(false);
    }).catch(erro => {
      setMsgTipo('erro: ', erro);
      setCarregando(false);
    })
  }


  function cadastrar() {
    setMsgTipo(null);
    setCarregando(true);

    storage.ref(`imagens/${fotoNova.name}`).put(fotoNova).then(() => {
      db.collection('viagem').add({
        acessibilidade: acessibilidade,
        ciaTransporte: ciaTransporte,
        comodidades: comodidades,
        descricao: descricao,
        diaPartida: diaPartida,
        horaPartida: horaPartida,
        diaChegada: diaChegada,
        horaChegada: horaChegada,
        local: local,
        organizador: organizador,
        passageiro: 0,
        publica: publica,
        tipo: tipo,
        titulo: titulo,
        vagas: vagas,
        valorPassageiro: valorPassageiro,
        usuario: usuarioEmail,
        visualizacoes: 0,
        foto: fotoNova.name,
        publico: 1,
        criacao: new Date()
      }).then(() => {
        setMsgTipo('sucesso');
        setCarregando(false);
      }).catch(erro => {
        setMsgTipo('erro');
        setCarregando(false);
      })
    });
  }
  // variaveis

  return (
    <>
      <Navbar />
      <div className="col-12 mt-3">
        <div className="row">
          <h4 className="mx-auto font-weight-bold">
            {
              props.match.params.id ?
                'Atualizar viagem'
                :
                'Nova viagem'
            }
          </h4>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="">Título da Viagem</label>
            <input type="text" className="form-control" onChange={(e) => setTitulo(e.target.value)} value={titulo && titulo} />
          </div>

          <div className="form-group">
            <label htmlFor="">Descrição da viagem</label>
            <textarea type="text" rows="3" className="form-control" onChange={(e) => setDescricao(e.target.value)} value={descricao && descricao}></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="">Local da excursão</label>
            <input type="text" className="form-control" onChange={(e) => setLocal(e.target.value)} value={local && local} />
          </div>

          <div className="form-group row">
            <div className="col-6">
              <label htmlFor="">Data da partida</label>
              <input type="date" className="form-control" onChange={(e) => setDiaPartida(e.target.value)} value={diaPartida && diaPartida} />
            </div>
            <div className="col-6">
              <label htmlFor="">Hora da partida</label>
              <input type="time" className="form-control" onChange={(e) => setHoraPartida(e.target.value)} value={horaPartida && horaPartida} />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-6">
              <label htmlFor="">Data da chegada</label>
              <input type="date" className="form-control" onChange={(e) => setDiaChegada(e.target.value)} value={diaChegada && diaChegada} />
            </div>
            <div className="col-6">
              <label htmlFor="">Hora da chegada</label>
              <input type="time" className="form-control" onChange={(e) => setHoraChegada(e.target.value)} value={horaChegada && horaChegada} />
            </div>
          </div>    

          <div className="form-group d-flex flex-direction-row align-items-center">
            <span htmlFor="acessibilidade" className="mr-2">Terá acessibilidade?</span>
            <input type="checkbox" id="acessibilidade" name="acessibilidade" onChange={(e) => setAcessibilidade(e.target.checked)} checked={acessibilidade && acessibilidade} />
          </div>

          <div className="form-group">
          <span htmlFor="publica" className="mr-2">Essa viagem é aberta ao público?</span>
            <input type="checkbox" id="publica" name="publica" onChange={(e) => setPublica(e.target.checked)} checked={publica && publica} />
          </div>

          <div className="form-group">
            <label htmlFor="">Tipo da viagem</label>
            <select name="" id="" className="form-control" onChange={(e) => setTipo(e.target.value)} value={tipo && tipo}>
              <option disable="disabled">Selecione um tipo</option>
              <option>Escolar</option>
              <option>Negócios</option>
              <option>Passeio</option>
              <option>Turístico</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="">Número de vagas</label>
            <input type="number" className="form-control" onChange={(e) => setVagas(e.target.value)} value={vagas && vagas}/>
          </div>

          <div className="form-group">
            <label htmlFor="">Valor por passageiro</label>
            <input type="number" className="form-control" onChange={(e) => setValorPassageiro(e.target.value)} value={valorPassageiro && valorPassageiro}/>
          </div>

          <div className="form-group">
            <label htmlFor="">Companhia de transporte</label>
            <input type="text" className="form-control" onChange={(e) => setCiaTransporte(e.target.value)} value={ciaTransporte && ciaTransporte}/>
          </div>

          <div className="form-group">
            <label htmlFor="">Comodidades</label>
            <input type="text" className="form-control" onChange={(e) => setComodidades(e.target.value)} value={comodidades && comodidades}/>
          </div>

          <div className="form-group">
            <label htmlFor="">Organizador</label>
            <input type="text" className="form-control" onChange={(e) => setOrganizador(e.target.value)} value={organizador && organizador}/>
          </div>

          <div className="form-group">
            <label htmlFor="">Upload da foto: {props.match.params.id ? <em>Caso queira manter a mesma foto, não precisa clicar no botão "Escolher arquivo" </em> : null}</label>
            <input type="file" className="form-control" onChange={(e) => setFotoNova(e.target.files[0])} />
          </div>
          
          <div className="mx-auto">
            {
              carregando ? <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>
                :
                <button
                  className="btn btn-lg btn-block mt-3 btn-cadastro"
                  type="button"
                  onClick={props.match.params.id ? atualizar : cadastrar}
                >
                  {
                    props.match.params.id ?
                      'Atualizar viagem'
                      :
                      'Publicar viagem'
                  }
                </button>
            }
          </div>
        </form>
        {msgTipo === 'sucesso' &&
          <div className="msg-login text-center text-center">
            <span><strong>WoW!!!</strong> Viagem publicado <span>&#128526;</span></span>
          </div>
        }
        {msgTipo === 'erro' &&
          <div className="msg-login text-center text-center">
            <span><strong>Ops!!!</strong> Não foi possível publicar a viagem &#128549;</span>
          </div>
        }
      </div>
    </>
  );
}