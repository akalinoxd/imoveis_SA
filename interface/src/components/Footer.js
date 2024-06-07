import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className='bg-slate-800 w-full grid grid-cols-7 text-left p-2 text-white text-base'>
        <div className='ml-4'>
          <div className='text-2xl'>Imóveis</div>
          <p><a href='/Comprar'>Comprar</a></p>
          <p><a href='/Alugar'>Alugar</a></p>
          <p><a href='/AnunciarImovel'>Anunciar</a></p>
        </div>
        <div className='ml-2'>
          <div className='text-2xl'>Institucional</div>
          <p><a href='/SobreNos'>Sobre nós</a></p>
        </div>
        <div className='ml-2'>
          <div className='text-2xl'>Social</div>
          <span>
            <a href='.' className='mr-4'><FontAwesomeIcon icon={faTwitter} /></a>
            <a href='.' className='mr-4'><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href='.' className='mr-4'><FontAwesomeIcon icon={faInstagram} /></a>
          </span>
        </div>
      </footer>
  )
}

export default Footer