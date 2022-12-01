const fs = require('fs')

class Palabras{ //defino la clase
    
    constructor(ruta) { //defino el constructor
        this.ruta = ruta //ruta del archivo
        this.frase = "", //la frase con todas las palabras
        this.palabras = [] //los palabras
        this.iniciar() //creación del archivo si no existe
        this.recuperDatos() //recuperacion de datos del archivo
    }
    
    iniciar = () => {
        let file = fs.existsSync(
            this.ruta,
            'utf-8'
        )
        if (!file) {
            fs.writeFileSync(
                this.ruta,
                JSON.stringify(
                    { frase: "", palabras:[] },
                    null,
                    2
                )
            )
        }
        return null
    }

    obtenerPalabras = () => {
        let palabras =  fs.readFileSync(this.ruta)
        palabras = JSON.parse(palabras)
        if (palabras) {
            return palabras
        }
        return null
    }

    recuperDatos = () => {
        let palabrasObtenidas = this.obtenerPalabras()
        if (palabrasObtenidas) {
            this.palabras = palabrasObtenidas.palabras
            this.frase = palabrasObtenidas.frase
        }
        return null
    }

    agregarPalabra = async ({ palabra }) => {
        if (!palabra) {
            let message = 'debe enviar un objeto de la forma { "palabra": "la_palabra_que_quiera" }'
            return {
                error: message
            }
        }
        try {
            if (!this.palabras.includes(palabra)) {
                this.frase = `${this.frase} ${palabra}`.trim()
                this.palabras.push(palabra)
                await fs.promises.writeFile(
                    this.ruta,
                    JSON.stringify(
                        { frase: this.frase, palabras: this.palabras },
                        null,
                        2
                    )
                )
                return {
                    agregada: palabra,
                    pos: this.palabras.indexOf(palabra)+1
                }
            }
            return null
        } catch(err) {
            console.log(err.message)
            return {
                error: err.message
            }
        }
    }
    
    obtenerFrase = () => this.frase
    
    obtenerPalabra = (pos) => this.palabras[pos-1]

    modificarPalabra = async (pos,{ palabra }) => {
        try {
            if (!this.palabras.includes(palabra)) {
                let anterior = this.palabras[pos-1]
                this.palabras[pos-1] = palabra
                let actualizada = this.palabras[pos-1]
                this.frase = this.palabras.join(" ")
                await fs.promises.writeFile(
                    this.ruta,
                    JSON.stringify(
                        { frase: this.frase, palabras: this.palabras },
                        null,
                        2
                    )
                )
                return { anterior,actualizada }
            }
            return null
        } catch(err) {
            console.log(err.message)
            return {
                error: err.message
            }
        }
    }

    eliminarPalabra = async (pos) => {
        try {
            if (this.palabras[pos-1]) {
                let eliminada = this.palabras[pos-1]
                this.palabras = this.palabras.filter(pa => pa !== this.palabras[pos-1])
                this.frase = this.palabras.join(" ")
                await fs.promises.writeFile(
                    this.ruta,
                    JSON.stringify(
                        { frase: this.frase, palabras: this.palabras },
                        null,
                        2
                    )
                )
                return { eliminada }
            }
            return null
        } catch(err) {
            console.log(err.message)
            return {
                error: err.message
            }
        }
    }

}

let palabras = new Palabras('./src/palabras.json')

async function test() {
/*     let prod0 = { title: "title1", description: "description1", price: 1, code: 1001, stock: 100 }
    await palabras.addProduct(prod0)
    let prod1 = { title: "title1", description: "description1", price: 1, code: 1001, stock: 100, thumbnail: "thumbnail1" }
    await palabras.addProduct(prod1)
    let prod2 = { title: "title2", description: "description2", price: 2, code: 2002, stock: 200, thumbnail: "thumbnail2" }
    await palabras.addProduct(prod2)
    let prod3 = { title: "title3", description: "description3", price: 3, code: 2002, stock: 300, thumbnail: "thumbnail3" }
    await palabras.addProduct(prod3)
    await palabras.getpalabras()
    await palabras.getProductById(1)
    await palabras.getProductById(5)
    await palabras.updateProduct(8)
    await palabras.updateProduct(1)
    await palabras.updateProduct(1,{price:5000})
    await palabras.deleteProduct(8)
    await palabras.deleteProduct(1) */
    console.log(palabras)
}
    
test()

module.exports = palabras