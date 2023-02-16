import warning from './warning.svg'
import { api } from '../../Services/api';
import Container from '../../Components/Auth/Container';
import Image from '../../Components/Auth/Image';

// Esse é um componente que eu criei para mostrar erros de requisição.
// Ele recebe o código de erro como parâmetro e mostra uma imagem de erro
// e uma mensagem de erro.
// Ele também verifica se o usuário está autenticado, e se estiver, ele redireciona
// para a página de home.
function Error (props: any) {
    const token = sessionStorage.getItem('token');

    if (token !== null) {
        api.get('/auth/profile', { headers: { Authorization: `Bearer ${token}`}}).then((response) => {
            if (response.status === 200) {
                window.location.href = '/home';
            } else {
                sessionStorage.removeItem('token');
            }
        })
    }

    return (
        <Container width='50vh' height='50vh' style={{ backgroundColor: '#A2BB79', flexDirection: 'column', color: '#fff'}}>
            <h1>Erro {props.error}</h1>
            <Image src={warning} width='50%' height='50%' alt='Imagem de Erro'/>
            <p style={{ textAlign: 'center' }}>Cheque <a href='https://restfulapi.net/http-status-codes/' style={{ color: '#222' }}>https://restfulapi.net/http-status-codes/</a>
            para saber mais sobre esse erro ou <a href='/' style={{ color: '#222' }}>volte para a página de login.</a></p>
        </Container>
    )
}

export default Error;
