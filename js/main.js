var productNameInput=document.getElementById("productNameInput");
var productPriceInput=document.getElementById("productPriceInput");
var productCategoryInput=document.getElementById("productCategoryInput");
var productDescInput=document.getElementById("productDescInput");
var addProduct=document.getElementById("addProduct");
var inputSearch=document.getElementById("search");
var btnUpdate=document.getElementById("update");
var products=[];
var count;

console.log(count);
if(localStorage.getItem("products")!=null){
    products=JSON.parse(localStorage.getItem("products"));
    display(products);
}
display(products);
addProduct.addEventListener("click",function(){
   
    if(inputsValidation()==true &&productNameValidation()==true&&productPriceValidation()==true){

        if(addProduct.innerHTML=="add Product"){
            var product={
                name:productNameInput.value,
                price:productPriceInput.value,
                category:productCategoryInput.value,
                Desc:productDescInput.value
                
                
                
                }
                products.push(product);
               
                localStorage.setItem("products" ,JSON.stringify(products));
        
        clearForm();
        display(products);
        }else{
        products[count].name=productNameInput.value;
        products[count].price=productPriceInput.value;
        products[count].category=productCategoryInput.value;
        products[count].Desc=productDescInput.value;
        display(products);
        localStorage.setItem("products" ,JSON.stringify(products));
        
        addProduct.innerHTML="add Product";
        clearForm();
        }
        document.getElementById("input").classList.remove("d-block")
        document.getElementById("input").classList.add("d-none")
    }
else{
    document.getElementById("input").classList.remove("d-none")
document.getElementById("input").classList.add("d-block")

}
})
function clearForm(){
    productNameInput.value="";
   productPriceInput.value="";
    productCategoryInput.value="";
    productDescInput.value="";
}
function display(productContainer){
var cartoona='';
    for(var i=0;i<productContainer.length;i++){

        cartoona+=`<tr><td>${i+1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].Desc}</td>
        <td> <button class="btn btn-warning" id="updaet"onclick="update(${i});">Update</button> </td>
           <td><button class="btn btn-danger" onclick="Delete(${i});" id="delete">Delete</button></td><tr>`
    }
    document.getElementById("tableBody").innerHTML=cartoona;
}

inputSearch.addEventListener("input",function(){
    var searchContainer=[];
for(var i=0;i<products.length;i++){

    if(products[i].name.toLowerCase().includes(this.value.toLowerCase())){
       
       
        searchContainer.push(products[i]);
    
     

    }


}
display(searchContainer);

})



function Delete(index){

products.splice(index,1);
  
localStorage.setItem("products" ,JSON.stringify(products));
display(products);

}

function update(index){

    productNameInput.value=products[index].name;
    productPriceInput.value=products[index].price;
    productCategoryInput.value=products[index].category;
    productDescInput.value=products[index].Desc;
    addProduct.innerHTML="Update";
    count=index;

}

function productNameValidation(){

    var regx = /^[A-Z][a-z0-9]{2,8}$/;
    if(regx.test(productNameInput.value)){
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        document.getElementById("NameVal").classList.add("d-none");
        document.getElementById("NameVal").classList.remove("d-block");
return true
        
    }else{
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        document.getElementById("NameVal").classList.add("d-block");
        document.getElementById("NameVal").classList.remove("d-none");
        return false;
    }

}
function productPriceValidation(){

    var regx = /^[0-9]{2,8}$/;
    if(regx.test(productPriceInput.value )){
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
       document.getElementById("PriceVal").classList.add("d-none");
       document.getElementById("PriceVal").classList.remove("d-block");

return true
        
    }else{
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        document.getElementById("PriceVal").classList.add("d-block");
        document.getElementById("PriceVal").classList.remove("d-none");
        return false;
    }

}
function inputsValidation(){
    if(productNameInput!=null&&productDescInput!=null&&productCategoryInput!=null&&productPriceInput!=null){
        return true;
    }else{
        return false;
    }
}