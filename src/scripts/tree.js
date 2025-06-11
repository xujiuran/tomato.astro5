export default class NativeFractalTree {
  canvasEl
  ctx
  width
  height
  steps = []
  prevSteps = []
  iterations = 0
  init = 5 // Default initial iterations
  len = 5 // Default max branch length
  stopped = false
  rafId = null // For requestAnimationFrame

  // Constants
  static R180 = Math.PI
  static R90 = Math.PI / 2
  static R15 = Math.PI / 12

  constructor(canvasElement, options = {}) {
    if (!canvasElement) {
      throw new Error('Canvas element is required.')
    }
    this.canvasEl = canvasElement
    this.ctx = this.canvasEl.getContext('2d')

    const dpr = window.devicePixelRatio || 1
    // @ts-ignore
    const bsr =
      this.ctx.webkitBackingStorePixelRatio ||
      this.ctx.mozBackingStorePixelRatio ||
      this.ctx.msBackingStorePixelRatio ||
      this.ctx.oBackingStorePixelRatio ||
      this.ctx.backingStorePixelRatio ||
      1
    const dpi = options.dpi || dpr / bsr

    this.width = options.width || 400
    this.height = options.height || 400

    this.canvasEl.style.width = `${this.width}px`
    this.canvasEl.style.height = `${this.height}px`
    this.canvasEl.width = dpi * this.width
    this.canvasEl.height = dpi * this.height
    this.ctx.scale(dpi, dpi)

    this.init = options.init !== undefined ? options.init : this.init
    this.len = options.len !== undefined ? options.len : this.len
    this.ctx.strokeStyle = options.strokeStyle || '#00000040'
    this.ctx.lineWidth = options.lineWidth || 1
  }

  get random() {
    return Math.random()
  }

  polar2cart(x = 0, y = 0, r = 0, theta = 0) {
    const dx = r * Math.cos(theta)
    const dy = r * Math.sin(theta)
    return [x + dx, y + dy]
  }

  step(x, y, rad) {
    const length = this.random * this.len
    const [nx, ny] = this.polar2cart(x, y, length, rad)

    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(nx, ny)
    this.ctx.stroke()

    const rad1 = rad + this.random * NativeFractalTree.R15
    const rad2 = rad - this.random * NativeFractalTree.R15

    if (nx < -50 || nx > this.width + 50 || ny < -50 || ny > this.height + 50) {
      return
    }

    if (this.iterations <= this.init || this.random > 0.5) {
      this.steps.push(() => this.step(nx, ny, rad1))
    }
    if (this.iterations <= this.init || this.random > 0.5) {
      this.steps.push(() => this.step(nx, ny, rad2))
    }
  }

  frame() {
    if (this.stopped) return

    this.iterations += 1
    this.prevSteps = this.steps
    this.steps = []

    if (!this.prevSteps.length) {
      this.stop()
      console.log('Tree generation complete.')
      return
    }

    this.prevSteps.forEach((fn) => fn())

    this.rafId = requestAnimationFrame(() => this.frame())
  }

  start() {
    this.stop()
    this.stopped = false
    this.iterations = 0
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.strokeStyle = this.ctx.strokeStyle
    this.ctx.lineWidth = this.ctx.lineWidth

    this.prevSteps = []
    this.steps =
      this.random < 0.5
        ? [
            () => this.step(0, this.random * this.height, 0),
            () => this.step(this.width, this.random * this.height, NativeFractalTree.R180),
          ]
        : [
            () => this.step(this.random * this.width, 0, NativeFractalTree.R90),
            () => this.step(this.random * this.width, this.height, -NativeFractalTree.R90),
          ]

    this.rafId = requestAnimationFrame(() => this.frame())
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    this.stopped = true
  }

  updateParams(newParams = {}) {
    if (newParams.init !== undefined) this.init = parseInt(newParams.init, 10)
    if (newParams.len !== undefined) this.len = parseInt(newParams.len, 10)
    if (newParams.strokeStyle !== undefined) this.ctx.strokeStyle = newParams.strokeStyle
    if (newParams.lineWidth !== undefined) this.ctx.lineWidth = parseFloat(newParams.lineWidth)
    this.start()
  }
}