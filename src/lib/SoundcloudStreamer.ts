import { Logger } from '@/tools/Logger';

/**
 * SoundcloudPlayer type
 */
export type SoundcloudPlayer = {
  [method: string]: (...args: any[]) => any;
}

/**
 * SoundcloudPlayer is a wrapper around the Player returned
 * from the Soundcloud client's `stream` function.
 */
export class SoundcloudStreamer {
  /**
   * How often will the UI check for updates to the current player
   * time
   */
  private static readonly POLL_INTERVAL_DELAY = 60;

  private static readonly DEFAULT_VOLUME = 0.5;

  private readonly logger: Logger = new Logger({ context: 'SoundcloudStreamer' })

  /**
   * Soundcloud client's player from stream
   */
  private player?: SoundcloudPlayer;

  private pollInterval?: any;

  public time: number | null = null;

  public duration: number | null = null;

  public volume: number = SoundcloudStreamer.DEFAULT_VOLUME;

  public muted = false;

  public buffering: boolean | null = null;

  public playing: boolean | null = null;

  public actuallyPlaying: boolean | null = null;

  public errored: boolean | null = null;

  public dead: boolean | null = null;

  public state: 'playing' | 'paused' | 'loading' | 'ended' | 'error' | 'dead' | null = null;

  public getPlayer(): SoundcloudPlayer | undefined {
    return this.player;
  }

  public setPlayer(value: SoundcloudPlayer): void {
    if (this.player) this.player.kill();
    this.player = value;
  }

  public setupPollInterval() {
    this.pollInterval = setInterval(
      () => this.pollTime(),
      SoundcloudStreamer.POLL_INTERVAL_DELAY,
    );
  }

  public destroyPollInterval() {
    clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  public pollTime() {
    this.time = this.currentTime();
  }

  public update() {
    this.pollTime();

    this.duration = this.getDuration();
    this.volume = this.getVolume();
    this.buffering = this.isBuffering();
    this.playing = this.isPlaying();
    this.actuallyPlaying = this.isActuallyPlaying();
    this.errored = this.hasErrored();
    this.dead = this.isDead();
    this.state = this.getState();
  }

  public unset() {
    this.time = null;
    this.duration = null;
    this.buffering = null;
    this.playing = null;
    this.actuallyPlaying = null;
    this.errored = null;
    this.dead = null;
    this.state = null;
  }

  /**
   * Starts to play the sound. Returns a Promise that resolves when playback starts,
   * and may reject if the browser refuses playback.
   */
  public async play() {
    try {
      await this.player?.play();
      this.setupPollInterval();
      this.setVolume(this.volume);
      this.update();
    } catch (error) {
      this.logger.error(error);
      throw Error('There was an issue while attempting to start playback. Sorry - try again!');
    }
  }

  /**
   * Pauses the player
   */
  public pause() {
    this.player?.pause();
    this.destroyPollInterval();
    this.update();
  }

  /**
   * Seeks to the position in the song (in milliseconds). Returns a Promise that resolves
   * when the seek completes, or may reject if the seek is not possible.
   * @param time
   */
  public async seek(time: number) {
    try {
      if (time < 0) throw Error('Invalid time to seek to');
      await this.player?.seek(time);
    } catch (error) {
      this.logger.error(error);
      throw Error('There was an issue with your playback device. Sorry - try again!');
    }
  }

  /**
   * Returns the current position (in milliseconds)
   */
  public currentTime(): number {
    return this.player?.currentTime() ?? 0;
  }

  /**
   * Sets the volume (from 0 to 1)
   * @param volume
   */
  public setVolume(volume: number) {
    if (volume < 0 || volume > 1) throw Error('Volume must be within 0.0 - 1.0');
    this.player?.setVolume(volume);
    this.update();
  }

  /**
   * Returns the current volume
   */
  public getVolume() {
    return this.player?.getVolume() ?? SoundcloudStreamer.DEFAULT_VOLUME;
  }

  public setMuted(isMuted: boolean) {
    this.muted = isMuted;
    if (this.muted) {
      this.setVolume(0);
    } else {
      this.setVolume(this.volume);
    }
  }

  /**
   * Returns the current volume
   */
  public getMuted() {
    return this.muted;
  }

  /**
   * Returns the duration (in milliseconds)
   */
  public getDuration() {
    return this.player?.getDuration() ?? 0;
  }

  /**
   * Returns true whilst the player is buffering
   */
  public isBuffering() {
    return this.player?.isBuffering() ?? false;
  }

  /**
   * Returns true whilst the intended state is to be playing. This flips with
   * play() and pause() calls.
   */
  public isPlaying() {
    return this.player?.isPlaying() ?? false;
  }

  /**
   * Returns true whilst the player is actually playing
   */
  public isActuallyPlaying() {
    return this.player?.isActuallyPlaying() ?? false;
  }

  /**
   * Returns true if the player is dead because of an error
   */
  public hasErrored() {
    return this.player?.hasErrored() ?? false;
  }

  /**
   * Returns true if the player is dead
   */
  public isDead() {
    return this.player?.isDead() ?? true;
  }

  /**
   * Returns 'playing', 'paused', 'loading', 'ended', 'error' or 'dead'
   */
  public getState() {
    return this.player?.getState() ?? 'dead';
  }

  /**
   * Kill the player and unset `player` attribute. Call this when you
   * do not need it anymore.
   */
  public kill() {
    if (this.player) this.player.kill();
    this.player = undefined;
    this.destroyPollInterval();
    this.unset();
  }

  /**
   * Subscribes the handler to the given event
   * @param event
   * @param handler
   */
  public on(event: string, handler: any) {
    return this.player?.on(event, handler);
  }
}
