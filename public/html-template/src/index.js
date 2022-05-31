const form = document.querySelector('.synapse__form-register-a')
const inputArr = document.querySelectorAll('input')
const emailregex = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
const nameregex = new RegExp(/[a-zA-Z]/)

document.querySelector('.btn__modal').addEventListener('click', () => {
    document.querySelector('.modal__sendemail').style.display = 'none'
} )


form.addEventListener('submit', (e)=>{
    let pass = 0
    e.preventDefault()
    inputArr.forEach(el => {if(el.classList.contains('error')){ pass = pass + 1}})
    if(pass === 0 && inputArr[4].checked){
        document.querySelector('.modal__sendemail').style.display = 'flex'
    } else {
        console.log('no pasa')
    }
})

inputArr.forEach(el => {
    el.addEventListener('input', () => validar(el))
})

function validar(input){
    if(input.id === 'name'){
        if(!nameregex.test(input.value) || input.value.length === 0){
            if(input.classList.contains('ok')){
                return input.classList.replace('ok', 'error')
            }

            input.classList.add('error')
            
        } else {
            if (input.classList.contains('error')) {
                return input.classList.replace('error', 'ok')
            }
            input.classList.add('ok')
        }
    }
    if(input.id === 'email'){
        if(!emailregex.test(input.value)){
            if(input.classList.contains('ok')){
                return input.classList.replace('ok', 'error')
            }

            input.classList.add('error')
            
        } else {
            if (input.classList.contains('error')) {
                return input.classList.replace('error', 'ok')
            }
            input.classList.add('ok')
        }
    }
    if(input.id === 'password'){
        confirmPaswword()
        if(input.value.length < 4){
            if(input.classList.contains('ok')){
                return input.classList.replace('ok', 'error')
            }

            input.classList.add('error')
            
        } else {
            if (input.classList.contains('error')) {
                return input.classList.replace('error', 'ok')
            }
            input.classList.add('ok')
        }
    }
    if(input.id === 'confirm-password'){
        confirmPaswword()
    }
}

function confirmPaswword(){
    if(inputArr[2].value !== inputArr[3].value){
        if(inputArr[3].classList.contains('ok')){
            return inputArr[3].classList.replace('ok', 'error')
        }
        inputArr[3].classList.add('error')
    } else if(inputArr[2].value === inputArr[3].value && inputArr[3].value.length > 0) {
        if(inputArr[3].classList.contains('error')){
            return inputArr[3].classList.replace('error', 'ok')
        }
        inputArr[3].classList.add('ok')
    }

    
}