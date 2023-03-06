const CARDMAIN = document.querySelector('.card-main');
const CATEGORIES = document.querySelector('.categories');
const BTNCATEGORIE = document.getElementById('button');
const BOXNAV = document.querySelector('.expand');
const INFOBTNS = document.querySelector('.info-container');
const BTNCONTACT = document.getElementById('btn-nav');
const SECTIONBUY = document.querySelector('.product-container');
const SECTIONAPI = document.querySelector('.museum-container');
const botonAnterior = document.getElementById('anterior');
const botonSiguiente = document.getElementById('siguiente');
const IMGAPI = document.querySelector('.img-api');


CATEGORIES.addEventListener('click',categorieType);

function categorieType (e){
    let eventClasslistValue = e.target.classList.value;
    switch (eventClasslistValue) {
        case 'btn-ver-todos':
            showProduct(productsImg);
            break;
        case 'btn-basquiat':
            showProduct(filterProducts('basquiat'));
            break;
        case 'btn-medieval':
            showProduct(filterProducts('medieval'));
            break;
        case 'btn-moderno':
            showProduct(filterProducts('modern-classic'));
            break;
        case 'btn-surrealismo':
            showProduct(filterProducts('surrealism'));
            break;
    }
}

const renderProduct = (product) =>{
    const {id, img, precio, nombre} = product;
    return`<div class="card">
    <div class="front-card f-1">
        <img src="${img}" class="product-img" alt="">
    </div>    
    <div class="back-card b-1 ">
        <h2>"${nombre}"</h2>
        <p>$${precio}</p>
        <button class="boton-carrito" data-id="${id}" data-precio="${precio}">AGREGAR AL CARRITO</button>
    </div>
</div>`;
   
}

const filterProducts = (categoria) =>{
   return productsImg.filter(e=>e.categoria==categoria);
}

const showProduct = (el) =>{
    CARDMAIN.innerHTML= el.map((e)=>renderProduct(e)).join('');
}

// ------------------CARRITO-------------------------


let carrito = JSON.parse(localStorage.getItem("carrito"))||[];

const saveLocalStorage = (cartArr) => {
    localStorage.setItem("carrito", JSON.stringify(cartArr));
};

const CARRITO = document.querySelector('.carrito');

let total = [];

let ids = [];

const addCartProduct = (e) =>{
if(e.target.classList=="boton-carrito"){

    let id = parseInt(e.target.dataset.id);

    const search = productsImg.filter((carritoId)=>{
        return carritoId.id==id;
   });

    if(!ids.includes(id)){    
       carrito.push(search[0]);
    
       reduceTotal(carrito);
       render10(carrito);  
       saveLocalStorage(carrito)
       addProdcutSucces("green","PRODUCTO AGREGADO AL CARRITO")
       alertColorNumberProduct("rgb(0, 194, 0)") 

    }else{ 
        addProdcutSucces("red","PRODUCTO EN EL CARRITO")     
    }
}}

const reduceTotal = (arr) =>{
    total = arr.map(el=>el.precio)
    ids = carrito.map(el=>el.id)
    const totalSet = [...new Set(total)];
    let redTotal = totalSet.reduce((acc, v=0) => {
        return acc + v;
      }, 0)
    document.querySelector('.total').innerHTML=(`TOTAL: $${redTotal}`);
    return redTotal;
}

const CARRITOLIST = document.querySelector('.product-cart');

const renderCart = (product) =>{
    const {nombre, precio, id} = product;
    return `<div class="item">
                <h1>${nombre} $${precio}</h1>
                <button class="boton-borrar" id="boton-borrar" data-id="${id}">❌</button>
            </div>
            <div class="add-item-container">
            <button class="minus-btn">-</button>
            <h2 class="product-quantity">0</h2>
            <button class="plus-btn">+</button>
        </div>`;
    
}

const CARRITOTEXT = document.getElementById("cart-text")

const render10 = (arr) =>{
    arr.length===0?CARRITOTEXT.innerHTML=0:CARRITOTEXT.innerHTML=arr.length
    return CARRITOLIST.innerHTML=arr.map((el)=>renderCart(el)).join('');
}

const alertColorNumberProduct = (color) =>{
    CARRITOTEXT.style.color=color
    setTimeout(()=>{
        CARRITOTEXT.style.color="white" 
    },1000)
}

CARRITOLIST.addEventListener('click',(e)=>{

    
    if(e.target.id==="boton-borrar"){
        let id = parseInt(e.target.dataset.id);

        let elDel = carrito.find(el=>el.id===id);
        carrito = carrito.filter(el=>el!==elDel); 
        

        if (elDel && elDel.precio){
            ids.pop(id);

            render10(carrito);
            reduceTotal(carrito);
            saveLocalStorage(carrito)
            alertColorNumberProduct("red")

        }else{

        }
    };
}); 



CARDMAIN.addEventListener('click',addCartProduct);

const renderInit = () =>{
    showProduct(productsImg)
    render10(carrito)
    reduceTotal(carrito)
}


const XBUTTONCART = document.querySelector(".carrito-x-btn")

XBUTTONCART.addEventListener("click",()=>{
    CARRITO.classList.toggle("active-cart")
})

// addEventListener('DOMContentLoaded', renderInit, buySeccionView );

const ITEMENU = document.querySelector(".item-menu")

 
const menuActions = (e) =>{

    if(e.target.classList[1]=="open"){
        e.target.classList.toggle("open")
        // return BOXNAV.innerHTML=""
    }

    if(e.target.id=='cart-text'){
        CARRITO.classList.toggle("active-cart");

    }

    // if(e.target.id=="comprar"){
    //     BOXNAV.classList.toggle('active');
    //     console.log(e.target.id);

    // }
    
    if(e.target.id=="museum"){
        console.log(e.target.id);
        
    }
    

    if(e.target.id=="comprar"){
        console.log(e.target.classList[0]);
        e.target.classList.toggle("active")
        e.target.classList.toggle("open")
        // BOXNAV.innerHTML=""

    }
    
}



const hideAndShowSection = () =>{
    SECTIONBUY.classList[1]=='hide'? SECTIONBUY.classList.remove('hide'):SECTION.classList.add('hide');
}


INFOBTNS.addEventListener('click',menuActions);

const renderApiImg = (apires) =>{
    const {artistAlphaSort, primaryImage, title} = apires
    IMGAPI.innerHTML=` 
    <h1 class="autor">METROPOLITAN MUSEUM API</h1>
    <img src="${primaryImage}" alt="">
    <h1 class="autor">"${title}"</h1>
    <h1 class="autor">${artistAlphaSort}.</h1>`;

}

const CORRECTBUY = document.querySelector(".correct-buy")
const WARNINGMESSAGE = document.querySelector(".warning")

const addProdcutSucces = (color, message) =>{
    WARNINGMESSAGE.style.backgroundColor=color
    CORRECTBUY.style.display="flex"
    WARNINGMESSAGE.innerHTML=message
    setTimeout(()=>{
        CORRECTBUY.style.display="none"
    },1000)
}

const CARRITOBTN = document.querySelector(".comprar-carrito-btn") 


CARRITOBTN.addEventListener("click",()=>{
   if(carrito==""){
    addProdcutSucces("red", "CARRITO VACIO")
   }
   if(carrito!=""){
    addProdcutSucces("green", "COMPRA EXITOSA")
    carrito = []
    render10(carrito)
    reduceTotal(carrito)
    saveLocalStorage(carrito)
   }

    
})


const buySeccionView = () =>{
    setTimeout(()=>{
    BOXNAV.classList.toggle('active')
    },1500)
    setTimeout(()=>{
        return BOXNAV.innerHTML=`<div><h1>Te invito a explorar mi galería en línea y descubrir las hermosas pinturas que tenemos para ofrecerte.
        Gracias por visitar mi página de venta de pinturas y espero que disfrutes de tu experiencia de compra en mi
         tienda de arte en línea.</h1></div>
        <div><button class="buy-button">COMPRAR</button></div>
        <button class="login" id="btn-nav">LOGIN</button>`
    },2000)
}

// const INITBUTTON = document.querySelector(".buy-button")


BOXNAV.addEventListener("click",(e)=>{
    if(e.target.classList=="buy-button"){
        BOXNAV.classList.toggle('active')
        BOXNAV.innerHTML=""
    }else if(e.target.classList=="login"){
        func23()
    }
})


addEventListener('DOMContentLoaded', renderInit, buySeccionView());

const CUBE = document.querySelector(".cube-contain")

const HIDEMUSEUM = document.querySelector(".hide-museum")

CUBE.addEventListener("click",()=>{
    HIDEMUSEUM.classList.toggle("show-museum")
})

// CHAT GPT SOLUTIONS

// let myImage = document.querySelector("#myImage");
// let isDragging = false;
// let currentX;
// let currentY;
// let initialX;
// let initialY;
// let xOffset = 0;
// let yOffset = 0;

// myImage.addEventListener("mousedown", dragStart);
// myImage.addEventListener("mouseup", dragEnd);
// myImage.addEventListener("mousemove", drag);

// function dragStart(e) {
//   initialX = e.clientX - xOffset;
//   initialY = e.clientY - yOffset;

//   if (e.target === myImage) {
//     isDragging = true;
//   }
// }

// function dragEnd(e) {
//   initialX = currentX;
//   initialY = currentY;

//   isDragging = false;
// }

// function drag(e) {
//   if (isDragging) {
//     e.preventDefault();

//     currentX = e.clientX - initialX;
//     currentY = e.clientY - initialY;

//     xOffset = currentX;
//     yOffset = currentY;

//     setTranslate(currentX, currentY, myImage);
//   }
// }

// function setTranslate(xPos, yPos, el) {
//   el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
// }

// FORM

function validateForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    if (email == "" || password == "") {
      alert("Por favor, complete todos los campos.");
      return false;
    }
  }

 
const LOGINCONTAINER = document.querySelector(".login-container-hide")

const func23 = () =>{
   return LOGINCONTAINER.classList.toggle("login-container-show")
}

const PXBTN = document.querySelector(".p-exit-button-login")

PXBTN.addEventListener("click",()=>{
    func23()
})