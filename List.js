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

// Adicionei isso
let tarefas = [];

function addItem(tarefa){

    let item = document.createElement("li")
    item.textContent = tarefa.texto

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

    botao.addEventListener("click", () => {

        if(tarefa.status === "falta"){

            tarefa.status = "fazendo"

        }else if(tarefa.status === "fazendo"){

            tarefa.status = "feitas"

        }else{

            // Adicionei isso
            tarefas = tarefas.filter(t => t !== tarefa)

        }

        salvarTarefas()
        renderizar()

    })

    item.appendChild(botao)

}

function salvarTarefas(){

    localStorage.setItem("tarefas", 
        JSON.stringify(tarefas))

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

addTarefa.addEventListener('click', () => {

    let texto = novaTarefa.value.trim()

    if(texto !== ""){

        // Adicionei isso
        tarefas.push({
            texto: texto,
            status: "falta"
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