import React, { Component } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import logo from '../assets/logo_puc.png';
import '../index.css';


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      senha: '',
      mensagem: '',
      acesso: false
    };
  }

  acessar = async () => {

    try {

      await signInWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.senha
      );

      this.setState({
        acesso: true
      });

    } catch (error) {

      this.setState({
        mensagem: 'Usuário não está cadastrado!'
      });

      console.log(error);
    }
  }

  render() {

    if (this.state.acesso) {
      return <Navigate to="/principal" />;
    }

    return (
      <div className="pagina-login">

        <div className="card-login">

          <img
            src={logo}
            alt="Logo PUCPR"
            className="logo"
          />

          <h1>Login</h1>

          <input
            type="email"
            placeholder="E-mail"
            value={this.state.email}
            onChange={(event) => this.setState({
              email: event.target.value
            })}
          />

          <input
            type="password"
            placeholder="Senha"
            value={this.state.senha}
            onChange={(event) => this.setState({
              senha: event.target.value
            })}
          />

          <button onClick={this.acessar}>
            Acessar
          </button>

          <p className="mensagem">
            {this.state.mensagem}
          </p>

          <p className="cadastro-link">
            Ainda não possui cadastro?
            <Link to="/cadastro"> Cadastre-se</Link>
          </p>

        </div>

      </div>
    );
  }
}

export default Login;