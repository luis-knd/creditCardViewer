const AMEX = 'American Express'
const MASTERCARD = 'Mastercard'
const VISA = 'Visa'
const AMEX_PREFIX = '3'
const MASTERCARD_PREFIX = '5'
const VISA_PREFIX = '4'
const card = document.querySelector('#card')
const btnOpen = document.querySelector('#btn-open')
const form = document.querySelector('#card-form')
const cardNumber = document.querySelector('#card .number')
const cardName = document.querySelector('#card .fullName')
const brandLogo = document.querySelector('#brand-logo')
const signature = document.querySelector('#card .signature p')
const monthExpire = document.querySelector('#card .month')
const yearExpire = document.querySelector('#card .year')
const ccv = document.querySelector('#card .ccv')
const client = document.querySelector('#client')
const separator = document.querySelector('.separator')

const showFront = () => {
    if (card.classList.contains('active')) {
        card.classList.remove('active')
    }
}

card.addEventListener('click', () => {
    card.classList.toggle('active')
})

btnOpen.addEventListener('click', () => {
    btnOpen.classList.toggle('active')
    form.classList.toggle('active')
})

for (let i = 1; i <= 12; i++) {
    let option = document.createElement('option')
    option.value = i < 10 ? '0' + i : i
    option.innerText = i < 10 ? '0' + i : i
    form.selectMonth.appendChild(option)
}

for (let i = 2023; i <= 2035; i++) {
    let option = document.createElement('option')
    option.value = String(i)
    option.innerText = String(i)
    form.selectYear.appendChild(option)
}

form.inputNumber.addEventListener('keyup', (e) => {
    let valueInput = e.target.value
    form.inputNumber.value = valueInput
        .replace(/\s/g, '')
        .replace(/\D/g, '')
        .replace(/([0-9]{4})/g, '$1-')
        .substring(0, 19)
        .trim()

    cardNumber.textContent = valueInput

    evaluateCreditCardCompany(valueInput[0])
    showFront();
});

form.inputName.addEventListener('keyup', (e) => {
    let valueInput = e.target.value;
    form.inputName.value = valueInput
        .replace(/[0-9]/g, '')
    cardName.textContent = valueInput;
    if (valueInput === '') {
        cardName.textContent = '';
    }
    signature.textContent = valueInput;
    showFront();
});

form.selectMonth.addEventListener('change', (e) => {
    monthExpire.textContent = e.target.value;
    if (e.target.value) {
        separator.textContent = '/'
    }
    showFront();
});

form.selectYear.addEventListener('change', (e) => {
    yearExpire.textContent = e.target.value.slice(2);
    if (e.target.value) {
        separator.textContent = '/'
    }
    showFront();
});

form.inputCvv.addEventListener('keyup', () => {
    if (!card.classList.contains('active')) {
        card.classList.toggle('active');
    }

    form.inputCvv.value = form.inputCvv.value
        .replace(/\s/g, '')
        .replace(/\D/g, '');
    ccv.textContent = form.inputCvv.value;
});

const evaluateCreditCardCompany = (creditCardNumber) => {
    brandLogo.innerHTML = ''
    let imagen = document.createElement('img')
    switch (creditCardNumber) {
        case AMEX_PREFIX:
            client.textContent = AMEX
            imagen.src = 'public/images/card/logos/amex.png'
            break
        case VISA_PREFIX:
            client.textContent = VISA
            imagen.src = 'public/images/card/logos/visa.png'
            break
        case MASTERCARD_PREFIX:
            client.textContent = MASTERCARD
            imagen.src = 'public/images/card/logos/mastercard.png'
            break
        default:
            if (isNaN(Number(creditCardNumber))) {
                cardNumber.textContent = ''
            }
            client.textContent = ''
            imagen.src = ''
            return
    }
    brandLogo.appendChild(imagen)
}
