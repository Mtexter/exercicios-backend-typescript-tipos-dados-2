const fs = require('fs');

function lerArquivo(): unknown {
    return JSON.parse(fs.readFileSync('./bd.json'))
}

function escreverArquivo(data: any): void {
    fs.writeFileSync('./bd.json', JSON.stringify(data))
}

const dados = lerArquivo() as string[]

dados.push('deu certo')
escreverArquivo(dados)

console.log(lerArquivo())