//alunos
const btnAdcAluno = document.querySelector(".adicionarAluno")
const btnRemoverAluno = document.querySelector(".removerAluno")
const btnListarAlunos = document.querySelector(".listarAluno")
const btnAlunos = document.querySelector(".alunos")
const secaoAlunos = document.querySelector(".secaoAlunos")
const mostrarAlunos = document.querySelector(".mostrarAlunosListados")

let alunos = []

function aparecerAbaAlunos() {
    secaoAlunos.style.display = "flex"
    secaoNotas.style.display = "none"
    secaoEstatisticas.style.display = "none"
}

function adcAluno(){
    const nomeAluno = window.prompt("Digite o nome do aluno: ").toLowerCase()
    const nota1 = prompt("Digite as nota do aluno").split(",")
    let soma = 0 

    for (let i = 0; i < nota1.length; i++){
        soma += Number(nota1[i].trim()) // converte em number, trim() retira os espaços e soma à variavel assistente
    }

    let media = soma / nota1.length

    if (alunos.length != 0){
        if (nomeAluno.trim() === "" || nomeAluno.length < 3) {
            alert("Escreva um nome válido.")
        } else if (nota1 > 10 || nota1 < 0){
            alert("Notas inválidas, digite uma nota entre 0 a 10.")
        } else {

            let existe = false

            for (let i = 0; i < alunos.length; i++){
                if (nomeAluno === alunos[i].nome){
                    alert("Esse nome já existe")
                    existe = true
                    break
                } 
            }
            if (!existe) {
                    alunos.push({nome: nomeAluno, notas: nota1, media: media})
                    window.alert("Aluno Adicionado!")
            } 
        }

    } else if (nomeAluno.trim() === "" || nomeAluno.length < 3) {
        alert("Escreva um nome válido.")
    } else if (nota1 > 10 || nota1 < 0){
        alert("Notas inválidas, digite uma nota entre 0 a 10.")
    } else {
        alunos.push({nome: nomeAluno, notas: nota1, media: media})
        window.alert("Aluno Adicionado!")
        }
    }


function listarAlunos(){

    mostrarAlunos.innerHTML= ""

    for (let i = 0; i < alunos.length; i++){

        let media = parseFloat(alunos[i].media).toFixed(1)
        let textoNovo = document.createElement('li')
        textoNovo.textContent = `Nome: ${alunos[i].nome}, Notas: ${alunos[i].notas}, Média: ${media}`
        mostrarAlunos.appendChild(textoNovo)   
    }
}

function removerAluno() {
    let alunoRemovido = window.prompt("Digite o nome do aluno a ser removido: ")

    // procura o índice do aluno
    let index = alunos.findIndex(a => a.nome === alunoRemovido)

    if (index !== -1) {
        let removido = alunos[index] // guarda o aluno antes de remover
        alunos = alunos.filter((_, i) => i !== index) // remove pelo índice

        window.alert(`Aluno ${removido.nome} removido com sucesso!`)
    } else {
        window.alert("Aluno não encontrado.")
    }
}

btnRemoverAluno.addEventListener("click", removerAluno)
btnListarAlunos.addEventListener("click", listarAlunos)
btnAdcAluno.addEventListener("click", adcAluno)
btnAlunos.addEventListener("click", aparecerAbaAlunos)

////////////////////////////////////////////////////////////////////////////////////////////////////////



// notas
const mediaInst = document.querySelector(".mediaInst")
const btnMostrarAlunosAprovados = document.querySelector(".mostrarAlunosAprovados")
const btnNotas = document.querySelector(".notas")
const btnAbrirBarraLateral = document.querySelector(".btnAbrirBarra")
const barraLateral = document.querySelector(".barraLateral")
const secaoNotas = document.querySelector(".secaoNotas")
const mostrarAprovadosUl = document.querySelector(".mostrarAprovados")

function abrirEFecharBarraLateral(){
    barraLateral.classList.toggle("fechada")

    if (barraLateral.classList.contains("fechada")){
        btnAbrirBarraLateral.innerHTML = ">"
    } else {
        btnAbrirBarraLateral.innerHTML = "<"     
    }
}

function aparecerAbaNotas(){
    secaoAlunos.style.display = "none"
    secaoEstatisticas.style.display = "none"
    secaoNotas.style.display = "flex"
}

function mostrarAprovados(){

    if (mediaInst.value > 10) {
        alert("Digite um número entre 0 e 10.")
    }

    mostrarAprovadosUl.innerHTML = ""
    let encontrou = false

    for (let i = 0; i < alunos.length; i++){
        if (alunos[i].media >= mediaInst.value){

            let media = parseFloat(alunos[i].media).toFixed(1)
            let aprovados = document.createElement("li")
            aprovados.textContent = `Nome: ${alunos[i].nome}, Média: ${media}`
            mostrarAprovadosUl.appendChild(aprovados)
            encontrou = true
        } 
    }

    if (!encontrou){
        alert("Nenhum aluno passou.")
    } 
}


btnAbrirBarraLateral.addEventListener("click", abrirEFecharBarraLateral)
btnMostrarAlunosAprovados.addEventListener("click", mostrarAprovados)
btnNotas.addEventListener("click", aparecerAbaNotas)
////////////////////////////////////////////////////////////////////////////////////////////////////////


// Estatisticas 

const secaoEstatisticas = document.querySelector(".secaoEstatisticas")
const btnEstatisticas = document.querySelector(".estatisticas")
const mostrarEstatisticasUl = document.querySelector(".mostrarEstatisticas")
const btnMostrarEstatisticas = document.querySelector(".btnMostrarEstatisticas")
const btnOrdenarAlunos = document.querySelector(".btnOrdenarAlunos")
const mostrarOrdenadosUl = document.querySelector(".ordernarPorMedia")

function aparecerAbaEstatisticas(){
    secaoAlunos.style.display = "none"
    secaoNotas.style.display = "none"
    secaoEstatisticas.style.display = "flex"
}

function mostrarEstatisticas(){
    mostrarEstatisticasUl.innerHTML = ""

    let soma = 0
    let subtracao = 10
    let alunoTop = null
    let alunoPaia = null
    


    // maior media

    for (let i = 0; i < alunos.length; i++){
        if (alunos[i].media > soma) {
            soma = alunos[i].media.toFixed(1)
            alunoTop = alunos[i]
        }
    }

    if (alunoTop){
        let textoEstatisticas = document.createElement("li")
        textoEstatisticas.innerHTML = `Maior Média:  Nome: ${alunoTop.nome}, Média: ${alunoTop.media}`
        mostrarEstatisticasUl.appendChild(textoEstatisticas)
    } 

    ////////////////////////////

    // menor media

    for (let i = 0; i < alunos.length; i++){
        if (alunos[i].media < subtracao) {
            subtracao = alunos[i].media.toFixed(1)
            alunoPaia = alunos[i]
        }
    }

    if (alunoPaia){
        let textoEstatisticas = document.createElement("li")
        textoEstatisticas.textContent = `Menor Média:  Nome: ${alunoPaia.nome}, Média: ${alunoPaia.media}`
        mostrarEstatisticasUl.appendChild(textoEstatisticas)
    } 

    // média das médias

    if (alunos.length === 0){
        alert("Registre alunos com suas respectivas notas.")
    } else {
        let variavelAssistente = 0
        let mediaDasMedias = 0

        for (let i = 0; i < alunos.length; i++){
            if (typeof alunos[i].media === "number"){
                variavelAssistente += alunos[i].media 
                mediaDasMedias = variavelAssistente / alunos.length
                console.log("teste")
            } 
        }

        let textoEstatisticas = document.createElement("li")
        textoEstatisticas.textContent = `Media da turma: ${mediaDasMedias.toFixed(1)}`
        mostrarEstatisticasUl.appendChild(textoEstatisticas)
    }

       
}

function ordenarAlunos(){

    mostrarOrdenadosUl.innerHTML = ""
    let subtracao = 10

    if (alunos.length === 0){
        alert("Registre alunos com suas respectivas notas.")
    } else {

        let ordemDecrescente = alunos.sort((a, b) => b.media - a.media)

        for (let i = 0; i < alunos.length; i++){
            let textoEstatisticas = document.createElement("li")
            textoEstatisticas.textContent = `Nome: ${ordemDecrescente[i].nome}, Médias: ${ordemDecrescente[i].media.toFixed(1)}`
            mostrarOrdenadosUl.appendChild(textoEstatisticas)
        } 
    }
}

btnOrdenarAlunos.addEventListener("click", ordenarAlunos)
btnMostrarEstatisticas.addEventListener("click", mostrarEstatisticas)
btnEstatisticas.addEventListener("click", aparecerAbaEstatisticas)
