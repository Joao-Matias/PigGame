"use strict";

const options = {
  newList: `.new-list`,
  allListsCont: `.all-lists-container`,
  appListLists: `.app-list-lists`,
  mealImg: `.meal-img`,
  listBox: `.list-box`,
  appListIng: `.app-list-ingredients`,
  newItemBtn: `.new-item-btn`,
  ingItem: `.ingredients-item`,
};

class App {
  constructor() {
    this.newList = document.querySelector(options.newList);
    this.allListsCont = document.querySelector(options.allListsCont);
    this.appListLists = document.querySelector(options.appListLists);
    this.mealImg = document.querySelector(options.mealImg);
    this.listBox = document.querySelectorAll(options.listBox);

    this.bind();
  }

  createNewList(e) {
    if (e.key === `Enter`) {
      const listName = this.newList.value;
      const id = document.getElementById(`${listName}`);
      const ingListId = listName + `IngList`;
      const checkLength = this.checksForLength(listName);
      const checkId = this.checkForId(id);

      this.unfocus(this.newList);
      this.listBox.forEach((e) => e.classList.remove(`list-focus`));

      if (id || checkLength || checkId) return;
      this.mealImg.classList.add(`ing-hidden`);
      new List(listName, this.allListsCont);
      new IngredientsList(ingListId, this.appListLists);

      this.toggleIngList(ingListId);
    }
  }

  unfocusFromLists() {
    const allListBox = document.querySelectorAll(options.listBox);
    if (!allListBox) return;
    allListBox.forEach((e) => {
      let question = e.classList.contains(`list-focus`);

      if (question === true) {
        e.classList.remove(`list-focus`);
      }
    });
  }

  toggleIngList(ingListId) {
    const appListIng = document.querySelectorAll(options.appListIng);
    appListIng.forEach((e) => {
      e.classList.add(`ing-hidden`);
    });
    document.getElementById(ingListId).classList.remove(`ing-hidden`);
  }

  checksForLength(e) {
    if (e.length < 1) {
      alert(`You must assign a name to your list`);
      return true;
    }
  }

  checkForId(id) {
    if (id) {
      alert(`Name must be different from other lists`);
      return true;
    }
  }

  unfocus(e) {
    e.value = ``;
    e.blur();
  }

  bind() {
    this.creatList = this.createNewList.bind(this);
    this.newList.addEventListener(`click`, this.unfocusFromLists);
    this.newList.addEventListener(`keypress`, this.creatList);
  }
}

new App();

class List {
  constructor(listName, allListsCont) {
    this.createNewListHTML(listName, allListsCont);

    this.listBox = document.querySelector(options.listBox);
  }

  addFocus() {
    const allListBox = document.querySelectorAll(options.listBox);

    this.removeFocus(allListBox);
    this.listBox.classList.add(`list-focus`);

    const targetIdNumb = this.listBox.id;

    const appListIng = document.querySelectorAll(options.appListIng);
    appListIng.forEach((e) => {
      e.classList.add(`ing-hidden`);
    });

    const list = document.getElementById(targetIdNumb + `IngList`);
    list.classList.remove(`ing-hidden`);
  }

  removeFocus(allListBox) {
    allListBox.forEach((e) => e.classList.remove(`list-focus`));
  }

  createNewListHTML(listName, allListsCont) {
    const newHtmlList = `<li class="new-list-box"><input
          id= ${listName}
          type="text"
          value= ${listName}
          class="list-box lists list-focus"
          maxlength="20"
        />
        </li>`;
    allListsCont.insertAdjacentHTML(`afterbegin`, newHtmlList);
    this.bind();
  }

  bind() {
    const listBox = document.querySelector(options.listBox);
    listBox.addEventListener(`click`, this.addFocus.bind(this));
  }
}

class IngredientsList {
  constructor(ingListId, appListLists) {
    this.creatNewIngHTML(ingListId, appListLists);
  }

  creatNewIngHTML(ingListId, appListLists) {
    const newHtmlIng = `   
    <div class="app-list-ingredients" id="${ingListId}">
        <div class="ing-list-newbtn-cont" >
          <input class="new-item-btn" type="text" placeholder=" New Ingredient" />
        </div>
        <div class="ingredients-item-cont">
        <div class="ingredients-item"
        </div>
        
        </div>
      </div>`;
    appListLists.insertAdjacentHTML(`afterend`, newHtmlIng);
    const newItemBtn = document.querySelector(options.newItemBtn);
    this.bindNewItemBtn(newItemBtn);
  }

  newItem(e) {
    if (e.key === `Enter`) {
      const target = e.target;
      const newItemValue = target.value;
      const activeIngList =
        this.parentNode.parentNode.lastElementChild.firstElementChild;

      const newItem = `<div class="item">
      <ion-icon class="icon" name="pencil-outline"></ion-icon>
      <input class="item-btn" type="text" value="${newItemValue}" />
      </div>`;

      activeIngList.insertAdjacentHTML(`afterbegin`, newItem);

      target.value = ``;
      target.blur();
    }
  }

  bindNewItemBtn(newItemBtn) {
    newItemBtn.addEventListener(`keypress`, this.newItem);
  }
}
