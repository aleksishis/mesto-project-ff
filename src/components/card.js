
import { deleteCardFromServer, postLike, deleteLike } from "./api";

// Функция создания карточки
export function createCard(data, deleteCallback, toogleHeartCallback, openBigImageCallback, ownerId) {
  const cardTemplate = document.getElementById('card-template');
  const newCard = cardTemplate.content.firstElementChild.cloneNode(true);

  const titleCardel = newCard.querySelector('.card__title');
  const photoCardEl = newCard.querySelector(".card__image");
  const likeCountElement = newCard.querySelector('.card__like-count');
  const likeHeart = newCard.querySelector(".card__like-button");
  const deleteIcon = newCard.querySelector('.card__delete-button');

  titleCardel.textContent = data.name;
  photoCardEl.src = data.link;
  photoCardEl.alt = data.name;

  likeCountElement.textContent = data.likes.length;

  //likeHeart.addEventListener('click', () => {
  //  toogleHeartCallback(likeHeart, likeCountElement, data._id, ownerId);
  //});



  const isLikedByOwner = data.likes.some(like => like._id === ownerId);
  likeHeart.classList.toggle("card__like-button_is-active", isLikedByOwner);

  likeHeart.addEventListener('click', () => {
    toogleHeartCallback(likeHeart, likeCountElement, data._id, ownerId);
  });
  const cardId = data._id;
  likeCountElement.textContent = data.likes.length;

  if (ownerId === data.owner._id) {
    deleteIcon.addEventListener('click', () => {
      deleteCallback(newCard, cardId);
    });
  } else {
    deleteIcon.style.display = 'none';
  }


  photoCardEl.addEventListener('click', () => {
    openBigImageCallback(newCard, photoCardEl);
  });

  return newCard;
}

// Функция обработка лайка
export function toogleHeart(heart, likeCountElement, cardId, ownerId) {
  const isLiked = heart.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? deleteLike : postLike;

  likeMethod(cardId)
    .then(updatedCard => {
      localStorage.setItem(`like_${cardId}`, JSON.stringify(updatedCard.likes));
      heart.classList.toggle("card__like-button_is-active", updatedCard.likes.some(like => like._id === ownerId));
      likeCountElement.textContent = updatedCard.likes.length;
    })
    .catch(error => {
      console.error('Ошибка лайка:', error);
    });
}

// Функция загрузки состояния лайков при загрузке страницы
export function loadLikesState(cardId, ownerId) {
  const storedLikes = localStorage.getItem(`like_${cardId}`);

  if (storedLikes) {
    const likes = JSON.parse(storedLikes);
    const isLikedByOwner = likes.some(like => like._id === ownerId);

    return { likes, isLikedByOwner };
  }

  return { likes: [], isLikedByOwner: false };
}

// Функция удаления карточки
export function deleteCard(cardElement, cardId) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(error => {
      console.error('Ошибка удаления карточки:', error);
    });
}