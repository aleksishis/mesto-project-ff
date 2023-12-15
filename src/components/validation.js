
export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(form, config);
  });
}


export function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);
  inputs.forEach((input) => {
    hideInputError(form, input, config);
  });
  if (submitButton) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  }

}

export function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);
  clearValidation(form, config)
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input, config);
      toggleSubmitButtonState(inputs, submitButton, config);
    });
  });

  form.addEventListener('reset', function () {
    clearValidation(form, config);
  });

  toggleSubmitButtonState(inputs, submitButton, config);
}

export function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
}

export function showInputError(form, input, errorMessage, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  input.classList.add(config.inputErrorClass);
}

export function hideInputError(form, input, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
  input.classList.remove(config.inputErrorClass);
}

export function toggleSubmitButtonState(inputs, submitButton, config) {
  const isValid = inputs.every((input) => input.validity.valid);

  if (isValid) {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  } else {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  }
}