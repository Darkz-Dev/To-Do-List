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

function addItem(tarefa) {
    let item = document.createElement("li");
    item.draggable = true;
    item.classList.add("item-tarefa");

    let textoTarefa = document.createElement("span");
    textoTarefa.textContent = tarefa.texto;

    let criado = document.createElement("small");
    criado.classList.add("data-criacao");

    let data = new Date(tarefa.criadoEm);
    criado.textContent = `📅 ${isNaN(data) ? "" : data.toLocaleDateString()}`;

    let botao = document.createElement("button");

    if (tarefa.status === "falta") {
        botao.textContent = "▶";
        botao.classList.add("btn-falta");
        listaFalta.appendChild(item);
    } else if (tarefa.status === "fazendo") {
        botao.textContent = "✔";
        botao.classList.add("btn-fazendo");
        listaFazendo.appendChild(item);
    } else {
        botao.textContent = "X";
        botao.classList.add("btn-feitas");
        listaFeita.appendChild(item);
    }

    item.appendChild(textoTarefa);
    item.appendChild(criado);
    item.appendChild(botao);

    item.addEventListener("dragstart", (event) => {
        let indice = tarefas.indexOf(tarefa);

        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", String(indice));

        item.classList.add("arrastando");
    });

    item.addEventListener("dragend", () => {
        item.classList.remove("arrastando");
    });

    item.addEventListener("dblclick", (event) => {
        if (event.target === botao) return;

        let novoTexto = prompt("Editar tarefa:", tarefa.texto);

        if (novoTexto !== null && novoTexto.trim() !== "") {
            tarefa.texto = novoTexto.trim();

            salvarTarefas();
            renderizar();
        }
    });

    botao.addEventListener("click", (event) => {
        event.stopPropagation();

        if (tarefa.status === "falta") {
            tarefa.status = "fazendo";
        } else if (tarefa.status === "fazendo") {
            tarefa.status = "feitas";
        } else {
            tarefas = tarefas.filter(t => t !== tarefa);
        }

        salvarTarefas();
        renderizar();
    });
}

const listas = [
    {
        coluna: falta,
        lista: listaFalta,
        status: "falta"
    },
    {
        coluna: fazendo,
        lista: listaFazendo,
        status: "fazendo"
    },
    {
        coluna: feitas,
        lista: listaFeita,
        status: "feitas"
    }
];

listas.forEach((area) => {
    area.coluna.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        area.coluna.classList.add("coluna-hover");
    });

    area.coluna.addEventListener("dragleave", () => {
        area.coluna.classList.remove("coluna-hover");
    });

    area.coluna.addEventListener("drop", (event) => {
        event.preventDefault();

        area.coluna.classList.remove("coluna-hover");

        let indice = parseInt(event.dataTransfer.getData("text/plain"), 10);

        if (isNaN(indice)) return;

        let tarefa = tarefas[indice];

        if (!tarefa) return;

        tarefa.status = area.status;

        salvarTarefas();
        renderizar();
    });
});

novaTarefa.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTarefa.click();
    }
});

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizar() {
    listaFalta.innerHTML = "";
    listaFazendo.innerHTML = "";
    listaFeita.innerHTML = "";

    tarefas.forEach(addItem);

    atualizarContadores();
}

function atualizarContadores() {
    contadorFalta.textContent = listaFalta.children.length;
    contadorFazendo.textContent = listaFazendo.children.length;
    contadorFeitas.textContent = listaFeita.children.length;
}

addTarefa.addEventListener("click", () => {
    let texto = novaTarefa.value.trim();

    if (texto !== "") {
        tarefas.push({
            texto: texto,
            status: "falta",
            criadoEm: new Date().toISOString()
        });

        salvarTarefas();
        renderizar();

        novaTarefa.value = "";
    }
});

function carregarTarefas() {
    const dados = localStorage.getItem("tarefas");

    if (dados) {
        tarefas = JSON.parse(dados);
    }

    renderizar();
}

carregarTarefas();