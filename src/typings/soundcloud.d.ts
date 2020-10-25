declare module 'soundcloud' {
  export default class SoundCloud {
    static initialize (options: any): any;

    static connect(options: any): Promise<any>;

    static stream(trackPath: string, secretToken?: string): Promise<any>;

    static resolve(url: string): Promise<any>;
  }
}
