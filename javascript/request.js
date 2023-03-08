const requestMuseum = async (id) => {
    const baseURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
    const response = await fetch(baseURL + id);
    const data = await response.json();
    renderApiImg(data)
    console.log(response);
};


let contador = JSON.parse(localStorage.getItem("contador"))||1

const saveCount = () =>{
  localStorage.setItem("contador",JSON.stringify(contador))
}

let objIdArray = []

function aumentar() {return contador++}
function restar() {return contador--}

const requestId =  async () =>{
    const req = await fetch ("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Gogh, Vincent van")
    const res = await req.json()
    const arr = res.objectIDs
    objIdArray = arr
    requestMuseum(arr[contador])
  }

const nextId = async () =>{
    aumentar()
    requestMuseum(objIdArray[contador])
    saveCount()
}
  const prevId = async () =>{
    if(contador===0){
      customAlert("red","VE HACIA ADELANTE")
    }else{
      restar()
      requestMuseum(objIdArray[contador])
      saveCount()
    }

}

const PREVBTN = document.getElementById('prev')
const NEXTBTN = document.getElementById('next')
PREVBTN.addEventListener('click', prevId)
NEXTBTN.addEventListener('click', nextId)

// addEventListener('DOMContentLoaded', requestId)

    // requestMuseum(arr[pos]);