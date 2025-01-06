import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const appSettings = {
  databaseURL:
    "https://carldb-ae839-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const listInDB = ref(database, "to-do-list");
onValue(listInDB, (snapshot) => {
  const todoListArray = Object.values(snapshot.val() || {});
  console.log(todoListArray);

  // Get the table body element
  const tableBody = document
    .getElementById("myTable")
    .getElementsByTagName("tbody")[0];

  // Clear existing table rows (to prevent duplication)
  tableBody.innerHTML = "";

  // Iterate through the todoListArray using forEach
  todoListArray.forEach((item) => {
    // Create a new row
    let newRow = tableBody.insertRow();

    // Create cells for the todo item and checkbox
    let todoCell = newRow.insertCell();
    let checkboxCell = newRow.insertCell();

    // Set the content of the cells
    todoCell.textContent = item; // Display the todo item text
    todoCell.className = "border px-4 py-2"; // Add styling

    checkboxCell.innerHTML =
      '<input type="checkbox" class="form-checkbox h-4 w-4 text-blue-500">'; // Add checkbox
    checkboxCell.className = "border px-4 py-2"; // Add styling
  });
});

// Add JS here
function addToList() {
  let newTodoText = document.getElementById("content").value;

  if (newTodoText.trim() === "") {
    alert("Please enter a to-do item.");
    return; // Stop execution if input is empty
  }

  push(listInDB, newTodoText);

  let table = document
    .getElementById("myTable")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow();
  newRow.innerHTML = `
    <td class="border px-4 py-2">${newTodoText}</td>
    <td class="border px-4 py-2"><input type="checkbox" class="form-checkbox h-4 w-4 text-blue-500"></td>
  `;
  document.getElementById("content").value = ""; // Clear input field
}
document.getElementById("listbtn").addEventListener("click", addToList);
