//Tem muitos comentarios para eu não esquecer oq cada linha faz
const falta = document.getElementById('falta')
const addTarefa = document.querySelector('.addTarefa')
const novaTarefa = document.querySelector('.novaTarefa')
const listaFalta = document.getElementById('listaFalta')
const listaFazendo = document.getElementById('listaFazendo')
const listaFeita = document.getElementById('listaFeita')
const contadorFalta = document.getElementById('contadorFalta')
const contadorFazendo = document.getElementById('contadorFazendo')
const contadorFeitas = document.getElementById('contadorFeitas')


let tarefas = [];

function addItem(tarefa){

    let criado = document.createElement("small")
    criado.classList.add("data-criacao")

    let item = document.createElement("li")

    item.draggable = true

    item.addEventListener("dragstart", (event)=>{

        let indice = tarefas.indexOf(tarefa)

        event.dataTransfer.setData("index", indice)

    })

    let data = new Date(tarefa.criadoEm)

    item.textContent = tarefa.texto

    criado.textContent =
    `📅 ${data.toLocaleDateString()}`

    item.appendChild(criado)

    let botao = document.createElement("button")

    if(tarefa.status === "falta"){

        botao.textContent = "▶"
        botao.classList.add("btn-falta")
        listaFalta.appendChild(item)

    }else if(tarefa.status === "fazendo"){

        botao.textContent = "✔"
        botao.classList.add("btn-fazendo")
        listaFazendo.appendChild(item)

    }else{
        botao.textContent = "X"
        botao.classList.add("btn-feitas")
        listaFeita.appendChild(item)

    }

    item.addEventListener("dblclick", ()=>{

        let novoTexto = prompt("Editar tarefa:", tarefa.texto)

        if(novoTexto !== null && novoTexto.trim() !== ""){

            tarefa.texto = novoTexto.trim()

            salvarTarefas()

            renderizar()

        }

    })

    botao.addEventListener("click", ()=>{

        if(tarefa.status === "falta"){

            tarefa.status = "fazendo"

        }else if(tarefa.status === "fazendo"){

            tarefa.status = "feitas"

        }else{

            tarefas = tarefas.filter(t => t !== tarefa)

        }

        salvarTarefas()

        renderizar()

    })

    item.appendChild(botao)

}

const listas = [

    listaFalta,
    listaFazendo,
    listaFeita

]


listas.forEach((lista)=>{

    lista.addEventListener("dragover",(event)=>{

        event.preventDefault()

    })

    lista.addEventListener("drop",(event)=>{

        let indice = event.dataTransfer.getData("index")

        let tarefa = tarefas[indice]

        if(lista === listaFalta){


            tarefa.status = "falta"

        }else if(lista === listaFazendo){


            tarefa.status = "fazendo"

        }else{

            tarefa.status = "feitas"

        }

        salvarTarefas()

        renderizar()

    })

})

novaTarefa.addEventListener("keydown",(event)=>{

    if(event.key === "Enter"){

        addTarefa.click()
    }

})

function salvarTarefas(){

    localStorage.setItem("tarefas", JSON.stringify(tarefas))

}

function renderizar(){
    listaFalta.innerHTML = ""
    listaFazendo.innerHTML = ""
    listaFeita.innerHTML = ""

    tarefas.forEach(addItem)
    atualizarContadores()

}

function atualizarContadores(){

    contadorFalta.textContent = listaFalta.children.length
    contadorFazendo.textContent = listaFazendo.children.length
    contadorFeitas.textContent = listaFeita.children.length

}

addTarefa.addEventListener("click",()=>{

    let texto = novaTarefa.value.trim()

    let data = new Date()

    if(texto !== ""){


        tarefas.push({


            texto:texto,

            status:"falta",

            criadoEm:data

        })

        salvarTarefas()

        renderizar()

        novaTarefa.value = ""

    }

})

function carregarTarefas(){

    const dados = localStorage.getItem("tarefas")

    if(dados){

        tarefas = JSON.parse(dados)
 
    }

    renderizar()
}

carregarTarefas()