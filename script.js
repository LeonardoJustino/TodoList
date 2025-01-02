let buttonAdd = document.getElementById('buttonAdd'); // Obtém o botão "Adicionar" pelo ID.
let listContainer = document.getElementById('listContainer'); // Obtém o contêiner da lista pelo ID.
let input = document.querySelector('input'); // Seleciona o campo de entrada de texto.

// Adiciona um evento que é executado quando a página carrega.
window.addEventListener('load', () => {
    let savedItems = JSON.parse(localStorage.getItem('listItems')) || []; // Obtém os itens salvos no localStorage ou inicializa como um array vazio.
    savedItems.forEach(item => { // Itera sobre os itens salvos no localStorage.
        let list = document.createElement('li'); // Cria um elemento de lista (li).
        let check = document.createElement('input'); // Cria um input do tipo checkbox.
        let lixeira = document.createElement('img'); // Cria um elemento de imagem.
        let textSpan = document.createElement('span'); // Cria um span para o texto.

        lixeira.src = 'img/x-lg.svg'; // Define a imagem da lixeira.
        check.type = 'checkbox'; // Define o tipo do input como checkbox.
        check.classList.add('inputCheck'); // Adiciona a classe 'inputCheck' ao checkbox.
        lixeira.classList.add('lixeiraStyle'); // Adiciona a classe 'lixeiraStyle' à lixeira.
        textSpan.classList.add('textStyle'); // Adiciona a classe 'textStyle' ao span do texto.
        check.checked = item.checked; // Define o estado marcado ou desmarcado do checkbox com base nos dados salvos.
        textSpan.textContent = item.text; // Define o texto do span com base nos dados salvos.

        list.append(check, textSpan, lixeira); // Adiciona o checkbox, o texto e a lixeira ao elemento de lista.
        listContainer.append(list); // Adiciona o item de lista ao contêiner da lista.

        lixeira.addEventListener('click', () => { // Adiciona um evento de clique na lixeira.
            list.remove(); // Remove o item da lista.
            saveToLocalStorage(); // Atualiza o localStorage.
        });

        check.addEventListener('change', saveToLocalStorage); // Atualiza o localStorage quando o checkbox é marcado ou desmarcado.
    });
});

// Função que salva os itens no localStorage.
function saveToLocalStorage() {
    let items = []; // Inicializa um array vazio para armazenar os itens.
    document.querySelectorAll('#listContainer li').forEach(item => { // Seleciona todos os itens da lista.
        let text = item.querySelector('span.textStyle').textContent.trim(); // Obtém o texto do item (removendo espaços em branco).
        let checked = item.querySelector('input[type="checkbox"]').checked; // Obtém o estado do checkbox (marcado ou desmarcado).
        items.push({ text, checked }); // Adiciona o texto e o estado do checkbox ao array.
    });
    localStorage.setItem('listItems', JSON.stringify(items)); // Salva o array no localStorage em formato JSON.
}

// Adiciona um evento de clique ao botão "Adicionar".
buttonAdd.addEventListener('click', (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário (se existir).
    if (!input.value.trim()) { // Verifica se o campo de entrada está vazio ou apenas com espaços.
        alert("Por favor, insira um item válido."); // Mostra um alerta se o campo estiver inválido.
    } else {
        let list = document.createElement('li'); // Cria um elemento de lista (li).
        let check = document.createElement('input'); // Cria um input do tipo checkbox.
        let lixeira = document.createElement('img'); // Cria um elemento de imagem.
        let textSpan = document.createElement('span'); // Cria um span para o texto.

        lixeira.src = 'img/x-lg.svg'; // Define a imagem da lixeira.
        check.type = 'checkbox'; // Define o tipo do input como checkbox.
        check.classList.add('inputCheck'); // Adiciona a classe 'inputCheck' ao checkbox.
        lixeira.classList.add('lixeiraStyle'); // Adiciona a classe 'lixeiraStyle' à lixeira.
        textSpan.classList.add('textStyle'); // Adiciona a classe 'textStyle' ao span do texto.
        textSpan.textContent = input.value; // Define o texto do span com o valor do campo de entrada.

        list.append(check, textSpan, lixeira); // Adiciona o checkbox, o texto e a lixeira ao elemento de lista.
        listContainer.append(list); // Adiciona o item de lista ao contêiner da lista.
        input.value = ''; // Limpa o campo de entrada após adicionar o item.

        lixeira.addEventListener('click', () => { // Adiciona um evento de clique na lixeira.
            list.remove(); // Remove o item da lista.
            saveToLocalStorage(); // Atualiza o localStorage.
            showAlert(); // Mostra o alerta de remoção.
        });

        check.addEventListener('change', saveToLocalStorage); // Atualiza o localStorage quando o checkbox é marcado ou desmarcado.

        saveToLocalStorage(); // Atualiza o localStorage ao adicionar um novo item.
    }
});

// Função que mostra um alerta de remoção.
function showAlert() {
    let alertContainer = document.getElementById('alert'); // Obtém o contêiner do alerta pelo ID.
    if (alertContainer.querySelector('.alertText')) { // Verifica se já existe um alerta ativo.
        return; // Sai da função se um alerta já estiver ativo.
    }

    let alertText = document.createElement('p'); // Cria um parágrafo para o texto do alerta.
    let alertIcon = document.createElement('img'); // Cria uma imagem para o ícone do alerta.
    let iconX = document.createElement('img'); // Cria uma imagem para o botão de fechar o alerta.
    alertIcon.src = 'img/infoCircle.png'; // Define o ícone de alerta.
    iconX.src = 'img/delete-small.png'; // Define o ícone do botão de fechar.

    iconX.classList.add('iconX'); // Adiciona a classe 'iconX' ao botão de fechar.
    alertIcon.classList.add('alertIcon'); // Adiciona a classe 'alertIcon' ao ícone do alerta.
    alertText.classList.add('alertText'); // Adiciona a classe 'alertText' ao texto do alerta.
    alertContainer.classList.add('alertContainer'); // Adiciona a classe 'alertContainer' ao contêiner do alerta.
    alertContainer.classList.add('footer'); // Adiciona a classe 'footer' ao contêiner do alerta.

    alertText.innerText = 'Removido com sucesso!'; // Define o texto do alerta.
    alertContainer.prepend(alertIcon); // Adiciona o ícone do alerta no início do contêiner.
    alertContainer.append(alertText); // Adiciona o texto do alerta ao contêiner.
    alertContainer.append(iconX); // Adiciona o botão de fechar ao contêiner.

    setTimeout(() => { // Define um timer para remover o alerta após 3 segundos.
        alertContainer.innerHTML = ''; // Limpa o conteúdo do contêiner do alerta.
        alertContainer.classList.remove('alertContainer', 'footer'); // Remove as classes do contêiner do alerta.
    }, 3000);
}
