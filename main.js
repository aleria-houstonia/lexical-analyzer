let exit = false;
function getData() {
  inpStr = document.getElementById("res").value;
  inpStr += "*";

  for (let i = 0; i < inpStr.length; i++) {
    if (exit) {
      return;
    }
    setTypes(types, inpStr[i], i);
    if (buf.length === 0) {
      buf += inpStr[i];
      setTypes(bufType, inpStr[i], 0);
      continue;
    }
    if (types[i] !== bufType[bufType.length - 1]) {
      if (buf !== " ") checkLexems(buf, identReg.test(buf));
      buf = "";
      bufType = [];
    }
    buf += inpStr[i];
    setTypes(bufType, inpStr[i], 0);
  }
}

const setTypes = (db, elem, i) => {
  if (identReg.test(elem)) {
    db[i] = "letter";
  } else if (specReg.test(elem)) {
    db[i] = "specReg";
  } else if (constReg.test(elem)) {
    db[i] = "constReg";
  } else {
    if (elem === "*") {
      console.log("все в порядке. Так и должно быть!");
      return;
    }
    console.log("недопустимый символ=", elem);
    exit = true;
  }
};
function checkLexems(bfr, fType) {
  if (fType) {
    resMas[0].push(finder(bfr, keyw) ? bfr : "");
    resMas[2].push(finder(bfr, binOperat) ? bfr : "");
    resMas[3].push(finder(bfr, unOperat) ? bfr : "");

    if (
      resMas[0][resMas[0].length - 1].length == 0 &&
      resMas[2][resMas[2].length - 1].length == 0 &&
      resMas[3][resMas[3].length - 1].length == 0
    ) {
      if (bfr.length <= 8) {
        resMas[5].push(bfr);
      } else {
        console.log("Недопустимая длина идентификатора");
        exit = true;
      }
    }
  } else {
    for (var i = 0; i < bfr.length; i++) {
      resMas[1].push(finder(bfr[i], constants) ? bfr[i] : "");
      resMas[4].push(finder(bfr[i], specW) ? bfr[i] : "");
    }
  }
  resMas = deleteEmptyElem(resMas);
  console.log(resMas);
}

const deleteEmptyElem = (data) => {
  return data.map((arr) => arr.filter((i) => i !== ""));
};

function finder(word, dictionary) {
  for (let i = 0; i < dictionary.length; i++) {
    if (dictionary[i] === word) {
      return true;
    }
  }
  return false;
}
