import React from 'react'
import ExemplaresVenda from '../../components/ExemplaresVenda.js'
import ExemplaresAluguel from '../../components/ExemplaresAluguel.js'
import Footer from '../../components/Footer.js'
// import { useHref } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex h-100 w-full flex-wrap bg-gray-100'>
      <main className='m-2 w-full'>
        <section id='apresentacao' className='grid grid-cols-3 mb-32'>
          <div className='col-span-1 m-2 p-2'>
            <img src='https://rankim.com.br/blog/wp-content/uploads/2016/06/Captacao-de-Imoveis-Por-Que-Fazer.jpg' alt='imagem-de-casa' className='rounded-full'></img>
          </div>
          <div className='col-span-2 m-2 p-2'>
            <div className='text-left h-1/2 text-5xl font-medium p-8'>Encontre seu novo doce lar.</div>
            <div className='h-1/2 p-1 text-left'>
              {/* esses botões vão redirecionar para a página de produtos que estão tanto a venda quanto para alugar */}
              <button className='text-white bg-blue-700 hover:bg-blue-800 p-3 ml-7 rounded-lg text-lg' onClick={() => {
                window.location.href = 'http://localhost:3000/Comprar'
              }}>Comprar um imóvel</button>
              <button className='text-white bg-blue-700 hover:bg-blue-800 p-3 ml-7 rounded-lg text-lg' onClick={() => {
                window.location.href = 'http://localhost:3000/Alugar'
              }}>Alugar um imóvel</button>
            </div>
          </div>
        </section>

        <ExemplaresVenda />

        <section id='sobre-nos' className='mb-32 grid grid-cols-3 '>
          <div className='col-span-2 m-2 p-2 text-left'>
            <p className='text-5xl mb-5'>Nós da Imoveis SA ajudamos você a tornar seu sonho realidade!</p>
            <p className='text-xl mb-5'>Leia um pouco sobre nós para saber mais sobre o nosso trabalho 😉</p>
            {/* botão com redirect pra pagina do sobre nós */}
            <button className='text-white bg-blue-700 hover:bg-blue-800 p-3 rounded-lg text-lg' onClick={() => {
              window.location.href = 'http://localhost:3000/sobrenos'
            }}>Sobre nós</button>
          </div>
          <div className='col-span-1 m-2 p-2'>
            <img src='https://modobrincar.rihappy.com.br/wp-content/uploads/2022/03/familia-feliz.jpeg' alt='imagem-familia-feliz' className='rounded-full'></img>
          </div>
        </section>

        <ExemplaresAluguel />

      </main>

      <Footer />
    </div>
  )
}

export default Home