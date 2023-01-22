//get total
//create product
//save Data in local storage
//clear inputs
//Read data (display in table)
//delete
//delete all
//update
//search
//clean data

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let submit = document.getElementById("submit");


//console.log(title,price,taxes,ads,discount,total,count,category,submit)    for test
let mood = 'create'  //it will change to Update mode
let temp; //index of product that you want to update
//1-Get total by price

function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
            - +discount.value; //+ for transforming string to number
        total.innerHTML = result;
        total.style.background = '#040' //green color
    }
    else {
        total.innerHTML = '';
        total.style.background = ' rgb(182, 5, 5)'

    }
}

// 2-Create======================================================
//I will save my data into array
//if i dont add my data in array old data will be removed .
//every time i will reload ,  data will removed so i will save it local storage.

//let datapro =[]; //array of objects , object for each product 

let datapro; //array
if (localStorage.Product != null) {
    datapro = JSON.parse(localStorage.Product)
} else {
    datapro = [];
}
submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value.toLowerCase(),
    }
  //  console.log(newPro);    for test

if(title.value !='' && price.value != '' && category.value !='' ){ //clean Data
    if (mood=== 'create') {

                datapro.push(newPro);  
  
    } else  {
        datapro[temp] = newPro;
        mood = 'create'; //بعد ما تعدل البيانات رجعلي الموود لكرييت تاني
        submit.innerHTML = 'Create';
    }
    clearData();
}

    localStorage.setItem("Product", JSON.stringify(datapro))

  
    showData();
}

//3-Clear data from Inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value = '';
}

//4-Read Data---------------------------------
function showData() {
    getTotal();
    let table = ''; //عايزة اجيب الداتا اللي موجودة في الاراي واضيفها في التابل دا
    for (let i = 0; i < datapro.length; i++) {
        table += `
    <tr>
    <td>${i+1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">Update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
</tr>
    `
    }

    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (datapro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All(${datapro.length})</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
}
showData();
//5-Delete product======================================
function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.Product = JSON.stringify(datapro);
    showData();
}

//6-Delete All Products if there is showed data
function deleteAll() {
    localStorage.clear();
    datapro.splice(0); //show took data from array so we delete all array data
    showData();
}

//6-Update====================================================
//  1- عايزة ارفع بيانات البرودكت اللي عايزة اعدلة جوة الانبتز
//  2-when press update , data updated


function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    getTotal();
    submit.innerHTML = 'Update';
    mood = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth' //بترفع الاسكرول
    })

}
// 7-Search ========================================

let searchMood = 'title'
function getSearchMood(id) {
   
    let search = document.getElementById('search')
    if (id === 'searchtitle') {
        searchMood = 'title'
        search.placeholder = 'Search by Title'
    } else {
        searchMood = 'Category'
        search.placeholder = 'Search by Category'
    }
    
    search.focus();  //لما اضغط علي اي زرار يفتحلي السيرش انبت 
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>
                `;
            }
        }
    
    }
    else  {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>
                `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}


