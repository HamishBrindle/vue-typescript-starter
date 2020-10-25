import { SoundcloudStreamer } from '@/lib/SoundcloudStreamer';
import { Logger } from '@/tools/Logger';
import SoundCloud from 'soundcloud';

/**
 * SoundCloud Service for interacting with the SoundCloud API
 */
export class SoundcloudService {
  /**
   * Soundcloud client
   */
  private readonly client: any = SoundCloud;

  /**
   * Soundcloud client
   */
  private streamer = new SoundcloudStreamer();

  /**
   * Logger
   */
  private readonly logger: Logger = new Logger({ context: 'SoundcloudService' });

  /**
   * Cached instance of the service
   */
  private static instance: SoundcloudService | null = null;

  /**
   * Get an instance of the UserService
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new SoundcloudService();
      this.instance.initialize();
      return this.instance;
    }
    return this.instance;
  }

  /**
   * Initialize SoundCloud client with client ID, etc.
   */
  private initialize() {
    this.client.initialize({
      client_id: process.env.VUE_APP_SOUNDCLOUD_CLIENT_ID,
    });
  }

  public async stream(trackId: string | number): Promise<void> {
    try {
      const scPlayer = await this.api.stream(trackId);
      const streamer = this.getStreamer();
      if (scPlayer) streamer.setPlayer(scPlayer);
    } catch (error) {
      this.logger.error(error);
      throw Error('There was an error while attempting to stream. Sorry - try again!');
    }
  }

  public get api() {
    return {
      resolve: async (url: string) => this.client.resolve(url),
      stream: async (trackId: string | number) => this.client.stream(`/tracks/${trackId}`),
    };
  }

  public getStreamer() {
    return this.streamer;
  }

  public getStreamerPlayer() {
    return this.streamer.getPlayer;
  }

  public setStreamerPlayer(player: any): void {
    if (this.getStreamer().getPlayer()) {
      this.getStreamer().kill();
    }

    this.getStreamer().setPlayer(player);
  }
}

export default SoundcloudService;
