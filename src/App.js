import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/store/';
import { PersistGate } from 'redux-persist/integration/react';

/**
 * páginas
 */
import Login from './view/login/index';
import NovoUsuario from './view/usuario-novo/';
import Home from './view/home/';
import RecuperarSenha from './view/usuario-recuperar-senha/';
import ViagemCadastro from './view/viagem-cadastro/';
import ViagemDetalhes from './view/viagem-detalhes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading = {null} persistor={persistor}>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route path="/viagem/:parametro" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/novousuario" component={NovoUsuario} />
          <Route exact path="/recuperarsenha" component={RecuperarSenha} />
          <Route exact path="/cadastrarviagem" component={ViagemCadastro} />
          <Route path="/viagemdetalhes/:id" component={ViagemDetalhes} />
          <Route path="/editarviagem/:id" component={ViagemCadastro} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
