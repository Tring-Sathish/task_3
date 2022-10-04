let table = document.getElementById("datatable");
let current_page = 1;
let rows_per_page = 5;
let data = [];
let tempArray = [];

function showData(page) {

  if (localStorage.getItem("Data") != null) {
    data = JSON.parse(localStorage.getItem("Data"));
  }
  
  let start = rows_per_page * (page - 1);
  let end = start + rows_per_page;
  tempArray = data.slice(start, end);
  table.innerHTML = "";
  let i = 0;
  let coloumn = "";
  while (tempArray.length != i) {
    coloumn += `<tr><td>${tempArray[i].name}</td><td>${tempArray[i].age}</td><td>${tempArray[i].mark}</td></tr>`;
    i++;
  }
  table.innerHTML = coloumn;
}
showData(current_page);

let j = 1;
function setupPagination() {
  let page_button = document.getElementById("pagination");
  let page_count = Math.ceil(data.length / rows_per_page);

  for (; j < page_count + 1; j++) {
    let btn = paginationButton(j);
    page_button.appendChild(btn);
  }
}

function paginationButton(page) {
  let button = document.createElement("button");
  button.innerText = page;
  button.className = "page_btn";

  button.addEventListener("click", function () {
    showData(page);
    changePage(page);
    current_page = page;
  });
  return button;
}
setupPagination();

function changePage(page) {
  let current_btn = document.querySelector(".pagenumbers button.page_btn.active");
  if (current_btn != null) {
    current_btn.classList.remove("active");
  }
  let active_btn = document.querySelectorAll(".pagenumbers button.page_btn");
  if (active_btn[page - 1] != null) {
    active_btn[page - 1].classList.add("active");
  }
  showData(page);
  document.getElementById("page_num").innerHTML = page;
}
changePage(current_page);

function next_page() {
  if (current_page + 1 <= Math.ceil(data.length / rows_per_page)) {
    current_page = current_page + 1;
    changePage(current_page);
  }
}

function prev_page() {
  if (current_page - 1 >= 1) {
    current_page = current_page - 1;
    changePage(current_page);
  }
}

let desc = false;

function sort_by(prop) {
  desc = !desc;
  tempArray.sort(function (a, b) {
    if (a[prop] < b[prop]) {
      return desc ? -1 : 1;
    }
    if (a[prop] > b[prop]) {
      return desc ? 1 : -1;
    }
    return 0;
  });

  table.innerHTML = "";
  let coloumn = "";
  let i = 0;
  while (tempArray.length != i) {
    coloumn += `<tr><td>${tempArray[i].name}</td><td>${tempArray[i].age}</td><td>${tempArray[i].mark}</td></tr>`;
    i++;
  }
  table.innerHTML = coloumn;
}

function showTable() {
  if (localStorage.getItem("Data") != null) {
    document.getElementById("table").style.display = "block";
    setupPagination();
  }
}
showTable();

function getData() {
  let name = document.getElementsByClassName("name");
  let age = document.getElementsByClassName("age");
  let mark = document.getElementsByClassName("mark");

  let flag = false;
  for (let i = 0; i < name.length; i++) {
    if (name[i].value != "" && age[i].value != "" && mark[i].value != "") {
      flag = true;
    } else {
      flag = false;
      break;
    }
  }
  if (flag) {
    document.getElementById("table").style.display = "block";
    for (let i = 0; i < name.length; i++) {
      data.push({
        name: name[i].value,
        age: age[i].value,
        mark: mark[i].value,
      });
    }
    localStorage.setItem("Data", JSON.stringify(data));
  } else {
    alert("Fill the details");
  }
  setupPagination();
  current_page = Math.ceil(data.length / 5);
  showData(current_page);
  changePage(current_page);
}

function addinput() {
  let input = document.getElementById("main_div");

  let del = document.getElementsByClassName("inputbtn_del");
  del[del.length - 1].style.display = "inline-block";

  let name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Your Name...";
  name.className = "name";

  let age = document.createElement("input");
  age.type = "text";
  age.placeholder = "Your Age...";
  age.className = "age";

  let mark = document.createElement("input");
  mark.type = "text";
  mark.placeholder = "Your Mark...";
  mark.className = "mark";

  let addbtn = document.createElement("input");
  addbtn.type = "button";
  addbtn.value = "+";
  addbtn.className = "inputbtn_add";
  addbtn.addEventListener("click", addinput);

  let deletebtn = document.createElement("input");
  deletebtn.type = "button";
  deletebtn.value = "-";
  deletebtn.className = "inputbtn_del";
  deletebtn.addEventListener("click", removeinput);

  deletebtn.style.display = "inline-block";

  let div = document.createElement("div");
  div.className = "input_div";

  input.appendChild(div);
  div.appendChild(name);
  div.appendChild(age);
  div.appendChild(mark);
  div.appendChild(addbtn);
  div.appendChild(deletebtn);

  let plus_btn = document.querySelectorAll(".input_div .inputbtn_add");
  for (let k = 0; k < plus_btn.length - 1; k++) {
    plus_btn[k].style.display = "none";
  }
}

function clearAll() {
  let div = document.getElementById("main_div");
  div.innerHTML = "";
  localStorage.clear();
  document.getElementById("table").style.display = "none";
  document.querySelector(".inputbtn_add").style.display = "inline-block";
  document.querySelector(".inputbtn_del").style.display = "none";
}

function removeinput() {
  
  this.parentElement.remove();
  let plus_btn = document.querySelectorAll(".input_div .inputbtn_add");
  if (plus_btn.length == 1) {
    document.querySelector(".input_div .inputbtn_del").style.display = "none";
  }
  plus_btn[plus_btn.length - 1].style.display = "inline-block";
}
