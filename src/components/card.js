
import { openModal } from "./modal";
import { popupImg } from "..";
import { deleteCardFromServer, postLike, deleteLike } from "./api"

//? @todo: Функция создания карточки
export function createCard(data, deleteCallback, toogleHeartCallback, openBigImageCallback, ownerId) {
  const cardTemplate = document.getElementById('card-template');
  const newCard = cardTemplate.content.firstElementChild.cloneNode(true); // Клонирую шаблон карточки
  // Устанавливаю значения вложенных элементов
  const titleCardel = newCard.querySelector('.card__title')
  const photoCardEl = newCard.querySelector(".card__image");

  titleCardel.textContent = data.name;
  photoCardEl.src = data.link;
  photoCardEl.alt = data.name;

  const likeCountElement = newCard.querySelector('.card__like-count');
  likeCountElement.textContent = data.likes.length;
  //Работаю с иконкой сердца
  const likeHeart = newCard.querySelector(".card__like-button");
  likeHeart.addEventListener('click', () => {
    toogleHeartCallback(likeHeart, likeCountElement, data._id);
    likeCountElement.textContent = data.likes.length;
  });
  const cardId = data._id;


  // Добавляем обработчик клика на иконку удаления только для карточек, созданных текущим пользователем
  if (ownerId === data.owner._id) {
    const deleteIcon = newCard.querySelector('.card__delete-button');
    deleteIcon.addEventListener('click', () => {
      deleteCallback(newCard, cardId); // Передаем DOM-элемент карточки в колбэк
    });
  } else {
    // Если карточка не создана текущим пользователем, скрываем иконку удаления
    const deleteIcon = newCard.querySelector('.card__delete-button');
    deleteIcon.style.display = 'none';
  }

  // Добавляем обработчик клика на иконку удаления
  //const deleteIcon = newCard.querySelector('.card__delete-button');
  //deleteIcon.addEventListener('click', () => {
  //  deleteCallback(newCard); // Передаем DOM-элемент карточки в колбэк  и  // Вызываем переданный колбэк с идентификатором карточки
  //})

  //  ОТКРЫТИЕ ПОПАПА С КАРТИНКОЙ 
  photoCardEl.addEventListener('click', () => {
    openBigImageCallback(newCard, photoCardEl)
  })
  return newCard;
}

//@todo: Функция обработка лайка
export function toogleHeart(heart, likeCountElement, cardId) {
  const isLiked = heart.classList.contains("card__like-button_is-active");



  if (!isLiked) {
    postLike(cardId)
      .then(updatedCard => {
        heart.classList.add("card__like-button_is-active");
        likeCountElement.textContent = updatedCard.likes.length;
      });
  } else {
    deleteLike(cardId)
      .then(updatedCard => {
        heart.classList.remove("card__like-button_is-active");
        likeCountElement.textContent = updatedCard.likes.length;
      });
  }
}
//@todo: Функция удаления карточки
export function deleteCard(cardElement, cardId) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(error => {
      console.error('Ошибка удаления карточки:', error);
    });
}


