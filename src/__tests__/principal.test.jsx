import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Principal from '../pages/principal';

const signOutMock = vi.hoisted(() => vi.fn());
const authMock = vi.hoisted(() => ({
  currentUser: null
}));

vi.mock('firebase/auth', () => ({
  signOut: signOutMock,
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
}));

vi.mock('../firebase', () => ({
  auth: authMock,
  db: {},
}));

describe('Tela Principal', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('deve realizar logout e redirecionar para a tela de login', async () => {
    signOutMock.mockResolvedValueOnce();

    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/principal']}>
        <Routes>
          <Route path="/principal" element={<Principal />} />
          <Route path="/" element={<div>Login</div>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole('button', { name: 'Sair' })
    );

    expect(signOutMock).toHaveBeenCalledWith(authMock);

    expect(
      await screen.findByText('Login')
    ).toBeInTheDocument();
  });
});