// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
const container = document.querySelector(".container");
const addBtn = document.querySelector(".add");
const formEl = document.querySelector(".formSubmit");
const search = document.querySelector('[name="search"]');
const searchByName = document.querySelector('[name="search"]');
const searchByMonth = document.querySelector('[name="month"]'); //state 

let persons = []; // import { displayPeopleList } from "./displayList.js";
//fetch people

const fetchpeople = async () => {
  const peopleUrl = await fetch("people.json");
  const data = await peopleUrl.json();
  persons = [...data];
  displayPeopleList(persons);
  return data;
};

fetchpeople(); //add to local storage

async function initlocalStorage() {
  localStorage.setItem("persons", JSON.stringify(persons));
} //restore form local storage


async function restoreFromLocalStorage() {
  let listOfOeople = JSON.parse(localStorage.getItem('persons'));

  if (persons) {
    persons = listOfOeople;
    fetchpeople();
  }

  container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
}

;

function searchFilterFunc(e) {
  displayPeopleList(e, searchByName.value, searchByMonth.value);
} //function display list of people


function displayPeopleList(persons, filterName, filterByMonth) {
  let currentYear = new Date().getFullYear();
  const dateNow = Date.now();
  const array = persons.map(per => {
    //get the month of the birthday
    const birthDateMonth = new Date(per.birthday).getMonth(); //get the day of the birthday

    const birthDateDay = new Date(per.birthday).getDay(); //here is creating a date mmm/ddd/yyy

    const date = "".concat(birthDateMonth + 1, "/").concat(birthDateDay + 1, "/").concat(currentYear); //get the time stamp of the date above; ex: 03/05/2020 = 381374912739123;

    const dateMiliseconds = new Date("".concat(date)).getTime(); //here is how far the birthday is (in milliseconds)

    const dateDiff = dateMiliseconds - dateNow; //here is how far the birthday is (in days)

    let daysToGo = Math.round(dateDiff / (1000 * 60 * 60 * 24)); //if the birthday has gone, plus the numbers of the days rest to 356 days.

    if (daysToGo < 0) {
      daysToGo = daysToGo + 365;
    }

    const birthday = per.birthday; //split the date in order to get in which month the index is.

    const arr = date.split("/");
    const monthIndex = parseInt(arr[0], 10) - 1; //list of months

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; //Month that are matches the index.

    const birthMonths = monthNames[monthIndex]; //here is to distinguish how many old years old the person is.

    const diff = Math.round((dateNow - birthday) / (1000 * 60 * 60 * 24 * 365)); //if days are ending with 1, add "st" at the end

    if (arr[1].endsWith("1")) {
      arr[1] = "".concat(arr[1], "st");
    } //if days are ending with 2, add "nd" at the end 
    else if (arr[1].endsWith("2")) {
        arr[1] = "".concat(arr[1], "nd");
      } //if days are ending with 3, add "rd" at the end  
      else if (arr[1].endsWith("3")) {
          arr[1] = "".concat(arr[1], "rd");
        } //exception 11, 12, 13 just stay with "th" at the end. 
        else if (arr[1] == "11" || arr[1] == "12" || arr[1] == "13") {
            arr[1] = "".concat(arr[1], "th");
          } //the rest, just add th at the end. 
          else {
              arr[1] = "".concat(arr[1], "th");
            }

    ; //here I added some entries to a persons in order to make it easier to display on html

    const person = {
      firstName: per.firstName,
      lastName: per.lastName,
      id: per.id,
      birthday: per.birthday,
      days: daysToGo,
      picture: per.picture,
      year: diff,
      month: birthMonths,
      daysOfbirth: arr[1]
    };
    return person;
  }); //sort the people by the days to go of their birthdays

  let peopleSorted = array.sort(function (a, b) {
    return a.days - b.days;
  }); //search by name

  if (filterName !== " ") {
    peopleSorted = peopleSorted.filter(person => {
      let lowerCaseFirstName = person.firstName.toLowerCase();
      let lowerCaseLaststName = person.lastName.toLowerCase();
      let lowerCaseFilter = filterName;

      if (lowerCaseFirstName.includes(lowerCaseFilter) || lowerCaseLaststName.includes(lowerCaseFilter)) {
        return true;
      }
    });
  } //search by month


  if (filterByMonth !== " ") {
    peopleSorted = peopleSorted.filter(person => person.month.toLowerCase() === filterByMonth.toLowerCase());
  }

  ; //html for the people sorted.

  const html = peopleSorted.map(person => {
    return "\n    <div class=\"row mt-3\" data-id=\"".concat(person.id, "\">\n      <div class=\"col\">\n        <img src=\"").concat(person.picture, "\" class=\"rounded-circle\">\n      </div>\n      <div class=\"col\">\n        <div>\n          ").concat(person.firstName, " ").concat(person.lastName, " \n          is turning \n          <b>").concat(person.year + 1, "</b> \n          on \n          <b>").concat(person.month, "</b> \n          the \n          <b>").concat(person.daysOfbirth, "</b>\n        </div>\n      </div>\n      <div class=\"col\">").concat(person.days <= 1 ? person.days = person.days + "day" : person.days = person.days + " " + "days", "\n      </div>\n      <div class=\"col\">\n        <button \n          type=\"button\" \n          value=\"").concat(person.id, "\" \n          data-id=\"").concat(person.id, "\" \n          class=\"edit\">\n          <span>edit</span>\n        </button>\n      </div>\n      <div class=\"col\">\n        <button \n          type=\"button\" \n          value=\"").concat(person.id, "\" \n          class=\"delete\" data-id=\"").concat(person.id, "\">\n          <span>delete</span>\n        </button>\n      </div>\n    </div>");
  });
  container.innerHTML = html.join("");
} //delete person function


function deletePerson(e) {
  const deleteBtn = e.target.matches(".delete");

  if (deleteBtn) {
    //find the id of the pers to delete
    const idOfPeopleToDelete = e.target.closest('.delete').dataset.id;
    deletePersonPupup(idOfPeopleToDelete);
  }
}

; //delete person popup

async function deletePersonPupup(idOfPeopleToDelete) {
  //find the id of the pers to delete
  const peopleToDelete = persons.find(per => per.id === idOfPeopleToDelete); //create buttons "yes"

  const yesBtn = document.createElement("button");
  yesBtn.type = "button";
  yesBtn.textContent = "Yes"; //create "no" button

  const noBtn = document.createElement("button");
  noBtn.type = "button";
  noBtn.textContent = "No";
  const btnPopup = document.createElement('div');
  btnPopup.classList.add('div');
  btnPopup.textContent = "Are you sure you want to delete ".concat(peopleToDelete.firstName, " ").concat(peopleToDelete.lastName); //add both "yes" and "no" button to the container

  btnPopup.appendChild(yesBtn);
  btnPopup.appendChild(noBtn); //add the container to the DOM

  document.body.appendChild(btnPopup); //open the popup by adding classlist of "open"

  btnPopup.classList.add("open"); //function to delete popup 

  function deletePopup() {
    btnPopup.classList.remove("open");
  } //if no gets clicked delete the popup


  noBtn.addEventListener("click", e => {
    deletePopup();
  }); //if yes button gets clicked delete the pers and ddestroy the popup

  yesBtn.addEventListener("click", e => {
    const peopleRest = persons.filter(person => person.id !== idOfPeopleToDelete);
    persons = peopleRest;
    console.log(persons);
    container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
    deletePopup();
  }, {
    once: true
  });
}

;

function editPerson(e) {
  const editButton = e.target.matches(".edit");

  if (editButton) {
    const button = e.target.closest(".edit");
    const id = button.dataset.id;
    editPersonPopup(id);
  }
} //edit person popup


async function editPersonPopup(id) {
  const personToEdit = persons.find(person => person.id === id);
  return new Promise(async function (resolve) {
    //create a new form elem
    const formEl = document.createElement('form');
    formEl.classList.add("form");
    formEl.insertAdjacentHTML("afterbegin", "\n      <div class=\"form-group\">\n        <label for=\"lastName\">".concat(personToEdit.lastName, "</label>\n        <input type=\"text\" class=\"form-control\" id=\"").concat(personToEdit.id, "\" name=\"lastName\" value=\"").concat(personToEdit.lastName, "\"> \n      </div>\n      <div class=\"form-group\">\n        <label for=\"firstName\">").concat(personToEdit.firstName, "</label>\n        <input type=\"text\" class=\"form-control\" name=\"firstName\" id=\"").concat(personToEdit.id, "\" value=\"").concat(personToEdit.firstName, "\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"birthday\">Birthday</label>\n        <input type=\"date\" id=\"birthday\" class=\"form-control\" name=\"birthday\" id=\"").concat(personToEdit.birthday, "\">\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n    "));
    document.body.appendChild(formEl);
    formEl.classList.add("open"); //listeners for the for elem

    formEl.addEventListener("submit", e => {
      e.preventDefault();
      const form = e.currentTarget;
      const birthDate = new Date(form.birthday.value);
      const birthDateMiliseconds = birthDate.getTime(); //create an obj for the edited pers

      const newPerson = {
        id: id,
        lastName: form.lastName.value,
        firstName: form.firstName.value,
        birthday: birthDateMiliseconds,
        picture: personToEdit.picture
      }; //reasign the value of the pers to the value of the new pers

      const editedPerson = persons.find(person => person.id === newPerson.id);
      editedPerson.firstName = newPerson.firstName;
      editedPerson.lastName = newPerson.lastName;
      editedPerson.birthday = newPerson.birthday;
      editedPerson.id = editedPerson.id; //uptdate the lsit

      container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
      formEl.classList.remove("open");
    }, {
      once: true
    });
  });
}

function showForm() {
  formEl.removeAttribute("hidden");
} //submit the form for the new person


function submitForm(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const birthDate = form.birthday.value;
  const dateTime = Date.parse(birthDate); //create an obj for the new pers

  const newPerson = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    id: form.id.value,
    picture: form.picture.value,
    birthday: dateTime
  }; //push the new pers to the persons array.

  persons.push(newPerson);
  container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
  formEl.hidden = true;
  form.reset();
}

; //listeners

container.addEventListener("click", editPerson);
container.addEventListener("click", deletePerson);
container.addEventListener("listOfPeopleUpdated", displayPeopleList);
container.addEventListener("listOfPeopleUpdated", initlocalStorage);
restoreFromLocalStorage();
addBtn.addEventListener("click", showForm);
formEl.addEventListener("submit", submitForm);
searchByName.addEventListener("keyup", searchFilterFunc);
searchByMonth.addEventListener("change", searchFilterFunc);
},{}],"../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53029" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map