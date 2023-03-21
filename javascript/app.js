// ESTA FUNCION SE ENCARGA DE EVALUAR EL TIPO DE DATO QUE ES IGUAL A LAS CLASSLIST DE UN EVENTO CON UN SWITCH

function categorieType (e){
    let eventClasslistValue = e.target.classList.value;
    switch (eventClasslistValue) {
        case 'btn-ver-todos':
            showProduct(productsImg);
            break;
        case 'btn-basquiat':
            showProduct(filterProducts('basquiat'));
            alertJosh("Estas son algunas obras de Jean Michel Basquiat el artista visual más exitoso en la historia del arte afrodescendiente de su época", "1px", 5000,"70px")
            break;
        case 'btn-medieval':
            showProduct(filterProducts('medieval'));
            alertJosh("Esta es una seleccion de algunas obras de la época medieval", "1px" , 3000, "70px")
            break;
        case 'btn-moderno':
            showProduct(filterProducts('modern-classic'));
            alertJosh("Esta es una seleccion obras clásicas michificadas ", "1px" , 3000, "70px")
            break;
        case 'btn-surrealismo':
            showProduct(filterProducts('surrealism'));
            alertJosh("Esta es una seleccion surrealista de obras a ser interpretadas por cada uno", "1px" , 3000, "70px")
            break;
    };
};


// ESTA FUNCION RENDERIZA LAS FLIPINGS CARDS QUE EN ESTE CASO RECIBEN SU CONTENIDO DE UN UN ARRAY 
// DE OBJETOS

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
   
};


// Funcion para filtrar los productos por categoria
const filterProducts = (categoria) =>{
   return productsImg.filter(e=>e.categoria==categoria);
};

// renderizar los productos
const showProduct = (el) =>{
    CARDMAIN.innerHTML= el.map((e)=>renderProduct(e)).join('');
};

// ------------------CARRITO-------------------------


let carrito = JSON.parse(localStorage.getItem("carrito"))||[];

const saveLocalStorage = (cartArr) => {
    localStorage.setItem("carrito", JSON.stringify(cartArr));
};

let total = [];

let ids = [];

const addCartProduct = (e) =>{
if(e.target.classList=="boton-carrito"){
    let id = parseInt(e.target.dataset.id);


    

    // !carrito[index].cantidad
    // ?console.log("no")
    // :console.log("si");


    // carrito[index].cantidad = 1
    

    const search = productsImg.filter((carritoId)=>{
        return carritoId.id==id;
   });

    if(!ids.includes(id)){
      
       carrito.push(search[0]);
       let index = carrito.findIndex(el=>el.id==id)
        carrito[index].cantidad = 1


       reduceTotal(carrito);
       renderCarritoList(carrito);  
       saveLocalStorage(carrito)
       customAlert("green","PRODUCTO AGREGADO AL CARRITO")
       alertJosh(`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>
         `, "1px",1500,"350px")
       alertColorNumberProduct("rgb(0, 194, 0)") 

    }else{ 
        customAlert("red","PRODUCTO EN EL CARRITO")     
        alertJosh("Producto en carrito", "1px",1500,"350px")
    };
}};

const reduceTotal = (arr) =>{
    total = arr.map(el=>el.precio * el.cantidad)

    console.log(total);

    ids = carrito.map(el=>el.id)
    const totalSet = [...new Set(total)];
    let redTotal = totalSet.reduce((acc, v=0) => {
        return acc + v;
      }, 0)
    document.querySelector('.total').innerHTML=(`TOTAL: $${redTotal}`);
    return redTotal;
};


const renderCart = (product) =>{
    const {nombre, precio, id, cantidad, img} = product;

    return `<div class="item">
                <h1>${nombre} $${precio}</h1>
            
                <button class="boton-borrar" id="boton-borrar" data-id="${id}">❌</button>
                </div>

                <div class="add-item-container">
                <button class="minus-btn" data-addid="${id}">-</button>
                <h2 class="product-quantity">${cantidad}</h2>
                <button class="plus-btn" data-addid="${id}">+</button>
            </div>`;
};


const renderCarritoList = (arr) =>{
    arr.length===0
    ?CARRITOTEXT.innerHTML=0
    :CARRITOTEXT.innerHTML=arr.length
    return CARRITOLIST.innerHTML=arr.map((el)=>renderCart(el)).join('');
};

const alertColorNumberProduct = (color) =>{
    CARRITOTEXT.style.color=color
    setTimeout(()=>{
        CARRITOTEXT.style.color="white" 
    },1000);
};

const renderInit = () =>{
    showProduct(productsImg)
    renderCarritoList(carrito)
    reduceTotal(carrito)
};


XBUTTONCART.addEventListener("click",()=>{
    CARRITO.classList.toggle("active-cart")
});

const menuActions = (e) =>{

    if(e.target.classList[1]=="open"){
        e.target.classList.toggle("open")
    };

    if(e.target.id=='cart-text'){
        CARRITO.classList.toggle("active-cart");
    };

    if(e.target.id=="comprar"){
        console.log(e.target.classList[0]);
        e.target.classList.toggle("active")
        e.target.classList.toggle("open")
    };
};

const hideAndShowSection = () =>{
    SECTIONBUY.classList[1]=='hide'
    ? SECTIONBUY.classList.remove('hide')
    :SECTION.classList.add('hide');
};

const renderApiImg = (apires) =>{
    const {artistAlphaSort, primaryImage, title} = apires
    IMGAPI.innerHTML=` 
    <h1 class="autor">METROPOLITAN MUSEUM API</h1>
    <img src="${primaryImage}" alt="">
    <h1 class="autor">"${title}"</h1>
    <h1 class="autor">${artistAlphaSort}.</h1>`;

};

const customAlert = (color, message) =>{
    WARNINGMESSAGE.style.backgroundColor=color
    CORRECTBUY.style.display="flex"
    WARNINGMESSAGE.innerHTML=message
    setTimeout(()=>{
        CORRECTBUY.style.display="none"
    },1000);
};

const buySeccionView = () =>{
    setTimeout(()=>{
    BOXNAV.classList.toggle('active')
    },1500);
    setTimeout(()=>{
        return BOXNAV.innerHTML=`<div><h1>Te invito a explorar mi galería en línea y descubrir las hermosas pinturas que tenemos para ofrecerte.
        Gracias por visitar mi página de venta de pinturas y espero que disfrutes de tu experiencia de compra en mi
         tienda de arte en línea.</h1></div>
         <div><a href="#products"><button class="buy-button">COMPRAR</button></div></a>
        <button class="login" id="btn-nav">LOGIN</button>`
    },2000);
};

const validateForm = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    if (email == "" || password == "") {
      alert("Por favor, complete todos los campos.");
      return false;
    };
  };

const showLogin = () =>{
   return LOGINCONTAINER.classList.toggle("login-container-show")
}


const addQuantity = (id) =>{
    let index = carrito.findIndex(el=>el.id==id)
    carrito[index].cantidad = carrito[index].cantidad + 1

    reduceTotal(carrito)
    renderCarritoList(carrito)
    saveLocalStorage(carrito)
};

const restQuantity = (id) =>{
    let index = carrito.findIndex(el=>el.id==id)

    carrito[index].cantidad>1
    ?carrito[index].cantidad = carrito[index].cantidad - 1
    :alertJosh("Puedes eliminar el producto con X", "1px", 2000,"350px")

    reduceTotal(carrito)
    renderCarritoList(carrito)
    saveLocalStorage(carrito)
};


//Funcion incicializadora

const CATEGORIES = document.querySelector('.categories');
const CARRITOLIST = document.querySelector('.product-cart');
const CARDMAIN = document.querySelector('.card-main');
const INFOBTNS = document.querySelector('.info-container');
const CARRITOBTN = document.querySelector(".comprar-carrito-btn");
const BOXNAV = document.querySelector('.expand');
const CUBE = document.querySelector(".cube-contain");
const PXBTN = document.querySelector(".p-exit-button-login");

const init = () =>{
    CATEGORIES.addEventListener('click',categorieType); 
    
    CARRITOLIST.addEventListener('click',(e)=>{
        const addIde = parseInt(e.target.dataset.addid)
        
        if(e.target.classList[0]=="plus-btn")addQuantity(addIde)

        if(e.target.classList[0]=="minus-btn")restQuantity(addIde)

        if(e.target.id==="boton-borrar"){
            let id = parseInt(e.target.dataset.id);
    
            let elDel = carrito.find(el=>el.id===id);
            carrito = carrito.filter(el=>el!==elDel); 
            
    
            if (elDel && elDel.precio){
                ids.pop(id);
                renderCarritoList(carrito);
                reduceTotal(carrito);
                saveLocalStorage(carrito)
                alertColorNumberProduct("red")
    
            };
        };
    }); 

    CARDMAIN.addEventListener('click',addCartProduct);

    INFOBTNS.addEventListener('click',menuActions);

    CARRITOBTN.addEventListener("click",()=>{
        if(carrito==""){
         customAlert("red", "CARRITO VACIO")
         alertJosh(`<p class="josh-message-bubble style=font-size: 20px;">🤨</p>`, "1px", 1700,"350px")
        }
        if(carrito!=""){
         customAlert("green", "COMPRA EXITOSA")
         carrito = []
         renderCarritoList(carrito)
         reduceTotal(carrito)
         saveLocalStorage(carrito)
         alertJosh(addImgToJosh, "1px", 1700,"350px")
             
        }
     });
     
    BOXNAV.addEventListener("click",(e)=>{
        if(e.target.classList=="buy-button"){
            alertJosh("Disfruta de esta galeria exclusiva!", "1px", 5000,"70px");
        }
        if(e.target.classList=="login"){
            showLogin();
            console.log(e.target);
            alertJosh("Ingresa tu cuenta", "1px", 5000,"70px");
        };    
   });
   
   CUBE.addEventListener("click",()=>{
       HIDEMUSEUM.classList.toggle("show-museum")
       alertJosh("API Metropolitan museum NY", "1px", 3000,"70px")
       requestId()
   });
   PXBTN.addEventListener("click",showLogin);

   addEventListener('DOMContentLoaded', renderInit, buySeccionView());
};

init();