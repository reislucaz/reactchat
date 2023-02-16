import Container from '../../Components/Auth/Container';
import ContainerSide from '../../Components/Auth/Container-Side';
import Form from '../../Components/Auth/Form';
import Image from '../../Components/Auth/Image';
import TextInput from '../../Components/Auth/TextInput';
import Title from '../../Components/Auth/Title';
import SubmitInput from '../../Components/Auth/SubmitInput';
import Hr from '../../Components/Auth/Hr'
import { useState } from 'react';
import MediaQuery from 'react-responsive';
import submitLogin from './alert';
import { useNavigate } from 'react-router-dom';
import NavigateButton from '../../Components/Auth/NavigateButton';

function Login () {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        submitLogin({ login, password }, navigate);
    }

    return (
        <Container width="90vh" height="60vh" style={ { backgroundColor: '#A2BB79' } }>
            <ContainerSide>
                <Title text="ReactChat"/>
                <Form onSubmit={e => handleSubmit(e)}>
                    <TextInput type="text" placeholder='Login' name='login' id='login' onChange={(e) => setLogin(e.target.value)}/>
                    <TextInput type="password" placeholder='Senha' name='password' id='password' onChange={(e) => setPassword(e.target.value)}/>
                    <SubmitInput value='Entrar' style={{ fontSize: '1.5em', width: '30%'}}/>
                </Form>
                <Hr />
                <NavigateButton to="/register" value="Registrar"/>
            </ContainerSide>
            <MediaQuery minWidth={880}>
                <ContainerSide>
                    <Image src="https://www.gstatic.com/webp/gallery/4.webp" alt="Árvore" width="100%" height="100%"/>
                </ContainerSide>
            </MediaQuery>
        </Container>
    )
}

export default Login
