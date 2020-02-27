import React, { useState } from 'react';
import firebase from '../../config/firebase';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import 'firebase/auth';
import './login.css';

function Login(props){

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const dispatch = useDispatch();

  
  function logar(){
    firebase.auth()
    .signInWithEmailAndPassword(email,senha)
    .then(resultado =>{
      setMsgTipo('sucesso');
      dispatch({
        type: 'LOG_IN',
        usuarioEmail: email,
      });
    })
    .catch(erro => {
      setMsgTipo('erro');
    })
    
  }

  return (
    <div className="login-content d-flex">
      { useSelector(state => state.usuarioLogado) ? <Redirect to="/" /> : null }
      <form className="form-signin mx-auto">
        <div className="container-vertical text-center mt-n5">
            <img src="assets/logo.svg" alt="" className="ico-logo" />
            <span className="txt-logo">Event's loop</span>
        </div>
        <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email" />
        <input onChange={(e) => setSenha(e.target.value)}type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" />
        <button className="btn btn-lg btn-block btn-login" type="button" onClick={logar}>Login</button>
        <div className="opcoes-login my-2">
          <Link to="recuperarsenha" className="mx-2">Recuperar minha senha</Link>
          <span className="text-white ico-star">&#9733;</span>
          <Link to='novousuario' className="mx-2">Quero me cadastrar</Link>
        </div>
        {msgTipo === 'sucesso' && 
        <div className="msg-login text-white text-center my-5 text-center">
          <span><strong>WoW!!!</strong> Você está conectado <span aria-label="">&#128526;</span></span>
        </div>
        }
        {msgTipo === 'erro' && 
        <div className="msg-login text-white text-center my-5 text-center">
          <span><strong>Ops!!!</strong> Verifique se o Usuário/Senha estão corretos <span>&#128549;</span></span>
        </div>
        }
      </form>
    </div>
  );
}

export default Login;