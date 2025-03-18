import * as THREE from 'three';
import * as Matrizes from './Matrizes.js'

// Função para criar um tubo (linha grossa)
function createThickLine(start, end, material ,radius = 0.05) {
    const path = new THREE.LineCurve3(start, end); // Criar um caminho entre os pontos
    const geometry = new THREE.TubeGeometry(path, 20, radius, 8, false); // Criar um tubo ao longo do caminho
    return new THREE.Mesh(geometry, material);
}

export function createAxis(){
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });

    //Segmentos do Eixos
    const x = createThickLine(new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0), material , 0.03);
    const y = createThickLine(new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0), material, 0.03);

    const Axis = new THREE.Group();
    Axis.add(x);
    Axis.add(y);

    return Axis
}
export function createBox(){

    const material = new THREE.MeshBasicMaterial({ color: 0xDD0000 });

    //Segmentos do Eixos
    const LE = createThickLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 3, 0), material , 0.03);
    const UP = createThickLine(new THREE.Vector3(0, 3, 0), new THREE.Vector3(8, 3, 0), material, 0.03);
    const LD = createThickLine(new THREE.Vector3(8, 3, 0), new THREE.Vector3(8, 0, 0), material, 0.03);


    const Box = new THREE.Group();
    Box.add(UP);
    Box.add(LE);
    Box.add(LD);

    return Box
}

export function createLetterM() {
    const material = new THREE.MeshBasicMaterial({ color: 0x00DD00 });

    // Criar os segmentos do "M"
    const leftSegment = createThickLine(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(-1, 3, 0), material);
    const leftDiagonal = createThickLine(new THREE.Vector3(-1, 3, 0), new THREE.Vector3(0, 0, 0), material);
    const rightDiagonal = createThickLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 3, 0), material);
    const rightSegment = createThickLine(new THREE.Vector3(1, 0, 0), new THREE.Vector3(1, 3, 0), material);

    // Agrupar os segmentos em um único objeto
    const letterM = new THREE.Group();
    letterM.add(leftSegment);
    letterM.add(rightSegment);
    letterM.add(leftDiagonal);
    letterM.add(rightDiagonal);

    letterM.translateY(-1);
    letterM.translateX(3);
    letterM.rotateZ(Math.PI);


    return letterM;
}

export function createLetterO() {
    const material = new THREE.MeshBasicMaterial({ color: 0x00CC00 });

    // Criar os segmentos do "O"
    const topSegment = createThickLine(new THREE.Vector3(-1, 3, 0), new THREE.Vector3(1, 3, 0), material);
    const bottomSegment = createThickLine(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(1, 0, 0), material);
    const leftSegment = createThickLine(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(-1, 3, 0), material);
    const rightSegment = createThickLine(new THREE.Vector3(1, 0, 0), new THREE.Vector3(1, 3, 0), material);

    // Agrupar os segmentos em um único objeto
    const letterO = new THREE.Group();
    letterO.add(topSegment);
    letterO.add(bottomSegment);
    letterO.add(leftSegment);
    letterO.add(rightSegment);

    letterO.scale.set(1,(2/3),1);
    letterO.translateX(-1);

    return letterO;
}

export function createLetterH() {

    const material = new THREE.MeshBasicMaterial({ color: 0x00CC00 });

    // Criar os segmentos do "H"
    const leftSegment = createThickLine(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(-1, 3, 0), material);
    const rightSegment = createThickLine(new THREE.Vector3(1, 0, 0), new THREE.Vector3(1, 3, 0), material);
    const middleSegment = createThickLine(new THREE.Vector3(-1, 1.5, 0), new THREE.Vector3(1, 1.5, 0), material);

    // Agrupar os segmentos em um único objeto
    const letterH = new THREE.Group();
    letterH.add(leftSegment);
    letterH.add(rightSegment);
    letterH.add(middleSegment);

    letterH.translateY(-2);
    letterH.translateX(-2);
    letterH.rotateZ(Math.PI/2);

    return letterH;
}

export function createLetterE() {
    const material = new THREE.MeshBasicMaterial({ color: 0x0000EE });

    // Criar os segmentos do "E"
    const leftSegment = createThickLine(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(-1, 3, 0), material);
    const topSegment = createThickLine(new THREE.Vector3(-1, 3, 0), new THREE.Vector3(1, 3, 0), material);
    const middleSegment = createThickLine(new THREE.Vector3(-1, 1.5, 0), new THREE.Vector3(0.5, 1.5, 0), material);
    const bottomSegment = createThickLine(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(1, 0, 0), material);

    // Agrupar os segmentos em um único objeto
    const letterE = new THREE.Group();
    letterE.add(leftSegment);
    letterE.add(topSegment);
    letterE.add(middleSegment);
    letterE.add(bottomSegment);

    //
    letterE.scale.set(2,2,2);
    letterE.translateX(8);
    letterE.translateY(6);
    letterE.rotateZ(Math.PI/2);


    return letterE;
}