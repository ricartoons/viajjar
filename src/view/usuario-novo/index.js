import React, { useState } from 'react';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar/';

import 'firebase/auth';

import './usuario-novo.css';

export default function NovoUsuario() {

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [msg, setMsg] = useState();
  const [carregando, setCarregando] = useState();

  function cadastrar(){
    //valores default
    setCarregando(true);
    setMsgTipo(null);
    //valida email/senha
    if(!email || !senha){
      setMsgTipo('erro');
      setMsg('Você precisa informar o E-mail/Senha para realizar o cadastro');
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(resultado => {
      setMsgTipo('sucesso');
      setCarregando(false);
    })
    .catch(erro => {
      setMsgTipo('erro');
      setCarregando(false);
      console.log(erro.message);
      //de-para de mensagens de erro
      switch(erro.message)
      {
        case 'The email address is badly formatted.':
          setMsg('O formato do e-mail está fora do padrão, por favor re-insira o e-mail!');
          break;
        case 'Password should be at least 6 characters':
          setMsg('A senha inserida deve ter no minimo 6 caracteres!');
          break;
        case 'The email address is already in use by another account.':
          setMsg('Este usuário já está cadastrado em nossa base de dados!');
          break;
        default:
          
          break;
      }
    })
  }

  return (
    <>
    <Navbar />
    <div className="container form-cadastro">
      <form action="" className="text-center form-login mx-auto mt-5">
        <h1 className="h3 mb-3 texdt-black font-weight-bold">
          Cadastro
        </h1>
        <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email" />
        <input onChange={(e) => setSenha(e.target.value)}type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" />

        {carregando ? <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>
        : <button className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro" type="button" onClick={cadastrar}>Cadastrar</button>}
        {msgTipo === 'sucesso' &&
          <div className="msg-login text-center my-5 text-center">
            <span><strong>WoW!!!</strong> Seu cadastro foi realizado com sucesso!!! &#128526;</span>
          </div>
        }
        {msgTipo === 'erro' &&
          <div className="msg-login text-center my-5 text-center">
            <span><strong>Ops!!!</strong> { msg }</span>
          </div>
        }
      </form>
    </div>
    </>
  );
}