import Form from "../../Components/Auth/Form";
import Container from "../../Components/Auth/Container";
import ContainerSide from "../../Components/Auth/Container-Side";
import SubmitInput from "../../Components/Auth/SubmitInput";
import TextInput from "../../Components/Auth/TextInput";
import Title from "../../Components/Auth/Title";
import Image from "../../Components/Auth/Image";
import { useState } from "react";
import MediaQuery from "react-responsive";
import alertRegister from "./alert";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../../Components/Auth/NavigateButton";

function Register () {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        alertRegister({ name, login, password }, navigate);
    }

    return (
        <Container width="90vh" height="60vh">
            <ContainerSide style={ { backgroundColor: '#A2BB79' } }>
                <Title text="Cadastro" style={{ fontSize: '3em'}}/>
                <Form onSubmit={e => handleRegister(e)}>
                    <TextInput type="text" placeholder='Nome' name='login' id='login' onChange={e => setName(e.target.value)}/>
                    <TextInput type="text" placeholder='Login' name='login' id='login' onChange={e => setLogin(e.target.value)}/>
                    <TextInput type="password" placeholder='Senha' name='password' id='password' onChange={e => setPassword(e.target.value)}/>
                    <SubmitInput value='Cadastrar' style={{ fontSize: '1.5em', width: '40%'}}/>
                </Form>
                <NavigateButton value="Voltar" to="/"/>
            </ContainerSide>
            <MediaQuery minWidth={880}>
                <ContainerSide style={ { backgroundColor: '#A2BB79' }}>
                    <Image src="https://www.gstatic.com/webp/gallery/5.webp" alt="Árvore" width="100%" height="100%"/>
                </ContainerSide>
            </MediaQuery>
        </Container>
    )
}

export default Register;
