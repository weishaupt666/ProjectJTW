function przejdzDoZadan() {
    window.location.href = "zadania.html";
}

const formularz = document.getElementById("formularzZadania");

if (formularz) {
    const listaZadan = document.getElementById("listaZadan");

    document.addEventListener("DOMContentLoaded", wczytajZadania);

    formularz.addEventListener("submit", function(e) {
        e.preventDefault();

        const pole = document.getElementById("noweZadanie");
        const komunikat = document.getElementById("komunikatBledu");

        if (pole.value.trim() === "") {
            komunikat.textContent = "Pole nie może być puste!";
            return;
        }

        komunikat.textContent = "";

        dodajZadanie(pole.value);
        zapiszDoLocalStorage(pole.value);

        pole.value = "";
    });

    function dodajZadanie(tresc) {
        const karta = document.createElement("article");
        karta.classList.add("karta-zadania");

        const tekst = document.createElement("p");
        tekst.textContent = tresc;

        tekst.addEventListener("click", function() {
            tekst.classList.toggle("ukonczone");
        });

        const przyciskUsun = document.createElement("button");
        przyciskUsun.textContent = "Usuń";

        przyciskUsun.addEventListener("click", function() {
            karta.remove();
            usunZLocalStorage(tresc);
        });

        karta.appendChild(tekst);
        karta.appendChild(przyciskUsun);
        listaZadan.appendChild(karta);
    }

    function zapiszDoLocalStorage(zadanie) {
        let zadania = JSON.parse(localStorage.getItem("zadania")) || [];
        zadania.push(zadanie);
        localStorage.setItem("zadania", JSON.stringify(zadania));
    }

    function usunZLocalStorage(zadanie) {
        let zadania = JSON.parse(localStorage.getItem("zadania")) || [];
        zadania = zadania.filter(z => z !== zadanie);
        localStorage.setItem("zadania", JSON.stringify(zadania));
    }

    function wczytajZadania() {
        let zadania = JSON.parse(localStorage.getItem("zadania")) || [];
        zadania.forEach(z => dodajZadanie(z));
    }
}


const formularzKontakt = document.getElementById("formularzKontaktowy");

if (formularzKontakt) {
    formularzKontakt.addEventListener("submit", function(e) {
        e.preventDefault();

        const imie = document.getElementById("imie").value;
        const email = document.getElementById("email").value;
        const wiadomosc = document.getElementById("wiadomosc").value;
        const komunikat = document.getElementById("komunikatKontakt");

        if (!imie || !email || !wiadomosc) {
            komunikat.textContent = "Wszystkie pola są wymagane!";
            komunikat.style.color = "red";
            return;
        }

        komunikat.textContent = "Wiadomość została wysłana!";
        komunikat.style.color = "green";
    });
}
