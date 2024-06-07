import Footer from '../../components/Footer'

const SobreNos = () => {
    return (
        <>
            <main className="bg-gray-100 h-full w-full pb-5">
                <section className='p-5 text-left'>
                    <h1 className='mb-3'>Sobre nós 😄</h1>
                    <div className='p-5'>
                        <div className='text-lg text-justify'>
                            <p className='mb-2'>
                                Há mais de duas décadas, um grupo de visionários apaixonados pelo setor imobiliário uniu forças para fundar a Imóveis SA.
                                Movidos pela crença de que cada pessoa merece encontrar o lar dos seus sonhos, eles estabeleceram uma empresa que não apenas vendia imóveis, mas também transformava vidas.
                                Desde o início, a Imóveis SA se destacou por seu compromisso inabalável com a excelência, a transparência e o atendimento personalizado.
                            </p>

                            <p className='mb-2'>
                                Ao longo dos anos, a Imóveis SA cresceu de uma pequena loja local para uma referência nacional no mercado imobiliário.
                                Sua reputação de integridade e profissionalismo atraiu uma equipe talentosa e diversificada, comprometida em oferecer as melhores soluções para cada cliente.
                                Com um catálogo abrangente que vai desde aconchegantes apartamentos urbanos até majestosas propriedades rurais, a Imóveis SA se tornou a escolha confiável para todos os tipos de compradores e vendedores.
                            </p>

                            <p className='mb-2'>
                                Hoje, a Imóveis SA continua a escrever sua história de sucesso, adaptando-se às mudanças do mercado e abraçando a inovação tecnológica para melhor atender às necessidades em constante evolução dos clientes.
                                Com uma visão centrada nas pessoas e um compromisso inabalável com a excelência, a Imóveis SA está pronta para continuar sendo a primeira escolha de quem busca encontrar não apenas uma casa, mas um verdadeiro lar.
                            </p>
                        </div>

                    </div>
                    <div className='m-2 rounded h-2/3 text-2xl p-5'>
                        <form className="max-w-sm mx-auto w-1/3">
                            <div className='text-lg'>Envie-nos uma mensagem</div>
                            <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900">Seu nome</label>
                            <div className="flex formInput">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                    </svg>
                                </span>
                                <input type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="Flavio Riper"></input>
                            </div>
                            <label htmlFor="motivoMensagem" className="block mb-2 text-sm font-medium text-gray-900">Motivo da mensagem</label>
                            <div>
                                <select id="motivoMensagem" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 formInput">
                                    <option value="." defaultValue>Selecione uma opção</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="reclamacao">Reclamação</option>
                                    <option value="sugestao">Sugestão</option>
                                </select>
                            </div>
                            <label htmlFor="menssagem" className="block mb-2 text-sm font-medium text-gray-900">Sua mensagem</label>
                            <div className="mb-5 text-lg">
                                <textarea id="menssagem" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 formInput" placeholder="Deixe seu comentário..." style={{
                                    resize: 'none',
                                    height: '150px',
                                }}></textarea>
                            </div>
                            <div className='flex justify-center' style={{ width: '240px' }}>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Enviar</button>
                            </div>
                        </form>

                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default SobreNos