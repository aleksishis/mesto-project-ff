
import { openModal } from "./modal";
import { popupImg } from "..";


//? @todo: Функция создания карточки
export function createCard(data, deleteCallback, toogleHeartCallback, openBigImageCallback) {
  const cardTemplate = document.getElementById('card-template');
  const newCard = cardTemplate.content.firstElementChild.cloneNode(true); // Клонирую шаблон карточки
  // Устанавливаю значения вложенных элементов
  const titleCardel = newCard.querySelector('.card__title')
  const photoCardEl = newCard.querySelector(".card__image");

  titleCardel.textContent = data.name;
  photoCardEl.src = data.link;
  photoCardEl.alt = data.name;


  //Работаю с иконкой сердца
  const likeHeart = newCard.querySelector(".card__like-button");
  likeHeart.addEventListener('click', () => {
    toogleHeartCallback(likeHeart)
  });
  // Добавляем обработчик клика на иконку удаления
  const deleteIcon = newCard.querySelector('.card__delete-button');
  deleteIcon.addEventListener('click', () => {
    deleteCallback(newCard); // Передаем DOM-элемент карточки в колбэк  и  // Вызываем переданный колбэк с идентификатором карточки
  })

  //  ОТКРЫТИЕ ПОПАПА С КАРТИНКОЙ 
  photoCardEl.addEventListener('click', () => {
    openModal(popupImg)
    openBigImageCallback(newCard, photoCardEl)
  })


  return newCard;
}

//@todo: Функция обработка лайка
export function toogleHeart(heart) {
  heart.classList.toggle("card__like-button_is-active");
}
//@todo: Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

