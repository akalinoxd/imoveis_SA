import { Link } from 'react-router-dom'

const ProdutoPreview = ({ imovelID, titulo, rua, numero, bairro, cidade, tamanho, quartos, banheiros, precoVenda = 0, precoAluguel = 0, qualidade = 0, disponibilidade }) => {

    const formatarPreco = (preco) => {
        return new Intl.NumberFormat('de-DE', { currency: 'BRL' }).format(preco)
    }

    console.log(disponibilidade)

    const precoImovel = () => {
        // {precoVenda > 0 ? <span>R$ {formatarPreco(precoVenda)}</span> : null} {precoVenda > 0 && precoAluguel > 0 ? 'ou' : null} {precoAluguel > 0 ? <span>R$ {formatarPreco(precoAluguel)}/mês</span> : null}
        if(disponibilidade === 'venda'){
            return <span>R$ {formatarPreco(precoVenda)}</span>
        }else if(disponibilidade === 'aluguel'){
            return <span>R$ {formatarPreco(precoAluguel)}/mês</span>
        }else{
            return <><span>R$ {formatarPreco(precoVenda)}</span> ou <span>R$ {formatarPreco(precoAluguel)}/mês</span></>
        }
    }

    return (
        <div className="mb-5">
            <Link to={{
                pathname: "/imovel",
                search: `?id=${imovelID}`
            }} className="text-lg grid grid-cols-3 p-5">
                <section className="mr-3">
                    <img src='https://k1planejamento.com.br/wp-content/uploads/2023/04/7.jpg' alt="imagem ilustrativa" className="rounded-l-lg"></img>
                </section>
                <section className="text-left col-span-2 grid grid-rows-2">
                    <div>
                        <div className="text-sm">
                            {rua}, {numero} - {bairro}, {cidade}
                        </div>
                        <div className="text-xl">
                            {titulo}
                        </div>
                        <div className="text-xs">
                            {tamanho}m² | {quartos} {quartos === 1 ? 'Quarto' : 'Quartos'} | {banheiros} {banheiros === 1 ? 'Banheiro' : 'Banheiros'} | {qualidade} ★
                        </div>
                    </div>
                    <div className="text-2xl">
                        {precoImovel()}
                    </div>
                </section>
            </Link>
        </div>
    )
}

export default ProdutoPreview