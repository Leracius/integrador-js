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


const renderLocal = (arr) =>{
    render10(arr); 
    saveLocalStorage(arr)
}

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
    
       reduceTotal();
       render10(carrito);  
       renderLocal(carrito)

    }else{
        
    }
}}

const reduceTotal = () =>{
    total = carrito.map(el=>el.precio)
    ids = carrito.map(el=>el.id)
    const totalSet = [...new Set(total)];
    let redTotal = totalSet.reduce((acc, v) => {
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
                <button class="boton-borrar" id="boton-borrar" data-id="${id}">🗑️</button>
            </div>`;
    
}

const render10 = (arr) =>{
    document.getElementById("cart-text").innerHTML=`CARRITO ${arr.length}`
    return CARRITOLIST.innerHTML=arr.map((el)=>renderCart(el)).join('');
}

CARRITOLIST.addEventListener('click',(e)=>{

    if(e.target.classList[0]==="boton-agregar"){
        log("no funco")
    }

    if(e.target.id==="boton-borrar"){
        let id = parseInt(e.target.dataset.id); 

        let elDel = carrito.find(el=>el.id===id);

        newCarrito = carrito.filter(el=>el!==elDel); 

        if (elDel && elDel.precio){
            ids.pop(id);
            carrito.pop(elDel);

            render10(newCarrito);
            reduceTotal();
            renderLocal(newCarrito)

        };
    };
}); 


CARDMAIN.addEventListener('click',addCartProduct);

const renderInit = () =>{
    showProduct(productsImg)
    render10(carrito)
    reduceTotal()
}

addEventListener('DOMContentLoaded', renderInit);

const menuActions = (e) =>{
    if(e.target.id=='cart-text')CARRITO.classList.toggle("active-cart");
    if(e.target.id=="sobre-mi")BOXNAV.classList.toggle('active');
}

const hideAndShowSection = () =>{
    SECTIONBUY.classList[1]=='hide'? SECTIONBUY.classList.remove('hide'):SECTION.classList.add('hide');
}


INFOBTNS.addEventListener('click',menuActions);

const renderApiImg = (apires) =>{
    const {artistAlphaSort, primaryImage, title} = apires
    IMGAPI.innerHTML=` <h1 class="autor">${artistAlphaSort}</h1>
    <h1 class="autor">"${title}"</h1>
    <img src="${primaryImage}" alt="">`;

}



