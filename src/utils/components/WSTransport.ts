import EventEmitter from './EventEmitter';

export enum SocketEvent {
  MESSAGE = 'message',
}

class WSTransport extends EventEmitter {
  private _socket: WebSocket | null = null;
  private _url: string;

  constructor(url: string) {
    super();

    this._url = url;
  }

  connect(): Promise<unknown> {
    const socket = new WebSocket(this._url);
    this._socket = socket;

    this._subscribe(socket);

    return new Promise((resolve, reject) => {
      socket?.addEventListener('open', resolve);
      socket?.addEventListener('close', reject);
    });
  }

  send<T>(data: T): void {
    if (!this._socket) {
      throw new Error('WebSocket connection is not established yet');
    }

    this._socket.send(JSON.stringify(data));
  }

  private _subscribe(socket: WebSocket): void {
    socket.addEventListener('message', (message): void => {
      const data = JSON.parse(message.data);

      if (data.type === 'pong') return;

      this.emit(SocketEvent.MESSAGE, data);
    });
  }
}

export default WSTransport;
