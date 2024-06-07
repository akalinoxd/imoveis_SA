import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faBed, faShower } from '@fortawesome/free-solid-svg-icons'

const MiniaturaImovel = ({ imovelID, rua, bairro, cidade, tamanho, quartos, banheiros, precoVenda = 0, precoAluguel = 0 }) => {

    const formatarPreco = (preco) => {
        return new Intl.NumberFormat('de-DE', { currency: 'BRL' }).format(preco)
    }

    return (
        <div className="rounded-lg text-lg text-left border border-slate-400">
            <a href={`/imovel?id=${imovelID}`}>
                <div>
                    <img src='https://resizedimgs.vivareal.com/crop/360x240/named.images.sp/18184d51f4c0065ba591ed121a6bb7f1/description.jpg' alt="imagem-ilustrativa-imovel" className="rounded-t-lg"></img>
                </div>
                <div className="p-2">
                    <section>
                        <section>
                            <div>
                                <p>{rua}</p>
                            </div>
                            <div>
                                <p>{bairro}, {cidade}</p>
                            </div>
                        </section>

                        <section>
                            <div className="flex justify-between w-3/4">
                                <span><FontAwesomeIcon icon={faExpand} /> {tamanho}m²</span>
                                <span><FontAwesomeIcon icon={faBed} /> {quartos}</span>
                                <span><FontAwesomeIcon icon={faShower} /> {banheiros}</span>
                            </div>
                        </section>
                        <section>
                            <div>
                                R$ {precoVenda > 0 ? <span className='text-sky-500'>{formatarPreco(precoVenda)}</span> : null || precoAluguel > 0 ? <span><span className='text-sky-500'>{formatarPreco(precoAluguel)}</span>/mês</span> : null}
                            </div>
                        </section>
                    </section>
                </div>
            </a>
        </div>
    )
}

export default MiniaturaImovel