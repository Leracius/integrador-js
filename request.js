const requestMuseum = async (id) => {
    const baseURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
    const response = await fetch(baseURL + id);
    const data = await response.json();
    console.log(data.primaryImage);
    renderApiImg(data)
    return data.primaryImage;
};

let contador = 0; 

function aumentar() {return contador++}
function restar() {return contador--}

const requestId =  async (pos) =>{
    const req = await fetch ("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Gogh, Vincent van")
    const res = await req.json()
    const arr = res.objectIDs
    requestMuseum(arr[pos]);
    console.log(arr[pos]);
  }
const func1 = async () =>{
    requestId(aumentar())
    console.log(contador);
}
  const func2 = async () =>{
    requestId(restar())
    console.log(contador);
}

const PREVBTN = document.getElementById('prev')
const NEXTBTN = document.getElementById('next')
PREVBTN.addEventListener('click', func2)
NEXTBTN.addEventListener('click', func1)