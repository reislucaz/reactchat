import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthProvider from "../Contexts/auth"
import Error from "../Pages/Error"
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import { PrivateRoute } from "./private"

const RoutesApp = () => {

    // Esse componente é responsável por gerenciar as rotas da aplicação!
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Login/>} />
                    <Route path='/register' element={<Register/>}></Route>
                    <Route path='/home' element={<h1>Home</h1>}></Route>
                    <Route path='*' element={<Error error={404}/>}></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default RoutesApp
