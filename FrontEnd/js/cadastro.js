document.querySelector('#cadastrar').addEventListener('click', async function(event){
    event.preventDefault(); // Impede o envio do formulário
    const msgError = document.querySelector('#msgErro');
    const senha = document.querySelector('#senha').value;
    const conf_senha = document.querySelector('#conf_senha').value;
    
    if(senha != conf_senha){
        msgError.textContent = "As senhas devem ser iguais"
    }        
    else
    {
        msgError.textContent = ""
        const email = document.querySelector('#email').value;
        const nome = document.querySelector('#nome').value;

        const res = await fetch('http://localhost:3000/cadastro/novo',{
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Adiciona o cabeçalho correto
            },
            body: JSON.stringify({
                email: email,
                senha: senha,
                nome_usuario: nome
            })
        });
       console.log('to aqui');
        if(res.status == 200){
            alert('Cadastrado com sucesso')
            window.location.href = "../html/homePage.html"
        }
        else if(res.status == 500){
            alert('Ops...houve um erro ao cadastrar')
        }
        else  if(res.status == 400){
            alert('Senha deve ter 8 caracteres!')
        }
        else  if(res.status == 409){
            alert('Email ja cadastrado')
        }
    }
});