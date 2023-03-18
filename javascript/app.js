// ESTA FUNCION SE ENCARGA DE EVALUAR EL TIPO DE DATO QUE ES IGUAL A LAS CLASSLIST DE UN EVENTO CON UN SWITCH

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
    };
};


// ESTA FUNCION RENDERIZA LAS FLIPINGS CARDS QUE EN ESTE CASO RECIBEN SU CONTENIDO DE UN UN ARRAY DE OBJETOS

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



const filterProducts = (categoria) =>{
   return productsImg.filter(e=>e.categoria==categoria);
};

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

    const search = productsImg.filter((carritoId)=>{
        return carritoId.id==id;
   });

    if(!ids.includes(id)){    
       carrito.push(search[0]);
       reduceTotal(carrito);
       render10(carrito);  
       saveLocalStorage(carrito)
       customAlert("green","PRODUCTO AGREGADO AL CARRITO")
       alertJosh(`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>
         `, "1px",1500,"70px")

       alertColorNumberProduct("rgb(0, 194, 0)") 

    }else{ 
        customAlert("red","PRODUCTO EN EL CARRITO")     
        alertJosh("Producto en carrito", "1px",1500,"70px")
    };
}};

const reduceTotal = (arr) =>{
    total = arr.map(el=>el.precio)
    ids = carrito.map(el=>el.id)
    const totalSet = [...new Set(total)];
    let redTotal = totalSet.reduce((acc, v=0) => {
        return acc + v;
      }, 0)
    document.querySelector('.total').innerHTML=(`TOTAL: $${redTotal}`);
    return redTotal;
};


const renderCart = (product) =>{
    const {nombre, precio, id} = product;
    return `<div class="item">
                <h1>${nombre} $${precio}</h1>
                <button class="boton-borrar" id="boton-borrar" data-id="${id}">❌</button>
                </div>

                <div class="add-item-container">
                <button class="minus-btn" data-addid="${id}">-</button>
                <h2 class="product-quantity">0</h2>
                <button class="plus-btn" data-addid="${id}">+</button>
            </div>`;
};


const render10 = (arr) =>{
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
    render10(carrito)
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
    },1000)
};

const buySeccionView = () =>{
    setTimeout(()=>{
    BOXNAV.classList.toggle('active')
    },1500)
    setTimeout(()=>{
        return BOXNAV.innerHTML=`<div><h1>Te invito a explorar mi galería en línea y descubrir las hermosas pinturas que tenemos para ofrecerte.
        Gracias por visitar mi página de venta de pinturas y espero que disfrutes de tu experiencia de compra en mi
         tienda de arte en línea.</h1></div>
         <div><a href="#products"><button class="buy-button">COMPRAR</button></div></a>
        <button class="login" id="btn-nav">LOGIN</button>`
    },2000);
};

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
        console.log(addIde);
        
        if(e.target.classList[0]=="add-item-container"){
      
        }
        if(e.target.classList[0]=="minus-button"){
         
        }

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
    
            };
        };
    }); 

    CARDMAIN.addEventListener('click',addCartProduct);
    CARDMAIN.addEventListener("click",(e)=>{
   
        if(e.target.classList[0]=="boton-carrito"){
            const elem = parseInt( e.target.dataset.id)
            console.log(elem);
        };

        const carro45 = carrito.filter((el)=>el.id==6)
        console.log(carrito[1]);

    });

    INFOBTNS.addEventListener('click',menuActions);

    CARRITOBTN.addEventListener("click",()=>{
        if(carrito==""){
         customAlert("red", "CARRITO VACIO")
         alertJosh(`<p class="josh-message-bubble style=font-size: 20px;">🤨</p>`, "1px", 1700,"350px")
        }
        if(carrito!=""){
         customAlert("green", "COMPRA EXITOSA")
         carrito = []
         render10(carrito)
         reduceTotal(carrito)
         saveLocalStorage(carrito)
         alertJosh(addImgToJosh, "1px", 1700,"350px")
         

         
        }
     });
     
    BOXNAV.addEventListener("click",(e)=>{
        console.log(e.target);
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