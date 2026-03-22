import { renderizarTudo } from "./modules/render.js";
import { salvar, carregar } from "./modules/storage.js";
import { formatarDataExcel, formatarHoraExcel } from "./modules/utils.js";

const container = document.querySelector(".container");

let registros = carregar();

window.addEventListener("load", () => {

    fetch("./dados.json") // ⚠️ ajuste se necessário
        .then(resp => resp.json())
        .then(dados => {

            dados.forEach(d => {

                // 🔍 DEBUG (pode remover depois)
                console.log("Linha do JSON:", d);

                const novoRegistro = {
                    id: Date.now() + Math.random(),

                    // 📅 DATA (seguro)
                    data: formatarDataExcel(d["Data"] || d["data"] || ""),

                    // 👤 CLIENTE (blindado)
                    cliente: 
                        d["Cliente"] || 
                        d["cliente"] || 
                        d["Cliente/Lugar"] || 
                        "Não informado",

                    // ⏰ HORÁRIOS (blindado)
                    saida: formatarHoraExcel(d["Saída"] || d["saida"] || ""),
                    retorno: formatarHoraExcel(d["Retorno"] || d["retorno"] || "")
                };

                // 🚫 evita registros vazios
                if (!novoRegistro.data && !novoRegistro.cliente) {
                    return;
                }

                registros.push(novoRegistro);
            });

            console.log("Registros finais:", registros); // 🔥 debug final

            salvar(registros);
            renderizarTudo(container, registros, removerRegistro);
        })
        .catch(err => {
            console.error("Erro ao carregar JSON:", err);
        });
});

// 🗑️ remover registro
function removerRegistro(id) {
    registros = registros.filter(r => r.id !== id);
    salvar(registros);
    renderizarTudo(container, registros, removerRegistro);
}