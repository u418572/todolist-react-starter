import styled from 'styled-components';
import {useAuth} from '../contexts/AuthContext'
// import { useNavigate } from 'react-router-dom'
const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  p {
    font-size: 14px;
    font-weight: 300;
    margin: 2rem 0 1rem;
  }
`;

const StyledButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  vertical-align: baseline;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  outline: 0;

  font-size: 14px;
  font-weight: 300;
  margin: 2rem 0 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

 const Footer = ({numOfTodos}) => {
  // const navigate = useNavigate()
  const {logout } = useAuth()

  const handleClick = () => {
    logout()
    // localStorage.removeItem('authToken');
    // navigate('/signup');
  };

  return (
    <StyledFooter>
      <p>剩餘項目數： {numOfTodos}</p>
      <StyledButton onClick={handleClick}>登出</StyledButton>
    </StyledFooter>
  );
};

export default Footer;