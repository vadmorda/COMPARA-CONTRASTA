const mainTitle = document.getElementById("mainTitle");
const titleA = document.getElementById("titleA");
const titleB = document.getElementById("titleB");
const comparisonRows = document.getElementById("comparisonRows");
const similaritiesList = document.getElementById("similaritiesList");

const addRowBtn = document.getElementById("addRowBtn");
const addSimilarityBtn = document.getElementById("addSimilarityBtn");
const resetBtn = document.getElementById("resetBtn");

const STORAGE_KEY = "comparaContrastaApp";

let data = {
  mainTitle: "Compara y contrasta",
  titleA: "Elemento A",
  titleB: "Elemento B",
  rows: [
    {
      left: "",
      category: "",
      right: ""
    }
  ],
  similarities: [""]
};

function saveData() {
  data.mainTitle = mainTitle.value;
  data.titleA = titleA.value;
  data.titleB = titleB.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    data = JSON.parse(saved);
  }

  mainTitle.value = data.mainTitle;
  titleA.value = data.titleA;
  titleB.value = data.titleB;

  renderRows();
  renderSimilarities();
}

function renderRows() {
  comparisonRows.innerHTML = "";

  data.rows.forEach((row, index) => {
    const rowElement = document.createElement("div");
    rowElement.className = "comparison-row";

    rowElement.innerHTML = `
      <textarea class="left-field" placeholder="Diferencia del elemento A">${row.left}</textarea>
      <textarea class="middle-field" placeholder="Categoría">${row.category}</textarea>
      <textarea class="right-field" placeholder="Diferencia del elemento B">${row.right}</textarea>
      <button class="delete-row" title="Eliminar fila">✕</button>
    `;

    const textareas = rowElement.querySelectorAll("textarea");

    textareas[0].addEventListener("input", () => {
      data.rows[index].left = textareas[0].value;
      saveData();
    });

    textareas[1].addEventListener("input", () => {
      data.rows[index].category = textareas[1].value;
      saveData();
    });

    textareas[2].addEventListener("input", () => {
      data.rows[index].right = textareas[2].value;
      saveData();
    });

    rowElement.querySelector(".delete-row").addEventListener("click", () => {
      data.rows.splice(index, 1);

      if (data.rows.length === 0) {
        data.rows.push({ left: "", category: "", right: "" });
      }

      saveData();
      renderRows();
    });

    comparisonRows.appendChild(rowElement);
  });
}

function renderSimilarities() {
  similaritiesList.innerHTML = "";

  data.similarities.forEach((similarity, index) => {
    const item = document.createElement("div");
    item.className = "similarity-item";

    item.innerHTML = `
      <textarea placeholder="Escribe una semejanza">${similarity}</textarea>
      <button class="delete-similarity" title="Eliminar semejanza">✕</button>
    `;

    const textarea = item.querySelector("textarea");

    textarea.addEventListener("input", () => {
      data.similarities[index] = textarea.value;
      saveData();
    });

    item.querySelector(".delete-similarity").addEventListener("click", () => {
      data.similarities.splice(index, 1);

      if (data.similarities.length === 0) {
        data.similarities.push("");
      }

      saveData();
      renderSimilarities();
    });

    similaritiesList.appendChild(item);
  });
}

addRowBtn.addEventListener("click", () => {
  data.rows.push({
    left: "",
    category: "",
    right: ""
  });

  saveData();
  renderRows();
});

addSimilarityBtn.addEventListener("click", () => {
  data.similarities.push("");
  saveData();
  renderSimilarities();
});

resetBtn.addEventListener("click", () => {
  const confirmReset = confirm("¿Seguro que quieres borrar todo y empezar de nuevo?");

  if (!confirmReset) return;

  data = {
    mainTitle: "Compara y contrasta",
    titleA: "Elemento A",
    titleB: "Elemento B",
    rows: [
      {
        left: "",
        category: "",
        right: ""
      }
    ],
    similarities: [""]
  };

  localStorage.removeItem(STORAGE_KEY);
  loadData();
});

[mainTitle, titleA, titleB].forEach(input => {
  input.addEventListener("input", saveData);
});

loadData();
