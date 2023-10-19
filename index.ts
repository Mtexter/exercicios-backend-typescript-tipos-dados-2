const fs = require('fs');

type Endereco = {
    cep: number,
    rua: string,
    complemento: string,
    bairro: string,
    cidade: string
}

type Usuario = {
    nome: string,
    email: string,
    cpf: number,
    profissao?: string,
    endereco: Endereco | null
}

const dadosUsuario: Usuario = {
    nome: 'Matheus',
    email: 'mtexter@email.com',
    cpf: 24213213,
    profissao: "programador",
    endereco: null
}

const dadosUsuarioAtualizado: Usuario = {
    nome: 'Matheus',
    email: 'mtexter@email.com',
    cpf: 1,
    profissao: "estudante",
    endereco: null
}

function atualizarBD(bd: unknown): void {
    fs.writeFileSync('./bd.json', JSON.stringify(bd))
}

function lerArquivo(): Usuario[] {
    return JSON.parse(fs.readFileSync('./bd.json'))
}

function buscarUsuario(cpf: number): Usuario {
    const bd = lerArquivo()
    const resultado = bd.find((user) => {
        if (user.cpf === cpf) {
            return user;
        }
    })

    if (!resultado) {
        throw new Error("Usuário não encontrado")
    }

    return resultado
}

function cadastrarUsuario(novoUsuario: Usuario): Usuario {
    const bd = lerArquivo()
    bd.push(novoUsuario)
    atualizarBD(bd)
    return novoUsuario
}

function detalharUsuario(cpf: number): Usuario {
    const resultado = buscarUsuario(cpf);
    return resultado
}

function atualizarUsuario(cpf: number, data: Usuario): Usuario {
    const bd = lerArquivo()
    const resultado = buscarUsuario(cpf)

    Object.assign(resultado, data)
    atualizarBD(bd)

    return resultado
}

function excluirUsuario(cpf: number) {
    const bd = lerArquivo()
    const resultado = buscarUsuario(cpf)

    const excluir = bd.filter(usuario => {
        return usuario.cpf !== cpf
    })

    atualizarBD(excluir)
    return resultado
}

function filtrarUsuarios(profissao: string): Usuario[] {
    const bd = lerArquivo()
    const resultado = bd.filter((user) => {
        if (user.profissao?.includes(profissao)) {
            return user;
        }
    })

    return resultado
}

// cadastrarUsuario(dadosUsuario)
// atualizarUsuario(24213213, dadosUsuarioAtualizado);
// console.log(detalharUsuario(1));
// console.log(buscarUsuario(1));
// console.log(excluirUsuario(1));
console.log(filtrarUsuarios("pro"));
