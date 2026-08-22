// Web Audio procedural focus sound generator for NexFlow
// Zero external file dependencies - pure synthetic pink noise, binaural beats, and lo-fi chords

class SoundEngine {
  private ctx: AudioContext | null = null;
  private currentMode: 'none' | 'ocean' | 'rain' | 'binaural' | 'lofi_synth' = 'none';
  private masterGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isMuted: boolean = false;
  private volume: number = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.15, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume * 0.15, this.ctx.currentTime, 0.1);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ctx && this.masterGain) {
      const targetGain = this.isMuted ? 0 : this.volume * 0.15;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }

  public stopAll() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    this.oscillators = [];

    if (this.noiseNode) {
      try {
        this.noiseNode.disconnect();
      } catch (e) {}
      this.noiseNode = null;
    }
    this.currentMode = 'none';
  }

  public playSoundtrack(mode: 'none' | 'ocean' | 'rain' | 'binaural' | 'lofi_synth') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stopAll();
    this.currentMode = mode;

    if (mode === 'none') return;

    if (mode === 'ocean') {
      // Pink noise filtered through slowly sweeping lowpass filter to mimic sea waves
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, this.ctx.currentTime);

      // LFO for wave swelling
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 sec ocean cycle
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(220, this.ctx.currentTime);

      lfo.connect(filter.frequency);
      whiteNoise.connect(filter);
      filter.connect(this.masterGain);

      lfo.start();
      whiteNoise.start();
      this.noiseNode = whiteNoise;
      this.oscillators.push(lfo);

    } else if (mode === 'binaural') {
      // 200 Hz Left, 210 Hz Right (10 Hz Alpha wave for relaxed focus and flow)
      const merger = this.ctx.createChannelMerger(2);

      const oscL = this.ctx.createOscillator();
      oscL.type = 'sine';
      oscL.frequency.setValueAtTime(196, this.ctx.currentTime);

      const oscR = this.ctx.createOscillator();
      oscR.type = 'sine';
      oscR.frequency.setValueAtTime(206, this.ctx.currentTime); // +10Hz Alpha

      const gainL = this.ctx.createGain();
      const gainR = this.ctx.createGain();
      gainL.gain.value = 0.5;
      gainR.gain.value = 0.5;

      oscL.connect(gainL);
      oscR.connect(gainR);
      gainL.connect(merger, 0, 0);
      gainR.connect(merger, 0, 1);

      merger.connect(this.masterGain);

      oscL.start();
      oscR.start();
      this.oscillators.push(oscL, oscR);

    } else if (mode === 'lofi_synth') {
      // Warm, lush chord drone in D minor 9 (D3, F3, A3, C4, E4)
      const freqs = [146.83, 174.61, 220.00, 261.63, 329.63];
      freqs.forEach((f, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, this.ctx.currentTime);

        const chordGain = this.ctx.createGain();
        chordGain.gain.setValueAtTime(0.08 / freqs.length, this.ctx.currentTime);

        osc.connect(filter);
        filter.connect(chordGain);
        chordGain.connect(this.masterGain);

        osc.start();
        this.oscillators.push(osc);
      });

    } else if (mode === 'rain') {
      // Rain noise with highpass + gentle modulation
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.05;
      }

      const rainNoise = this.ctx.createBufferSource();
      rainNoise.buffer = noiseBuffer;
      rainNoise.loop = true;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1000, this.ctx.currentTime);
      bandpass.Q.setValueAtTime(0.7, this.ctx.currentTime);

      rainNoise.connect(bandpass);
      bandpass.connect(this.masterGain);

      rainNoise.start();
      this.noiseNode = rainNoise;
    }
  }

  // Gentle chime bell on start or finish
  public playChime(success = true) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = success ? [523.25, 659.25, 783.99, 1046.5] : [440, 554.37];
    notes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.12);

      gain.gain.setValueAtTime(0, this.ctx.currentTime + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + i * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.12 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(this.ctx.currentTime + i * 0.12);
      osc.stop(this.ctx.currentTime + i * 0.12 + 1.3);
    });
  }
}

export const flowAudio = new SoundEngine();
