const task = require("/modules/task")
const user = require("/modules/user")

var imie = user.imie
var mail = user.mail

console.log("Witaj " + imie + " twoj mail to: "+ mail);

var coRobic = prompt("Co chcesz zrobic? (dodaj, ukoncz, wyswietl): ")

switch(coRobic){
    case "dodaj":
        var id = prompt("podaj id zadania: ")
        var opis = prompt("podaj opis zadania: ")
        task.dodajZadanie(id,opis,false);
        break;
    case "ukoncz":
        var id = prompt("podaj id zadania: ")
        task.ukonczZadanie(id)
        break;
    case "wyswietl":
        task.wypiszZadania()
        break;
}