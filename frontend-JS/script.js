window.addEventListener('DOMContentLoaded', () => {
    const API_URL_CLIENTES = 'http://localhost:8080/api/clientes';
    const API_URL_OS = 'http://localhost:8080/api/ordens-servico';

    // Capturando os elementos do HTML
    const listaClientes = document.getElementById('lista-clientes');
    const clienteSelect = document.getElementById('os-cliente-select');
    const listaOS = document.getElementById('lista-os');
    const formCliente = document.getElementById('form-cliente');
    const formOS = document.getElementById('form-os');
    const btnSubmitCliente = formCliente.querySelector('button');

    // Variáveis para controlar o modo de edição do formulário de cliente
    let modoEdicao = false;
    let clienteEmEdicaoId = null;

    // Função para buscar os clientes na API e exibi-los na tela
    async function carregarClientes() {
        try {
            const response = await fetch(API_URL_CLIENTES);
            if (!response.ok) { throw new Error('Erro ao buscar clientes'); }
            const clientes = await response.json();

            listaClientes.innerHTML = '';
            clienteSelect.innerHTML = '<option value="">Selecione um Cliente</option>';

            clientes.forEach(cliente => {
                const itemLista = document.createElement('li');
                
                const textoCliente = document.createElement('span');
                textoCliente.textContent = `ID: ${cliente.id} - ${cliente.nome} (${cliente.email || 'N/A'})`;

                const btnEditar = document.createElement('button');
                btnEditar.textContent = 'Editar';
                btnEditar.style.marginLeft = '10px';
                btnEditar.onclick = () => prepararEdicao(cliente);

                const btnExcluir = document.createElement('button');
                btnExcluir.textContent = 'Excluir';
                btnExcluir.style.marginLeft = '5px';
                btnExcluir.onclick = () => deletarCliente(cliente.id);

                itemLista.appendChild(textoCliente);
                itemLista.appendChild(btnEditar);
                itemLista.appendChild(btnExcluir);
                listaClientes.appendChild(itemLista);

                const option = document.createElement('option');
                option.value = cliente.id;
                option.textContent = cliente.nome;
                clienteSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Falha ao carregar clientes:', error);
            listaClientes.innerHTML = '<li>Não foi possível carregar os clientes.</li>';
        }
    }

    // Função para buscar as Ordens de Serviço na API e exibi-las na tela
    async function carregarOrdensDeServico() {
        try {
            const response = await fetch(API_URL_OS);
            if (!response.ok) { throw new Error('Erro ao buscar Ordens de Serviço'); }
            const ordensDeServico = await response.json();

            listaOS.innerHTML = '';

            ordensDeServico.forEach(os => {
                const itemLista = document.createElement('li');
                itemLista.textContent = `ID: ${os.id} - ${os.titulo} (Cliente: ${os.cliente.nome})`;
                listaOS.appendChild(itemLista);
            });
        } catch (error) {
            console.error('Falha ao carregar Ordens de Serviço:', error);
            listaOS.innerHTML = '<li>Não foi possível carregar as Ordens de Serviço.</li>';
        }
    }

    // Função para deletar um cliente
    async function deletarCliente(id) {
        if (!confirm(`Tem certeza que deseja excluir o cliente de ID ${id}?`)) {
            return;
        }

        try {
            const response = await fetch(`${API_URL_CLIENTES}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Erro ao deletar cliente');
            }
            
            alert('Cliente excluído com sucesso!');
            await carregarClientes();
            await carregarOrdensDeServico();

        } catch (error) {
            console.error('Falha ao deletar cliente:', error);
            alert(`Não foi possível excluir o cliente. Motivo: O cliente pode ter Ordens de Serviço associadas a ele.`);
        }
    }

    // Funções para gerenciar a edição de cliente
    function prepararEdicao(cliente) {
        modoEdicao = true;
        clienteEmEdicaoId = cliente.id;

        document.getElementById('cliente-nome').value = cliente.nome;
        document.getElementById('cliente-contato').value = cliente.contato;
        document.getElementById('cliente-email').value = cliente.email;
        document.getElementById('cliente-telefone').value = cliente.telefone;

        btnSubmitCliente.textContent = 'Salvar Alterações';
        document.getElementById('cliente-nome').focus();
    }

    function resetarFormularioCliente() {
        modoEdicao = false;
        clienteEmEdicaoId = null;
        formCliente.reset();
        btnSubmitCliente.textContent = 'Adicionar Cliente';
    }

    // Listener do formulário de cliente
    formCliente.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('cliente-nome').value;
        const contato = document.getElementById('cliente-contato').value;
        const email = document.getElementById('cliente-email').value;
        const telefone = document.getElementById('cliente-telefone').value;

        const clienteData = { nome, contato, email, telefone };

        const url = modoEdicao ? `${API_URL_CLIENTES}/${clienteEmEdicaoId}` : API_URL_CLIENTES;
        const method = modoEdicao ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clienteData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao salvar cliente: ${errorText}`);
            }

            resetarFormularioCliente();
            await carregarClientes();
            alert(modoEdicao ? 'Cliente atualizado com sucesso!' : 'Cliente adicionado com sucesso!');

        } catch (error) {
            console.error('Falha ao salvar cliente:', error);
            alert('Não foi possível salvar o cliente.');
        }
    });

    // Listener do formulário de OS
    formOS.addEventListener('submit', async (event) => {
        event.preventDefault();

        const clienteId = document.getElementById('os-cliente-select').value;
        const titulo = document.getElementById('os-titulo').value;
        const descricao = document.getElementById('os-descricao').value;

        if (!clienteId) {
            alert('Por favor, selecione um cliente.');
            return;
        }

        const osData = {
            titulo,
            descricao,
            cliente: { id: clienteId }
        };

        try {
            const response = await fetch(API_URL_OS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(osData)
            });

            if (!response.ok) { throw new Error('Erro ao criar Ordem de Serviço'); }

            formOS.reset();
            await carregarOrdensDeServico();
            alert('Ordem de Serviço criada com sucesso!');

        } catch (error) {
            console.error('Falha ao criar Ordem de Serviço:', error);
            alert('Não foi possível criar a Ordem de Serviço.');
        }
    });

    // Inicia o carregamento dos dados quando a página abre
    carregarClientes();
    carregarOrdensDeServico();
});