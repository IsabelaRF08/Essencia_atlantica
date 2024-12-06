document.querySelector('#subForm').addEventListener('click', async() => {
    
    const Nome = document.querySelector('#Nome').value;
    const Especie = document.querySelector('#Especie').value;
    const habitat = document.querySelector('#habitat').value;
    const tamanho = document.querySelector('#tamanho').value;
    const grupo = document.querySelector('#grupo').value;
    const res = await fetch ('http://localhost:3000/flora/novo', {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Adiciona o cabeçalho correto
        },
        body: JSON.stringify({
            nome: Nome,
            especie: Especie,
            habitat: habitat,
            tamanho: tamanho,
            grupo: grupo
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