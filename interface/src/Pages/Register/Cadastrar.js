import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Cadastrar = () => {
  const [nome, setNome] = useState("")
  const [nomeCorreto, setNomeCorreto] = useState("")
  const [email, setEmail] = useState("")
  const [emailCorreto, setEmailCorreto] = useState("")
  const [senha, setSenha] = useState("")
  const [senhaCorreta, setSenhaCorreta] = useState("")
  //const [confirmPassword, setConfirmPassword] = useState ("")
  const [cpf, setCpf] = useState("")
  const [cpfCorreto, setCpfCorreto] = useState("")
  const [celular, setCelular] = useState("")
  const [celularCorreto, setCelularCorreto] = useState("")
  const [error, setError] = useState("")
  const [isLogged, setIsLogged] = useState(true)
  //const [ showLoginAlert, setShowLoginAlert ] = useState(<div></div>)


  // redirecionamento de pagina
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.length > 0) {
      navigate("/home")
    }
  }, [])

  // validação para o nome
  const checkNome = () => {
    const nomeSeparado = nome.split(' ') // divide o nome
    let nomeCorreto = true
    nomeSeparado.forEach(elem => {
      const primeiraMaiuscula = /^[A-Z].*/.test(elem) // verifica se todas as primeiras letras são maiusculas
      const contemEspecial = /[!@#$%&*]/.test(elem) // verifica se há caracteres especiais
      const contemNumero = /[\d]/.test(elem) // verifica se há caracteres numéricos
      if (!primeiraMaiuscula || contemEspecial || contemNumero) { // testa todas as condições 
        nomeCorreto = false
      }
    })

    if (nomeCorreto) {
      return true
    } else {
      return false
    }
  }


  // validação de email
  const checkEmail = () => {
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailPattern.test(email)
  }


  // validação de senha 
  const checkPassword = () => {
    const digitosMinimos = senha.length >= 6 // verifica se a senha tem mais de 6 digitos
    const temMaiuscula = /[A-Z]/.test(senha) // verifica se há letras maisculas
    const temMinuscula = /[a-z]/.test(senha) // verifica se há letras minusculas
    const temNumero = /\d/.test(senha) // verifica se há numeros
    const temCaracterEspecial = /[^a-zA-Z0-9]+/g.test(senha) // verifica se há caracteres especiais

    const isValidPassword = digitosMinimos && temMaiuscula && temMinuscula && temNumero && temCaracterEspecial // testa todas as condições
    // Feedback claro e informativo com base nos resultados da validação
    if (isValidPassword) {
      return true;  // Senha válida
    }
  }

  // funcção para só aceita numeros no input do cpf
  const handleCpfChange = (e) => {
    const inputCpf = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    setCpf(inputCpf);
  }

  // validação de cpf
  const checkCpf = () => {
    const limpaCpf = cpf.replace(/\D/g, '')

    if (limpaCpf.length !== 11) {
      return false
    }
    if (/^(\d)\1{10}$/.test(limpaCpf)) {
      return false
    }

    return true
  }

  // validação de celular
  const handleCelularChange = (numero) => {
    const inputCelular = numero.replace(/\D/g, ""); // remove caracteres não numéricos
    setCelular(inputCelular);
  }

  const checkCelular = () => {
    if (celular.length !== 11) {
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true
    setError("")

    if (!checkEmail()) {
      setEmailCorreto("email invalido")
      formIsValid = false
    } else {
      setEmailCorreto("")
    }
    if (!checkPassword()) {
      setSenhaCorreta("Senha invalida. A senha deve possuir no minimo 6 digitos, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial")
      formIsValid = false
    } else {
      setSenhaCorreta("")
    }
    if (!checkCpf()) {
      setCpfCorreto("CPF invalido")
      formIsValid = false
    } else {
      setCpfCorreto("")
    }
    if (nome === '' || !checkNome()) {
      setNomeCorreto("Insira um nome válido (todas as primeiras letras precisam ser maiúsculas)")
      formIsValid = false
    } else {
      setNomeCorreto("")
    }
    if (!checkCelular()) {
      setCelularCorreto("Insira um numero de celular válido")
      formIsValid = false
    } else {
      setCelularCorreto("")
    }

    if (formIsValid) {
      setIsLogged(true);
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "nome": nome,
          "email": email,
          "senha": senha,
          "cpf": cpf,
          "celular": celular
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        let estaCadastrado = false
        await fetch("http://localhost:3001/clientes/cadastrar", requestOptions)
          .then((response) => response.text())
          .then((result) => JSON.parse(result))
          .then((result) => {
            if (result.mensagem === 'usuário ja esta cadastrado') {
              estaCadastrado = true
              setError(result.mensagem)
            }
          })
          .catch((error) => console.error(error));

        if (!estaCadastrado) {
          localStorage.setItem("currentUserNome", nome)
          localStorage.setItem("currentUserEmail", email)
          localStorage.setItem("currentUserCelular", celular)
          window.location.reload()
        }
      } catch (error) {
        setError("Erro ao cadastrar usuário");
        setIsLogged(false);
      }
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:block relative w-0 flex-1 bg-gray-900">
        <div className="flex h-full justify-center items-center">
          <img src="logo.svg" alt="" />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div>
            <img src="logo.svg" alt="" className="lg:hidden h-20 w-auto" />
            <h2 className="mt-6 text-3x1 font-semibold text-red-600">Crie sua conta</h2>
            <p className='mt-w text-sm text-gray-600 max-w'>Já possui Cadastro?
              <a href="Login" className='font-medium text-blue-600'>Entre aqui!</a>
            </p>
          </div>
          <div className="mt-6">
            <form
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Nome "
                  className="apparance-none block w-full py-1 px-2 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 roudend focus: outline-none "
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <div className="text-red-700">{nomeCorreto}</div>
              </div>
              <div className="mt-5">
                <input
                  type="email"
                  placeholder="Email"
                  className="apparance-none block w-full py-1 px-2 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 roudend focus: outline-none "
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    checkEmail()
                  }}
                />
                <div className="text-red-700">{emailCorreto}</div>
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="CPF"
                  className="appearance-none block w-full py-1 px-2 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
                  required
                  value={cpf}
                  onChange={handleCpfChange}
                />
                <div className="text-red-700">{cpfCorreto}</div>
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Senha"
                  className="apparance-none block w-full py-1 px-2 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 roudend focus: outline-none "
                  required
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value)
                    checkPassword()
                  }}
                />
                <div className="text-red-700">{senhaCorreta}</div>
              </div>
              <div className="mt-5">
                <input
                  type="tel"
                  placeholder="11951481911"
                  className="apparance-none block w-full py-1 px-2 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 roudend focus: outline-none "
                  pattern="[0-9]{2}[0-9]{5}[0-9]{4}"
                  required
                  onChange={(e) => {
                    handleCelularChange(e.target.value)
                  }}
                />
                <div className="text-red-700">{celularCorreto}</div>
              </div>
              <div className="mt-5">
                <button className=" inline-block w-full py-3 px-5 lenading-none text-white bg-red-600 hover:bg-red-900 font-semibold rounded shadow"> Cadastre-se </button>
                {error && <p className="text-3x1 font-semibold text-red-600">{error}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cadastrar