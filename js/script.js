import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
const camposDoFormulario = document.querySelectorAll("[required]"); // seleciona todos os campos que tem required
const formulario = document.querySelector("[data-formulario]"); // seleciona todo formulário com o date-atribute

formulario.addEventListener('submit', (e) => { // no evento (submit) do formulário
    e.preventDefault(); // bloqueia o evento padrão do submit (que é o reloaded)

    // Navega entre os elementos do formulário, pega o alvo e o valor de cada elemento.
    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }
    
    //Selecionou o localStorage, inseriu um item dentro(setItem) que tem como nome de chave "cadastro" e usou o JSONstringify para converter este objeto (listaRespostas) em Json.
    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

    //Faz o redirecionamento para a última etapa do formulálirio ('./abrir-conta-form-2.html')
    window.location.href = './abrir-conta-form-2.html';

})


camposDoFormulario.forEach((campo) => { //Para cada campo do formulário (campo foi o nome escolho para parâmetro)
    
    // no evento "blur" (click fora do campo) chama a função
    campo.addEventListener("blur", () => verificaCampo(campo)); 
    campo.addEventListener("invalid", evento => evento.preventDefault()); // bloqueia os erros p costomizar
})


// Valida se campo é cpf e se tamanho é maior ou igual a 11 digitos
function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity(''); // limpa a mensagem de erro do campo cpf depois que for corrigido pelo usuário
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }

    //Para cada erro presente na variável executa a função arrow que olha o campo.validity e ver se está true (com erro)
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            //variável mensagem recebe mensagens onde consta as mensagens de erro
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })

    // 1. const mensagemErro pegou o span que estána classe mensagem-erro, porém pegou só o span que fosse próximo.do input especifico usando (parentNode)
     //2. a variável validadorDeInput pega o campo e executa checkValidity p ver se está válido ou não.

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    //3. se o campo não estiver válido, imprime a mensagem de erro que está variável (mensagem), caso contrário emprime nada.
    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }


}

// Dentro de um array, Lista com os tipos de erro mais comuns
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

// Dentro de um array, Lista com as mensagens costomizadas escolhidas para os erros mais comuns.
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um email válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}
