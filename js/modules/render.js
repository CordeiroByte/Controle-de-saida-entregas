import { formatarMes } from "./utils.js";

export function renderizarTudo(container, registros, removerRegistro) {
    container.innerHTML = "";

    const grupos = {};

    registros.forEach(reg => {
        const mes = reg.Data.slice(0, 7);

        if (!grupos[mes]) {
            grupos[mes] = [];
        }

        grupos[mes].push(reg);
    });

    for (const mes in grupos) {
        const card = document.createElement("div");
        card.classList.add("card");

        const titulo = document.createElement("h3");
        titulo.textContent = formatarMes(mes);

        card.appendChild(titulo);

        grupos[mes].forEach(reg => {
            const item = document.createElement("div");

            item.innerHTML = `
                <strong>${reg.Cliente}</strong><br>
                📅 ${reg.Data}<br>
                ⏰ ${reg.Saida} - ${reg.Retorno}<br>
                <button data-id="${reg.id}">🗑️</button>
                <hr>
            `;

            card.appendChild(item);
        });

        container.appendChild(card);
    }

    container.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
            removerRegistro(Number(btn.dataset.id));
        });
    });
}