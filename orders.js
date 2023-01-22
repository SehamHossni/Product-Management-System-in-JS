//تحميل و سحب بيانات المنتجات المضافة الى النظام
let datapro; //array
        if (localStorage.Product != null) {
        datapro = JSON.parse(localStorage.Product)
        } else {
                datapro = [];
                }
getcalllen();   //عرض عددالمنتجات المضافة على النظام
getcat3();      //تحميل اقسام الاصناف المتاحة
var loadstat=0; //متغير يعبر عن حالة تحميل المنتجات بشكل مبدئى تكون قيمة المتغير صفرا و تكون واحد عند تحميل المنتجات بعد ادخال القسم المراد تحميل منتجاته


//تحميل عدد المنتجات على السيستم
function getcalllen()
{
document.getElementById("numa").innerHTML=datapro.length;
}

//نحتاج هذه الدالة عند تحميل الاقسام الخاصة بالمنتجات حتى تمنع تكرار قسم لمنتج ما
function lookupcat(arr,x){
    for(i=0;i<arr.length;i++){
        if(arr[i]==x){
            return true;
        }
    }
    return false;

}

//مسح جميع الاصناف من الليست بوكس الخاص بالمنتجات قبل عملية تحميل جديدة حتى لا تتكرر القائمة مرتين
function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }
function removeprods(){
    removeOptions(document.getElementById('prods'));
}
 
//دالة لحساب مجموع المبلغ لصنف ما بضرب الكمية المطلوبة فى سعر الحبة
function calctota(){
    var total=Number(document.getElementById("prc").innerText)*Number(document.getElementById("qty").value);
    document.getElementById("total").innerText=total;
}

//دالة لارجاع حالة التحميل للصفر مرة اخرى بعدما تم تحميل جديد لاقسام جديدة
function conload(){
    loadstat=0;
}


//ادخال المنتجات فى الجدول المؤقت قبل حفظها فى الجدول النهائى للاوردر
function insertintotable(){

    if(document.getElementById("qty").value!="" &&document.getElementById("prc").innerText!="nan"
    &&document.getElementById("nam").innerText!="nona" 
    && document.getElementById("total").innerText!="0" &&document.getElementById("cats").value!=""
    && document.getElementById("prods").value!="" ){

    var table = document.getElementById("tableord");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var ido=document.getElementById("tableord").rows.length-1;
    cell1.innerHTML = document.getElementById("nam").innerText;
    cell2.innerHTML = document.getElementById("qty").value;
    cell3.innerHTML = document.getElementById("prc").innerText;
    cell4.innerHTML = document.getElementById("total").innerText;
    cell5.innerHTML = '<button id="'+ido+'" class="libutton" onclick="deletetbl(this)">حذف</button>';
    calctotaltable();

    document.getElementById("prods").value="";
    document.getElementById("qty").value="";
    document.getElementById("prc").innerText="nan";
    document.getElementById("nam").innerText="nona";
    document.getElementById("total").innerText="0";
    

    }
    else {alert("Please enter all values required!!!")}
    

}

//حساب كامل اجمالى اوردر الفاتورة
function calctotaltable(){
    var table = document.getElementById("tableord");
    var tota=0;
    for(i=0;i<table.rows.length-1;i++){
        tota+=Number(table.rows[i].cells[3].innerHTML);
    }

   document.getElementById("totord").innerHTML=tota;

}


//الغاء اختيار صنف فى الجدول المؤقت
function deletetbl(prod){
    var i = prod.parentNode.parentNode.rowIndex;
    document.getElementById("totord").innerHTML=Number(document.getElementById("totord").innerHTML)-Number(document.getElementsByTagName("tr")[i].cells[3].innerText);
    document.getElementsByTagName("tr")[i].remove();
    
}

//الغاء الطلب و حذف كافة اصنافة قبل حفظه
function deleteall(){
    for(i=0;i<document.getElementById("tableord").rows.length-1;i++)
     {
        document.getElementById("tableord").deleteRow(i);
    }
    if (document.getElementById("tableord").rows.length>1){deleteall();}
    document.getElementById("totord").innerHTML="0";
     

    
}
//تحميل بيانات الطلبات المخزنة
let dataord;
if (localStorage.order !=null){
    dataord= JSON.parse(localStorage.order);
}
else{dataord=[];}


//تخزين الطلب بالكامل فى الجدول النهائى للطلبات
function saveorder(){
    let neworder={
        orderno:geneordnum(),
        orderdate:getime(),
        products:getprods(),
        qty:getqty(),
        prc:getprc(),
        total:gettotal(),
        totalall:document.getElementById("totord").innerText
    }
    dataord.push(neworder);
    localStorage.setItem('order',JSON.stringify(dataord));
    deleteall();
    showData();

}

//اعطاء قيمة لرقم الاوردر
function geneordnum(){
    max=0;
    if(dataord.length==0){
        return 1;
    }

    for(i=0;i<dataord.length;i++){
        if(dataord[i].orderno>max){max=dataord[i].orderno;}
    }
    return max+1;
}

//اعطاء قيمة لتاريخ الاوردر
function getime(){
    var currentdate = new Date(); 
    var datetime =currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();
    return datetime;
    
}
//تخزين اسامى الاصناف فى الاوردر
function getprods(){
    var product=[];
    for(i=0;i<document.getElementById("tableord").rows.length-1;i++)
    {
        product.push(document.getElementsByTagName("tr")[i].cells[0].innerText);
    }
    return product;
}
//تخزين كمياتهم بنفس الترتيب
function getqty(){
    var qty=[];
    for(i=0;i<document.getElementById("tableord").rows.length-1;i++)
    {
        qty.push(document.getElementsByTagName("tr")[i].cells[1].innerText);
    }
    return qty;
}
//تخزين اسعار الوحدات بنفس الترتيب
function getprc(){
    var prc=[];
    for(i=0;i<document.getElementById("tableord").rows.length-1;i++)
    {
        prc.push(document.getElementsByTagName("tr")[i].cells[2].innerText);
    }
    return prc;
}
//تخزين توتال الصنف بعد ضرب سعر الحبة فى الكمية
function gettotal(){
    var tot=[];
    for(i=0;i<document.getElementById("tableord").rows.length-1;i++)
    {
        tot.push(document.getElementsByTagName("tr")[i].cells[3].innerText);
    }
    return tot;
}



//تحميل اقسام الاصناف
function getcat3()
     {
    removeOptions(document.getElementById('cats'));
     var c=datapro.length;
     var cats=[];
     var select = document.getElementById("cats");
          for(i=0;i<c;i++){
            if(lookupcat(cats,datapro[i].category)==false)
            {
                cats.push(datapro[i].category)

            }
  
              
              
          }
  
          for(var i = 0; i < cats.length; i++) {
              var opt = cats[i];
              var el = document.createElement("option");
              el.textContent = opt;
              el.value = opt;
              select.appendChild(el);
          }
          console.log(cats);
    
      }

//تحميل الاصناف
      function getData3()
      {
   
       if(loadstat==0){
           var c=Number(document.getElementById("numa").innerHTML)
      var names=[];
      var select = document.getElementById("prods");
           for(i=0;i<c;i++){
               if(datapro[i].category==document.getElementById("cats").value){
                   names.push(datapro[i].title);
               }
   
               
               
           }
   
           for(var i = 0; i < names.length; i++) {
               var opt = names[i];
               var el = document.createElement("option");
               el.textContent = opt;
               el.value = opt;
               select.appendChild(el);
           }
   
           /*************** */
           


       loadstat=1;
   
   
       }}
//تحميل معلومات الصنف عند اختياره من سعر و اسم
function getprodinfo3(){
    var nama=document.getElementById("prods").value;
    var c=Number(document.getElementById("numa").innerHTML);
            for(i=0;i<c;i++){
    
                if(document.getElementById("prods").value==datapro[i].title)
                {
                    document.getElementById("nam").innerHTML=datapro[i].title;
                    document.getElementById("prc").innerHTML=datapro[i].price;
                    
                }
            }
    
    
            /*************** */
            


    }

    //تحميل كل بيانات الاوردرات التى تمت على السيستم
function showData() {
        let table = ''; 
        for (let i = 0; i < dataord.length; i++) {
            table += `
        <tr>
        <td>${dataord[i].orderno}</td>
        <td>${dataord[i].orderdate}</td>
        <td>${getpnam (i)}</td>
        <td>${getprices (i)}</td>
        <td>${geqtys (i)}</td>
        <td>${getotals (i)}</td>
        <td>${dataord[i].totalall}</td>
        <td><button onclick="deleteData(${i})" id="delete" class="btntblorder">Delete</button></td>
    </tr>
        `
        }
    
        document.getElementById("tbody").innerHTML = table;
    }
    showData();

    //تحميل اسعار الاصناف فى الاوردرات
function getprices (index){
    let vf="";
    for(j=0;j<dataord[index].prc.length;j++){
        vf+=dataord[index].prc[j]+ "<br>";


    }
    return vf;
}
//تحميل اسماء الاصناف الموجودة فى الاوردر
function getpnam (index){
    let vf="";
    for(j=0;j<dataord[index].products.length;j++){
        vf+=dataord[index].products[j]+ "<br>";


    }
    return vf;
}
//تحميل توتلات الاصناف كلا على حدة
function getotals (index){
    let vf="";
    for(j=0;j<dataord[index].total.length;j++){
        vf+=dataord[index].total[j]+ "<br>";


    }
    return vf;
}

//تحميل كميات الاصناف فى الاوردر
function geqtys (index){
    let vf="";
    for(j=0;j<dataord[index].qty.length;j++){
        vf+=dataord[index].qty[j]+ "<br>";


    }
    return vf;
}

//مسح اوردر من جدول الاوردرات
function deleteData(i) {
    dataord.splice(i, 1);
    localStorage.order = JSON.stringify(dataord);
    showData();
}
