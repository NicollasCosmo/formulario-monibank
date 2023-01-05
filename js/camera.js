// Seleção de várioselementos da página (abrir-conta-form-2)
const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]")

let imagemURL = ''; // Esta variável inicia vazia

// No click do botão iniciarCamera executa a função 
botaoIniciarCamera.addEventListener('click', async function () { // Função assincrona (async - await)
    const iniciarVideo = await navigator.mediaDevices //Pede para o navegador iniciar a câmera. 
        .getUserMedia({ video: true, audio: false }); // O uso da midia será apenas o video. (video: true)

    botaoIniciarCamera.style.display = "none"; // bloqueia o display do botaoIniciarCamera p ele sumir da tela.
    campoCamera.style.display = "block"; // Display block na camera em si, para que ela apareça na tela.

    // iniciarVideo recebe o navigator (que é o acesso a câmera)
    video.srcObject = iniciarVideo;
});

// No click do botão TirarFoto executa a função
botaoTirarFoto.addEventListener('click', function () {

    //A const canvas criará um canvas e que receberá o método getContext().drawImage(), onde getContext recolhe o contexto e drawImage recolhe e desenha a imagem da câmera no momento do clique. Dentro dos parênteses de getContext() é adcionado o contexto 2d, e dentro dos parênteses de drawImage() são adcionados os elementos (video) que representa a imagem da câmera, os parâmetros de sua posição: (0, 0,) e os parâmetros canvas.width e canvas.height que recolhem a largura e o tamanho do canvas, respectivamente em um tamanho padrão.
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Transforma a imagem gerada no canvas em uma URL o que possibilitará salvá-la posteriormente.
    imagemURL = canvas.toDataURL('image/jpeg'); 

    campoCamera.style.display = "none"; // Para que este campo desapareça assim que a foto for tirada.
    mensagem.style.display = "block"; // Permite que o check e a mensagem para o usuário apareçam na tela.
});

// No click do botão EnviarFoto executa a função
botaoEnviarFoto.addEventListener('click', () => {

    // Retornado o item que possui a chave "cadastro" no localStorage e guarda em receberDadosExistentes
    const receberDadosExistentes = localStorage.getItem("cadastro");
    const converteRetorno = JSON.parse(receberDadosExistentes); // Converte o retorno em objeto através do JSON.parse

    converteRetorno.imagem = imagemURL; //Cria o atributo imagem dentro de converteRetorno que recebe a URL da foto.

    //Efetua a atualização dos dados no localStorage, que agora recebe a imagem convertida em JSON com stringify
    localStorage.setItem('cadastro', JSON.stringify(converteRetorno))
    
    // Faz o redirecionamento para a página de confirmação de cadastro (abrir-conta-form-3.html).
    window.location.href = '../pages/abrir-conta-form-3.html';
})