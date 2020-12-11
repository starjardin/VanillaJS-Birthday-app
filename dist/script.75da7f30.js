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
})({"people.json":[function(require,module,exports) {
module.exports = [{
  "id": "1fbef8c1-9823-4cb5-b138-259fed0fb2b1",
  "lastName": "Kihn",
  "firstName": "Effie",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 92614674399
}, {
  "id": "567084f7-b7e8-41ba-90cb-be5ff8d78b68",
  "lastName": "Spinka",
  "firstName": "Adriel",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1093495104944
}, {
  "id": "35194943-2f14-4066-89c7-e3101ad5bde1",
  "lastName": "Schaefer",
  "firstName": "Ricky",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 117168543755
}, {
  "id": "f972f811-1fb5-4a12-b64b-23a6c41d8673",
  "lastName": "Jones",
  "firstName": "Laila",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 166977747202
}, {
  "id": "2ebb247d-271c-4ead-a71f-7663824ada00",
  "lastName": "Lebsack",
  "firstName": "Drake",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1566102146696
}, {
  "id": "2b60062b-2bbb-4ea4-a139-33b8fc2aad9a",
  "lastName": "Pfeffer",
  "firstName": "Jennie",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1011935832093
}, {
  "id": "faed72a5-986d-43ec-8579-423e5b76f5f2",
  "lastName": "Kunde",
  "firstName": "Jolie",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1401888987134
}, {
  "id": "9d180b9b-2601-4a1e-b4a1-9e8fded6f394",
  "lastName": "O'Keefe",
  "firstName": "Joseph",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1037798625865
}, {
  "id": "1ea7ab1f-1eb2-4a56-ad45-df5cf1ec85cc",
  "lastName": "O'Reilly",
  "firstName": "Jameson",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 826879604467
}, {
  "id": "e535a43c-5271-4257-812f-76be426bae67",
  "lastName": "Wilkinson",
  "firstName": "Kenyon",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1402692289892
}, {
  "id": "cca604b9-8e16-4f9a-a37e-deebe0de505f",
  "lastName": "Mertz",
  "firstName": "Claude",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 317143779641
}, {
  "id": "cac8615a-0730-4519-b4b7-34c9592d2470",
  "lastName": "Harvey",
  "firstName": "Shyanne",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 592513896097
}, {
  "id": "f838e9aa-56d2-4f03-ab11-47673a217fc5",
  "lastName": "Gleason",
  "firstName": "Orpha",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 706617912851
}, {
  "id": "dc93f4ff-3eae-426e-a40f-1e0d189f7a43",
  "lastName": "Greenholt",
  "firstName": "Florine",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1297302808569
}, {
  "id": "c81b341a-e9f4-4a12-978a-6a412780946f",
  "lastName": "Lind",
  "firstName": "Ryder",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 753139681691
}, {
  "id": "9b760e4e-56d4-4e75-9cf1-277fc35d6083",
  "lastName": "Spinka",
  "firstName": "Alicia",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 469245384916
}, {
  "id": "11e72616-7db2-4729-ba7b-1bef4271947b",
  "lastName": "Bogan",
  "firstName": "Garret",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1554677632443
}, {
  "id": "48ca5747-006c-45e5-bc6b-d2e188f2057a",
  "lastName": "Boyer",
  "firstName": "Leonora",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 440480006308
}, {
  "id": "6ab44432-0347-4aa7-9011-b2d9a263e941",
  "lastName": "Nikolaus",
  "firstName": "Melvin",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1232166787673
}, {
  "id": "32067372-10b1-47d9-85fa-05c37f34bf79",
  "lastName": "Keeling",
  "firstName": "Sherwood",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1264333932408
}, {
  "id": "d6b9cf39-d584-4e45-9d38-991515a0bc1a",
  "lastName": "Cummings",
  "firstName": "Tamia",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 664906190643
}, {
  "id": "a2794f53-c333-4913-97a7-42c0c31569c2",
  "lastName": "Kozey",
  "firstName": "Bill",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 360186233472
}, {
  "id": "c54f8e30-1abe-4191-86e3-221763991ec0",
  "lastName": "Haley",
  "firstName": "Providenci",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 659156440897
}, {
  "id": "30c4ba46-c123-4789-bc87-b9cd342a08e7",
  "lastName": "Wisozk",
  "firstName": "Estella",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1556884005680
}, {
  "id": "00ba8ca2-84b6-49ee-adb1-5c27191f1af1",
  "lastName": "McDermott",
  "firstName": "Simone",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1466166470473
}, {
  "id": "6aae79f4-6e0e-4fa4-a75a-06b1097c1bff",
  "lastName": "Bergnaum",
  "firstName": "Jermain",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 550478426776
}, {
  "id": "1d91be69-1b89-488c-90b8-96ad0e9eb302",
  "lastName": "Boehm",
  "firstName": "Harmony",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 116497780210
}, {
  "id": "6cc1fc84-7faf-464d-a920-3a81793bbc1c",
  "lastName": "Kuvalis",
  "firstName": "Anastasia",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 739887840848
}, {
  "id": "04960dd8-1cf8-4f20-b4d2-fa3521cfed2c",
  "lastName": "Pacocha",
  "firstName": "Jermaine",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1541837035997
}, {
  "id": "d510f4ba-5ab9-4f41-9e2f-0a3f8da46fe9",
  "lastName": "Robel",
  "firstName": "Orlando",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1147565321291
}, {
  "id": "cd4c7108-296e-43e2-b1bd-cf9e7e0d5222",
  "lastName": "Paucek",
  "firstName": "Tracy",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 169963737077
}, {
  "id": "b40e991c-8cee-44ef-a7a2-ce1fd6bee646",
  "lastName": "Ledner",
  "firstName": "Providenci",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 17617819249
}, {
  "id": "19efeb1b-2c56-4c7b-902c-7d46efc263c4",
  "lastName": "Rowe",
  "firstName": "Khalil",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1453397714156
}, {
  "id": "4b545228-2d36-49df-a71f-65c245713137",
  "lastName": "Kuphal",
  "firstName": "Elmo",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1446407787878
}, {
  "id": "99538f88-ab0f-4be2-b574-21874a5d9f88",
  "lastName": "Littel",
  "firstName": "Eldridge",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 162542910895
}, {
  "id": "dfdee642-465d-4786-baec-ab3fbf5a6eac",
  "lastName": "Turner",
  "firstName": "Cletus",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 129709713903
}, {
  "id": "994a8152-6c94-44ea-ae7f-6be56700376f",
  "lastName": "Hoeger",
  "firstName": "Melany",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1177729119656
}, {
  "id": "bd45b053-454c-47d6-afe5-6b8f8c82d751",
  "lastName": "Waelchi",
  "firstName": "Brooklyn",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1157960290996
}, {
  "id": "c650e8c6-8326-4bc0-9f56-15eaea0a14b1",
  "lastName": "Corwin",
  "firstName": "Zane",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1544760408259
}, {
  "id": "9f1b2352-7af2-4019-a035-b6459155a15f",
  "lastName": "Purdy",
  "firstName": "Terry",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 621418612875
}, {
  "id": "9af6b30e-4624-4c54-965f-8c7d5fc13a64",
  "lastName": "Rosenbaum",
  "firstName": "Monica",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 547296222344
}, {
  "id": "091e513a-0a56-49f8-a293-34a4f1931c22",
  "lastName": "Erdman",
  "firstName": "Aiden",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 472075142095
}, {
  "id": "3458830f-76ae-43ca-83b3-7325b47c729a",
  "lastName": "Hermann",
  "firstName": "Jovan",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1228116803428
}, {
  "id": "fcc014e9-6158-40cb-8f2d-847c1f7d2445",
  "lastName": "O'Connell",
  "firstName": "Gerda",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 965765455414
}, {
  "id": "e5c01b19-1e3a-4e99-abc3-5a4180c51c28",
  "lastName": "Greenholt",
  "firstName": "Tod",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 175348787477
}, {
  "id": "24fc248e-a710-43b5-be85-a07178380f80",
  "lastName": "Hirthe",
  "firstName": "Enid",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 991237731056
}, {
  "id": "77e343dc-b870-4cea-adf0-a83216f6dc1f",
  "lastName": "Jaskolski",
  "firstName": "Abe",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 460305517098
}, {
  "id": "c4784fb3-a9d7-489a-9a9a-4481921c67e9",
  "lastName": "Goodwin",
  "firstName": "Estevan",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1205001068753
}, {
  "id": "ccd71923-eef2-4b16-8d76-37d89f62d2ed",
  "lastName": "Schinner",
  "firstName": "Fay",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1034738251297
}, {
  "id": "e2b1470f-f6d4-4885-9f05-71037f9622e4",
  "lastName": "Keebler",
  "firstName": "Alexis",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 917244318988
}, {
  "id": "6477cb17-9d8b-4be6-a426-924903cbb4ab",
  "lastName": "Littel",
  "firstName": "Reynold",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 747966972202
}, {
  "id": "a506e67f-269e-47a0-b486-3925874f6ec8",
  "lastName": "Deckow",
  "firstName": "Wilfrid",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1574625676754
}, {
  "id": "2397dbbe-09ad-4863-966a-08e99734a96b",
  "lastName": "Daniel",
  "firstName": "Aglae",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1475093885653
}, {
  "id": "12a33a94-c500-4b8a-944f-45ec046aa56b",
  "lastName": "Heidenreich",
  "firstName": "Cade",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 659966463878
}, {
  "id": "bc4cf231-30f3-4a5b-85ca-f1e9a68ad1bb",
  "lastName": "Kunde",
  "firstName": "Chanelle",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 771719125520
}, {
  "id": "51e3d5ab-2ddb-410b-adfc-0af340f1151e",
  "lastName": "Kiehn",
  "firstName": "Lilly",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 76090599167
}, {
  "id": "9c2aa110-8705-4c2a-b185-8f9f6e878070",
  "lastName": "Baumbach",
  "firstName": "Lina",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 276975856643
}, {
  "id": "b3f8d2a9-2abe-4926-85d4-0d10fa6e944b",
  "lastName": "Stanton",
  "firstName": "Jamel",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 515128025486
}, {
  "id": "795b28bf-7854-49ba-a210-454cd6165e5f",
  "lastName": "Erdman",
  "firstName": "Jovani",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 892704071397
}, {
  "id": "cc909ed2-d0f8-40c1-bce3-52911e27e76e",
  "lastName": "Reilly",
  "firstName": "Halle",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 902445552435
}, {
  "id": "3eb41f9e-7794-4e3d-bfb1-67a9ec6194c9",
  "lastName": "Johnson",
  "firstName": "Cayla",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 248897227496
}, {
  "id": "15703468-1fc9-446e-b67c-77f860f3968e",
  "lastName": "Nitzsche",
  "firstName": "Torey",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 533273249724
}, {
  "id": "28c64999-0521-47b9-9cb7-6aff60637284",
  "lastName": "Hagenes",
  "firstName": "Justen",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1204806653040
}, {
  "id": "56e87b8a-b61a-4951-8e99-a37ad285033d",
  "lastName": "Muller",
  "firstName": "Winfield",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 487799206165
}, {
  "id": "c6369189-0b8e-44ac-b5bb-16b53ea64fed",
  "lastName": "Lynch",
  "firstName": "Gilberto",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 348905534786
}, {
  "id": "38343781-8e60-4bab-82e5-40689cb146c3",
  "lastName": "Bartoletti",
  "firstName": "Archibald",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1196990571546
}, {
  "id": "b2cf0b37-ab94-49e6-8663-3acc5573aab6",
  "lastName": "Green",
  "firstName": "Pasquale",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 591364313394
}, {
  "id": "1d0a6153-90b5-413a-ad77-9fbc93b6743b",
  "lastName": "Schroeder",
  "firstName": "Cullen",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 648765505104
}, {
  "id": "848c76f0-5eda-407b-9741-a57a239fff88",
  "lastName": "Rowe",
  "firstName": "Sheldon",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 602135119331
}, {
  "id": "45c13c58-42f5-49f3-bda9-8eefaaf837cc",
  "lastName": "Tremblay",
  "firstName": "Demetris",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 523837449396
}, {
  "id": "48bd55de-5562-494e-9121-dd49b81ebbce",
  "lastName": "Brekke",
  "firstName": "Pierce",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1260467670757
}, {
  "id": "557860a1-6d76-4ce1-b7fc-0e3b53e44504",
  "lastName": "Parker",
  "firstName": "Ashleigh",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 80635078856
}, {
  "id": "06502f93-66e0-4b6e-bbcb-b6eef5af8445",
  "lastName": "Gaylord",
  "firstName": "Dayne",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 783687290088
}, {
  "id": "1f8c27a1-dfc9-4074-beb9-101eb92fbc70",
  "lastName": "Becker",
  "firstName": "Obie",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 529678676359
}, {
  "id": "e9432b38-addd-4723-9d3c-7f731b7cc8dd",
  "lastName": "McCullough",
  "firstName": "Millie",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 750084890351
}, {
  "id": "9c28486b-55e5-4a58-860e-0b2f723bac18",
  "lastName": "Bednar",
  "firstName": "Esmeralda",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 518566842049
}, {
  "id": "bf660b5d-6673-4a1b-b5df-763022867098",
  "lastName": "Murray",
  "firstName": "Kristopher",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 726792705575
}, {
  "id": "d18e09ae-1b08-4c10-a7af-0ad76f525169",
  "lastName": "McGlynn",
  "firstName": "Ray",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1184062794388
}, {
  "id": "23fa30e1-72a5-4290-bc46-27200ff07d29",
  "lastName": "Boyer",
  "firstName": "Rene",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1413512281834
}, {
  "id": "a2b63b0a-a062-4902-9f7e-cc3a20494c49",
  "lastName": "Windler",
  "firstName": "Trevor",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1528734074991
}, {
  "id": "400771e8-4c67-45ca-a4fd-063b45b2e837",
  "lastName": "Schultz",
  "firstName": "Jannie",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1451520121222
}, {
  "id": "2b1d9c28-fd0a-4708-91d4-de05c51197c8",
  "lastName": "Grady",
  "firstName": "Orval",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 990181241566
}, {
  "id": "1d7ad419-3a23-4426-8fcc-fa961f006be6",
  "lastName": "Wuckert",
  "firstName": "Columbus",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 348264676149
}, {
  "id": "43fbe560-9404-41c8-82ec-8e26ebb3fd21",
  "lastName": "Monahan",
  "firstName": "Logan",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 505395295801
}, {
  "id": "f5e911d2-65c4-46c2-8e2a-f51a9cada7b0",
  "lastName": "Corwin",
  "firstName": "Elliot",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1404719180215
}, {
  "id": "be2030de-8587-4e4a-a9fd-bba5cc153752",
  "lastName": "Yost",
  "firstName": "Augustus",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1062538395454
}, {
  "id": "37ebdb68-518e-4825-9143-9b312da2dd47",
  "lastName": "Larson",
  "firstName": "Bud",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 661268988883
}, {
  "id": "546dc03d-a05c-4e05-80a4-cd0ba29de142",
  "lastName": "Sanford",
  "firstName": "Harvey",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 410752382309
}, {
  "id": "2f35eec9-2325-4863-baa4-61aa4df6830e",
  "lastName": "Beahan",
  "firstName": "Helene",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1486397531786
}, {
  "id": "6613b55c-db5e-4435-9eee-eff4b7f3547f",
  "lastName": "Feest",
  "firstName": "Kailey",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1066423464923
}, {
  "id": "fa3cade3-fb19-4c20-b293-de5e22b1fdfb",
  "lastName": "Lowe",
  "firstName": "Clark",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 313154778249
}, {
  "id": "912bf8d0-2759-44dc-8793-009be5c13cd7",
  "lastName": "Ferry",
  "firstName": "Precious",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 138625637951
}, {
  "id": "76f9ca58-3c48-431c-8ef3-54cfdf19b23d",
  "lastName": "Weber",
  "firstName": "Naomie",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 981981239566
}, {
  "id": "4c8d9127-60ec-4bd6-a94e-ecd6cd621287",
  "lastName": "Boyer",
  "firstName": "Margret",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1168677240324
}, {
  "id": "a5b05e3f-5cec-46e0-97b2-c844a341f6f3",
  "lastName": "Bechtelar",
  "firstName": "Evan",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1139906216637
}, {
  "id": "fcc119ac-1cfe-4c20-b0bb-49ebc48dcf08",
  "lastName": "Kling",
  "firstName": "Colleen",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 159259345234
}, {
  "id": "8f224d1e-560d-46c2-b88d-73fc2d63b901",
  "lastName": "Anderson",
  "firstName": "Vito",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 937078493840
}, {
  "id": "00a3bf38-3ae8-4641-bffa-339c93eaf844",
  "lastName": "Huels",
  "firstName": "Rae",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1052164956751
}, {
  "id": "db2b0e20-f0a3-40d3-8fc0-00a45524f83e",
  "lastName": "Krajcik",
  "firstName": "Felix",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 892895123355
}, {
  "id": "c90b8f62-7b31-433f-9e5e-a46ec7358cf6",
  "lastName": "Carter",
  "firstName": "Gerald",
  "picture": "http://placeimg.com/100/100/people",
  "birthday": 1372161498194
}];
},{}],"variables.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchByMonth = exports.searchByName = exports.search = exports.formEl = exports.addBtn = exports.container = exports.default = void 0;

var _people = _interopRequireDefault(require("./people.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var people = _people.default;
var _default = people;
exports.default = _default;
const container = document.querySelector(".container");
exports.container = container;
const addBtn = document.querySelector(".add");
exports.addBtn = addBtn;
const formEl = document.querySelector(".formSubmit");
exports.formEl = formEl;
const search = document.querySelector('[name="search"]');
exports.search = search;
const searchByName = document.querySelector('[name="search"]');
exports.searchByName = searchByName;
const searchByMonth = document.querySelector('[name="month"]');
exports.searchByMonth = searchByMonth;
},{"./people.json":"people.json"}],"utility/generatePeopleList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePeopleList = generatePeopleList;

function generatePeopleList(people) {
  return people.sort((a, b) => new Date(a.birthday).getMonth() - new Date(b.birthday).getMonth()).map(person => {
    function nthDate(day) {
      if (day > 3 && day < 21) return "th";

      switch (day % 10) {
        case 1:
          return "st";

        case 2:
          return "nd";

        case 3:
          return "rd";

        default:
          return "th";
      }
    }

    const today = new Date();
    const currentDate = new Date(person.birthday);
    const currentDay = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const fullDate = "".concat(currentDay).concat(nthDate(currentDay), " / ").concat(month + 1, " / ").concat(year);
    const futureAge = today.getFullYear() - year;
    const momentYear = today.getFullYear();
    const birthDayDate = new Date(momentYear, month, currentDay);
    let oneDay = 1000 * 60 * 60 * 24;
    const getTheDate = birthDayDate.getTime() - today.getTime();
    const dayLeft = Math.ceil(getTheDate / oneDay);
    return "\n      <div class=\"row mt-3\" data-id=\"".concat(person.id, "\">\n        <div class=\"col\">\n          <img src=\"").concat(person.picture, "\" class=\"rounded-circle\">\n        </div>\n        <div class=\"col\">\n          <div>\n            ").concat(person.firstName, " ").concat(person.lastName, " \n            is turning \n            <b>").concat(futureAge <= 1 ? futureAge + " year" : futureAge + " years", "</b> \n            on\n            <b>").concat(new Date(person.birthday).toLocaleString("en-US", {
      month: "long"
    }), "</b> \n            the \n            <b>\n              <time datetime=\"").concat(fullDate, "\">\n                ").concat(new Date(person.birthday).toLocaleString("en-US", {
      day: "numeric"
    }), "<sup>").concat(nthDate(currentDay), "</sup>\n              </time> \n            </b>\n          </div>\n        </div>\n        <div class=\"col\">\n          ").concat(dayLeft < 0 ? dayLeft * -1 + " " + "days ago" : dayLeft <= 1 ? dayLeft + " " + "day" : dayLeft + 'days', "\n        </div>\n        <div class=\"col\">\n          <button \n            type=\"button\" \n            value=\"").concat(person.id, "\" \n            data-id=\"").concat(person.id, "\" \n            class=\"edit\">\n            <span>edit</span>\n          </button>\n        </div>\n        <div class=\"col\">\n          <button \n            type=\"button\" \n            value=\"").concat(person.id, "\" \n            class=\"delete\" data-id=\"").concat(person.id, "\">\n            <span>delete</span>\n          </button>\n        </div>\n      </div>");
  }).join('');
}
},{}],"utility/edit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editPerson = editPerson;

var _variables = _interopRequireWildcard(require("../variables"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function editPerson(e) {
  const editButton = e.target.matches(".edit");

  if (editButton) {
    const button = e.target.closest(".edit");
    const id = button.dataset.id;
    editPersonPopup(id);
  }
} //edit person popup


async function editPersonPopup(id) {
  const personToEdit = _variables.default.find(person => person.id === id);

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

      if (!form.birthday.value) {
        alert("Hey, what's your birthday");
      }

      const birthDate = new Date(form.birthday.value);
      const birthDateMiliseconds = birthDate.getTime(); //create an obj for the edited pers

      const newPerson = {
        id: id,
        lastName: form.lastName.value,
        firstName: form.firstName.value,
        birthday: birthDateMiliseconds,
        picture: personToEdit.picture
      }; //reasign the value of the pers to the value of the new pers

      const editedPerson = _variables.default.find(person => person.id === newPerson.id);

      editedPerson.firstName = newPerson.firstName;
      editedPerson.lastName = newPerson.lastName;
      editedPerson.birthday = newPerson.birthday;
      editedPerson.id = editedPerson.id; //uptdate the lsit

      _variables.container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));

      formEl.classList.remove("open");
    }, {
      once: true
    });
  });
}
},{"../variables":"variables.js"}],"utility/delete.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePerson = deletePerson;

var _variables = _interopRequireWildcard(require("../variables"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//delete person function
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
  const peopleToDelete = _variables.default.find(person => person.id === idOfPeopleToDelete); //create buttons "yes"


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


  noBtn.addEventListener("click", async e => await deletePopup()); //if yes button gets clicked delete the pers and ddestroy the popup

  yesBtn.addEventListener("click", e => {
    _variables.default = (_variables.default.filter(person => person.id !== idOfPeopleToDelete), function () {
      throw new Error('"' + "people" + '" is read-only.');
    }());

    _variables.container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));

    deletePopup();
  }, {
    once: true
  });
}

;
},{"../variables":"variables.js"}],"utility/addPeople.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewPerson = addNewPerson;

var _variables = _interopRequireDefault(require("../variables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addNewPerson(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const birthDate = form.birthday.value;
  const dateTime = Date.parse(birthDate);

  if (!birthDate || !form.firstName.value || form.lastName.value || form.id.value || form.picture.value) {
    alert("Please fill all of the fields");
  } //create an obj for the new pers


  const newPerson = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    id: form.id.value,
    picture: form.picture.value,
    birthday: dateTime
  }; //push the new pers to the persons array.

  _variables.default = ([..._variables.default, newPerson], function () {
    throw new Error('"' + "people" + '" is read-only.');
  }());
  container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
  formEl.hidden = true;
  form.reset();
}

;
},{"../variables":"variables.js"}],"utility/search.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterPersonMonth = exports.searchPeopleByName = void 0;

var _variables = require("../variables");

var _generatePeopleList = require("./generatePeopleList");

const searchPeopleByName = e => {
  const input = _variables.searchByName.value;
  const inputSearch = input.toLowerCase().trim(); // Filter the list by the firstname or lastname

  const searchPerson = _variables.people.filter(person => person.lastName.toLowerCase().trim().includes(inputSearch) || person.firstName.toLowerCase().trim().includes(inputSearch));

  const myHTML = (0, _generatePeopleList.generatePeopleList)(searchPerson);
  _variables.container.innerHTML = myHTML;
};

exports.searchPeopleByName = searchPeopleByName;

const filterPersonMonth = e => {
  // Get the value of the select input
  const select = _variables.searchByMonth.value;

  const filterPerson = _variables.people.filter(person => {
    // Change the month of birth into string
    const getMonthOfBirth = new Date(person.birthday).toLocaleString("en-US", {
      month: "long"
    }); // Filter the list by the month of birth

    return getMonthOfBirth.toLowerCase().includes(select.toLowerCase());
  });

  const myHTML = (0, _generatePeopleList.generatePeopleList)(filterPerson);
  _variables.container.innerHTML = myHTML;
};

exports.filterPersonMonth = filterPersonMonth;
},{"../variables":"variables.js","./generatePeopleList":"utility/generatePeopleList.js"}],"script.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = wait;
exports.destroyPopup = destroyPopup;

var _variables = _interopRequireWildcard(require("./variables"));

var _generatePeopleList = require("./utility/generatePeopleList");

var _edit = require("./utility/edit");

var _delete = require("./utility/delete");

var _addPeople = require("./utility/addPeople");

var _search = require("./utility/search");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(500);
  popup.remove();
  popup = null;
} //add to local storage


function initlocalStorage() {
  localStorage.setItem("persons", JSON.stringify(_variables.default));
} //restore form local storage


function restoreFromLocalStorage() {
  let listOfOeople = JSON.parse(localStorage.getItem('people'));

  if (!_variables.default.length) {
    _variables.default = (listOfOeople, function () {
      throw new Error('"' + "people" + '" is read-only.');
    }());
  }

  _variables.default;

  _variables.container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
}

; //function display list of people

const displayPeopleList = () => {
  const html = (0, _generatePeopleList.generatePeopleList)(_variables.default);
  _variables.container.innerHTML = html;
};

displayPeopleList();

function showForm() {
  _variables.formEl.removeAttribute("hidden");
} // Reset the list


const resteInputSearch = e => {
  formSearch.reset(); // displayList();
}; //listeners


_variables.container.addEventListener("click", _edit.editPerson);

_variables.container.addEventListener("click", _delete.deletePerson);

_variables.container.addEventListener("listOfPeopleUpdated", displayPeopleList);

_variables.container.addEventListener("listOfPeopleUpdated", initlocalStorage);

restoreFromLocalStorage();

_variables.addBtn.addEventListener("click", showForm);

_variables.formEl.addEventListener("submit", _addPeople.addNewPerson);

_variables.searchByName.addEventListener("keyup", _search.searchPeopleByName);

_variables.searchByMonth.addEventListener("change", _search.filterPersonMonth);
},{"./variables":"variables.js","./utility/generatePeopleList":"utility/generatePeopleList.js","./utility/edit":"utility/edit.js","./utility/delete":"utility/delete.js","./utility/addPeople":"utility/addPeople.js","./utility/search":"utility/search.js"}],"../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63119" + '/');

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