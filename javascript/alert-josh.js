//  ALERT JOSH
// ALERT JOSH ES UNA ALERTA INTERACTIVA MULTIPROPOSITO QUE PUEDE SER CONFIGURADA SEGUN CONTENIDO DEL
// DE LOS PARAMETROS DE LA FUNCION. TIENE UN MENSAJE string, POSICION num, TIEMPO num
//  (0 = mostrar hasta escuchar un cambio) Y POSICION DESDE LS DERECHA num
// SOLO DISPONIBLE EN VERSION DE ESCRITORIO

const JOSH = document.querySelector(".josh-message");
const TALKJOSH = document.querySelector(".talk-josh");
const BUBBLEJOSH = document.querySelector(".message-bubble");

const alertJosh = (message, bottom, time, right,) => {
    JOSH.style.display="flex";
    JOSH.style.bottom= bottom;
    JOSH.style.right=right;
    JOSH.style.animation="scaleAnim 0.2s linear 0s 1 normal none";
    BUBBLEJOSH.innerHTML=message;
    if(!time==0)
    setTimeout(()=>{
        JOSH.style.display="none";
    },time);
};

const addBtnToJosh = `<p class="josh-message-bubble">Quieres ver un gatito?</p>
<button class="josh-button">Si</button>
<button class="josh-button">No</button>`;

const addImgToJosh = `<img src="https://i.pinimg.com/originals/81/99/6f/81996f7cd791a2f7c70aedbd242ec7cf.gif" alt="" width="60px" height="50px">`

const gitSvg = `<p class="josh-message-bubble">Quieres ver mi github?</p>
<button class="josh-button">Si</button>`;

const FOOTER = document.querySelector(".footer");

const showGithubInfo = () =>{
    FOOTER.addEventListener("click",()=>{
        alertJosh(gitSvg, "1px",0,"70px");

        JOSH.addEventListener("click",()=>{

            alertJosh("https://github.com/Leracius", "1px", 3000,"70px")
        });
    });
};
FOOTER.addEventListener("click",showGithubInfo);


// La idea en general y las diferentes versiones que se produjeron hasta llegar a la version 
// presente de josh no fueron sacadas de nigun tutorial, es un producto de la practica :)
