document.addEventListener("DOMContentLoaded", function() {

    const listaNaGlownej = document.getElementById("podgladZadan");

    if (listaNaGlownej) {
        const zapisaneZadania = JSON.parse(localStorage.getItem("mojeZadania")) || [];

        if (zapisaneZadania.length === 0) {
            listaNaGlownej.innerHTML = "<li>Brak zadań.</li>";
        } else {
            zapisaneZadania.forEach(zadanie => {
                const li = document.createElement("li");
                li.textContent = "• " + zadanie;
                listaNaGlownej.appendChild(li);
            });
        }
    }


    const formularz = document.getElementById("formularzZadania");

    if (formularz) {
        const listaZadan = document.getElementById("listaZadan");
        
        wczytajZadania();

        formularz.addEventListener("submit", function(e) {
            e.preventDefault();
            const pole = document.getElementById("noweZadanie");
            
            if (pole.value.trim() === "") return;

            dodajZadanieDoHTML(pole.value);
            zapiszDoPamieci(pole.value);

            pole.value = "";
        });

        function dodajZadanieDoHTML(tekstZadania) {
            const art = document.createElement("article");
            art.classList.add("karta-zadania");
            
            art.innerHTML = `
                <p>${tekstZadania}</p>
                <button class="btn-usun">Usuń</button>
            `;

            art.querySelector(".btn-usun").addEventListener("click", function() {
                art.remove();
                usunZPamieci(tekstZadania);
            });

            listaZadan.appendChild(art);
        }

        function zapiszDoPamieci(noweZadanie) {
            let zadania = JSON.parse(localStorage.getItem("mojeZadania")) || [];
            zadania.push(noweZadanie);
            localStorage.setItem("mojeZadania", JSON.stringify(zadania));
        }

        function usunZPamieci(zadanieDoUsuniecia) {
            let zadania = JSON.parse(localStorage.getItem("mojeZadania")) || [];
            zadania = zadania.filter(z => z !== zadanieDoUsuniecia);
            localStorage.setItem("mojeZadania", JSON.stringify(zadania));
        }

        function wczytajZadania() {
            let zadania = JSON.parse(localStorage.getItem("mojeZadania")) || [];
            zadania.forEach(z => dodajZadanieDoHTML(z));
        }
    }


    const formKontakt = document.getElementById("formularzKontaktowy");
    if (formKontakt) {
        formKontakt.addEventListener("submit", function(e) {
            e.preventDefault();
            document.getElementById("komunikatKontakt").textContent = "Wysłano!";
        });
    }
    
    window.przejdzDoZadan = function() {
        window.location.href = "zadania.html";
    };
});
