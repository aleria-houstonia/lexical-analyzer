function getData() {
  inpStr = document.getElementById("res").value;
  inpStr += "*";

  for (let i = 0; i < inpStr.length; i++) {
    setTypes(types, identReg, inpStr[i], "letter", i);
    setTypes(types, specReg, inpStr[i], "specReg", i);
    setTypes(types, constReg, inpStr[i], "constReg", i);

    if (buf.length === 0) {
      buf += inpStr[i];
      setTypes(bufType, identReg, inpStr[i], "letter", i);
      setTypes(bufType, specReg, inpStr[i], "specReg", i);
      setTypes(bufType, constReg, inpStr[i], "constReg", i);

      continue;
    }
    if (types[i] !== bufType[bufType.length - 1]) {
      if (buf !== " ") checkLexems(buf, identReg.test(buf));
      buf = "";
      bufType = [];
    }
    buf += inpStr[i];
    setTypes(bufType, identReg, inpStr[i], "letter", 0);
    setTypes(bufType, specReg, inpStr[i], "specReg", 0);
    setTypes(bufType, constReg, inpStr[i], "constReg", 0);
  }
}
const setTypes = (db, reg, elem, type, i) => {
  if (reg.test(elem)) db[i] = type;
};

function checkLexems(bfr, fType) {
  if (fType) {
    resMas[0].push(finder(bfr, keyw) ? bfr : "");
    resMas[2].push(finder(bfr, binOperat) ? bfr : "");
    resMas[3].push(finder(bfr, unOperat) ? bfr : "");
    resMas[5].push(
      resMas[0][resMas[0].length - 1].length == 0 &&
        resMas[2][resMas[2].length - 1] == 0 &&
        resMas[3][resMas[3].length - 1].length == 0
        ? bfr
        : ""
    );
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
