"use strict"
function swap() {
  let inputBase = document.getElementById("input-base");
  let outputBase = document.getElementById("output-base");

  swapStart(inputBase, outputBase);

  // swap the values
  let temp = inputBase.value;
  inputBase.value = outputBase.value;
  outputBase.value = temp;
}

//for swap animation
function swapStart(inputBase, outputBase) {
  inputBase.style.transform = "translateX(70%)";
  outputBase.style.transform = "translateX(-70%)";
  setTimeout(() => {
    swapEnd(inputBase, outputBase);
  }, 100);
}

function swapEnd(inputBase, outputBase) {
  inputBase.style.transform = "translateX(0%)";
  outputBase.style.transform = "translateX(0%)";
}

function convert() {
  let input = document.getElementById("input").value;
  let output = document.getElementById("output");
  let inputBase = document.getElementById("input-base").value;
  let outputBase = document.getElementById("output-base").value;
  const error = document.getElementById("error");
  input = input.toUpperCase();

  if (checkInput(input, inputBase, error)) {
    error.style.display = "none";
    //convert all input to decimal
    input = Number.parseInt(input, inputBase);
    //then convert decimal to desired output
    let result = Number(input).toString(outputBase);

    //display output
    if (result != "NaN") {
      output.style.backgroundColor = "rgb(211, 220, 122)";
      output.textContent = result.toUpperCase();
    } else {
      output.style.backgroundColor = "white";
      output.textContent = "";
    }
  }
}

function checkInput(input, inputBase, error) {
  //check if input number contains allowed values
  //for e.g octal number does not have number '8' and similarly binary number does not have number '3'

  for (let i = 0; i < input.length; i++) {
    if (input.charAt(i) == ".") {
      error.style.display = "block";
      error.textContent =
        "Error : I am extremely sorry. Given input number contains '.' and this page can only solve for numbers without decimal point.";
      return false;
    }
  }

  switch (inputBase) {
    case "2":
      for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) != 0 && input.charAt(i) != 1) {
          error.style.display = "block";
          error.textContent = `Error : Binary number does not include '${input.charAt(
            i
          )}'. Please enter only binary number or select different base for input number`;
          return false;
        }
      }

    case "10":
      for (let i = 0; i < input.length; i++) {
        if (isNaN(input.charAt(i))) {
          error.style.display = "block";
          error.textContent = `Error : Decimal number does not include '${input.charAt(
            i
          )}'. Please enter only decimal number or select different base for input number`;
          return false;
        }
      }

    case "8":
      for (let i = 0; i < input.length; i++) {
        if (
          input.charAt(i) == "8" ||
          input.charAt(i) == "9" ||
          isNaN(input.charAt(i))
        ) {
          error.style.display = "block";
          error.textContent = `Error : Octal number does not include '${input.charAt(
            i
          )}'. Please enter only octal number or select different base for input number`;
          return false;
        }
      }

    case "16":
      for (let i = 0; i < input.length; i++) {
        if (
          !(
            (input.charCodeAt(i) >= 48 && input.charCodeAt(i) <= 57) ||
            (input.charCodeAt(i) >= 65 && input.charCodeAt(i) <= 70)
          )
        ) {
          error.style.display = "block";
          error.textContent = `Error : Hexadecimal number does not include '${input.charAt(
            i
          )}'. Please enter only hexadecimal number or select different base for input number`;
          return false;
        }
      }

    default:
      return true;
  }
}
