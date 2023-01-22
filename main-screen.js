var massage = document.getElementById("massage");
var index=Number(localStorage.getItem("indexArr"));
var data =JSON.parse(localStorage.getItem("parsonalData"));
massage.innerHTML=`Welcome ${data[index].name} To our brand new Product Management System `;