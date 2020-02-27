import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ViagemCard from '../../components/viagem-card/';
import Navbar from '../../components/navbar/';
import firebase from '../../config/firebase';
//import helpers from '../../helpers/utils'

import './home.css';

export default function Home({ match }) {

  const [viagem, setViagens] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  let listaViagens = [];
  const usuarioEmail = useSelector(state => state.usuarioEmail);
 
  useEffect(() => {
    if (match.params.parametro) {
      firebase.firestore().collection('viagem').where('usuario', '==', usuarioEmail).get()
        .then(async (resultado) => {
          await resultado.docs.forEach(doc => {
            if (doc.data().titulo.indexOf(pesquisa) >= 0) {
              listaViagens.push({
                id: doc.id,
                ...doc.data()
              })
            }
          })
          setViagens(listaViagens);
        })
        .catch((erro) => {
          console.log(`Erro ao carregar a lista de Viagens: ${erro.message}`);
        })
    } else {
      firebase.firestore().collection('viagem').get()
        .then(async (resultado) => {
          await resultado.docs.forEach(doc => {
            if (doc.data().titulo.indexOf(pesquisa) >= 0) {
              listaViagens.push({
                id: doc.id,
                ...doc.data()
              })
            }
          })
          setViagens(listaViagens);
        })
    }
  }, [pesquisa]);
  return (
    <>
      <Navbar />
      <div className="my-3 px-4">
        <h4 className="text-center mb-4 mx-auto font-weight-bold">Viagens</h4>
        <input
          type="text"
          className="form-control text-center"
          placeholder="Pesquisar viagem pelo título..."
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>
      <div className="container-fluid">
        <div className="row">
          {
            viagem.map(item => <ViagemCard
              key={item.id} id={item.id}
              acessibilidade={item.acessibilidade}
              comodidades={item.comodidades}
              tipo={item.tipo}
              diaPartida={item.diaPartida}
              horaPartida={item.horaPartida}
              diaChegada={item.diaChegada}
              horaChegada={item.horaChegada}
              organizador={item.organizador[1]}
              img={item.foto}
              titulo={item.titulo}
              descricao={item.descricao}
              publica={item.publica}
              visualizacoes={item.visualizacoes} />)
          }
        </div>
      </div>
    </>
  )
}