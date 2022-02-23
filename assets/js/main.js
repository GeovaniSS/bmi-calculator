const form = document.querySelector('.form')
const inputWeight = form.querySelector('#weight') 
const inputHeight = form.querySelector('#height') 
const genders = document.querySelectorAll('.gender')

/* Loop/Node List
    - Adiciona a class active no gênero que o usuário clicar
*/
for (let sex of genders) {
    sex.addEventListener('click', () => {
        for (let sex of genders) {
            sex.classList.remove('active')
        }
        sex.classList.add('active')
    })
}

/* Evento
    - Atualiza o Peso no HTML enquanto o usuário move a bolinha do input range
*/
inputWeight.addEventListener('mousemove', (e) => {
    let weight = Number(e.target.value)
    const currentWeight = form.querySelector('#current-weight') //Peso atual
    currentWeight.innerHTML = weight
})

/* Evento
    - Atualiza a Altura no HTML enquanto o usuário move a bolinha do input range
*/
inputHeight.addEventListener('mousemove', (e) => {
    let height = Number(e.target.value)
    const currentHeight = form.querySelector('#current-height') //Altura atual
    currentHeight.innerHTML = height
})

/* Evento
    - Chamada para a função que atualiza o Peso no HTML quando uma tecla é pressionada
*/
inputWeight.addEventListener('keydown', (e) => {
    let weight = Number(e.target.value)
    const currentWeight = form.querySelector('#current-weight')
    updateValue(e, weight, currentWeight)
})

/* Evento
    - Chamada para a função que atualiza a Altura no HTML quando uma tecla é pressionada
*/
inputHeight.addEventListener('keydown', (e) => {
    let height = Number(e.target.value)
    const currentHeight = form.querySelector('#current-height')
    updateValue(e, height, currentHeight) 
})

/* Função
    - Incrementa o valor do peso/altura se a tecla arrowRight for pressionada
    - Decrementa o valor do peso/altura se a tecla arrowLeft for pressionada
*/
function updateValue(e, value, current) {
    if (e.keyCode === 39) {
        current.innerHTML = ++value
    }
    if (e.keyCode === 37) {
        current.innerHTML = --value
    }
}

/* Evento
    - Captura do evento de submit do form
    - Chamada para as funções do IMC
*/
form.addEventListener('submit', (e) => {
    e.preventDefault()
    
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
    - Define o personagem de acordo com o sexo escolhido pelo usuário
    - Muda os estágios (magreza, normal, sobrepeso...) das imagens de acordo com o status do IMC
*/
function setImcRange(imcStatus) {
    const status = imcStatus === 'Obesidade Grave' ? 'obesidadeGrave' : imcStatus.toLowerCase()
    const defaultSex = genders[0].classList.contains('active')
    
    const imcRange = document.createElement('img')
    const imcValueRange = document.querySelector('.imc-value--range')
    imcValueRange.innerHTML = ''
    
    const man = {
        magreza: 'assets/img/homem-nivel-imc/homem-magreza.png',
        normal: 'assets/img/homem-nivel-imc/homem-normal.png',
        sobrepeso: 'assets/img/homem-nivel-imc/homem-sobrepeso.png', 
        obesidade: 'assets/img/homem-nivel-imc/homem-obesidade.png', 
        obesidadeGrave: 'assets/img/homem-nivel-imc/homem-obesidade-grave.png'
    }

    const woman = {
        magreza: 'assets/img/mulher-nivel-imc/mulher-magreza.png',
        normal: 'assets/img/mulher-nivel-imc/mulher-normal.png',
        sobrepeso: 'assets/img/mulher-nivel-imc/mulher-sobrepeso.png', 
        obesidade: 'assets/img/mulher-nivel-imc/mulher-obesidade.png', 
        obesidadeGrave: 'assets/img/mulher-nivel-imc/mulher-obesidade-grave.png'
    }

    if (defaultSex) {
        for (let key in man) {
            if (key === status) {
                imcRange.src = man[key]
                break
            }
        }
    }

    if (!defaultSex) {
        for (let key in woman) {
            if (key === status) {
                imcRange.src = woman[key]
                break
            }
        }
    }

    imcValueRange.appendChild(imcRange)
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
