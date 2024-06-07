import { BrowserRouter, Routes, Route } from 'react-router-dom'
//components
import NavBar from './components/NavBar.js';

// Pages
import Login from './Pages/Login/Login.js'
import LoginConsultor from './Pages/LoginConsultor/LoginConsultor.js'
import Cadastrar from './Pages/Register/Cadastrar.js'
import Home from './Pages/Home/Home.js'
import Clientes from './Pages/Clientes/Clientes.js'
import Comprar from './Pages/Comprar/Comprar.js'
import Alugar from './Pages/Alugar/Alugar.js'
import SobreNos from './Pages/SobreNos/SobreNos.js'
import AnunciarImovel from './Pages/Anunciar/AnunciarImovel.js'
import Imovel from './Pages/Imovel/Imovel.js'

const App = () => {
  return (
    <div className="text-xl font-bitter font-normal text-center h-full bg-blue-600">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/comprar' element={<Comprar />} />
          <Route path='/alugar' element={<Alugar />} />
          <Route path='/sobrenos' element={<SobreNos />} />
          <Route path='/anunciarimovel' element={<AnunciarImovel />} />
          <Route path='/imovel' element={<Imovel />} />
          <Route path='/login' element={<Login />} />
          <Route path='/loginconsultor' element={<LoginConsultor />} />
          <Route path='/cadastrar' element={<Cadastrar />} />
          <Route path='/' element={<Clientes />} />
          <Route path='*' element={<Cadastrar />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
