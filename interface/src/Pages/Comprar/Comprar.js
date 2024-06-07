import { useEffect, useState } from 'react'

import ProdutoPreview from '../../components/ProdutoPreview.js'
import Footer from '../../components/Footer.js'

const Comprar = () => {

    const [produtos, setProdutos] = useState([]);

    const [tipo, setTipo] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [quartos, setQuartos] = useState(0)
    const [banheiros, setBanheiros] = useState(0)
    const [qualidade, setQualidade] = useState(0)
    const [precoVendaMin, setPrecoVendaMin] = useState(0)
    const [precoVendaMax, setPrecoVendaMax] = useState(0)

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    useEffect(() => {
        fetch("http://localhost:3001/imoveis/venda", requestOptions)
            .then((response) => response.text())
            .then((result) => JSON.parse(result))
            .then((produtos) => setProdutos(produtos))
            .catch((error) => console.error(error));
    }, [])

    const filtrarProdutos = () => {
        let query = `?disponibilidade=venda&${tipo ? `tipo=${tipo}&` : ''}${bairro ? `bairro=${bairro}&` : ''}${cidade ? `cidade=${cidade}&` : ''}${quartos ? `quartos=${quartos}&` : ''}${banheiros ? `banheiros=${banheiros}&` : ''}${qualidade ? `qualidadeMin=${qualidade}&` : ''}${precoVendaMin ? `precoVendaMin=${precoVendaMin}&` : ''}${precoVendaMax ? `precoVendaMax=${precoVendaMax}&` : ''}`

        fetch("http://localhost:3001/imoveis/busca" + query, requestOptions)
            .then((response) => response.text())
            .then((result) => JSON.parse(result))
            .then((produtos) => setProdutos(produtos))
            .catch((error) => console.error(error));
    }

    return (
        <>
            <main className='bg-gray-100 grid grid-cols-6'>
                <div id='filtro' className='col-span-2 p-12'>
                    <div className='bg-gray-300 border border-gray-500 rounded-lg w-3/3 text-lg text-left p-3'>
                        <div>
                            <label>INSIRA UM BAIRRO</label>
                            <input className='p-1 mt-1 mb-2 rounded-lg shadow-lg text-base' type='text' placeholder='e.x.: Vila Madalena' style={{ width: '314px' }} onChange={(e) => setBairro(e.target.value)}></input>
                        </div>
                        <div>
                            <label>INSIRA UMA CIDADE</label>
                            <input className='p-1 mt-1 mb-2 rounded-lg shadow-lg text-base' type='text' placeholder='e.x.: São Paulo' style={{ width: '314px' }} onChange={(e) => setCidade(e.target.value)}></input>
                        </div>
                        <div>
                            <label>QUANTIDADE DE QUARTOS</label>
                            <input className='p-1 mt-1 mb-2 rounded-lg shadow-lg text-base' type='text' placeholder='e.x.: 2' style={{ width: '314px' }} onChange={(e) => setQuartos(e.target.value)}></input>
                        </div>
                        <div>
                            <label>QUANTIDADE DE BANHEIROS</label>
                            <input className='p-1 mt-1 mb-2 rounded-lg shadow-lg text-base' type='text' placeholder='e.x.: 1' style={{ width: '314px' }} onChange={(e) => setBanheiros(e.target.value)}></input>
                        </div>
                        <div>
                            <label>AVALIAÇÃO MÍNIMA</label>
                            <input className='p-1 mt-1 mb-2 rounded-lg shadow-lg text-base' type='text' placeholder='e.x.: 4' style={{ width: '314px' }} onChange={(e) => setQualidade(e.target.value)}></input>
                        </div>
                        <div>
                            <label>TIPO DE IMÓVEL</label>
                            <select className='p-1 mt-1 mb-2 rounded-md shadow-lg text-base' style={{ width: '314px', height: '36px' }} onChange={(e) => setTipo(e.target.value)}>
                                <option value=''>Escolha um tipo de imóvel</option>
                                <option value='Casa'>Casa</option>
                                <option value='Apartamento'>Apartamento</option>
                            </select>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div>
                                <label className='text-base'>PREÇO MÍNIMO</label>
                                <input className='p-1 rounded-lg shadow-lg text-base' type='text' placeholder='0' style={{ width: '140px' }} onChange={(e) => setPrecoVendaMin(e.target.value)}></input>
                            </div>
                            <div className='text-right'>
                                <label className='text-base'>PREÇO MÁXIMO</label>
                                <input className='p-1 rounded-lg shadow-lg text-base' type='text' placeholder='ilimitado' style={{ width: '140px' }} onChange={(e) => setPrecoVendaMax(e.target.value)}></input>
                            </div>
                        </div>
                        <div className='flex justify-center mt-5 text-base'>
                            <button className='text-white bg-blue-700 hover:bg-blue-800 p-2 rounded-lg text-lg' onClick={() => filtrarProdutos()}>Aplicar filtros</button>
                        </div>
                    </div>
                </div>
                <div id='produtos' className='col-span-4 p-5 pt-7'>
                    <div className=''>
                        {produtos.map((prod, index) => (
                            <ProdutoPreview
                                key={index}
                                imovelID={prod.imoveisID}
                                titulo={prod.titulo}
                                rua={prod.endereco}
                                numero={prod.numero}
                                bairro={prod.bairro}
                                cidade={prod.cidade}
                                tamanho={prod.tamanho}
                                quartos={prod.quartos}
                                banheiros={prod.banheiros}
                                precoVenda={prod.preco_venda}
                                precoAluguel={prod.preco_aluguel}
                                qualidade={prod.qualidade}
                                disponibilidade={prod.disponibilidade}
                            />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Comprar