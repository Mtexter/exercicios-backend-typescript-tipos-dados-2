const fs = require('fs');

type endereço = {
    cep: number,
    rua: string,
    complemento: string,
    bairro: string,
    cidade: string
}

type usuario = {
    nome: string,
    email: string,
    cpf: number,
    profissao?: string,
    endereço: endereço | null
}

const dadosUsuario: usuario = {
    nome: 'Matheus',
    email: 'mtexter@email.com',
    cpf: 24213213,
    profissao: "programador",
    endereço: null
}

function cadastrarUsuario(data: usuario[]): usuario[] {
    fs.writeFileSync('./bd.json', JSON.stringify(data))
    return data
}

function lerArquivo(): usuario[] {
    return JSON.parse(fs.readFileSync('./bd.json'))
}

const dados = lerArquivo()
dados.push(dadosUsuario)

console.log(cadastrarUsuario(dados))
console.log(lerArquivo())