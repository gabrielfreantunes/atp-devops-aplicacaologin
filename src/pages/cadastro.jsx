import React, { Component } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import logo from '../assets/logo_puc.png';
import '../index.css';

class Cadastro extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      senha: '',
      nome: '',
      sobrenome: '',
      dataNascimento: '',
      mensagem: ''
    };
  }

  cadastrar = async () => {

    try {

      const usuario = await createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.senha
      );

      const uid = usuario.user.uid;

      await setDoc(doc(db, 'usuarios', uid), {
        uid: uid,
        email: this.state.email,
        nome: this.state.nome,
        sobrenome: this.state.sobrenome,
        dataNascimento: this.state.dataNascimento
      });

      this.setState({
        mensagem: 'Usuário cadastrado com sucesso!'
      });

    } catch (error) {

      this.setState({
        mensagem: 'Erro ao cadastrar usuário!'
      });

      console.log(error);
    }
  }

  render() {
    return (
      <div className="pagina-cadastro">

        <div className="card-cadastro">

          <img
            src={logo}
            alt="Logo PUCPR"
            className="logo"
          />

          <h1>Cadastro</h1>

          <div className="linha-campos">

            <input
              type="text"
              placeholder="Nome"
              value={this.state.nome}
              onChange={(event) => this.setState({
                nome: event.target.value
              })}
            />

            <input
              type="text"
              placeholder="Sobrenome"
              value={this.state.sobrenome}
              onChange={(event) => this.setState({
                sobrenome: event.target.value
              })}
            />

          </div>

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

          <input
            type="date"
            value={this.state.dataNascimento}
            onChange={(event) => this.setState({
              dataNascimento: event.target.value
            })}
          />

          <button onClick={this.cadastrar}>
            Cadastrar
          </button>

          <p className="mensagem">
            {this.state.mensagem}
          </p>

          <p className="cadastro-link">
            Já possui cadastro?
            <Link to="/"> Acesse</Link>
          </p>

        </div>

      </div>
    );
  }
}

export default Cadastro;