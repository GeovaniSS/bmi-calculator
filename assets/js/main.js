const form = document.querySelector('.form')
const inputWeight = form.querySelector('#weight') 
const inputHeight = form.querySelector('#height') 
const chooseGender = document.querySelectorAll('.gender')
const [male, female] = chooseGender //Destructuring dos elementos da NodeList chooseGender

/* Evento
    - Adiciona a class active na .gender[0] se o usuário clicar em Homem 
*/
male.addEventListener('click', () => {
    if (!male.classList.contains('active')) {
        male.classList.add('active')
    }
    else {
        male.classList.remove('active')
    }
})

/* Evento
    - Adiciona a class active na .gender[1] se o usuário clicar em Mulher
*/
female.addEventListener('click', () => {
    if (!female.classList.contains('active')) {
        female.classList.add('active')
    }
    else {
        female.classList.remove('active')
    }
})

/* Evento
    - Atualiza o Peso no HTML quando clicar no input range do Peso
*/
inputWeight.addEventListener('click', (e) => {
    const currentWeight = form.querySelector('#current-weight') //Peso atual
    currentWeight.innerHTML = Number(e.target.value) 
})

/* Evento
    - Atualiza a Altura no HTML quando clicar no input range da Altura
*/
inputHeight.addEventListener('click', (e) => {
    const currentHeight = form.querySelector('#current-height') //Altura atual
    currentHeight.innerHTML = Number(e.target.value)
})

/* Evento
    - Chamada para a função que atualiza o Peso no HTML quando uma tecla é pressionada
*/
inputWeight.addEventListener('keydown', (e) => {
    let weight = Number(e.target.value)
    const currentWeight = form.querySelector('#current-weight')
    updateText(e, weight, currentWeight)
})

/* Evento
    - Chamada para a função que atualiza a Altura no HTML quando uma tecla é pressionada
*/
inputHeight.addEventListener('keydown', (e) => {
    let height = Number(e.target.value)
    const currentHeight = form.querySelector('#current-height')
    updateText(e, height, currentHeight) 
})

/* Função
    - Incrementa o peso/altura se a tecla arrowRight for pressionada
    - Decrementa o peso/altura se a tecla arrowLeft for pressionada
*/
function updateText(e, msg, current) {
    if (e.keyCode === 39) {
        current.innerHTML = ++msg
    }
    if (e.keyCode === 37) {
        current.innerHTML = --msg
    }
}

/* Evento
    - Captura do evento de submit do form
    - Chamada para as funções do IMC
*/
form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const inputWeight = e.target.querySelector('#weight')
    const inputHeight = e.target.querySelector('#height')

    const weight = Number(inputWeight.value)
    const height = Number(inputHeight.value)/100 
    /*A altura é divida por 100 para ser calculada em metros*/

    
    const imc = getImc(weight, height)
    const imcStatus = getImcStatus(imc)
    setImcRange(imcStatus)
    setImcResult(imc, imcStatus)
})

/* Função
    - Calcula o IMC e retorna com duas casas decimais
*/
function getImc(weight, height) {
    const imc = weight/height**2
    return imc.toFixed(2)
}

/* Função
    - Retorna o status de acordo com o valor do IMC
*/
function getImcStatus(imc) {
    const status = ['Magreza', 'Normal', 'Sobrepeso', 'Obesidade', 'Obesidade Grave']

    if (imc < 18.5) return status[0]
    if (imc <= 24.9) return status[1]
    if (imc <= 29.9) return status[2]
    if (imc <= 39.9) return status[3]
    if (imc > 40) return status[4]
}

/* Função
    - Muda a imagem de acordo com o status do IMC
*/
function setImcRange(imcStatus) {
    const imcRange = document.createElement('img')
    console.log(imcRange)
    const container = document.querySelector('.imc-value--range')
    container.innerHTML = ''
    
    switch (imcStatus) {
        case 'Magreza':
            imcRange.src = 'assets/img/mulher-nivel-imc/mulher-magreza.png'
            break

        case 'Normal':
            imcRange.src = 'assets/img/mulher-nivel-imc/mulher-normal.png'
            break

        case 'Sobrepeso':
            imcRange.src = 'assets/img/mulher-nivel-imc/mulher-sobrepeso.png'
            break

        case 'Obesidade':
            imcRange.src = 'assets/img/mulher-nivel-imc/mulher-obesidade.png'
            break

        case 'Obesidade Grave': 
            imcRange.src = 'assets/img/mulher-nivel-imc/mulher-obesidade-grave.png'
            break
    }   
    container.appendChild(imcRange)
}

/* Função
    - Atualiza o resultado do IMC no HTML
    - Atualiza o nível/status do IMC no HTML
*/
function setImcResult(imc, imcStatus) {
    const imcResultText = document.querySelector('#imc')
    const imcStatusText = document.querySelector('#imc-status')
    
    imcResultText.innerHTML = imc
    imcStatusText.innerHTML = imcStatus
}
