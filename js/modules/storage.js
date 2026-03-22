export function salvar(registros) {
    localStorage.setItem("registros", JSON.stringify(registros));
}

export function carregar() {
    return JSON.parse(localStorage.getItem("registros")) || [];
}