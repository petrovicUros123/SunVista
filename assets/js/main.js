$.ajax({
    url: "data/menu.json",
    method : "get",
    dataType : "json",
    success: function(data){
        ispisNavigacije(data);
    },
    error: function(xhr){
        console.log("Greska");
    }
})

function ispisNavigacije(nizLinkova){
    let html = "";
    for(let link of nizLinkova){
        html+=`<li><a href="${link.href}">${link.tekst}</a></li>`
    }
    $("#menu").html(html);
}

$.ajax({
    url: "data/proizvodiPocetna.json",
    method : "get",
    dataType : "json",
    success: function(data){
        ispisProizvoda(data);
    },
    error: function(xhr){
        console.log("Greska");
    }
})

function ispisProizvoda(nizProizvoda){
    let ispis="";
    for(let p of nizProizvoda){
        ispis+=`<div class="col-sm-5 col-12 col-md-3">
        <div class="card">
        <img src="${p.slika}" class="card-img-top" alt="${p.naziv}">
        <div class="card-body">
          <h4 class="card-title">${p.naziv}</h4>
          <h6>${p.artikal}</h6>
          <p>Model: ${p.model}</p>
          <p class="cenaAktuelna">$${p.cena.aktuelna}<sup>$${p.cena.stara}</sup></p>
          <button class="btnProizvodi"><a href="shop.html">Proizvodi</a></button>
        </div>
        </div>
      </div>`
    }
   $("#proizvodi").html(ispis);
}

function ajaxCallBack(url,method,result){
    $.ajax({
        url: url,
        method: method,
        dataType: "json",
        success: result,
        error: function(xhr){
            console.log(xhr);
        }
    })
}

ajaxCallBack("data/baneri.json","get",function(result){
    ispisBanera(result);
})

function ispisBanera(nizBanera){
    let ispis="";
    for(let p of nizBanera){
        ispis+=`<div class="col-12 col-sm-4 baner shadow p-3 mb-5 bg-body-tertiary rounded">
            <i class="${p.src}"></i>
            <h4>${p.opis}</h4>
        </div>`
    }
    $("#rowBn").html(ispis);
}

ajaxCallBack("data/brendoviLogo.json","get",function(result){
    ispisBrendova(result);
})

function ispisBrendova(nizBrednova){
    let ispis="";
    for(let p of nizBrednova){
        ispis+=`<div class="col-sm-5 col-md-4 col-12 mt-4 shadow p-3 mb-5 bg-body-tertiary rounded">
        <div class="card mx-auto" style="width: 12rem;">
        <img src="${p.src}" class="card-img-top" alt="${p.alt}">
      </div>
      </div>`
    }
    $("#brands").html(ispis);
}

function ispisSocialMedia(nizMedia){
    let ispis="";
    for(let p of nizMedia){
        ispis+=`<a href="${p.href}"><i class="${p.src} ${p.klasa}"></i></a>`
    }
    $("#socialFooter").html(ispis);
}

ajaxCallBack("data/social.json","get",function(result){
    ispisSocialMedia(result);
})

ajaxCallBack("data/menu.json","get",function(result){
    ispisNavigacijeFooter(result);
})

function ispisNavigacijeFooter(nizLinkova){
        let ispis="";
        for(let p of nizLinkova){
            ispis+=`<li><a href="${p.href}">${p.tekst}</a></li>`
        }
        $("#footerNav").html(ispis);
}

var proizvodi = dohvatiIzLocalStorage("proizvodi");

function ispisProizvodaShop(nizProizvoda){
    let ispis="";
        for(let p of nizProizvoda){
        ispis+=`<div class="col-5 col-md-5 col-12 data-id=${p.id}">
        <div class="card">
        <img src="${p.slika}" id="slika${p.id}" class="card-img-top" alt="${p.naziv}">
        <div class="card-body">
          <h4 class="card-title">${p.naziv}</h4>
          <h6 id="artikal${p.id}">${p.artikal}</h6>
          <p>Model: ${p.model}</p>
          <p>Zemlja porekla: ${p.zemljaPorekla}</p>
          <p class="cena">$${p.cena.aktuelna}<sup>$${p.cena.stara}</sup></p>
          <button id="btn${p.id}" class="dodaj btn">Dodaj u korpu</button>
          
            
        </div>
        </div>
      </div>`
    }
   $("#listaProizvoda").html(ispis);
   console.log(proizvodi);
}


ajaxCallBack("data/pocetnaProizvodi.json","get",function(result){
    ispisProizvodaShop(result);
})

var korpa = [];


function dodavanje(klik,idDugmeta,proizvod){
$(document).on(klik,idDugmeta,function(){
    korpa.push(proizvodi[proizvod]);
    dodajULocalStorage("korpa",korpa);
   
})

}

dodavanje("click","#btn1",0);
dodavanje("click","#btn2",1);
dodavanje("click","#btn3",2);
dodavanje("click","#btn4",3);
dodavanje("click","#btn5",4);
dodavanje("click","#btn6",5);
dodavanje("click","#btn7",6);
dodavanje("click","#btn8",7);
dodavanje("click","#btn9",8);
dodavanje("click","#btn10",9);
dodavanje("click","#btn11",10);
dodavanje("click","#btn12",11);
dodavanje("click","#btn13",12);
dodavanje("click","#btn14",13);
dodavanje("click","#btn15",14);
dodavanje("click","#btn16",15);
dodavanje("click","#btn17",16);
dodavanje("click","#btn18",17);
dodavanje("click","#btn19",18);
dodavanje("click","#btn20",19);
dodavanje("click","#btn9",20);

function ispisiRedoveTabele(){
    html="";
    var proizvodiIzKorpe = dohvatiIzLocalStorage("korpa");
   try{
    for(let p of proizvodiIzKorpe){
        html+=`
      
        <tr>
        <td class="col-3"><img src="${p.slika}"></td>
        <td class="col-3">${p.naziv}</td>
        <td class="col-3">$${p.cena.aktuelna}</td>
        </tr>
       `
    }
    $("#teloTabele").html(html);
   }catch{
        html+=`<h1>Korpa je prazna</h1>`
        $("#prazan").html(html);
   }
}

ispisiRedoveTabele();

$(document).on('click',"#posalji",function(){
    html="";
    html+=`<h1>Poslato</h1>`
    $("#poslat").html(html);
 })

$(document).on('click',"#brisanje",function(){
        html="";
        localStorage.clear();
        html+=`<h1>Korpa je prazna</h1>`
        $("#prazan").html(html);
     })


ajaxCallBack("data/brendovi.json","get",function(result){
    ispisBrendovaLista(result);
})

function filtriranjeProzivodaBrend(nizProizvoda){
    $(document).on("change","#listaBrendova",function(){
        let brend = $("#listaBrendova").val();
        let filtriraniPodaci = [];
        if(brend != 0){
        for(let p of nizProizvoda){
            if(brend == p.idBrenda){
                filtriraniPodaci.push(p);
            } 
           
        }
        ispisProizvodaShop(filtriraniPodaci);
    }else{

        ispisProizvodaShop(nizProizvoda);
    }
         
    })
    }

function ispisBrendovaLista(nizBrendova){
    let ispis=`<h4>Brend</h4>
    <select class="form-select" id="listaBrendova" aria-label="Default select example">
    <option value="0">Izaberite</option>`
    for(let p of nizBrendova){
        ispis+=`
        <option value="${p.id}">${p.alt}</option>
      `
    }
    ispis+=`</select>`;
    $("#modelCh").html(ispis);
}


function ispisPolRadio(nizPol){
    let ispis=`<h4>Pol</h4>`;
    for(let p of nizPol){
        ispis+=`<div class="form-check">
        <input class="form-check-input" type="radio" name="radioFilter" value="${p.id}" id="${p.oznaka}"/>
        <label class="form-check-label" for="flexRadioDefault1">
          ${p.opis}
        </label>
      </div>`
    }
    $("#polRadio").html(ispis);
}

ajaxCallBack("data/pol.json","get",function(result){
    ispisPolRadio(result);
})

function ispisSortiranjaLista(nizSortiranje){
    let ispis=`<h4>Sortiranje</h4>
    <select class="form-select" id="listaSortiranje" aria-label="Default select example">
    <option value="0">Izaberite</option>`
    for(let p of nizSortiranje){
        ispis+=`
        <option value="${p.id}">${p.opis}</option>
      `
    }
    ispis+=`</select>`;
    $("#sortiranje").html(ispis);
}

function ispisOblikaLista(nizOblika){
    let ispis=`<h4>Oblik</h4>
    <select class="form-select" id="listaOblika" aria-label="Default select example">
    <option value="0">Izaberite</option>`
    for(let p of nizOblika){
        ispis+=`
        <option value="${p.id}">${p.naziv}</option>
      `
    }
    ispis+=`</select>`;
    $("#oblikLista").html(ispis);
}

ajaxCallBack("data/oblik.json","get",function(result){
    ispisOblikaLista(result);
})

ajaxCallBack("data/sortiranje.json","get",function(result){
    ispisSortiranjaLista(result);
})

ajaxCallBack("data/pocetnaProizvodi.json","get",function(result){
    filtriranjeProzivodaBrend(result);
})


function filtriranjeProzivodaOblik(nizProizvoda){
$(document).on("change","#listaOblika",function(){
    let oblik = $("#listaOblika").val();
    let filtriraniPodaci = [];
    if(oblik != 0){
    for(let p of nizProizvoda){
        if(oblik == p.oblik){
            filtriraniPodaci.push(p);
        }
    }
    ispisProizvodaShop(filtriraniPodaci);
}
    else{
        ispisProizvodaShop(nizProizvoda);
    }
    
})
}


ajaxCallBack("data/pocetnaProizvodi.json","get",function(result){
    filtriranjeProzivodaOblik(result);
})


function sortiranjePoNazivu(nizProizvoda){
    $(document).on("change","#listaSortiranje",function(){
        let tip = $("#listaSortiranje").val();
        if(tip == "nazivAsc"){
            nizProizvoda.sort(function(a,b){
                if(a.naziv < b.naziv){
                    return -1;
                }
                else if(a.naziv > b.naziv){
                    return 1;
                }
                else{
                    return 0;
                }
            })
        }

        if(tip=="nazivDesc"){
            nizProizvoda.sort(function(a,b){
                if(a.naziv > b.naziv){
                    return -1;
                }
                else if(a.naziv < b.naziv){
                    return 1;
                }
                else{
                    return 0;
                }
            })
        }

        if(tip=="cenaAsc"){
            nizProizvoda.sort(function(a,b){
                return a.cena.aktuelna - b.cena.aktuelna;
            })
        }

        if(tip=="cenaDesc"){
            nizProizvoda.sort(function(a,b){
                return b.cena.aktuelna - a.cena.aktuelna; 
                       })
        }
        ispisProizvodaShop(nizProizvoda);
        
    })

    
}

ajaxCallBack("data/pocetnaProizvodi.json","get",function(result){
    sortiranjePoNazivu(result);
})

function dodajULocalStorage(naziv,vrednost){
   localStorage.setItem(naziv,JSON.stringify(vrednost));
}


function dohvatiIzLocalStorage(name){
    return JSON.parse(localStorage.getItem(name));
}


function filtriranjePol(nizProizvoda){
    $(document).on("click","#M",function(){
       let cekirano = document.getElementById("M");
       let brend = $("#M").val();
       let filtriraniPodaci = [];
       if(cekirano.checked){
       for(let p of nizProizvoda){
       if(brend == p.polId){
           filtriraniPodaci.push(p);
           ispisProizvodaShop(filtriraniPodaci);
   }
}
       }else{
           if(!cekirano.checked){
               ispisProizvodaShop(nizProizvoda);
           }
       }

    });
   
}

ajaxCallBack("data/pocetnaProizvodi.json","get",function(result){
    filtriranjePol(result);
})

function filtriranjePolZ(nizProizvoda){
    $(document).on("click","#Z",function(){
       let cekirano = document.getElementById("Z");
       let brend = $("#Z").val();
       let filtriraniPodaci = [];
       if(cekirano.checked){
       for(let p of nizProizvoda){
       if(brend == p.polId){
           filtriraniPodaci.push(p);
           ispisProizvodaShop(filtriraniPodaci);
   }
}
       }else{
           if(!cekirano.checked){
               ispisProizvodaShop(nizProizvoda);
           }
       }

    });
   
}

ajaxCallBack("data/pocetnaProizvodi.json","get",function(result){
    filtriranjePolZ(result);
})

ajaxCallBack("data/pocetnaProizvodi.json","get",function(result){
    dodajULocalStorage("proizvodi",result);
})

//Validacija forme

let imeInput = document.getElementById("fName");
let prezimeInput = document.getElementById("lName");
let emailInput = document.getElementById("email");
let sendButton = document.getElementById("send");
let radioButton = document.getElementsByName("radioBtn");
let cekirano = false;
let radioTekst = document.getElementById("radio");
let porukaElement = document.getElementById('porukaCheck');
function provera(){

  const ime = imeInput.value.trim();
  // Regularni izraz za proveru ispravnosti imena (slova, razmaci, i druge dozvoljene znakove)
  const regexIme = /^[A-ZŠĐŽĆČ][a-zšđžćč]+$/;

  if (!regexIme.test(ime)) {
    document.getElementById("fName").classList.add("red")
    document.getElementById("imeSpan").innerHTML ='Pogrešno ime. Molimo unesite ispravno ime. Ime mora početi velikim slovom';
  } else {
    document.getElementById("fName").classList.remove("red");
    document.getElementById("fName").classList.add("green")
    document.getElementById("imeSpan").innerHTML = ""

}

  const prezime = prezimeInput.value.trim();
  // Regularni izraz za proveru ispravnosti prezimena (slova, razmaci, i druge dozvoljene znakove)
  const regexPrezime = /^[A-ZŠĐŽĆČ][a-zšđžćč]+(\s[A-ZŠĐŽĆČ][a-zšđžćč]+)*$/;

  if (!regexPrezime.test(prezime)) {
    document.getElementById("lName").classList.add("red")
    document.getElementById("prezimeSpan").innerHTML ='Pogrešno prezime. Molimo unesite ispravno prezime. Prezime mora početi velikim slovom';
  } else {
    document.getElementById("lName").classList.remove("red");
    document.getElementById("lName").classList.add("green")
    document.getElementById("prezimeSpan").innerHTML = ""


}

var cekiran = false;
    for (var i = 0; i < radioButton.length; i++) {
      if (radioButton[i].checked) {
        cekiran = true;
        break;
      }
    }
if (cekiran) {
  // Ako je bilo koji radio button čekiran, obriši poruku
  radioTekst.innerHTML ="";
} else {
  // Ako nijedan radio button nije čekiran, prikaži poruku
  radioTekst.innerHTML = 'Molimo vas da izaberete jednu od opcija.';
}


  const email = emailInput.value.trim();
  // Regularni izraz za proveru ispravnosti  (slova, razmaci, i druge dozvoljene znakove)
  let regexEmail = /^[a-z]+([\.]?[a-z]*[0-9]*)*@[a-z]+([\.]?[a-z]+)+(\.[a-z]{2,4})+$/;

  if (!regexEmail.test(email)) {
    document.getElementById("email").classList.add("red")
    document.getElementById("emailSpan").innerHTML ='Pogrešan mail. Molimo unesite ispravan email. email mora početi malim slovom';
  } else {
    document.getElementById("email").classList.remove("red");
    document.getElementById("email").classList.add("green");
    document.getElementById("emailSpan").innerHTML = ""
  
}


var tekstArea = document.getElementById("tekstArea");
var tekstAreaObavestenje = document.getElementById("porukaText");
if (tekstArea.value.trim() === '') {
    tekstAreaObavestenje.innerHTML = "Molimo vas unesti neki tekst u polje za poruku"
} else {
    tekstAreaObavestenje.innerHTML="";
}

}

$(window).scroll(function(){
    let top = $(this)[0].scrollY;
    if(top>300){
      $("#backToTop").show();
    }else{
      $("#backToTop").hide();
    }
  })

  $("#backToTop").click(function(){
    $("html").animate({
      scrollTop: 0
    }, 0)
  })

  