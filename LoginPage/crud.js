const baseUrl = `https://b33-group1-airbnb.onrender.com`;
const userUrl = `${baseUrl}/listings`;

let mainSection = document.getElementById("card-Wrapper");


window.addEventListener("load", () => {
    fetchData();
  });
  
async function fetchData(){
    try {
        let response = await fetch(userUrl,{
            method: "GET"
        });
        let data = await response.json();
        console.log(data);
        appendAllData(data)
    } catch (error) {
        console.log(error)
    }
}
// fetchData()


// appendAllList

function appendAllData(data){
    mainSection.innerHTML = "";
    data.forEach(item=>{
        let card = appendOneList(item);
        mainSection.append(card);
    });

}



// appendOneList
function appendOneList(ele){
 let card = document.createElement("div")
 card.className  = "card";

 let img = document.createElement("img")
 img.src  = ele.image;
 img.alt = "Placeholder image"

 let flex = document.createElement("div")
 flex.className  = "flex";
 let h3 = document.createElement("h3")
h3.innerText = ele.name;

let flex2 = document.createElement("div")
flex2.className  = "flex";
let i = document.createElement("i")
i.className  = "fa-solid";
i.classList.add("fa-star");
let p = document.createElement("p")
p.innerText  = ele.rating;
flex2.append(i,p);

flex.append(h3,flex2);

let address = document.createElement("p")
address.className = "lightText"
address.innerText  = ele.address;
let year_built = document.createElement("p")
year_built.className = "lightText"
year_built.innerText  = ele.year_built;

let flex3 = document.createElement("div")
flex3.className  = "flex";
let rate = document.createElement("p")
rate.innerText = `Rs ${ele.price_per_night} /night`;
rate.style.fontWeight = "bold"
let btn = document.createElement("button")
btn.innerText = "BOOK NOW";
flex3.append(rate,btn);

btn.addEventListener("click", ()=>{
    window.location.href="../../B33-Group1/payment/adress.html";
})

card.append(img,flex,address,year_built,flex3);



return card;
}

