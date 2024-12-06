const openButtons = document.querySelectorAll('.open-modal');
openButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "block"; // Exibe o modal
            modal.showModal();
        }
    });
});

const closeButtons = document.querySelectorAll('.close-modal');
closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none"; // Oculta o modal
            modal.close();
        }
    });
});



let caminhoEscolhido = null;

// Evento de clique nos botões de caminho
const caminhoButtons = document.querySelectorAll('.open-modal');
caminhoButtons.forEach((button) => {
    button.addEventListener('click', () => {
        caminhoEscolhido = button.getAttribute('data-item').replace('modal', '').toLowerCase(); // Exemplo: "fauna"
    });
});



const entrar = document.querySelector('#entrar');
entrar.addEventListener('click', async (event) => {
    event.preventDefault();
    let usuario = document.querySelector('#usuario').value
    console.log(usuario)
    let senha = document.querySelector('#password').value
    console.log(senha)
    if (usuario != '' && senha != '') {
        let resposta = await fetch(`http://localhost:3000/login/${usuario}/${senha}`)
        if (resposta.status == 200) {
            alert('Bem vindo!')
            if(caminhoEscolhido == '1')
                window.location.replace("../html/postagemflora.html")
            else if(caminhoEscolhido == '2')
                window.location.replace("../html/postagemfauna.html")
            else if(caminhoEscolhido == '3')
                window.location.replace("../html/postagemhidrografia.html")
        }
        else {
            alert('Usuário ou senha incorretos')
        }
    }
    else {
        alert('Preencha todos os campos')
    }
});