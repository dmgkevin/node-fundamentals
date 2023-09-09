//process.stdin
//  .pipe(process.stdout) => stream de escrita

//Chunk => Pedaço que lemos da string de leitura

// Buffer é uma forma de transicionar dados entre Streams

import { Readable, Writable, Trasnform } from 'node-stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() { //metodo read
        const i = this.index++

        setTimeout(( ) => {
            if(i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}

class InverseNumberStream extends Trasnform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))//Primeiro parametro de uma callback é um erro
    }
}

class MultiplyByTenStream extends Writable { 
    _write(chunk, encoding, callback) {
        //Na string de escrita a gente não retorna nada. Ela processa o dado
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream() //Lendo os dados
.pipe(new InverseNumberStream()) //
.pipe(new MultiplyByTenStream())//Escrevendo os dados