import { closeButtons } from '../index.js'
//import {}
//Функция открытия попапа
export function openModal(modal) {
  modal.classList.add('popup_is-animated');
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('click', documentClickHandler);

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => closeModal(button.closest('.popup')));
  });
}
//Функция закрытия попапа
export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyDownHandler);
  document.removeEventListener('click', documentClickHandler);
}

const keyDownHandler = (event) => {
  if (event.code === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

const documentClickHandler = ({ target }) => {
  if (target.classList.contains('popup_is-opened')) {
    closeModal(target);
  }
} 