import React, { Component } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import logo from '../assets/logo_puc.png';
import '../index.css';

class Principal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      sobrenome: '',
      dataNascimento: '',
      saiu: false
    };
  }

  async componentDidMount() {

    const usuario = auth.currentUser;

    if (usuario) {

      const documento = await getDoc(
        doc(db, 'usuarios', usuario.uid)
      );

      if (documento.exists()) {

        const dados = documento.data();

        this.setState({
          nome: dados.nome,
          sobrenome: dados.sobrenome,
          dataNascimento: dados.dataNascimento
        });
      }
    }
  }

  sair = async () => {

    await signOut(auth);

    this.setState({
      saiu: true
    });
  }

  render() {

    if (this.state.saiu) {
      return <Navigate to="/" />;
    }

    return (
      <div className="pagina-principal">

        <div className="card-principal">

          <img
            src={logo}
            alt="Logo PUCPR"
            className="logo"
          />

          <h1>Principal</h1>

          <div className="dados-usuario">

            <div className="dado">
              <span>Nome</span>
              <strong>{this.state.nome}</strong>
            </div>

            <div className="dado">
              <span>Sobrenome</span>
              <strong>{this.state.sobrenome}</strong>
            </div>

            <div className="dado">
              <span>Data de nascimento</span>
              <strong>{this.state.dataNascimento}</strong>
            </div>

          </div>

          <button
            className="botao-sair"
            onClick={this.sair}
          >
            Sair
          </button>

        </div>

      </div>
    );
  }
}

export default Principal;