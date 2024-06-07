import { useState } from 'react'
import Footer from '../../components/Footer'

const AnunciarImovel = () => {

    const [tipoResidencia, setTipoResidencia] = useState('')
    const [descricao, setDescricao] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [cep, setCep] = useState('')
    const [tamanho, setTamanho] = useState('')
    const [qualidade, setQualidade] = useState('')
    const [quantidadeQuartos, setQuantidadeQuartos] = useState('')
    const [quantidadeBanheiros, setQuantidadeBanheiros] = useState('')
    const [precoCompra, setPrecoCompra] = useState('')
    const [precoAluguel, setPrecoAluguel] = useState('')
    const [disponibilidade, setDisponibilidade] = useState('')
    const [erro, setErro] = useState('')

    const verificarDisponibilidade = () => {
        let exibicao = <></>

        switch (disponibilidade) {
            case "venda":
                exibicao = <>
                    <div>
                        <label htmlFor="precoImovel" className="block mb-2 text-sm font-medium text-gray-900">Preço do imóvel</label>
                        <input type="text" id="precoImovel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Preço do imóvel" onChange={(e) => setPrecoCompra(e.target.value)} required />
                    </div>
                </>
                break
            case "aluguel":
                exibicao = <>
                    <div>
                        <label htmlFor="precoAluguel" className="block mb-2 text-sm font-medium text-gray-900">Preço do aluguel</label>
                        <input type="text" id="precoAluguel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Preço do aluguel" onChange={(e) => setPrecoAluguel(e.target.value)} required />
                    </div>
                </>
                break
            case "venda_e_aluguel":
                exibicao = <>
                    <div>
                        <label htmlFor="precoImovel" clclassNameass="block mb-2 text-sm font-medium text-gray-900">Preço do imóvel</label>
                        <input type="text" id="precoImovel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Preço do imóvel" onChange={(e) => setPrecoCompra(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="precoAluguel" className="block mb-2 text-sm font-medium text-gray-900">Preço do aluguel</label>
                        <input type="text" id="precoAluguel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Preço do aluguel" onChange={(e) => setPrecoAluguel(e.target.value)} required />
                    </div>
                </>
                break
            default:
                exibicao = <></>
        }

        return exibicao
    }

    return (
        <>
            <main className='h-full bg-gray-100 p-20 pt-10'>
                <form>
                    <div className='mb-10'>Anunciar Imóvel</div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="tipoResidencia" className="block mb-2 text-sm font-medium text-gray-900">Tipo de residência</label>
                            <input type="text" id="tipoResidencia" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Casa ou Apartamento" onChange={(e) => setTipoResidencia(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="endereco" className="block mb-2 text-sm font-medium text-gray-900">Endereço</label>
                            <input type="text" id="endereco" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.x.: Rua José Gomes" onChange={(e) => setEndereco(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="numero" className="block mb-2 text-sm font-medium text-gray-900">Numero</label>
                            <input type="text" id="numero" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.x.:341" onChange={(e) => setNumero(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="bairro" className="block mb-2 text-sm font-medium text-gray-900">Bairro</label>
                            <input type="text" id="bairro" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.x.: Pinheiros" onChange={(e) => setBairro(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="cidade" className="block mb-2 text-sm font-medium text-gray-900">Cidade</label>
                            <input type="text" id="cidade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.x.: São Paulo" onChange={(e) => setCidade(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="cep" className="block mb-2 text-sm font-medium text-gray-900">CEP</label>
                            <input type="text" id="cep" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.x.: 06023415" onChange={(e) => setCep(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="quartos" className="block mb-2 text-sm font-medium text-gray-900">Quartos</label>
                            <input type="text" id="quartos" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Quantidade de quartos" onChange={(e) => setQuantidadeQuartos(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="banheiros" className="block mb-2 text-sm font-medium text-gray-900">Banheiros</label>
                            <input type="text" id="banheiros" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Quantidade de banheiros" onChange={(e) => setQuantidadeBanheiros(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="tamanho" className="block mb-2 text-sm font-medium text-gray-900">Tamanho</label>
                            <input type="text" id="tamanho" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Tamanho em metros quadrados" onChange={(e) => setTamanho(e.target.value)} required />
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
                        <input type="text" id="descricao" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Descrição" onChange={(e) => setDescricao(e.target.value)} required />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        onClick={(e) => {
                            e.preventDefault()

                            // const myHeaders = new Headers();
                            // myHeaders.append("Content-Type", "application/json");
                            // myHeaders.append("Authorization", `Basic ${localStorage.getItem('token')}`)

                            const myHeaders = {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + localStorage.getItem('token')
                            }

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
                                "preco_venda": precoCompra || "0",
                                "preco_aluguel": precoAluguel || "0",
                                "tamanho": tamanho,
                                "qualidade": qualidade,
                                "disponibilidade": disponibilidade
                            });

                            const requestOptions = {
                                method: "POST",
                                headers: myHeaders,
                                body: raw,
                                redirect: "follow"
                            };

                            fetch("http://localhost:3001/imoveis/adicionar", requestOptions)
                                .then((response) => response.text())
                                .then((result) => {
                                    console.log(result)
                                    window.location.href = disponibilidade == "venda" || disponibilidade == "venda_e_alugel" ? "http://localhost:3000/comprar" : "http://localhost:3000/alugar"
                                })
                                .catch((error) => console.error(error));
                        }}
                    >Anunciar</button>
                </form>

            </main>
            <Footer />
        </>
    )
}

export default AnunciarImovel