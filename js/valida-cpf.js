// Função retira os caracteres especiais do cpf (.- ponto e hífem) isso facilita a validação
export default function ehUmCPF(campo) {
    const cpf = campo.value.replace(/\.|-/g, ""); // replace(/\.|-/g, "") substitui tirando os caracteres especiais
    validaNumerosRepetidos(cpf)
    console.log(validaNumerosRepetidos(cpf));
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