//Creation d'un objet pour le menu roue
class elementMenu {
    constructor(name, url,state, position) {
        this.name = name;
        this.url = url;
        this.state = state;
        this.position = position;

        this.update();
    }

    update() {
        if (this.state) {
            this.name = this.name + ' <span class="new">NEW</span>';
        }
    }
}

//Creation d'un tableau pour le menu roue
var menu = [
    new elementMenu("Nos Burgers", "burger.html",false, 1.0),
    new elementMenu("Nos Salades", "salade.html",false, 0.0),
    new elementMenu("Nos Desserts", "dessert.html",false, 4.0),
    new elementMenu("Nos Boissons", "boisson.html",false, 3.0),
    new elementMenu("A Propos", "apropos.html",true, 5.0),
    new elementMenu("Contact", "contact.html",false, 2.0)
];

function updateBeforeStyles(selector, newStyles) {
    const style = document.createElement('style');
    style.innerHTML = `${selector}::before { ${newStyles} }`;
    document.head.appendChild(style);
}

// trier le tanleau menu en fonction de l'attribut position
menu.sort(function (a, b) {
    return a.position - b.position;
});
console.log(menu);

//get the before element of side_menu_items class
var side_menu_items = document.querySelector(".side_menu_items");
//get the &:before element of side_menu_items class
var side_menu_items_before = window.getComputedStyle(side_menu_items, ':before');
//get pad class
//var pad = document.querySelector(".pad");

var last_position = 0;
//scroll event listenner to change the wheel order/*
/*window.addEventListener("scroll", function () {
    console.log(window.scrollY);
    //change the height of the side_menu_items_before element
    // modify pad element height
   // pad.style.height = window.scrollY + 'px';
    side_menu_items.style.height = window.scrollY + 'px';
    //updateBeforeStyles('.side_menu_items', 'height: '+this.window.scrollY+'px; background-color: red;');
    /*if (window.scrollY > 100) {
        menu.reverse();
        console.log(menu);
        //side_menu_items.innerHTML = "";
        //for (var i = 0; i < menu.length; i++) {
        //    side_menu_items.innerHTML += '<a href="' + menu[i].url + '" class="item" data-index="' + i + '">' + menu[i].name + '</a>';
        //}
    }*/
//});

//affichage du menu roue dans la classe side_menu_items
/*
var side_menu_items = document.querySelector(".side_menu_items");
for (var i = 0; i < menu.length; i++) {
    side_menu_items.innerHTML += '<a href="' + menu[i].url + '" class="item" data-index="' + i + '">' + menu[i].name + '</a>';
}
*/
