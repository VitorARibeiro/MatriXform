import * as THREE from 'three';
import * as Objetos from './Objetos.js';
import { MatrizH, MatrizO, MatrizM, MatrizE } from './Matrizes.js';


document.addEventListener('DOMContentLoaded', Start);
const canvasDiv = document.getElementById("canvas-container");

// Configurar Cena, Câmera e Renderizador
const scene = new THREE.Scene();

// Configurar a câmera ortográfica
const aspect = canvasDiv.clientWidth / canvasDiv.clientHeight; // Proporção da janela
const cameraSize = 10; // Tamanho do frustum da câmera
const camera = new THREE.OrthographicCamera(
    -cameraSize * aspect, // esquerda
    cameraSize * aspect,  // direita
    cameraSize,           // cima
    -cameraSize,          // baixo
    0.1,                  // plano próximo
    1000                  // plano distante
);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas') });
renderer.setSize(canvasDiv.clientWidth , canvasDiv.clientHeight); // Ajustar o tamanho do canvas ao tamanho do container
renderer.setClearColor(0xffffff);

//Criar Grid 
const gridSize = 20; // Tamanho da grade
const gridDivisions = 20; // Número de divisões na grade
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x0000ff, 0x808080); // Cor dos eixos principais e linhas secundárias
gridHelper.rotation.x = Math.PI / 2 ; 
scene.add(gridHelper); // Adicionar a grade à cena

// Adicionar Objetos a Cena
let letterH = Objetos.createLetterH();
let letterO = Objetos.createLetterO();
let letterM = Objetos.createLetterM();
let letterE = Objetos.createLetterE();

scene.add(letterH);
scene.add(letterO);
scene.add(letterM);
scene.add(letterE);
scene.add(Objetos.createAxis());
scene.add(Objetos.createBox());


// Função para resetar um objeto na cena
function resetObject(oldObject, newObjectCreator) {
    const scene = oldObject.parent; // Obter a cena a partir do objeto antigo
    if (scene) {
        scene.remove(oldObject); // Remover o objeto antigo da cena
        const newObject = newObjectCreator(); // Criar o novo objeto
        scene.add(newObject); // Adicionar o novo objeto à cena
        return newObject; // Retornar o novo objeto para atualizar a referência
    }
    return oldObject; // Caso não tenha cena, retornar o objeto antigo
}

// Função para resetar a letra selecionada
function resetSelectedLetter(selectedMatrix) {
    switch (selectedMatrix) {
        case 'MatrizH':
            letterH = resetObject(letterH, Objetos.createLetterH);
            console.log('Letra H resetada.');
            break;
        case 'MatrizO':
            letterO = resetObject(letterO, Objetos.createLetterO);
            console.log('Letra O resetada.');
            break;
        case 'MatrizM':
            letterM = resetObject(letterM, Objetos.createLetterM);
            console.log('Letra M resetada.');
            break;
        case 'MatrizE':
            letterE = resetObject(letterE, Objetos.createLetterE);
            console.log('Letra E resetada.');
            break;
        default:
            console.error('Matriz desconhecida:', selectedMatrix);
    }
}

function updateLetters() {
    // Aplicar a matriz mais recente e redefinir para identidade
    letterH.applyMatrix4(MatrizH);
    MatrizH.identity(); // Redefinir para matriz identidade

    letterO.applyMatrix4(MatrizO);
    MatrizO.identity(); // Redefinir para matriz identidade

    letterM.applyMatrix4(MatrizM);
    MatrizM.identity(); // Redefinir para matriz identidade

    letterE.applyMatrix4(MatrizE);
    MatrizE.identity(); // Redefinir para matriz identidade
}

function animate(){
    requestAnimationFrame(animate);
    updateLetters();
    renderer.render(scene, camera);

}


function Start() {
    // Posicionar a câmera
    camera.position.set(0, 0, 5); // Posicionar a câmera
    camera.lookAt(0, 0, 0); // Fazer a câmera olhar para o centro da cena


    // Configurar o botão de reset
    const resetButton = document.getElementById('reset-matrix');
    resetButton.addEventListener('click', () => {
        const selectedMatrix = document.getElementById('selected-matrix').value;
        if (!selectedMatrix) {
            alert('Por favor, selecione uma letra antes de resetar a matriz.');
            return;
        }
        resetSelectedLetter(selectedMatrix);
    });

    // Renderizar a cena
    animate();
}