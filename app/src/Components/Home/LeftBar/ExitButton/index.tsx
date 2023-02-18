import './index.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function ExitButton () {
    const navigate = useNavigate();
    const mySwal = withReactContent(Swal);

    const handleExit = () => {
        mySwal.fire({
            title: 'Tem certeza que deseja sair?',
            text: 'Você será redirecionado para a tela de login.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#dc3545',
        }).then((result) => {
            if (result.isConfirmed) {
                mySwal.fire({
                    title: 'Saindo...',
                    text: 'Obrigado por ter usado o ReactChat!',
                    icon: 'success',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                }).then(() => {
                    sessionStorage.clear();
                    navigate('/');
                })
            }
        })
    }

    return (
        <button className="config-exit" onClick={handleExit}>Sair</button>
    )
}

export default ExitButton;
