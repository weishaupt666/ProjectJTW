document.addEventListener("DOMContentLoaded", function() {

    // --- ЛОГИКА ДЛЯ ГЛАВНОЙ СТРАНИЦЫ (index.html) ---
    // Ищем список на главной. Если нашли — значит мы на Главной.
    const listaNaGlownej = document.getElementById("podgladZadan");

    if (listaNaGlownej) {
        // Достаем "переменную" из памяти браузера
        const zapisaneZadania = JSON.parse(localStorage.getItem("mojeZadania")) || [];

        if (zapisaneZadania.length === 0) {
            listaNaGlownej.innerHTML = "<li>Brak zadań.</li>";
        } else {
            // Рисуем каждое задание
            zapisaneZadania.forEach(zadanie => {
                const li = document.createElement("li");
                li.textContent = "• " + zadanie;
                listaNaGlownej.appendChild(li);
            });
        }
    }


    // --- ЛОГИКА ДЛЯ СТРАНИЦЫ ЗАДАЧ (zadania.html) ---
    const formularz = document.getElementById("formularzZadania");

    if (formularz) {
        const listaZadan = document.getElementById("listaZadan");
        
        // При загрузке страницы сразу показываем сохраненное
        wczytajZadania();

        formularz.addEventListener("submit", function(e) {
            e.preventDefault();
            const pole = document.getElementById("noweZadanie");
            
            if (pole.value.trim() === "") return;

            // 1. Добавляем визуально
            dodajZadanieDoHTML(pole.value);
            // 2. Сохраняем в память браузера
            zapiszDoPamieci(pole.value);

            pole.value = "";
        });

        function dodajZadanieDoHTML(tekstZadania) {
            const art = document.createElement("article");
            art.classList.add("karta-zadania"); // Твой класс из CSS
            
            art.innerHTML = `
                <p>${tekstZadania}</p>
                <button class="btn-usun">Usuń</button>
            `;

            // Логика кнопки удаления
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


    // --- ЛОГИКА КОНТАКТОВ (kontakt.html) ---
    const formKontakt = document.getElementById("formularzKontaktowy");
    if (formKontakt) {
        formKontakt.addEventListener("submit", function(e) {
            e.preventDefault();
            document.getElementById("komunikatKontakt").textContent = "Wysłano!";
        });
    }

    // --- КНОПКА ПЕРЕХОДА ---
    window.przejdzDoZadan = function() {
        window.location.href = "zadania.html";
    };
});
