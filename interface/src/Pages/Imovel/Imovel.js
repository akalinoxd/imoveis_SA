import ImovelPrincipal from '../../components/ImovelPrincipal.js'
import Footer from '../../components/Footer.js'

const Imovel = () => {

    const url = window.location.href.replace("http://localhost:3000/imovel?id=", "")

    return (
        <>
            <ImovelPrincipal imovelID={url} />
            <Footer />
        </>
    )
}

export default Imovel