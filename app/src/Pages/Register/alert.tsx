import { NavigateFunction } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { api } from "../../Services/api";

interface RegisterData {
    name: string;
    login: string;
    password: string;
}

const MySwal = withReactContent(Swal);

function alertRegister(data: RegisterData, navigate: NavigateFunction) {
    if (data.name === '' || data.login === '' || data.password === '') {
        MySwal.fire({
            title: 'Atenção!',
            text: 'Preencha todos os campos',
            icon: 'warning',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#A2BB79',
        })
        return;
    } else {
        Swal.fire({
            didOpen: () => {
                Swal.showLoading()
                api.post('/auth/register', data).then((response) => {
                    Swal.hideLoading()
                    if (response.status >= 200) {
                        Swal.fire({
                            title: 'Sucesso!',
                            text: 'Cadastro realizado com sucesso!',
                            icon: 'success',
                            timer: 1000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        }).then(() => {
                            sessionStorage.setItem('token', response.data.access_token);
                            navigate('/home');
                        })
                    } else {
                        throw new Error(response.data)
                    }
                }).catch(() => {
                    Swal.hideLoading()
                    Swal.fire(
                        {
                            text: 'Login já cadastrado',
                            icon: 'error',
                            confirmButtonText: 'Continuar',
                            confirmButtonColor: '#A2BB79',
                            width: '400px',
                        }
                    )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }
}

export default alertRegister;
