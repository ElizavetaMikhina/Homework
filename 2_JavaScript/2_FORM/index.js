import { validationData } from './validationData.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const fields = validationData.fields;
    const modal = document.querySelector('.modal');

    // Проверка на обязательные поля
    fields.forEach(field => {
        if (field.required) {
            const fieldElement = document.getElementById(field.name)?.closest('.form__group');
            if (fieldElement) {
                const label = fieldElement.querySelector('label');
                if (label) {
                    const star = document.createElement('span');
                    star.textContent = ' *';
                    star.style.color = 'red';
                    label.appendChild(star);
                }
            }
        }
    });

    // Валидация полей формы
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let valid = true;

        fields.forEach(field => {
            const input = document.getElementById(field.name);
            const errorElement = document.getElementById(`${field.name}Error`);
            const value = input.value.trim();
            errorElement.textContent = '';

            switch (field.name) {
                case 'fio':
                    const words = value.split(/\s+/);
                    const fioPattern = /^[a-zA-Zа-яА-Я]/;
                    const fioErrors = [];

                    if (words.length < field.validation.minWords) {
                        fioErrors.push(field.validation.wordsMessage);
                    }
                    if (!fioPattern.test(value)) {
                        fioErrors.push(field.validation.numberMessage);
                    }
                    if (fioErrors.length > 0) {
                        errorElement.innerHTML = fioErrors.join('<br>');
                        input.classList.add('form__input--error');
                        errorElement.style.display = 'block';
                        valid = false;
                    } else {
                        errorElement.style.display = 'none';
                    }
                    break;
                case 'password':
                    const passwordErrors = [];
                    const hasNumber = /\d/;
                    const hasSpecialChars =/[!@#$%^&*]/;

                    if (value.length < field.validation.minLength) {
                        passwordErrors.push(field.validation.message);
                    }
                    if (field.validation.hasNumber && !hasNumber.test(value)) {
                        passwordErrors.push(field.validation.numberMessage);
                    }
                    if (field.validation.hasSpecialChars && !hasSpecialChars.test(value)) {
                        passwordErrors.push(field.validation.specialCharsMessage);
                    }
                    if (passwordErrors.length > 0) {
                        errorElement.innerHTML = passwordErrors.join('<br>');
                        input.classList.add('form__input--error');
                        errorElement.style.display = 'block';
                        valid = false;
                    } else {
                        errorElement.style.display = 'none';
                    }
                    break;
                default:
                    if (field.required && value === '') {
                        input.classList.add('form__input--error');
                        errorElement.textContent = field.validation.message;
                        errorElement.style.display = 'block';
                        valid = false;
                    } else {
                        errorElement.style.display = 'none';
                    }
            }
        });

        if (valid) {
            const inputsError = document.querySelectorAll('.form__input');
            inputsError.forEach(input => {
                input.classList.remove('form__input--error');
                input.classList.add('form__input--success');
            });
            modal.classList.remove('modal_hidden');
        }
    });

    const closeModal = document.querySelector('.modal__close');
    closeModal.addEventListener('click', () => {
        modal.classList.add('modal_hidden');
        clearFormFields();
    });

    const clearFormFields = () => {
        fields.forEach(field => {
            const input = document.getElementById(field.name);
            if (input) {
                input.value = '';
                const errorElement = document.getElementById(`${field.name}Error`);
                errorElement.textContent = '';
                input.classList.remove('form__input--success');
            }
        });
    }

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('modal_hidden');
            clearFormFields();
        }
    });
});
