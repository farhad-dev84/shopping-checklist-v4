const itemForm = document.getElementById("itemForm");
const itemInput = document.getElementById("itemInput");
const clearAllBtn = document.getElementById("clearAll");
const itemList = document.getElementById("itemList");

let items = JSON.parse(localStorage.getItem("shoppingItems")) || [];

function saveItems() {
  localStorage.setItem("shoppingItems", JSON.stringify(items));
}

function renderItems() {
  itemList.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    const span = document.createElement("span");
    span.textContent = item.text;
    if(item.completed) span.classList.add("completed");

    const doneBtn = document.createElement("button");
    doneBtn.className = "btn btn-sm btn-outline-success me-2";
    doneBtn.textContent = "✔️";
    doneBtn.onclick = () => {
      items[index].completed = !items[index].completed;
      saveItems();
      renderItems();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-outline-danger";
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => {
      items.splice(index, 1);
      saveItems();
      renderItems();
    };

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);

    itemList.appendChild(li);
  });
}

itemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newItem = itemInput.value.trim();
  if(newItem !== "") {
    items.push({ text: newItem, completed: false });
    saveItems();
    renderItems();
    itemInput.value = "";
  }
});

clearAllBtn.addEventListener("click", () => {
  items = [];
  saveItems();
  renderItems();
});

renderItems();