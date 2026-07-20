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

function addItem(texto){
    // 1. Criando o item e o botão
    let item = document.createElement("li")
    item.textContent = texto

    let botao = document.createElement("button")
    botao.textContent = "▶" 
    
    botao.classList.add("btn-falta") 

    
    botao.addEventListener("click", () => {
        
        if (item.parentElement === listaFalta) {
            
            listaFazendo.appendChild(item)
            botao.textContent = "✔" 
            
            botao.classList.replace("btn-falta", "btn-fazendo")

        } else if (item.parentElement === listaFazendo) {
            // Move para 'listaFeita'
            listaFeita.appendChild(item)
            botao.textContent = "X" 
            
            botao.classList.replace("btn-fazendo", "btn-feitas")

        } else if (item.parentElement === listaFeita) {
            
            item.remove()
        }

        atualizarContadores()
    })

    
    item.appendChild(botao)
    listaFalta.appendChild(item)
    atualizarContadores() 
}

function atualizarContadores() {
    // Usando exatamente os seus IDs e constantes:
    contadorFalta.textContent = listaFalta.children.length;
    contadorFazendo.textContent = listaFazendo.children.length;
    contadorFeitas.textContent = listaFeita.children.length; // (Atenção aqui: sua constante é listaFeita, e o contador é contadorFeitas)
}

    addTarefa.addEventListener('click', () => {
    let tarefa = novaTarefa.value.trim(); // Pega o que foi digitado

    if (tarefa !== "") {
    addItem(tarefa); // Chama a sua função passando o texto
    novaTarefa.value = ""; // Limpa o campo
    }
    })
