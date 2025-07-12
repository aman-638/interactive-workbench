export const createWebSocketConnection = (
  kernelId: string,
  token: string,
  onMessage: (message: any) => void
) => {
  const ws = new WebSocket(
    `ws://localhost:8000/user/admin/api/kernels/${kernelId}/channels?token=${token}`
  );

  ws.onopen = () => {
    console.log("WebSocket connection opened");
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    onMessage(message);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed");
  };

  return ws;
};
