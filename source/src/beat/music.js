// A small K-pop style beat made with the Web Audio API, so there are no
// music files to download or license. The audio clock drives the game timing.

const midiToHz = (m) => 440 * Math.pow(2, (m - 69) / 12)

// Am - F - C - G, a very common pop progression
const CHORDS = [
  [57, 60, 64],
  [53, 57, 60],
  [48, 52, 55],
  [55, 59, 62],
]
const ROOTS = [45, 41, 36, 43]

export function createMusic(ctx, bpm) {
  const master = ctx.createGain()
  master.gain.value = 0.5
  master.connect(ctx.destination)

  const noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.5), ctx.sampleRate)
  const data = noiseBuf.getChannelData(0)
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1

  const env = (node, t, peak, decay) => {
    node.gain.setValueAtTime(0.0001, t)
    node.gain.exponentialRampToValueAtTime(peak, t + 0.005)
    node.gain.exponentialRampToValueAtTime(0.0001, t + decay)
  }

  function kick(t) {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.setValueAtTime(150, t)
    o.frequency.exponentialRampToValueAtTime(42, t + 0.14)
    env(g, t, 0.9, 0.28)
    o.connect(g).connect(master)
    o.start(t)
    o.stop(t + 0.3)
  }

  function noiseHit(t, type, freq, peak, decay) {
    const s = ctx.createBufferSource()
    s.buffer = noiseBuf
    const f = ctx.createBiquadFilter()
    f.type = type
    f.frequency.value = freq
    const g = ctx.createGain()
    env(g, t, peak, decay)
    s.connect(f).connect(g).connect(master)
    s.start(t)
    s.stop(t + decay + 0.02)
  }

  function bass(t, midi, dur) {
    const o = ctx.createOscillator()
    const f = ctx.createBiquadFilter()
    const g = ctx.createGain()
    o.type = 'sawtooth'
    o.frequency.value = midiToHz(midi)
    f.type = 'lowpass'
    f.frequency.value = 520
    env(g, t, 0.22, dur)
    o.connect(f).connect(g).connect(master)
    o.start(t)
    o.stop(t + dur + 0.02)
  }

  function pluck(t, notes) {
    notes.forEach((m) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'triangle'
      o.frequency.value = midiToHz(m + 12)
      env(g, t, 0.06, 0.28)
      o.connect(g).connect(master)
      o.start(t)
      o.stop(t + 0.3)
    })
  }

  // One eighth note of the pattern.
  function playEighth(t, eighth, countIn) {
    const inBar = eighth % 8
    const bar = Math.floor(eighth / 8)
    if (countIn) {
      if (inBar % 2 === 0) noiseHit(t, 'highpass', 6000, 0.25, 0.06)
      return
    }
    const chord = bar % 4
    if (inBar % 2 === 0) kick(t)
    if (inBar === 2 || inBar === 6) noiseHit(t, 'bandpass', 1400, 0.55, 0.16)
    noiseHit(t, 'highpass', 7000, inBar % 2 ? 0.12 : 0.07, inBar % 2 ? 0.09 : 0.04)
    if (inBar === 0 || inBar === 3 || inBar === 4 || inBar === 6) bass(t, ROOTS[chord], 0.18)
    if (inBar % 2 === 1) pluck(t, CHORDS[chord])
  }

  const eighthDur = 60 / bpm / 2
  let timer = null
  let next = 0
  let nextTime = 0
  let countInEighths = 8

  return {
    eighthDur,
    // startTime: when the count-in begins (audio clock seconds)
    start(startTime, countInBeats = 4) {
      countInEighths = countInBeats * 2
      next = 0
      nextTime = startTime
      const tick = () => {
        while (nextTime < ctx.currentTime + 0.15) {
          const counting = next < countInEighths
          playEighth(nextTime, counting ? next : next - countInEighths, counting)
          next += 1
          nextTime += eighthDur
        }
      }
      tick()
      timer = setInterval(tick, 25)
    },
    stop() {
      clearInterval(timer)
      master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.08)
    },
    setMuted(muted) {
      master.gain.setTargetAtTime(muted ? 0.0001 : 0.5, ctx.currentTime, 0.02)
    },
    hit(good) {
      const t = ctx.currentTime
      if (good) {
        ;[1318.5, 1975.5].forEach((hz, i) => {
          const o = ctx.createOscillator()
          const g = ctx.createGain()
          o.type = 'sine'
          o.frequency.value = hz
          env(g, t + i * 0.04, 0.12, 0.22)
          o.connect(g).connect(master)
          o.start(t + i * 0.04)
          o.stop(t + 0.3)
        })
      } else {
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.type = 'square'
        o.frequency.value = 110
        env(g, t, 0.08, 0.2)
        o.connect(g).connect(master)
        o.start(t)
        o.stop(t + 0.22)
      }
    },
  }
}
