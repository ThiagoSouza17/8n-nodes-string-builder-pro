const { src, dest, parallel } = require('gulp');
// O 'del' é usado para limpar a pasta dist antes do build, se necessário.
// Se o seu template não veio com ele, não é estritamente obrigatório,
// mas é uma boa prática.
// const del = require('del'); 

// TASK 1: Copiar Ícones (.svg)
// Esta tarefa procura por qualquer arquivo .svg dentro da estrutura 'nodes/'
function buildIcons() {
    // O segredo aqui é a opção { base: '.' }.
    // Ela diz ao Gulp: "Mantenha a estrutura de pastas a partir da raiz".
    // Se o arquivo de origem é: nodes/StringBuilderPro/StringBuilderPro.svg
    // Ele será copiado para:   dist/nodes/StringBuilderPro/StringBuilderPro.svg
    // Sem o 'base', ele poderia achatar tudo na raiz da dist.
    return src('nodes/**/*.svg', { base: '.' })
        .pipe(dest('dist'));
}

// TASK 2: Copiar Metadados (.json)
// Esta tarefa copia o arquivo .node.json que contém os links de documentação.
function buildMetadata() {
    // Usamos o mesmo truque do { base: '.' } para manter a estrutura.
    // O filtro **/*.node.json garante que pegamos apenas os metadados do nó,
    // ignorando arquivos como tsconfig.json ou package.json.
    return src('nodes/**/*.node.json', { base: '.' })
        .pipe(dest('dist'));
}

// (Opcional) Task de Limpeza
// function clean() {
//     return del(['dist/**']);
// }

// Exporta as tarefas.
// O comando 'n8n-node build' espera que o gulp tenha uma tarefa 'build' exportada.
// Usamos 'parallel' para copiar ícones e metadados ao mesmo tempo.
exports.build = parallel(buildIcons, buildMetadata);
// Se usar o clean: exports.build = series(clean, parallel(buildIcons, buildMetadata));

// Tarefa padrão (caso você rode apenas 'gulp' no terminal)
exports.default = exports.build;