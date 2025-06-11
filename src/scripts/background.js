import NativeFractalTree from './tree.js'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const canvas = document.getElementById('fractalCanvas')
console.log(canvas);

canvas.style.width = screenWidth
canvas.style.height = screenHeight

console.log(canvas);

if (canvas) {
  const treeGenerator = new NativeFractalTree(canvas, {
    init: Math.random() * 5,
    len: Math.random() * 5,
    strokeStyle: '#00000040',
    lineWidth: 1,
    width: screenWidth,
    height: screenHeight,
  })
  treeGenerator.start()
}