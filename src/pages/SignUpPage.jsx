import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import {useState, useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
// import { register, checkPermission } from '../api/auth'
import Swal from 'sweetalert2'
import {useAuth} from '../contexts/AuthContext'


const SignUpPage = () => {
  const[username, setUsername] = useState('')
const[password, setPassword] = useState('')
const [email, setEmail] = useState('')
const navigate = useNavigate()
const {register, isAuthenticated} = useAuth()

 const handleClick = async () => {
      if (username.length === 0) {
        return;
      }
      if (password.length === 0) {
        return;
      }
      if (email.length === 0) {
        return;
      }

    const success = await register({
      username,
      email,
      password,
    });

    if (success) {
      // localStorage.setItem('authToken', authToken);
      Swal.fire({
        position: 'top',
        title: '註冊成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      // navigate('/todos')
      return;
    }
    Swal.fire({
      position: 'top',
      title: '註冊失敗！',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    if(isAuthenticated){
    navigate('/todos')
   }
    // const checkTokenIsValid = async () => {
    //   const authToken = localStorage.getItem('authToken');
    //   if (!authToken) {
    //     return;
    //   }
    //   const result = await checkPermission(authToken);
    //   if (result) {
    //     navigate('/todos');
    //   }
    // };

    // checkTokenIsValid();
  }, [navigate, isAuthenticated]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput 
        label='帳號'
        value={username}
        placeholder='請輸入帳號'
        onChange={(nameInputValue) => setUsername(nameInputValue)}
        />
    </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput 
        label='Email'
          value={email}
          placeholder='請輸入 email'
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
        type="password"
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login"> 
       <AuthLinkText>取消</AuthLinkText>
      </Link>
     
    </AuthContainer>
  );
};

export default SignUpPage;
