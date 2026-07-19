//Tem muitos comentarios para eu não esquecer oq cada linha faz

const falta = document.getElementById('falta')
const addTarefa = document.querySelector('.addTarefa')
const novaTarefa = document.querySelector('.novaTarefa')
const listaFalta = document.getElementById('listaFalta')
const listaFazendo = document.getElementById('listaFazendo')
const listaFeita = document.getElementById('listaFeita')

    function addItem(texto){
        
        let item = document.createElement("li")

        item.textContent = texto

        let botao = document.createElement("button")

        botao.textContent = "X"
        
        botao.classList.add("btn-apagar"); //Justamente essa parte que eu nao sabia como puxar de la

        botao.addEventListener("click",(event) => {
            
            item.remove()
        })

        item.appendChild(botao)

        listaFalta.appendChild(item)

        
        
    }

    addTarefa.addEventListener('click', () => {
    let tarefa = novaTarefa.value.trim(); // Pega o que foi digitado
    
    if (tarefa !== "") {
        addItem(tarefa); // Chama a sua função passando o texto
        novaTarefa.value = ""; // Limpa o campo
    }
})

