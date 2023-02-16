
function initDefTask() {
    if (!localStorage.getItem("toDoList")) {
        let arr = [{id:1,Name:'Giau',Task:'WWork',Date:'2023-03-04'},{id:2,Name:'Anh',Task:'Work',Date:'2023-03-05'}];
        localStorage.setItem("toDoList",JSON.stringify(arr));
    }
}
initDefTask();

// Lấy dữ liệu
 function getDefTask() {
  let arr = JSON.parse(localStorage.getItem("toDoList"));
  renderTask(arr);
}
getDefTask();

// Hàm render task
function renderTask(arr){
  let tr = [];
  tr.push('<tr><td>STT<button onclick="sortTableByTD(0)" style="float:right" ><i class="fas fa-sort"></i></button></td>');
  tr.push('<td>Tên<button onclick="sortTableByTD(1)" style="float:right" ><i class="fas fa-sort"></i></button></td>');
  tr.push('<td>Công việc<button onclick="sortTableByTD(2)" style="float:right" ><i class="fas fa-sort"></i></button></td>');
  tr.push('<td>Ngày làm<button onclick="sortTableByTD(3)" style="float:right" ><i class="fas fa-sort"></i></button></td>');
  tr.push('<td>Sửa</td>');
  tr.push('<td>Xóa</td></tr>');
  for (let i =0 ; i< arr.length;i++) {
    let option = document.createElement("option");
    tr.push('<tr><td id="index">'+arr[i].id+'</td>');
    tr.push('<td id="nameintd">'+arr[i].Name+'</td>');
    tr.push('<td id="taskintd">'+arr[i].Task+'</td>');
    tr.push('<td id="dateintd">'+arr[i].Date+'</td>');
    tr.push(`<td><button data-test='${JSON.stringify(arr[i])}' onclick='getInf(this)'>Sửa</button></td>`);
    tr.push('<td><button onclick="delTask('+ arr[i].id +')">Xóa</button></td></tr>');
  }
  let tb = document.getElementById("tb");
  tb.innerHTML=""
  tb.innerHTML = tr.join("");
}

//Tạo task
function createTask() {
  let arr1 = JSON.parse(localStorage.getItem("toDoList"));
  let name = (document.getElementById("name").value).toString();
  let task = (document.getElementById("task").value).toString();
  let date = (document.getElementById("date").value).toString();
  let obj = { id:arr1.length+1, Name:name, Task:task, Date:date};
  arr1.push(obj);
  console.log(arr1);
  localStorage.setItem("toDoList",JSON.stringify(arr1));
  window.location.reload();
}

//Xóa task
function delTask(id) {
  let arr1 = JSON.parse(localStorage.getItem("toDoList"));
  for (let i =0 ; i< arr1.length;i++)
  {
    if(arr1[i].id == id)
    {
        arr1.splice(i,1);
        document.getElementById("tb").deleteRow(i+1);
        i--;
    }
  }
  console.log(arr1);
  localStorage.setItem("toDoList",JSON.stringify(arr1));
}

//Sửa task
function editTask() {
  let arr1 = JSON.parse(localStorage.getItem("toDoList"));
  let t = document.getElementById("editID").value
  for (let i =0 ; i< arr1.length;i++)
  {
    if(arr1[i].id == t)
    {
        let name = document.getElementById("name").value;
        let task = document.getElementById("task").value;
        let date = document.getElementById("date").value;

        arr1[i].Name = name;
        arr1[i].Task = task;
        arr1[i].Date = date;
    }
  }
  console.log(arr1);
  localStorage.setItem("toDoList",JSON.stringify(arr1));
  window.location.reload();
}

//Lấy thông tin task
function getInf(self){
    let data = JSON.parse(self.dataset.test);
    console.log("data",data.Date.split("/").join("-"));
    document.getElementById("editTask").hidden = false;
    document.getElementById("cnclEditTask").hidden = false;
    document.getElementById("createTask").hidden = true;
    document.getElementById("name").value = data.Name;
    document.getElementById("task").value = data.Task;
    document.getElementById("date").value = data.Date.split("/").join("-");
    document.getElementById("editID").value = data.id;
}
function cnclEditTask()
{
  document.getElementById("name").value = "";
  document.getElementById("task").value = "";
  document.getElementById("date").value = "";
  document.getElementById("editID").value = "";
  document.getElementById("editTask").hidden = true;
  document.getElementById("cnclEditTask").hidden = true;
  document.getElementById("createTask").hidden = false;
}

//Tìm task
function searchTask(){
  let word = document.getElementById("search").value;
  let arr1 = JSON.parse(localStorage.getItem("toDoList"));
  let arr2 = [];
  for(let i =0; i<arr1.length;i++){
    if(arr1[i].Task.includes(word))
    {
      arr2.push(arr1[i]);
    }
  }
  console.log(arr2);
  document.getElementById("tb").innerHTML = "";
  let tr = [];
  tr.push('<tr><td>STT</td>');
  tr.push('<td>Tên</td>');
  tr.push('<td>Công việc</td>');
  tr.push('<td>Ngày làm</td>');
  tr.push('<td>Sửa</td>');
  tr.push('<td>Xóa</td></tr>');
  for (let i =0 ; i< arr2.length;i++) {
    let option = document.createElement("option");
    tr.push('<tr><td id="index">'+arr2[i].id+'</td>');
    tr.push('<td id="nameintd">'+arr2[i].Name+'</td>');
    tr.push('<td id="taskintd">'+arr2[i].Task+'</td>');
    tr.push('<td id="dateintd">'+arr2[i].Date+'</td>');
    tr.push(`<td><button data-test='${JSON.stringify(arr2[i])}' onclick='getInf(this)'>Sửa</button></td>`);
    tr.push('<td><button onclick="delTask('+ arr2[i].id +')">Xóa</button></td></tr>');
  }
  let tb = document.getElementById("tb");
  tb.innerHTML = tr.join("");
}

const SORT_FLAG = {
  id: 0,
  name: 1,
  task: 2,
  date: 3,
}
//Sắp xếp theo thuộc tính cột
var temp = false;
function sortTableByTD(flag){
  let arr1 = JSON.parse(localStorage.getItem("toDoList"));
  if(flag === SORT_FLAG.id){
    if(temp==true)
    {arr1.sort((a,b) => b.id - a.id);temp=false;}
    else
    {arr1.sort((a,b) => a.id - b.id);temp=true}
  }
  if(flag === SORT_FLAG.name){
    if(temp==true)
    {arr1.sort((a,b) => b.Name.localeCompare(a.Name));temp=false;}
    else
    {arr1.sort((a,b) => a.Name.localeCompare(b.Name));temp=true}
  }
  if(flag == SORT_FLAG.task){
    if(temp==true)
    {arr1.sort((a,b) => b.Task.localeCompare(a.Task));temp=false;}
    else
    {arr1.sort((a,b) => a.Task.localeCompare(b.Task));temp=true}
  }
  if(flag === SORT_FLAG.date){
    if(temp==true)
    {arr1.sort((a,b) => (new Date(b.Date) - (new Date(a.Date))));temp=false;}
    else
    {arr1.sort((a,b) => (new Date(a.Date) - (new Date(b.Date))));temp=true}
  }
  renderTask(arr1)
}

//Lọc task
function filterTask(){
  var learn = document.getElementById("learn").checked;
  var work = document.getElementById("work").checked;
  var goout = document.getElementById("goout").checked;
  var dochores = document.getElementById("dochores").checked;

  var today = document.getElementById("today").checked;
  var tomorow = document.getElementById("tomorow").checked;
  var sevenDay = document.getElementById("sevenDay").checked;
  var month = document.getElementById("month").checked;

  let arr1 = JSON.parse(localStorage.getItem("toDoList"));
  let arr2 = [];
  for(let i =0; i<arr1.length;i++){
    if (learn){
      if(arr1[i].Task=="Learn"){
        arr2.push(arr1[i]);
      }
    }
    if (work){
      if(arr1[i].Task=="Work"){
        arr2.push(arr1[i]);
      }
    }
    if (goout){
      if(arr1[i].Task=="Goout"){
        arr2.push(arr1[i]);
      }
    }
    if (dochores){
      if(arr1[i].Task=="DoChores"){
        arr2.push(arr1[i]);
      }
    }
  }
  let Today = new Date().setHours(0, 0, 0, 0);
  for(let i =0; i<arr2.length;i++){
    let mydate = new Date(arr2[i].Date).setHours(0, 0, 0, 0);
    if(today){
      if(mydate != Today){
        arr2.splice(i,1);i--;};
    }
    if(tomorow){
      if((mydate) != (Today+ 86400000)){
        arr2.splice(i,1);
        i--;
      } 
    }
    if(sevenDay){
      if(mydate<(Today)||(Today+7*86400000)<mydate){
        arr2.splice(i,1);
        i--;
      } 
    }
    if(month){
      if(mydate<(Today)||(Today+30*86400000)<mydate){
        arr2.splice(i,1);
        i--;
      } 
    }
  }
  renderTask(arr2)
}