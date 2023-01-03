import ehUmCPF from "./valida-cpf.js";
const camposDoFormulario = document.querySelectorAll("[required]");

camposDoFormulario.forEach((campo) => { //Para cada campo do formulário (campo foi o nome escolho para parâmetro)
    campo.addEventListener("blur", () => verificaCampo(campo)); // no evento "blur" (click fora do campo) chama a função
})


// Valida se campo é cpf e se tamanho é maior ou igual a 11 digitos
function verificaCampo(campo) {
    if (campo.name == "cpf" && campo.value.length >= 11) { 
        ehUmCPF(campo);
    }
}