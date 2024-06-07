const express = require('express')
const router = express.Router()
const connection = require('../database')
const authconsultor = require('../middleware/authConsultor')

// conexão com a tabela "imoveis"
router.get('/', (req, res) => {
    connection.query(`SELECT * FROM imoveis`, (err, results, fields) => {
        if (err) {
            console.error('Erro ao buscar infomações:', err)
            res.status(500).json({ error: 'Erro ao buscar informações no banco de dados' })
            return
        }

        res.json(results)
    })
})
// Rota para buscar imóveis
router.get('/busca', (req, res) => {
    // Parâmetros para a busca
    const { tipo, bairro, cidade, quartos, banheiros, disponibilidade, precoVendaMin, precoVendaMax, precoAluguelMin, precoAluguelMax, qualidadeMax, qualidadeMin } = req.query

    let sqlQuery = 'SELECT * FROM imoveis WHERE 1'

    if (tipo) {
        sqlQuery += ` AND tipo = '${tipo}'`
    }

    if (bairro) {
        sqlQuery += ` AND bairro = '${bairro}'`
    }

    if (cidade) {
        sqlQuery += ` AND cidade = '${cidade}'`
    }

    if (quartos) {
        sqlQuery += ` AND quartos = '${quartos}'`
    }

    if (banheiros) {
        sqlQuery += ` AND banheiros = '${banheiros}'`
    }
    if (disponibilidade === 'aluguel') {
        sqlQuery += ` AND (disponibilidade = 'aluguel' OR disponibilidade = 'venda_e_aluguel') `
    }
    if (disponibilidade === 'venda') {
        sqlQuery += ` AND (disponibilidade = 'venda' OR disponibilidade = 'venda_e_aluguel') `
    }


    if (precoVendaMin && precoVendaMax) {
        sqlQuery += ` AND preco_venda BETWEEN ${precoVendaMin} AND ${precoVendaMax}`
    } else if (precoVendaMin) {
        sqlQuery += ` AND preco_venda >= ${precoVendaMin}`
    } else if (precoVendaMax) {
        sqlQuery += ` AND preco_venda <= ${precoVendaMax}`
    }

    if (precoAluguelMin && precoAluguelMax) {
        sqlQuery += ` AND preco_aluguel BETWEEN ${precoAluguelMin} AND ${precoAluguelMax}`
    } else if (precoAluguelMin) {
        sqlQuery += ` AND preco_aluguel >= ${precoAluguelMin}`
    } else if (precoAluguelMax) {
        sqlQuery += ` AND preco_aluguel <= ${precoAluguelMax}`
    }
    if (qualidadeMin && qualidadeMax) {
        sqlQuery += ` AND qualidade BETWEEN ${qualidadeMin} AND ${qualidadeMax}`
    } else if (qualidadeMin) {
        sqlQuery += ` AND qualidade >= ${qualidadeMin}`
    } else if (qualidadeMax) {
        sqlQuery += ` AND qualidade <= ${qualidadeMax}`
    }

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóveis:', err)
            return res.status(500).json({ error: 'Erro ao buscar imóveis' })
        }

        res.json(results)
    })
})
// rota para adicionar imoveis 
router.post('/adicionar', authconsultor, (req, res) => {
    const consultorId = req.consultorId; // Obtém o ID do cliente autenticado do token JWT

    if (consultorId == undefined) {
        return { mensagem: "O usuário não tem permissão para cadastrar um imóvel" }
    }

    const { tipo, endereco, numero, bairro, cidade, cep, quartos, banheiros, descricao, preco_venda, preco_aluguel, disponibilidade, qualidade, tamanho } = req.body;

    // Validar dados recebidos (validação simples)
    if (!tipo || !endereco || !numero || !bairro || !cidade || !cep || !quartos || !banheiros || !descricao || !preco_venda || !disponibilidade || !qualidade || !tamanho) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const imovel = {
        tipo,
        endereco,
        numero,
        bairro,
        cidade,
        cep,
        quartos: parseInt(quartos),
        banheiros: parseInt(banheiros), // Converter para número inteiro
        descricao,
        preco_aluguel: preco_aluguel === "null" || preco_aluguel === "0" ? null : parseFloat(preco_aluguel),
        preco_venda: preco_venda === "null" || preco_venda === "0" ? null : parseFloat(preco_venda),
        disponibilidade,
        qualidade,
        tamanho: parseFloat(tamanho),
        consultorId
    };

    connection.query('INSERT INTO imoveis SET ?', imovel, (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar imóvel:', err);
            return res.status(500).json({ error: 'Erro ao cadastrar imóvel' });
        }
        const newId = result.insertId;
        console.log('Imóvel cadastrado com sucesso! ID:', newId);
        res.status(201).json({ id: newId, message: 'Imóvel cadastrado com sucesso!', imovel });
    });
})
// Rota de deletar imóvel 
router.delete('/deletar/:id', authconsultor, (req, res) => {
    const imovelID = req.params.id
    const consultorId = req.consultorId

    if (consultorId == undefined) {
        return { mensagem: "O usuário não tem permissão para cadastrar um imóvel" }
    }

    // Verificar se o imovel com ID especificado existe
    connection.query('SELECT * FROM imoveis WHERE imoveisID = ? AND consultorId = ? ', [imovelID, consultorId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóvel:', err)
            return res.status(500).json({ error: 'Erro ao bucar imóvel' })
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Você não tem permissão para deletar esse imovel ' })
        }

        const imovel = results[0]

        // Se o imovel existe, executa aquery para deleta-lo
        connection.query('DELETE FROM imoveis WHERE imoveisID = ?  ', imovelID, (err, result) => {
            if (err) {
                console.error('Erro ao deletar imóvel:', err)
                return res.status(500).json({ error: 'Erro ao deletar imóvel' })
            }

            console.log('Imovel deletado com sucesso!')
            res.status(200).json({ message: 'Imovel deletado com sucesso!', imovelDeletado: imovel })
        })
    })
})
// Rota de atualizar imóvel
router.put('/atualizar/:id', authconsultor, (req, res) => {
    const imovelID = req.params.id
    const consultorId = req.consultorId

    if (consultorId == undefined) {
        return { mensagem: "O usuário não tem permissão para cadastrar um imóvel" }
    }

    // Parâmetros para atualizar
    const { tipo, endereco, numero, bairro, cidade, cep, quartos, banheiros, descricao, preco_venda, preco_aluguel, tamanho, qualidade, disponibilidade } = req.body

    if (!tipo || !endereco || !numero || !bairro || !cidade || !cep || !quartos || !banheiros || !descricao || !preco_venda || !preco_aluguel || tamanho == null || !qualidade || !disponibilidade) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
    }

    connection.query('SELECT * FROM imoveis WHERE imoveisID = ? AND consultorId = ?', [imovelID, consultorId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar o imóvel no banco de dados' })
        }
        if (results.length === 0) {
            return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para atualizar esse imóvel' })
        }
        const imovelAtualizado = {
            tipo,
            endereco,
            numero,
            bairro,
            cidade,
            cep,
            quartos: parseInt(quartos),
            banheiros: parseInt(banheiros),
            descricao,
            preco_aluguel: preco_aluguel === "null" || preco_aluguel === "0" ? null : parseFloat(preco_aluguel),
            preco_venda: preco_venda === "null" || preco_venda === "0" ? null : parseFloat(preco_venda),
            qualidade,
            disponibilidade,
            tamanho: parseFloat(tamanho)
        }

        connection.query('UPDATE imoveis SET ? WHERE imoveisID = ?', [imovelAtualizado, imovelID], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar imóvel:', err)
                return res.status(500).json({ error: 'Erro ao atualizar imóvel' })
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Imóvel não encontrado' })
            }
            console.log('Imóvel atualizado com sucesso!')
            return res.status(200).json({ message: 'Imóvel atualizado com sucesso!', imovelAtualizado })
        })
    })
})
// Rotas de disponibilidade {venda e aluguel }
// Rota para separar disponibilidade de venda
router.get('/venda', (req, res) => {
    let sqlQuery = 'SELECT * FROM imoveis WHERE disponibilidade IN ("venda", "venda_e_aluguel")'

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóvel para venda:', err)
            return res.status(500).json({ error: 'Erro ao buscar imóveis para a venda' })
        }
        console.log('Imóvel buscado com sucesso!')
        res.json(results)
    })
})
// Rota para separar disponibilidade de aluguel
router.get('/aluguel', (req, res) => {
    let sqlQuery = 'SELECT * FROM imoveis WHERE disponibilidade IN ("aluguel", "venda_e_aluguel")'

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóvel para aluguel:', err)
            return res.status(500).json({ error: 'Erro ao buscar imóveis para a aluguel' })
        }
        res.json(results)
    })
})
// rota para pegar o imóvel pelo id 
router.get('/:id', (req, res) => {
    const imovelID = req.params.id

    let sqlQuery = 'SELECT * FROM imoveis WHERE imoveisID = ?'
    connection.query(sqlQuery, [imovelID], (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóvel por id:', err)
            return res.status(500).json({ error: 'Erro ao buscar imóveis por id ' })
        }
        res.json(results)
    })
})

module.exports = router