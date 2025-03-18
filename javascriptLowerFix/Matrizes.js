import * as THREE from 'three';
import * as Objetos from './Objetos.js'

// Criar uma matriz identidade para cada letra
export const MatrizH = new THREE.Matrix4();
export const MatrizO = new THREE.Matrix4();
export const MatrizM = new THREE.Matrix4();
export const MatrizE = new THREE.Matrix4();






// Função para capturar os valores do formulário e atualizar a matriz correspondente
document.addEventListener('DOMContentLoaded', () => {
    const letterButtons = document.querySelectorAll('.letter-button');
    const selectedMatrixInput = document.getElementById('selected-matrix');

    // Adicionar evento de clique aos botões de letras
    letterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Remover a classe "selected" de todos os botões
            letterButtons.forEach((btn) => btn.classList.remove('selected'));

            // Adicionar a classe "selected" ao botão clicado
            button.classList.add('selected');

            // Atualizar o valor do input hidden com a matriz selecionada
            const matrixId = button.getAttribute('data-matrix');
            selectedMatrixInput.value = matrixId;
        });
    });

  

        

    // Configurar o formulário para capturar a matriz selecionada
    document.getElementById('matrix-form').addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar o comportamento padrão do formulário

        const selectedMatrix = selectedMatrixInput.value;
        if (!selectedMatrix) {
            alert('Por favor, selecione uma letra antes de aplicar a matriz.');
            return;
        }

       // Capturar os valores da matriz 4x4
        const values = [];
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const inputId = `m${row}${col}`;
                const inputElement = document.getElementById(inputId);
                const value = parseFloat(inputElement.value) || 0; // Se vazio, atribuir 0
                values.push(value);
            }
        }

        if (values.length === 16) {
            // Atualizar a matriz correspondente
            const newMatrix = new THREE.Matrix4();
            newMatrix.set(...values);

            switch (selectedMatrix) {
                case 'MatrizH':
                    MatrizH.copy(newMatrix);
                    console.log('MatrizH atualizada:', MatrizH);
                    break;
                case 'MatrizO':
                    MatrizO.copy(newMatrix);
                    console.log('MatrizO atualizada:', MatrizO);
                    break;
                case 'MatrizM':
                    MatrizM.copy(newMatrix);
                    console.log('MatrizM atualizada:', MatrizM);
                    break;
                case 'MatrizE':
                    MatrizE.copy(newMatrix);
                    console.log('MatrizE atualizada:', MatrizE);
                    break;
                default:
                    console.error('Matriz desconhecida:', selectedMatrix);
            }
        } else {
            alert('Por favor, preencha todos os campos da matriz.');
        }
    });
});