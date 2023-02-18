import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AuthProvider from "../Contexts/auth"
import Error from "../Pages/Error"
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import { PrivateRoute } from "./private"

const RoutesApp = () => {

    // Esse componente é responsável por gerenciar as rotas da aplicação!
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Login/>} />
                    <Route path='/register' element={<Register/>}></Route>
                    <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>}></Route>
                    <Route path='*' element={<Error error={404}/>}></Route>
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default RoutesApp
