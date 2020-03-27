import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

import api from "../../services/api";
import "./styles.css";
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg';

export default function Logon() {
  const [id, setId] = useState();
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', res.data.name);
      history.push('/profile')
    } catch (e) {
      alert('Falha no login, tente novamente.')
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Ong Ligeirinho"/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>

          <input
            placeholder="Sua Id"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FaArrowRight size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}