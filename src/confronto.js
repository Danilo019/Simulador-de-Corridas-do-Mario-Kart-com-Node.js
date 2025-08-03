const { sortearItemConfronto } = require('./item');

class SistemaConfronto {
    constructor() {
        this.historicoConfrontos = [];
    }

    // Executa um confronto entre dois personagens
    executarConfronto(personagem1, personagem2) {
        console.log('\n' + '='.repeat(50));
        console.log('💥 CONFRONTO INICIADO! 💥');
        console.log('='.repeat(50));
        console.log(`🥊 ${personagem1.nome} VS ${personagem2.nome} 🥊\n`);

        // Cada personagem sorteia um item
        const item1 = sortearItemConfronto();
        const item2 = sortearItemConfronto();

        console.log(`${personagem1.nome} sorteia...`);
        this.animarSorteio();
        console.log(`🎲 ${personagem1.nome} pegou: ${item1.nome} (Dano: ${item1.dano})`);

        console.log(`\n${personagem2.nome} sorteia...`);
        this.animarSorteio();
        console.log(`🎲 ${personagem2.nome} pegou: ${item2.nome} (Dano: ${item2.dano})\n`);

        // Determina o resultado do confronto
        const resultado = this.determinarVencedor(personagem1, personagem2, item1, item2);
        
        // Aplica os efeitos
        this.aplicarEfeitos(resultado);
        
        // Mostra o resultado
        this.mostrarResultado(resultado);
        
        // Salva no histórico
        this.historicoConfrontos.push(resultado);
        
        console.log('='.repeat(50) + '\n');
        
        return resultado;
    }

    // Determina o vencedor do confronto
    determinarVencedor(personagem1, personagem2, item1, item2) {
        let vencedor, perdedor, itemVencedor, itemPerdedor;
        let tipoResultado;

        if (item1.dano > item2.dano) {
            vencedor = personagem1;
            perdedor = personagem2;
            itemVencedor = item1;
            itemPerdedor = item2;
            tipoResultado = 'vitoria';
        } else if (item2.dano > item1.dano) {
            vencedor = personagem2;
            perdedor = personagem1;
            itemVencedor = item2;
            itemPerdedor = item1;
            tipoResultado = 'vitoria';
        } else {
            // Empate - decide por desempenho total
            if (personagem1.calcularDesempenho() > personagem2.calcularDesempenho()) {
                vencedor = personagem1;
                perdedor = personagem2;
                itemVencedor = item1;
                itemPerdedor = item2;
                tipoResultado = 'empate_desempenho';
            } else if (personagem2.calcularDesempenho() > personagem1.calcularDesempenho()) {
                vencedor = personagem2;
                perdedor = personagem1;
                itemVencedor = item2;
                itemPerdedor = item1;
                tipoResultado = 'empate_desempenho';
            } else {
                // Empate total
                vencedor = null;
                perdedor = null;
                itemVencedor = item1;
                itemPerdedor = item2;
                tipoResultado = 'empate_total';
            }
        }

        return {
            personagem1,
            personagem2,
            item1,
            item2,
            vencedor,
            perdedor,
            itemVencedor,
            itemPerdedor,
            tipoResultado
        };
    }

    // Aplica os efeitos do confronto
    aplicarEfeitos(resultado) {
        switch (resultado.tipoResultado) {
            case 'vitoria':
                // Vencedor ganha turbo, perdedor recebe dano
                resultado.vencedor.adicionarTurbo();
                resultado.perdedor.receberDano(resultado.itemVencedor.dano);
                break;
            
            case 'empate_desempenho':
                // Vencedor por desempenho ganha turbo, perdedor recebe dano reduzido
                resultado.vencedor.adicionarTurbo();
                resultado.perdedor.receberDano(Math.floor(resultado.itemVencedor.dano / 2));
                break;
            
            case 'empate_total':
                // Ambos recebem dano de seus próprios itens
                resultado.personagem1.receberDano(resultado.item1.dano);
                resultado.personagem2.receberDano(resultado.item2.dano);
                break;
        }
    }

    // Mostra o resultado do confronto
    mostrarResultado(resultado) {
        console.log('⚡ RESULTADO DO CONFRONTO ⚡');
        
        switch (resultado.tipoResultado) {
            case 'vitoria':
                console.log(`🏆 ${resultado.vencedor.nome} VENCEU!`);
                console.log(`✨ ${resultado.vencedor.nome} ganhou um TURBO (+1 ponto)!`);
                console.log(`💥 ${resultado.perdedor.nome} recebeu ${resultado.itemVencedor.dano} de dano!`);
                break;
            
            case 'empate_desempenho':
                console.log(`🎯 ${resultado.vencedor.nome} venceu por DESEMPENHO!`);
                console.log(`✨ ${resultado.vencedor.nome} ganhou um TURBO (+1 ponto)!`);
                console.log(`💥 ${resultado.perdedor.nome} recebeu ${Math.floor(resultado.itemVencedor.dano / 2)} de dano!`);
                break;
            
            case 'empate_total':
                console.log(`🤝 EMPATE TOTAL!`);
                console.log(`💥 Ambos receberam dano de seus próprios itens!`);
                console.log(`${resultado.personagem1.nome}: -${resultado.item1.dano} pontos`);
                console.log(`${resultado.personagem2.nome}: -${resultado.item2.dano} pontos`);
                break;
        }

        // Mostra status atual dos personagens
        console.log('\n📊 STATUS APÓS CONFRONTO:');
        console.log(`${resultado.personagem1.nome}: ${resultado.personagem1.pontos} pontos | ${resultado.personagem1.turbo} turbos`);
        console.log(`${resultado.personagem2.nome}: ${resultado.personagem2.pontos} pontos | ${resultado.personagem2.turbo} turbos`);
    }

    // Animação simples para o sorteio
    animarSorteio() {
        const frames = ['🎰', '🎲', '🎯', '⚡'];
        for (let i = 0; i < 3; i++) {
            process.stdout.write(`\r${frames[i % frames.length]} Sorteando...`);
            // Simula delay (em ambiente real usaria setTimeout)
        }
        process.stdout.write('\r');
    }

    // Verifica se deve ocorrer um confronto (30% de chance)
    deveOcorrerConfronto() {
        return Math.random() < 0.3;
    }

    // Seleciona dois personagens aleatórios para confronto
    selecionarPersonagensParaConfronto(personagens) {
        if (personagens.length < 2) return null;

        const indices = [];
        while (indices.length < 2) {
            const indice = Math.floor(Math.random() * personagens.length);
            if (!indices.includes(indice)) {
                indices.push(indice);
            }
        }

        return {
            personagem1: personagens[indices[0]],
            personagem2: personagens[indices[1]]
        };
    }

    // Obtém estatísticas dos confrontos
    obterEstatisticas() {
        const totalConfrontos = this.historicoConfrontos.length;
        const vitorias = this.historicoConfrontos.filter(c => c.tipoResultado === 'vitoria').length;
        const empates = this.historicoConfrontos.filter(c => c.tipoResultado.includes('empate')).length;

        return {
            totalConfrontos,
            vitorias,
            empates,
            historico: this.historicoConfrontos
        };
    }

    // Reseta o histórico
    resetarHistorico() {
        this.historicoConfrontos = [];
    }
}

module.exports = SistemaConfronto;

