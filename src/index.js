import './pages/index.css';
//import { initialCards } from './cards';
import { createCard, toogleHeart, deleteCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation, setEventListeners } from './components/validation';

import { getInitialCards, updateUserInfo, getUserInfo, postCard, deleteCardFromServer, updateAvatar } from './components/api';

//All modal window//
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupAddCard = document.querySelector('.popup_type_new-card');
export const popupImg = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_avatar')

//All form//
const formEditProfile = popupEditProfile.querySelector('.popup__form')
const formAddCard = popupAddCard.querySelector('.popup__form')
const formEditAvatar = popupEditAvatar.querySelector('.popup__form')

//Buttons open & close//
const openEditBtnPopup = document.querySelector(".profile__edit-button");
const closeButtons = document.querySelectorAll('.popup__close');
const openBtnAddCard = document.querySelector('.profile__add-button');

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const userAvatar = document.querySelector('.profile__image');

userAvatar.addEventListener('click', () => { openModal(popupEditAvatar) });




// @todo: DOM узлы
const listContainer = document.querySelector('.places__list');

//getInitialCards()
//  .then(cards => {
//    listContainer.innerHTML = ''; // Очищаем контейнер перед загрузкой новых карточек
//    renderCards(cards, deleteCard, toogleHeart, openBigImage);
//  })
//  .catch(error => {
//    console.error('Ошибка загрузки карточек с сервера', error);
//  });

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationConfig);

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closeModal(button.closest('.popup'));
  });
});

// @todo: Функция октрытия попапа картинки
function openBigImage(newCard, photoCardEl) {
  openModal(popupImg);
  const cardTitle = newCard.querySelector('.card__title');

  popupImage.src = photoCardEl.src;
  popupCaption.textContent = cardTitle.textContent;
  popupImg.src = photoCardEl.src;
  popupImg.alt = cardTitle.textContent;
}

//? @todo: Вывести карточки на страницу

function renderCards(cards, deleteCallback, toogleHeartCallback, openBigImageCallback) {
  // Создаем и добавляем карточки в контейнер
  cards.forEach(data => {
    const cardElement = createCard(data, deleteCallback, toogleHeartCallback, openBigImageCallback, userInfo._id);
    listContainer.appendChild(cardElement);
  });
}
//? Открытие и закрытие попапа popupEditProfile
openEditBtnPopup.addEventListener('click', () => {
  openModal(popupEditProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  const btn = formEditProfile.querySelector('.popup__button');

  //setEventListeners(formEditProfile, validationConfig);
  clearValidation(formEditProfile, validationConfig) // сделать так, чтобып
});

//? Находим поля формы в DOM
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description")

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;



Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    window.userInfo = userInfo;
    profileName.textContent = userInfo.name;
    profileJob.textContent = userInfo.about;

    userAvatar.style.backgroundImage = `url(${userInfo.avatar})`;

    // Очищаем контейнер перед загрузкой новых карточек
    listContainer.innerHTML = '';

    // Рендерим карточки
    renderCards(initialCards, deleteCard, toogleHeart, openBigImage);
    return getInitialCards()
  })
  .catch(errors => {
    console.error('Произошла ошибка:', errors);
  });

//getUserInfo()
//  .then((userInfo) => {
//    window.userInfo = userInfo;
//    profileName.textContent = userInfo.name;
//    profileJob.textContent = userInfo.about;
//    userAvatar.url = userInfo.avatar;
//    return getInitialCards()
//  })

formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const saveButton = formEditProfile.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  setTimeout(() => {
    updateUserInfo(nameInput.value, jobInput.value)
      .then((userInfo) => {
        profileName.textContent = userInfo.name;
        profileJob.textContent = userInfo.about;

      })
      .finally(() => {

        saveButton.textContent = 'Сохранить';
      });

    closeModal(popupEditProfile);

    clearValidation(formEditProfile, validationConfig);
  }, 1000);
});


openBtnAddCard.addEventListener('click', () => {
  openModal(popupAddCard);
  formAddCard.reset();

  clearValidation(formAddCard, validationConfig);
})

formAddCard.addEventListener('submit', function (event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);
  const valueName = values['place-name'];
  const valueUrl = values['link'];

  const saveButton = formAddCard.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';
  setTimeout(() => {
    postCard(valueName, valueUrl)
      .then(newCard => {

        const cardElement = createCard(newCard, deleteCard, toogleHeart, openBigImage, userInfo._id);
        listContainer.prepend(cardElement);

        form.reset();
        closeModal(popupAddCard);
      })
      .catch(error => {
        console.error('Ошибка добавления карточки:', error);
      })
      .finally(() => {

        saveButton.textContent = 'Сохранить';
      });

    closeModal(popupAddCard);
  }, 1000)
});


//Добавление всем попапам класса popup_is-animated
const allPops = document.querySelectorAll('.popup');
allPops.forEach((pop) => pop.classList.add('popup_is-animated'))


formEditAvatar.addEventListener('submit', function (event) {
  event.preventDefault();

  const avatarLinkInput = event.target.querySelector('.popup__input_type_avatar-url');
  const avatarLink = avatarLinkInput.value;
  const saveButton = formEditAvatar.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';
  setTimeout(() => {
    updateAvatar(avatarLink)
      .then(() => {
        userAvatar.style.backgroundImage = `url(${avatarLink})`;
        closeModal(popupEditAvatar);
      })
      .catch(error => {
        console.error('Ошибка обновления аватара:', error);
      })
      .finally(() => {
        saveButton.textContent = 'Сохранить';
      });
  });
}, 1000)
