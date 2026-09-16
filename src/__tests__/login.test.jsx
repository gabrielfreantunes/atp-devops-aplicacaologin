import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Login from '../pages/login';

const signInWithEmailAndPasswordMock = vi.hoisted(() => vi.fn());

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
}));

vi.mock('../firebase', () => ({
  auth: {},
}));

describe('Tela de Login', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('deve renderizar os campos de e-mail e senha', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando a autenticação falhar', async () => {
    signInWithEmailAndPasswordMock.mockRejectedValueOnce(
      new Error('Usuário não encontrado')
    );

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await user.type(
      screen.getByPlaceholderText('E-mail'),
      'teste@email.com'
    );

    await user.type(
      screen.getByPlaceholderText('Senha'),
      'senha123'
    );

    await user.click(
      screen.getByRole('button', { name: 'Acessar' })
    );

    expect(
      await screen.findByText('Usuário não está cadastrado!')
    ).toBeInTheDocument();
  });
});