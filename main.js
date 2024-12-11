let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let category = document.getElementById('category');
let total = document.getElementById('total');
let create = document.getElementById('create');
let count = document.getElementById('count');
let body = document.getElementById('body');

let mood='create';
let updateId;
function getValue()
{
    
    if(price.value != '')
    {
        let sum =(+price.value + +taxes.value + +ads.value - +discount.value);
        total.innerHTML = sum;
    }
}

let dataPro;
    // if(localStorage.product != null){
    //     dataPro = JSON.parse(localStorage.product);
    // }
    //localStorage.setItem('product','');
    if(localStorage.product != null){
        dataPro = JSON.parse(localStorage.product);
    }else{
        dataPro = [];
    }
       

create.onclick = function(){
    
    let data ={
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        category : category.value,
        total : total.value,
        category : category.value,
        count : count.value
    }

    if(data.title!='' && data.price!='' && data.category!=''){
        if(mood === 'create'){
            if(data.count > 1){
                for(let i=0;i<data.count;i++){
                    dataPro.push(data);
                }
            }else{
                dataPro.push(data);
            }
        }else{
            dataPro[updateId] = data;
            mood = 'update';
            create.innerHTML='Create';
            count.style.display='block';
        }
        clearData();
    }
        
    
    localStorage.setItem('product',JSON.stringify(dataPro));
    showData();
    isEmpty();    
    
}
showData();

function clearData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    category.value = '';
    total.value = '';
    category.value = '';
    count.value = '';
}

function showData()
{
    body.innerHTML ='';
    for(let i=0;i < dataPro.length;i++)
    {
        console.log(dataPro.length);
        body.innerHTML += `
    <tr>
        <th>${i}</th>
        <th>${dataPro[i].title}</th>
        <th>${dataPro[i].price}</th>
        <th>${dataPro[i].taxes}</th>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        
        <th>${dataPro[i].category}</th>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>`; 
    
     }
     let btnDelete = document.getElementById('deleteAll');
     if(dataPro.length > 0){
        btnDelete.innerHTML=`<button onclick="deleteAll()">Delete All(${dataPro.length})</button>`;
     }
    
}

function deleteData(id)
{
    //console.log(id);
     dataPro.splice(id,1);
     localStorage.setItem('product',JSON.stringify(dataPro));
     showData();   
     isEmpty();
     
}

function deleteAll()
{
    dataPro.splice(0);
    localStorage.clear();

    document.getElementById('deleteAll').style.display='none';
    showData();
    isEmpty();
}

function updateData(id)
{
    title.value = dataPro[id].title;
    price.value = dataPro[id].price;
    taxes.value = dataPro[id].taxes;
    ads.value = dataPro[id].ads;
    discount.value = dataPro[id].discount;
    category.value = dataPro[id].category;
    total.value = dataPro[id].total;
    count.value = dataPro[id].count;

    count.style.display='none';
    create.innerHTML = 'Update';  
    mood = 'update';
    updateId = id;  
}

//Search
let searchMood = 'title';

function getSearch(i)
{
    let search = document.getElementById('search');
    if(i === 'searchTitle'){
        search.placeholder = 'Search By Title';
        searchMood = 'title';
    }else{
        search.placeholder = 'Search By Category';
        searchMood = 'category';
    }
    search.focus();
    search.value='';
    showData();
    //console.log(searchMood);
}

function searchData(value)
{
    let table ;
    if(searchMood == 'title'){
        for(let i = 0 ; i < dataPro.length ; i++){
            console.log('ok');
            if(dataPro[i].title.includes(value)){
                table += `
                <tr>
                    <th>${i}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxes}</th>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    
                    <th>${dataPro[i].category}</th>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`; 
            }
        }
        
    }else{
        for(let i = 0 ; i < dataPro.length ; i++){
            
            if(dataPro[i].category.includes(value)){
                table += `
                <tr>
                    <th>${i}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxes}</th>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    
                    <th>${dataPro[i].category}</th>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`; 
            }
        }
    }


    body.innerHTML = table;
}
isEmpty();
function isEmpty()
{
    if(body.innerHTML === ''){
        
        document.getElementById('outputs').style.display='none';
        document.getElementById('alt').style.display='flex';
    }else{
        document.getElementById('alt').style.display='none';
        document.getElementById('outputs').style.display='block';    
    }
}
