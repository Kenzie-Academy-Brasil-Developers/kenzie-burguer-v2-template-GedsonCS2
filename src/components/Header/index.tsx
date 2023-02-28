import { MdShoppingCart, MdLogout } from 'react-icons/md';
import { useContext } from 'react';
import { StyledHeader } from './style';
import SearchForm from './SearchForm';
import LogoKenzieBurguer from '../../assets/LogoKenzieBurguer.svg';

import { StyledContainer } from '../../styles/grid';

import { UserContext } from '../../providers/UserContext';

const Header = () => {
  const { setOpenmodal, userLogout } = useContext(UserContext);

  return (
    <StyledHeader>
      <StyledContainer containerWidth={1300}>
        <div className='flexGrid'>
          <img
            src={LogoKenzieBurguer}
            alt='Kenzie Burguer Logo'
            className='logo'
          />
          <nav className='nav' role='navigation'>
            <SearchForm />
            <div className='buttons'>
              <button
                type='button'
                onClick={() => {
                  setOpenmodal(true);
                }}
              >
                <MdShoppingCart size={28} />
              </button>
              <button
                type='button'
                onClick={() => {
                  userLogout();
                }}
              >
                <MdLogout size={28} />
              </button>
            </div>
          </nav>
        </div>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
