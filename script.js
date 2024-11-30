const selectSet = document.getElementById('selectSet');
const selectAnimal = document.getElementById('selectAnimal');
const addAnimalButton = document.getElementById('addAnimalButton');
const clearButton = document.getElementById('clearButton');
const displayA = document.getElementById('displayA');
const displayB = document.getElementById('displayB');
const unionResult = document.getElementById('unionResult');
const intersectionResult = document.getElementById('intersectionResult');
const differenceABResult = document.getElementById('differenceABResult');
const differenceBAResult = document.getElementById('differenceBAResult');

// URLs de las imágenes (a completar por el usuario)
const animalImages = {
  perro: 'https://png.pngtree.com/png-clipart/20231016/original/pngtree-dog-standing-cartoon-character-png-image_13322602.png',
  gato: 'https://w7.pngwing.com/pngs/515/340/png-transparent-cat-cartoon-ginger-mammal-animals-cat-like-mammal-thumbnail.png',
  pez: 'https://w7.pngwing.com/pngs/619/123/png-transparent-cartoon-fish-blue-fish-tank-fish.png',
  vaca: 'https://w7.pngwing.com/pngs/35/775/png-transparent-cartoon-baby-cow-illustration-02.png',
  camello: 'https://img.freepik.com/vector-premium/camello-dibujos-animados-aislado-sobre-fondo-blanco_590604-207.jpg',
  tigre: 'https://st3.depositphotos.com/1967477/31921/v/950/depositphotos_319218344-stock-illustration-vector-illustration-cartoon-tiger-isolated.jpg',
  foca: 'https://img.freepik.com/vector-premium/lindo-dibujo-animado-foca-aislado-sobre-fondo-blanco_338371-1743.jpg',
  gallina: 'https://i.pinimg.com/736x/b9/36/73/b93673db4c611277ea88fb68a736bc65.jpg',
  sapo: 'https://img.freepik.com/vector-gratis/rana-feliz-gran-sonrisa-sentada-hoja_1308-41185.jpg?w=360',
  pato: 'https://st.depositphotos.com/1967477/1958/v/950/depositphotos_19581601-stock-illustration-funny-duck-cartoon.jpg'
};

// Función para agregar un animal
function addAnimal() {
  const selectedSet = selectSet.value;
  const selectedAnimal = selectAnimal.value;
  const imageUrl = animalImages[selectedAnimal];
  const displayArea = selectedSet === 'A' ? displayA : displayB;

  if (selectedSet && selectedAnimal && imageUrl) {
    // Verifica si el animal ya existe en el conjunto
    const animalExists = Array.from(displayArea.children).some(img => img.alt === selectedAnimal);
    if (animalExists) {
      return; // Sale de la función si el animal ya existe
    }

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = selectedAnimal;
    img.draggable = true;
    img.addEventListener('dragstart', handleDragStart);
    displayArea.appendChild(img);
    calculateResults();
  } else {
    alert('Por favor, selecciona un conjunto, un animal y proporciona una URL válida.');
  }
}

// Función para limpiar los conjuntos
function clearSets() {
  displayA.innerHTML = '';
  displayB.innerHTML = '';
  calculateResults();
}

// Función para calcular los resultados de las operaciones de conjuntos
function calculateResults() {
  const setA = Array.from(displayA.children).map(img => img.alt);
  const setB = Array.from(displayB.children).map(img => img.alt);

  const union = [...new Set([...setA, ...setB])].join(' - ');
  const intersection = setA.filter(x => setB.includes(x)).join(' - ');
  const differenceAB = setA.filter(x => !setB.includes(x)).join(' - ');
  const differenceBA = setB.filter(x => !setA.includes(x)).join(' - ');

  unionResult.textContent = union;
  intersectionResult.textContent = intersection;
  differenceABResult.textContent = differenceAB;
  differenceBAResult.textContent = differenceBA;
}

// Función para manejar el evento 'dragstart'
function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.src);
}

// Agrega los eventos a los botones
addAnimalButton.addEventListener('click', addAnimal);
clearButton.addEventListener('click', clearSets);

// Agrega los eventos de arrastrar y soltar a los conjuntos.
displayA.addEventListener('dragover', handleDragOver);
displayA.addEventListener('drop', handleDrop);
displayB.addEventListener('dragover', handleDragOver);
displayB.addEventListener('drop', handleDrop);

// Función para manejar el evento 'dragover'
function handleDragOver(event) {
  event.preventDefault();
}

// Función para manejar el evento 'drop'
function handleDrop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  const img = document.createElement('img');
  img.src = data;
  img.alt = data;
  img.draggable = true;
  img.addEventListener('dragstart', handleDragStart);
  event.target.appendChild(img);
  calculateResults();
}