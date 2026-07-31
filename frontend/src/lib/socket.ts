import { io, Socket } from 'socket.io-client';
import { LocationNode } from '@/types/location';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });
  }
  return socket;
}

export function subscribeToCrowdUpdates(
  onUpdate: (updatedNode: Partial<LocationNode> & { id: string }) => void
) {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
  }

  s.on('crowd_update', (data) => {
    onUpdate(data);
  });

  return () => {
    s.off('crowd_update');
  };
}
