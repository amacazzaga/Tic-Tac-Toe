const lockers = document.querySelectorAll('[id^="locker-"]');
const cross = document.getElementsByClassName("cross");
const circle = document.getElementsByClassName("circle");
const turnoJugador = document.getElementById("turno");
const modalRojo = document.getElementById("modal-rojo");
const modalVerde = document.getElementById("modal-verde");
const checkIfUsed = function (element) {
  const arrayOfImg = Array.from(element.getElementsByTagName("img"));
  return !arrayOfImg.every((i) => i.classList.contains("hidden"));
};
const arrOfWinning = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [7, 5, 3],
];

let turn;
let count = 0;

for (let i = 0; i < lockers.length; i++) {
  lockers[i].onclick = function () {
    if (checkIfUsed(lockers[i])) {
      return;
    }
    if (count % 2 == 0) {
      turn = "verde";
      turnoJugador.innerText = " de los verdes!";
      lockers[i].getElementsByClassName("cross")[0].classList.remove("hidden");
    } else {
      turn = "rojo";
      turnoJugador.innerText = " de los rojos!";
      lockers[i].getElementsByClassName("circle")[0].classList.remove("hidden");
    }
    count += 1;

    checkIfWinner(turn);
  };
}

function checkIfWinner(turn) {
  const crossOrCircle = turn == "rojo" ? ["circle", 1] : ["cross", 0];
  const arrLockers = Array.from(lockers);
  const filtered = arrLockers.filter((elem) => {
    return (
      elem.children[crossOrCircle[1]].classList.value !=
      crossOrCircle[0] + " hidden"
    );
  });

  const mapped = filtered.map((elem) => {
    return parseInt(elem.id.slice(7));
  });
  const isWinner = arrOfWinning.some((combination) => {
    return combination.every((elem) => {
      return mapped.includes(elem);
    });
  });
  ////MODAL Y RESETS!//////
  if (isWinner == true && turn === "verde") {
    modalRojo.style.display = "block";
  } else if (isWinner == true && turn === "rojo") {
    modalVerde.style.display = "block";
  }
}
window.onclick = function (event) {
  if (event.target == modalRojo) {
    modalRojo.style.display = "none";
    turnoJugador.innerText = "";
    for (let i = 0; i < lockers.length; i++) {
      lockers[i].getElementsByClassName("cross")[0].classList.add("hidden");
      lockers[i].getElementsByClassName("circle")[0].classList.add("hidden");
    }
  } else if (event.target == modalVerde) {
    modalVerde.style.display = "none";
    turnoJugador.innerText = "";
    for (let i = 0; i < lockers.length; i++) {
      lockers[i].getElementsByClassName("cross")[0].classList.add("hidden");
      lockers[i].getElementsByClassName("circle")[0].classList.add("hidden");
    }
  }
};
