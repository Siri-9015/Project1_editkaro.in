// Web Audio API Sound Synthesizer for UI & Sound Design Demos

class SoundFXEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // 1. Cinematic Swoosh Sound (Noise + Frequency Sweep + Rising Synth Tone)
  playSwoosh() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Noise layer for wind swoosh
      const bufferSize = Math.floor(ctx.sampleRate * 0.35);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(2.0, now);
      filter.frequency.setValueAtTime(150, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 0.15);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.32);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, now);
      noiseGain.gain.linearRampToValueAtTime(0.7, now + 0.15);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.33);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      // Tonal chord sweep (Cinematic chord tune)
      const freqs = [220, 330, 440];
      freqs.forEach((baseFreq) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.5, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + 0.32);

        oscGain.gain.setValueAtTime(0.001, now);
        oscGain.gain.linearRampToValueAtTime(0.2, now + 0.15);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.34);
      });

      noise.start(now);
      noise.stop(now + 0.34);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 2. Punchy Sub-Bass Drop (Sub Fundamental + Rich Harmonics + Transient Impact)
  playBassDrop() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Transient impact click
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'square';
      clickOsc.frequency.setValueAtTime(800, now);
      clickOsc.frequency.exponentialRampToValueAtTime(80, now + 0.03);
      clickGain.gain.setValueAtTime(0.5, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.05);

      // Sub fundamental (Sine)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(280, now);
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.7);

      gain1.gain.setValueAtTime(0.8, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

      // Audible harmonic (Triangle)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(560, now);
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.7);

      gain2.gain.setValueAtTime(0.4, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.72);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.78);
      osc2.stop(now + 0.78);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 3. Bright Pop Trigger Tune (Double-bounce cheerful bubble pop)
  playPop() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const playBubble = (timeOffset: number, startFreq: number, endFreq: number, vol: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, now + timeOffset);
        osc.frequency.exponentialRampToValueAtTime(endFreq, now + timeOffset + 0.07);

        gain.gain.setValueAtTime(vol, now + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + 0.1);
      };

      playBubble(0, 400, 1200, 0.7);
      playBubble(0.06, 600, 1800, 0.5);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 4. Camera Shutter Snapshot Tune (Realistic dual shutter click + electronic flash chime)
  playShutter() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Mechanical noise burst
      const playBurst = (startTime: number, volume: number, hpFreq: number) => {
        const bufferSize = Math.floor(ctx.sampleRate * 0.035);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(hpFreq, startTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.035);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(startTime);
      };

      // Shutter blade 1
      playBurst(now, 0.7, 1800);
      // Shutter blade 2
      playBurst(now + 0.05, 0.6, 2400);

      // Flash recycling chime tune (electronic camera ping)
      const flashOsc = ctx.createOscillator();
      const flashGain = ctx.createGain();
      flashOsc.type = 'sine';
      flashOsc.frequency.setValueAtTime(1500, now + 0.06);
      flashOsc.frequency.exponentialRampToValueAtTime(3200, now + 0.18);

      flashGain.gain.setValueAtTime(0.001, now + 0.06);
      flashGain.gain.linearRampToValueAtTime(0.25, now + 0.08);
      flashGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      flashOsc.connect(flashGain);
      flashGain.connect(ctx.destination);

      flashOsc.start(now + 0.06);
      flashOsc.stop(now + 0.22);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 5. Glitch / Cyber Chime
  playGlitchChime() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.35, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.18);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }
}

export const soundFX = new SoundFXEngine();


