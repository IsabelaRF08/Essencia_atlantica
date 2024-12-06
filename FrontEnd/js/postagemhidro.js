document.querySelector('#subForm').addEventListener('click', async() => {
    
    const oque = document.querySelector('#oque').value;
    const importancia = document.querySelector('#importancia').value;
    const rios = document.querySelector('#rios').value;
    const problemas = document.querySelector('#problemas').value;
    const res = await fetch ('http://localhost:3000/hidrografia/novo', {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Adiciona o cabeçalho correto
        },
        body: JSON.stringify({
            oque: oque,
            importancia: importancia,
            rios: rios,
            problemas: problemas
        })
    });

    if (res.status == 200) {
        alert('Postagem com sucesso')
    }
    else if (res.status == 500) {
        alert('Ops...houve um erro ao compartilhar sua pesquisa!')
    }
    else if (res.status == 409) {
        alert('Árvore já cadastrada')
    }
});