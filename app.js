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

const saveLocalStorage = (cartList) => {
    localStorage.setItem("carrito", JSON.stringify(cartList));
};

const renderLocal = () =>{
    render10(carrito); 
    saveLocalStorage(carrito)
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
    //    total.push(search[0].precio);
       ids.push(search[0].id);
    
       reduceTotal();
       render10(carrito);  
    
       renderLocal(carrito)
       console.log(carrito);
       console.log(total);

    //    addUnitToProduct(carrito)
    }else{
        console.log(search);
    }
}}

const reduceTotal = () =>{
    total = carrito.map(el=>el.precio)
    const totalSet = [...new Set(total)];
    let redTotal = totalSet.reduce((acumulador, valorActual) => {
        return acumulador + valorActual;
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
    const miSet = [...new Set(arr)];
    return CARRITOLIST.innerHTML=miSet.map((el)=>renderCart(el)).join('');
}



CARRITOLIST.addEventListener('click',(e)=>{

    if(e.target.classList[0]==="boton-agregar"){
        
    }

    if(e.target.id==="boton-borrar"){
        let id = parseInt(e.target.dataset.id); 
        let elDel = carrito.find(el=>el.id===id);

        newCarrito = carrito.filter(el=>el!==elDel); 
        newTotal = total.filter(el=>el!==elDel.precio);
        

        // este if se encarga de verificar que no se intente acceder
        // a la propiedad precio de un objeto undefined

        if (elDel && elDel.precio){
            ids.pop(id);
            carrito.pop(elDel);
            total.pop(elDel);

            render10(newCarrito);
            reduceTotal(newTotal);

            renderLocal(carrito)
        };
    };
}); 


CARDMAIN.addEventListener('click',addCartProduct);

// -------------------------------------------------------

addEventListener('DOMContentLoaded',showProduct(productsImg),render10(carrito),reduceTotal());

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



