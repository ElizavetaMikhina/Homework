export const validationData = {
    fields: [
        {
            name: "fio",
            label: "ФИО",
            required: true,
            validation: {
                minLength: 3,
                minWords: 2,
                message: "Пожалуйста, введите ваше ФИО",
                wordsMessage: "Пожалуйста, введите ваше полное ФИО",
                numberMessage: 'ФИО должно содержать только буквы и дефисы'
            }
        },
        {
            name: "password",
            label: "Ваш пароль",
            required: true,
            validation: {
                minLength: 8,
                hasNumber: true,
                hasSpecialChars: true,
                message: "Пароль должен быть не менее 8 символов",
                numberMessage: "Пароль должен содержать хотя бы одну цифру",
                specialCharsMessage: "Пароль должен содержать хотя бы один специальный символ (!@#$%^&*)"
            }
        }
    ]
};