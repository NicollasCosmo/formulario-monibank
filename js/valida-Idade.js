export default function ehMaiorDeIdade(campo) {
    const dataNascimento = new Date(campo.value); // converte campo de dt de nasc de maneira que o js entenda
    if (!validaIdade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade');
    }
}

function validaIdade(data) {
    const dataAtual = new Date(); // Pega a data atual

    // Pega das informações inseridas pelo usuário e acrescenta 18 anos a mais ao ano de nascimento, para saber quando o usuário completou 18 anos. (ex: nasceu em 02/09/1980 + 18 = 02/09/1998, então é maior de 18 anos)
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());
    
    // Retorna true ou false se a data atual se encontra após o usuário completar 18 anos
    return dataAtual >= dataMais18; 
}