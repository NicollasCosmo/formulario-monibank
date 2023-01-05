// Função retira os caracteres especiais do cpf (.- ponto e hífem) isso facilita a validação
export default function ehUmCPF(campo) {
    const cpf = campo.value.replace(/\.|-/g, ""); // replace(/\.|-/g, "") substitui tirando os caracteres especiais
    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
        campo.setCustomValidity('Esse cpf não é válido') //setar uma mensagem de erro personalizada alterando o valor de customError, forçando qualquer coisa que não seja (false)
    }
}


// Função que verifica se foi digitado números repetidos
function validaNumerosRepetidos(cpf) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    //Passa por toda lista verificando se true ou false para cpf`s repetidos
    return numerosRepetidos.includes(cpf)
}


// Função que valida o primeiro digito identificador do cpf
function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    for (let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    return soma != cpf[9];
}


// Função que valida o segundo digito identificador do cpf
function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    return soma != cpf[10];
}