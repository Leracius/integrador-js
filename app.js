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


// AGREGAR SEMICOLONS!!!!!!

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

const CARRITO = document.querySelector('.carrito');

let carrito = [];

let total = [];

let ids = [];

const addCartProduct = (e) =>{

if(e.target.classList=="boton-carrito"){

    let id = parseInt(e.target.dataset.id);

    const search = productsImg.filter((carritoId)=>{
        return carritoId.id==id;
   });

    if(!ids.includes(id)){

        // e.target.textContent="PRODUCTO EN CARRITO"
        // e.target.style.setProperty("--light-blue", "red")
        // e.target.textContent="AGREGAR AL CARRITO"
        // e.target.style.setProperty("--light-blue", "green")
        // setTimeout(()=>{
        //     e.target.style.setProperty("--light-blue", "#507acc") 
        // },1000)


    
       carrito.push(search[0]);
       total.push(search[0].precio);
       ids.push(search[0].id);
    
       reduceTotal(total);
       render10(carrito);  
    //    addUnitToProduct(carrito)
    }else{
        console.log(search);
    }
}}

// const addUnitToProduct = (product) => {
//     carrito = carrito.map((cartProduct) =>
//       carrito.id === carrito.id
//         ? { ...carrito, quantity: cartProduct.quantity + 1 }
//         : cartProduct
//     );
//   };

const reduceTotal = (arr) =>{
    const totalSet = [...new Set(arr)];
    let redTotal = totalSet.reduce((acumulador, valorActual) => {
        return acumulador + valorActual;
      }, 0)
    document.querySelector('.total').innerHTML=(`TOTAL: $${redTotal}`);
    return redTotal;
}

document.querySelector('.vaciar-carrito-btn').style.display='none';
const CARRITOLIST = document.querySelector('.product-cart');



const renderCart = (product) =>{
    document.querySelector('.vaciar-carrito-btn').style.display='block';
    const {nombre, precio, id} = product;
    return `<div class="item">
                <h1>${nombre} $${precio}</h1>
                <button class="boton-agregar">x1</button>
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
        };
    };
}); 

const deleteEl = (id) =>{
    carrito.pop(carrito[id]);
}

CARDMAIN.addEventListener('click',addCartProduct);

// -------------------------------------------------------

addEventListener('DOMContentLoaded',showProduct(productsImg));

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



