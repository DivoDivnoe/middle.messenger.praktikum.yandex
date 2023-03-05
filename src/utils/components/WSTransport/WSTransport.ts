import EventEmitter from '../EventEmitter';

export enum SocketEvent {
  MESSAGE = 'message',
  CLOSE = 'close',
}

class WSTransport extends EventEmitter {
  private _socket: WebSocket | null = null;
  private _url: string;
  private _pingPongIntervalId: number | null = null;

  constructor(url: string) {
    super();

    this._url = url;
  }

  public connect(): Promise<unknown> {
    const socket = new WebSocket(this._url);
    this._socket = socket;

    this._subscribe(socket);

    return new Promise<void>((resolve, reject) => {
      socket?.addEventListener('open', () => {
        this._setupPingPong();
        resolve();
      });
      socket?.addEventListener('close', reject);
    });
  }

  public disconnect(): void {
    this._socket?.close();
  }

  public send<T>(data: T): void {
    if (!this._socket) {
      throw new Error('WebSocket connection is not established yet');
    }

    this._socket.send(JSON.stringify(data));
  }

  private _setupPingPong(delay = 10000): void {
    this._pingPongIntervalId = window.setInterval(() => {
      this.send({ type: 'ping' });
    }, delay);
  }

  private _subscribe(socket: WebSocket): void {
    socket.addEventListener('message', (message): void => {
      const data = JSON.parse(message.data);

      if (data.type === 'pong') return;

      this.emit(SocketEvent.MESSAGE, data);
    });

    socket.addEventListener('close', (): void => {
      if (this._pingPongIntervalId !== null) {
        clearInterval(this._pingPongIntervalId);
      }

      this.emit(SocketEvent.CLOSE);
    });
  }
}

export default WSTransport;
