
import './pages/index.css';
import { initialCards } from './cards';
import { createCard, toogleHeart, deleteCard } from './components/card';
import { openModal, closeModal } from './components/modal';

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


// @todo: DOM узлы
const listContainer = document.querySelector('.places__list');


renderCards(initialCards, deleteCard, toogleHeart, openBigImage);

closeButtons.forEach((button) => {
  button.addEventListener('click', () => closeModal(button.closest('.popup')));
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
//?Открытие и закрытие попапа popupEditProfile
openPopupBtn.addEventListener('click', () => openModal(popupEditProfile))
//closeButtons.addEventListener('click', () => closeModal(popupEditProfile)) 

// Находим поля формы в DOM
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

});


openBtnAddCard.addEventListener('click', () => openModal(popupAddCard))

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