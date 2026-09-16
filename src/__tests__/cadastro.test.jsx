import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Cadastro from '../pages/cadastro';

const createUserWithEmailAndPasswordMock = vi.hoisted(() => vi.fn());
const setDocMock = vi.hoisted(() => vi.fn());

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: createUserWithEmailAndPasswordMock,
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  setDoc: setDocMock,
}));

vi.mock('../firebase', () => ({
  auth: {},
  db: {},
}));

describe('Tela de Cadastro', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('deve renderizar os campos de cadastro', () => {
    render(
      <MemoryRouter>
        <Cadastro />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Sobrenome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Cadastrar' })
    ).toBeInTheDocument();
  });

  it('deve exibir mensagem de sucesso quando o cadastro funcionar', async () => {
    createUserWithEmailAndPasswordMock.mockResolvedValueOnce({
      user: {
        uid: 'usuario-teste-123',
      },
    });

    setDocMock.mockResolvedValueOnce();

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Cadastro />
      </MemoryRouter>
    );

    await user.type(
      screen.getByPlaceholderText('Nome'),
      'Gabriel'
    );

    await user.type(
      screen.getByPlaceholderText('Sobrenome'),
      'Freire'
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
      screen.getByRole('button', { name: 'Cadastrar' })
    );

    expect(
      await screen.findByText('Usuário cadastrado com sucesso!')
    ).toBeInTheDocument();
  });
});