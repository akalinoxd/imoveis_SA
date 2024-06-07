import { useEffect, useState } from 'react'

import MiniaturaImovel from "./MiniaturaImovel"

const ExemplaresVenda = () => {

    const [exemplares, setExemplares] = useState([])
    const [style, setStyle] = useState('')

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("http://localhost:3001/imoveis/venda", requestOptions)
            .then((response) => response.text())
            .then((result) => JSON.parse(result))
            .then((produtos) => {
                let arr = []
                // for (let i = 0; i <= 1; i++) {
                //     arr.push(produtos[i])
                // }
                produtos.forEach((imovel, index) => {
                    if(index <= 2){
                        arr.push(imovel)
                    }
                })
                if(arr.length < 3){
                    setStyle('around')
                }else{
                    setStyle('between')
                }
                setExemplares(arr)
                return produtos
            })
            .catch((error) => console.error(error));
    }, [])

    return (
        <section id='exemplaresVenda' className='mb-32 '>
            <div>Alguns imóveis à venda que você pode gostar</div>
            {/* aqui vou colocar 3 casas apenas como amostra para o usuário */}
            <div className={`p-5 mt-5 flex justify-${style}`}>
                {exemplares.map((imovel, index) => (
                    <MiniaturaImovel
                        key={imovel.imoveisID}
                        imovelID={imovel.imoveisID}
                        rua={imovel.endereco}
                        bairro={imovel.bairro}
                        cidade={imovel.cidade}
                        tamanho={imovel.tamanho}
                        quartos={imovel.quartos}
                        banheiros={imovel.banheiros}
                        precoVenda={imovel.preco_venda}
                    />
                ))}
            </div>
        </section>
    )
}

export default ExemplaresVenda