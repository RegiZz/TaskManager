const fs = require('fs')
const path = require('path')


let zadania = []
const filePath = path.join(__dirname, '..', 'zadania.json');

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

function wczytajZadania() {
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Błąd podczas odczytu pliku:', err)
            } else {
                try {
                    zadania = JSON.parse(data)
                } catch (e) {
                    console.error('Błąd podczas parsowania JSON:', e)
                    zadania = []
                }
                console.log('Dane zostały wczytane z pliku zadania.json')
            }
        });
    } else {
        console.log('Plik zadania.json nie istnieje. Inicjalizuję pustą tablicę.')
    }
}


function dodajZadanie(id, opis, czyUkonczone){
    const istnieje = zadania.some(zadanie => zadanie.id === id);
    
    if (istnieje) {
        console.log(`Zadanie o id ${id} już istnieje.`);
        return;
    }
    zadania.push({id,opis,czyUkonczone})
    zapiszDoPliku()
}

function ukonczZadanie(id){
    for (let i = 0; i < zadania.length; i++) {
        if (zadania[i].id === id) {
            zadania[i].czyUkonczone = true
            zapiszDoPliku()
        }
    }
}

async function wypiszZadania(){
    wczytajZadania()
    await sleep(2000);
    console.log(zadania)
}

function zapiszDoPliku(){
    
    fs.writeFile(filePath , JSON.stringify(zadania, null, 2), (err) => {
        if (err) {
            console.error('Błąd podczas zapisywania do pliku:', err)
        } else {
            console.log('Dane zostały zapisane do pliku zadania.json')
        }
    });
}

module.exports = { dodajZadanie, wypiszZadania, ukonczZadanie};
