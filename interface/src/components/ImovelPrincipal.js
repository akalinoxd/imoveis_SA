import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faBed, faShower, faTriangleExclamation, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const ImovelPrincipal = ({ imovelID }) => {

    const [prodInfo, setProdInfo] = useState({})
    const [solicitarVisita, setSolicitarVisita] = useState(false)
    const [estaEditando, setEstaEditando] = useState(false)
    const [excluirProduto, setExcluirProduto] = useState(false)

    const [tipoResidencia, setTipoResidencia] = useState('')
    const [descricao, setDescricao] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [cep, setCep] = useState('')
    const [tamanho, setTamanho] = useState('')
    const [quantidadeQuartos, setQuantidadeQuartos] = useState('')
    const [quantidadeBanheiros, setQuantidadeBanheiros] = useState('')
    const [qualidade, setQualidade] = useState('')
    const [precoCompra, setPrecoCompra] = useState('')
    const [precoAluguel, setPrecoAluguel] = useState('')
    const [disponibilidade, setDisponibilidade] = useState('')
    const [consultorId, setConsultorId] = useState('')

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`http://localhost:3001/imoveis/${imovelID}`, requestOptions)
            .then((response) => response.text())
            .then((result) => JSON.parse(result))
            .then((produto) => {
                console.log(produto[0])
                return setProdInfo(produto[0])
            })
            .catch((error) => console.error(error));
    }, [])

    useEffect(() => {
        let { tipo, descricao, endereco, numero, bairro, cidade, cep, tamanho, quartos, banheiros, qualidade, preco_venda, preco_aluguel, disponibilidade, consultorId } = prodInfo

        setTipoResidencia(tipo)
        setDescricao(descricao)
        setEndereco(endereco)
        setNumero(numero)
        setBairro(bairro)
        setCidade(cidade)
        setCep(cep)
        setTamanho(tamanho)
        setQuantidadeQuartos(quartos)
        setQuantidadeBanheiros(banheiros)
        setQualidade(qualidade)
        setPrecoCompra(preco_venda)
        setPrecoAluguel(preco_aluguel)
        setDisponibilidade(disponibilidade)
        setConsultorId(consultorId)

    }, [prodInfo])

    const formatarPreco = (preco) => {
        return new Intl.NumberFormat('de-DE', { currency: 'BRL' }).format(preco)
    }

    const verificarDisponibilidade = () => {
        let exibicao = <></>

        switch (disponibilidade) {
            case "venda":
                exibicao = <>
                    <div>
                        <label htmlFor="precoImovel" className="block mb-2 text-sm font-medium text-gray-900">Preço do imóvel</label>
                        <input type="text" id="precoImovel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Preço do imóvel" onChange={(e) => setPrecoCompra(e.target.value)} />
                    </div>
                </>
                break
            case "aluguel":
                exibicao = <>
                    <div>
                        <label htmlFor="precoAluguel" className="block mb-2 text-sm font-medium text-gray-900">Preço do aluguel</label>
                        <input type="text" id="precoAluguel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Preço do aluguel" onChange={(e) => setPrecoAluguel(e.target.value)} />
                    </div>
                </>
                break
            case "venda_e_aluguel":
                exibicao = <>
                    <div>
                        <label htmlFor="precoImovel" className="block mb-2 text-sm font-medium text-gray-900">Preço do imóvel</label>
                        <input type="text" id="precoImovel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Preço do imóvel" onChange={(e) => setPrecoCompra(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="precoAluguel" className="block mb-2 text-sm font-medium text-gray-900">Preço do aluguel</label>
                        <input type="text" id="precoAluguel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Preço do aluguel" onChange={(e) => setPrecoAluguel(e.target.value)} />
                    </div>
                </>
                break
            default:
                exibicao = <></>
        }

        return exibicao
    }

    const precoImovel = () => {
        if (disponibilidade === 'venda') {
            return <div>{`${prodInfo.preco_venda > 0 ? `R$ ${formatarPreco(prodInfo.preco_venda)}` : ''}`}</div>
        } else if (disponibilidade === 'aluguel') {
            return <div>{`${prodInfo.preco_aluguel > 0 ? `R$ ${formatarPreco(prodInfo.preco_aluguel)}/mês` : ''}`}</div>
        } else {
            return (
                <>
                    <div>{`${prodInfo.preco_venda > 0 ? `R$ ${formatarPreco(prodInfo.preco_venda)}` : ''}`}</div>
                    <div>{`${prodInfo.preco_venda > 0 && prodInfo.preco_aluguel > 0 ? 'ou' : ''}`}</div>
                    <div>{`${prodInfo.preco_aluguel > 0 ? `R$ ${formatarPreco(prodInfo.preco_aluguel)}/mês` : ''}`}</div>
                </>
            )
        }
    }

    const agendarVisita = () => {
        if (localStorage.length > 0) {
            return (
                <>
                    <div>Deseja realmente agendar uma visíta?</div>
                    <div className='flex justify-around text-sm text-white mt-5'>
                        <button
                            className='p-2 bg-red-700 rounded'
                            onClick={() => {
                                setSolicitarVisita(false)
                            }}
                        >Cancelar</button>
                        <button
                            className='p-2 bg-blue-700 rounded'
                            onClick={() => {
                                // agendar visita
                            }}
                        >Agendar</button>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div>Para agendar uma visita é necessario fazer login. Deseja realizar login?</div>
                    <div className='flex justify-around text-sm text-white mt-5'>
                        <button
                            className='p-2 bg-red-700 rounded'
                            onClick={() => {
                                setSolicitarVisita(false)
                            }}
                        >Cancelar</button>
                        <button
                            className='p-2 bg-blue-700 rounded'
                            onClick={() => {
                                window.location.href = "http://localhost:3000/login"
                            }}
                        >Fazer login</button>
                    </div>
                </>
            )
        }
    }

    return (
        <main className="bg-gray-100 w-full">
            <section className='h-80 mb-4 bg-gray-600' style={{ display: estaEditando ? 'none' : 'block' }}>
                caroussel de fotos
            </section>

            <section className='flex flex-nowrap p-10 ml-20 mr-20 text-lg text-left' style={{ display: estaEditando ? 'none' : 'flex' }}>
                <section className='m-5 w-2/3'>
                    <div className='mb-5'>
                        <div className='text-3xl'>{`${prodInfo.tipo} com ${prodInfo.quartos} ${prodInfo.quartos > 1 ? 'Quartos' : 'Quarto'} e ${prodInfo.banheiros} ${prodInfo.banheiros > 1 ? 'Banheiros' : 'Banheiro'}, ${prodInfo.tamanho}m² por R$ ${prodInfo.preco_venda > 0 ? formatarPreco(prodInfo.preco_venda) : ''} ${prodInfo.preco_venda > 0 && prodInfo.preco_aluguel > 0 ? 'ou' : ''} ${prodInfo.preco_aluguel > 0 ? `${formatarPreco(prodInfo.preco_aluguel)}/mês` : ''}`}</div>
                        <div className='text-base'>{prodInfo.endereco}, {prodInfo.numero} - {prodInfo.bairro}, {prodInfo.cidade}</div>
                    </div>

                    <div className='mb-5'>
                        <div className="w-3/4 grid grid-cols-3">
                            <span><FontAwesomeIcon icon={faExpand} /> {prodInfo.tamanho}m²</span>
                            <span><FontAwesomeIcon icon={faBed} /> {prodInfo.quartos}</span>
                            <span><FontAwesomeIcon icon={faShower} /> {prodInfo.banheiros}</span>
                        </div>
                    </div>

                    <div className='flex flex-nowrap mb-5'>
                        <div className='mr-2 text-base'><FontAwesomeIcon icon={faTriangleExclamation} /></div>
                        <div className='text-base'>Evite cair em golpes: nunca faça depósitos, transferências ou quaisquer adiantamentos sem conferência e/ou visita no imóvel.</div>
                    </div>

                    <div className='mb-5'>
                        <div className='border border-black p-5 w-1/3'>
                            <div className='text-xl'>Anunciante</div>
                            <div className='text-base'>jose pinto da silva</div>
                        </div>
                    </div>

                    <div className=''>
                        <div className='text-justify text-xl'>{prodInfo.descricao}</div>
                    </div>

                    {consultorId == localStorage.Id ?
                        <section style={{ display: excluirProduto ? 'none' : 'block' }}>
                            <button
                                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4 mr-5'
                                onClick={() => setEstaEditando(true)}
                            >Editar informações</button>
                            <button
                                className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4'
                                onClick={() => setExcluirProduto(true)}
                            >Excluir imóvel</button>
                        </section> :
                        ''
                    }
                </section>

                <section className='w-1/4 m-5 p-5'>
                    <div className='text-3xl mb-3'>
                        {precoImovel()}
                    </div>

                    <div className='mb-5'>
                        <div className='text-lg'>Anunciante</div>
                        <div className='text-base'>jose pinto da silva</div>
                        <div className='text-base'>(11) 98149-1928</div>
                    </div>

                    <div className='flex justify-center'>
                        <button
                            className='p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                            style={{ display: solicitarVisita ? 'none' : 'inline-block' }}
                            onClick={() => setSolicitarVisita(true)}
                        >
                            Agendar visita
                        </button>
                        <div style={{ display: solicitarVisita ? 'block' : 'none' }} className='border border-black p-3'>
                            {agendarVisita()}
                        </div>
                    </div>
                </section>
            </section>

            <section className='p-10 ml-20 mr-20' style={{ display: estaEditando ? 'block' : 'none' }}>
                <form>
                    <div className='mb-10 flex justify-between'>
                        <button onClick={(e) => {
                            e.preventDefault()
                            setEstaEditando(false)
                        }}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <div>Editar imóvel</div>
                        <div></div>
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="tipoResidencia" className="block mb-2 text-sm font-medium text-gray-900">Tipo de residência</label>
                            <input type="text" id="tipoResidencia" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Casa ou Apartamento" onChange={(e) => setTipoResidencia(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="endereco" className="block mb-2 text-sm font-medium text-gray-900">Endereço</label>
                            <input type="text" id="endereco" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.x.: Rua José Gomes" onChange={(e) => setEndereco(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="numero" className="block mb-2 text-sm font-medium text-gray-900">Numero</label>
                            <input type="text" id="numero" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.x.:341" onChange={(e) => setNumero(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="bairro" className="block mb-2 text-sm font-medium text-gray-900">Bairro</label>
                            <input type="text" id="bairro" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.x.: Pinheiros" onChange={(e) => setBairro(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="cidade" className="block mb-2 text-sm font-medium text-gray-900">Cidade</label>
                            <input type="text" id="cidade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.x.: São Paulo" onChange={(e) => setCidade(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="cep" className="block mb-2 text-sm font-medium text-gray-900">CEP</label>
                            <input type="text" id="cep" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.x.: 06023415" onChange={(e) => setCep(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="quartos" className="block mb-2 text-sm font-medium text-gray-900">Quartos</label>
                            <input type="text" id="quartos" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Quantidade de quartos" onChange={(e) => setQuantidadeQuartos(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="banheiros" className="block mb-2 text-sm font-medium text-gray-900">Banheiros</label>
                            <input type="text" id="banheiros" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Quantidade de banheiros" onChange={(e) => setQuantidadeBanheiros(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="tamanho" className="block mb-2 text-sm font-medium text-gray-900">Tamanho</label>
                            <input type="text" id="tamanho" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Tamanho em metros quadrados" onChange={(e) => setTamanho(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="qualidade" className="block mb-2 text-sm font-medium text-gray-900">Qualidade</label>
                            <input type="text" id="qualidade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="1~5 Estrelas" onChange={(e) => setQualidade(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="disponibilidade" className="block mb-2 text-sm font-medium text-gray-900">Disponibilidade</label>
                            <select id="disponibilidade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setDisponibilidade(e.target.value)}>
                                <option value="." defaultValue>Selecione uma opção</option>
                                <option value="venda">Venda</option>
                                <option value="aluguel">Alugar</option>
                                <option value="venda_e_aluguel">Vender ou Alugar</option>
                            </select>
                        </div>
                        {verificarDisponibilidade()}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-gray-900">Descrição do imóvel</label>
                        <input type="text" id="descricao" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Descrição" onClick={(e) => setDescricao(e.target.value)} />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        onClick={(e) => {
                            e.preventDefault()

                            const myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");

                            const raw = JSON.stringify({
                                "tipo": tipoResidencia,
                                "endereco": endereco,
                                "numero": numero,
                                "bairro": bairro,
                                "cidade": cidade,
                                "cep": cep,
                                "quartos": quantidadeQuartos,
                                "banheiros": quantidadeBanheiros,
                                "descricao": descricao,
                                "preco_venda": precoCompra,
                                "preco_aluguel": precoAluguel,
                                "tamanho": tamanho,
                                "qualidade": qualidade,
                                "disponibilidade": disponibilidade
                            });

                            const requestOptions = {
                                method: "PUT",
                                headers: myHeaders,
                                body: raw,
                                redirect: "follow"
                            };

                            fetch(`http://localhost:3001/atualizar/${imovelID}`, requestOptions)
                                .then((response) => response.text())
                                .then((result) => console.log(result))
                                .catch((error) => console.error(error));

                            window.location.reload()
                        }}
                    >Editar</button>
                </form>
            </section>

            <section className='flex justify-around pb-20' style={{ display: excluirProduto ? 'flex' : 'none' }}>
                <div className='p-8 border border-black w-1/3 grid grid-rows-2 rounded'>
                    <div>Tem certeza que deseja excluir este anuncio?</div>
                    <div className='mt-5'>
                        <button
                            className='mr-10 hover:bg-gray-300 border border-black rounded-lg p-2 text-base'
                            onClick={() => setExcluirProduto(false)}
                        >Cancelar</button>
                        <button
                            className='bg-red-600 hover:bg-red-700 rounded-lg p-2 text-base text-white'
                            onClick={() => {
                                const requestOptions = {
                                    method: "DELETE",
                                    redirect: "follow"
                                };

                                fetch(`http://localhost:3001/deletar/${imovelID}`, requestOptions)
                                    .then((response) => response.text())
                                    .then((result) => console.log(result))
                                    .catch((error) => console.error(error));

                                window.location.href = "http://localhost:3000/Home"
                            }}
                        >Excluir</button>
                    </div>
                </div>
                <div></div>
                <div></div>
            </section>
        </main>
    )
}

export default ImovelPrincipal