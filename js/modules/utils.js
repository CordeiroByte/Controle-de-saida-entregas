export function formatarMes(mes) {
    const [ano, numeroMes] = mes.split("-");

    const nomes = [
        "Janeiro", "Fevereiro", "Março", "Abril",
        "Maio", "Junho", "Julho", "Agosto",
        "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    return `${nomes[Number(numeroMes) - 1]} / ${ano}`;
}

export function formatarDataExcel(valor) {
    const str = valor.toString();

    const dia = str.slice(0, 2);
    const mes = str.slice(2, 4);
    const ano = str.slice(4);

    return `${ano}-${mes}-${dia}`;
}

export function formatarHoraExcel(valor) {
    const str = valor.toString().padStart(4, "0");

    const hora = str.slice(0, 2);
    const min = str.slice(2, 4);

    return `${hora}:${min}`;
}