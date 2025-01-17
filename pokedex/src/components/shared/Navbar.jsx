import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import { ThemeContext } from '../../context/ThemeContext';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import PokemonLogo from '../../assets/PNG/PokemonLogo.png';
import UserIcon from '../../assets/ICON/user.png';

// Stylowanie przełącznika Material-UI
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#8796A5',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Navbar = () => {
  const { user, logout } = useContext(LoginContext);
  const { theme, toggleTheme, gradients } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Funkcja sprawdzająca aktywny przycisk
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex flex-col bg-blue-500 p-4" style={{ background: gradients[theme] }}>
      {/* Logo i przełącznik motywu */}
      <div className="flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <img src={PokemonLogo} alt="Pokemon Logo" className="w-full h-28" />
        </div>

        <div className="flex items-center">
          {user && (
            <>
              <img src={UserIcon} alt="User Icon" className="w-8 h-8 mx-2" />
              <span className="text-white">{user.name}</span>
            </>
          )}
          <MaterialUISwitch checked={theme === 'dark'} onChange={toggleTheme} />
        </div>
      </div>

      {/* Przyciski nawigacyjne */}
      <div className="flex flex-wrap justify-end gap-4 sm:flex-row sm:justify-end sm:gap-2">
        {!user ? (
          <>
            <button
              onClick={() => navigate('/login')}
              className={`w-full sm:w-32 bg-blue-600 text-white px-4 py-2 rounded text-center ${
                isActive('/login') ? 'border-2 border-yellow-400' : ''
              }`}
            >
              Logowanie
            </button>
            <button
              onClick={() => navigate('/register')}
              className={`w-full sm:w-32 bg-blue-600 text-white px-4 py-2 rounded text-center ${
                isActive('/register') ? 'border-2 border-yellow-400' : ''
              }`}
            >
              Rejestracja
            </button>
          </>
        ) : (
          <>
            <Link
              to="/favorites"
              className={`w-full sm:w-32 bg-blue-600 text-white px-4 py-2 rounded text-center ${
                isActive('/favorites') ? 'border-2 border-yellow-400' : ''
              }`}
            >
              Ulubione
            </Link>
            <Link
              to="/arena"
              className={`w-full sm:w-32 bg-blue-600 text-white px-4 py-2 rounded text-center ${
                isActive('/arena') ? 'border-2 border-yellow-400' : ''
              }`}
            >
              Arena
            </Link>
            <Link
              to="/ranking"
              className={`w-full sm:w-32 bg-blue-600 text-white px-4 py-2 rounded text-center ${
                isActive('/ranking') ? 'border-2 border-yellow-400' : ''
              }`}
            >
              Ranking
            </Link>
            <Link
              to="/edit"
              className={`w-full sm:w-32 bg-blue-600 text-white px-4 py-2 rounded text-center ${
                isActive('/edit') ? 'border-2 border-yellow-400' : ''
              }`}
            >
              Edycja
            </Link>
            <button
              onClick={logout}
              className="w-full sm:w-32 bg-blue-600 text-white px-4 py-2 rounded text-center"
            >
              Wyloguj
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
