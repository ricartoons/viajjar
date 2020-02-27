import React, { useState } from 'react';
import firebase from 'firebase';
import Navbar from '../../components/navbar/';
import 'firebase/auth';
import './usuario-recuperar-senha.css';

export default function UsuarioRecuperarSenha(){

  const [email, setEmail] = useState();
  const [msg, setMsg] = useState();

  function RecuperarSenha(){
    firebase.auth().sendPasswordResetEmail(email)
      .then((resultado) => {
        setMsg('Foi enviado um email com um link para você re-definir sua senha ;)');
      })
      .catch((erro)=>{
        setMsg('Verifique se o email está corrento. Log do erro para o HelpDesk: ', erro.message);
      })
  }

  return(
    <>
      <Navbar />
      <div className="form__recuperar-senha">
        <form className="text-center form-login mx-auto mt-5">
          <h3 className="mb-3 font-weight-bold">Recuperar senha</h3>
          <input type="email" className="form-control my-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          <div className="msg my-4 text-center">
            <span>
              {msg}
            </span>
          </div>
          <buttom className="btn btn-lg btn-block btn-enviar" onClick={RecuperarSenha}>Recuperar senha</buttom>
        </form>
      </div>
    </>
  );
}