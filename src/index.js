import './pages/index.css';
import { initialCards } from './cards';
import { createCard, toogleHeart, deleteCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation, setEventListeners } from './components/validation';
//All modal window//
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupAddCard = document.querySelector('.popup_type_new-card');
export const popupImg = document.querySelector('.popup_type_image');

//All form//
const formEditProfile = popupEditProfile.querySelector('.popup__form')
const formAddCard = popupAddCard.querySelector('.popup__form')

//Buttons open & close//
const openPopupBtn = document.querySelector(".profile__edit-button");
const closeButtons = document.querySelectorAll('.popup__close');
const openBtnAddCard = document.querySelector('.profile__add-button');

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const userAvatar = document.querySelector('.profile__image');

// @todo: DOM узлы
const listContainer = document.querySelector('.places__list');


renderCards(initialCards, deleteCard, toogleHeart, openBigImage);
loadUserInfo()
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
    const cardElement = createCard(data, deleteCallback, toogleHeartCallback, openBigImageCallback);
    listContainer.appendChild(cardElement);
  });
}
//? Открытие и закрытие попапа popupEditProfile
openPopupBtn.addEventListener('click', () => {
  openModal(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  setEventListeners(formEditProfile, validationConfig);
});

//? Находим поля формы в DOM
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description")

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;


formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupEditProfile);

  clearValidation(formEditProfile, validationConfig)
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
  const newCard = createCard({ name: valueName, link: valueUrl }, deleteCard, toogleHeart, openBigImage);
  listContainer.prepend(newCard)
  form.reset()
  closeModal(popupAddCard);
})
//Добавление всем попапам класса popup_is-animated
const allPops = document.querySelectorAll('.popup')
allPops.forEach((pop) => pop.classList.add('popup_is-animated'))


function loadUserInfo() {
  fetch('https://nomoreparties.co/v1/wff-cohort-2/users/me ', {
    headers: {
      authorization: '29e47ff3-c405-4d45-9bbb-503bd9191003'
    }
  })
    .then(res => res.json())
    .then((userInfo) => {
      profileName.textContent = userInfo.name;
      profileJob.textContent = userInfo.about;
      userAvatar.url = userInfo.avatar;
    });
}

function loadCard() {
  fetch('https://nomoreparties.co/v1/wff-cohort-2/cards', {
    headers: {
      authorization: '29e47ff3-c405-4d45-9bbb-503bd9191003'
    }
  })
    .then(res => res.json())
    .then(res => console.log(res))
}
loadCard()
