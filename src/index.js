#!/usr/bin/env node

const JogoMarioKart = require('./jogo');

// Função principal
function main() {
    try {
        const jogo = new JogoMarioKart();
        jogo.iniciar();
    } catch (error) {
        console.error('❌ Erro ao executar o jogo:', error.message);
        process.exit(1);
    }
}

// Tratamento de sinais para saída limpa
process.on('SIGINT', () => {
    console.log('\n\n👋 Jogo interrompido. Ate a próxima!');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n\n👋 Jogo finalizado. Ate a proxima!');
    process.exit(0);
});

// Inicia o jogo
if (require.main === module) {
    main();
}

module.exports = main;

