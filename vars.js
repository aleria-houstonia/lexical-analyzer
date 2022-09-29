///словари
let keyw = [
    "LOGICAL",
    "VAR",
    "WRITE",
    "REPEAT",
    "UNTIL",
    "READ",
    "BEGIN",
    "END",
  ],
  binOperat = ["AND", "OR", "IMP"],
  unOperat = ["NOT"],
  specW = [":", ";", "(", ")", ",", "=", " "],
  constants = [0, 1],
  //регул
  identReg = /^[A-Z]*$/,
  specReg = /\:|\;|\(|\)|\,|\=|\_/,
  constReg = /^[0-1]$/,
  // хранилища
  resMas = [[], [], [], [], [], []], /// резы 0-ключ 1 - конст 2 - биноп 3-уноп 4-спец,5 идент
  inpStr,
  buf = "",
  bufType = [],
  types = [];