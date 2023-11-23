
//? @todo: Темплейт карточки
const cardTemplate = document.getElementById('card-template');

// @todo: DOM узлы

//? @todo: Функция создания карточки
function createCard(data, deleteCallback) {

  const newCard = cardTemplate.content.firstElementChild.cloneNode(true);; // Клонирую шаблон карточки

  // Устанавливаю значения вложенных элементов
  newCard.querySelector('.card__title').textContent = data.name;
  newCard.querySelector('.card__image').src = data.link;

  // Добавляем обработчик клика на иконку удаления
  const deleteIcon = newCard.querySelector('.card__delete-button');
  deleteIcon.addEventListener('click', () => {
    deleteCallback(newCard); // Передаем DOM-элемент карточки в колбэк
  }) // Вызываем переданный колбэк с идентификатором карточки

  return newCard;
}

//? @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();

}

//? @todo: Вывести карточки на страницу
function renderCards(cards, deleteCallback) {
  const listContainer = document.querySelector('.places__list');


  // Создаем и добавляем карточки в контейнер
  cards.forEach(data => {
    const cardElement = createCard(data, deleteCallback);
    listContainer.appendChild(cardElement);
  });
}

renderCards(initialCards, deleteCard);
