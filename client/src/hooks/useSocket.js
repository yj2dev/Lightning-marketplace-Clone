import { io } from "socket.io-client";
import { useCallback } from "react";

const sockets = {};

const useSocket = (namespace) => {
  const disconnect = useCallback(() => {
    if (namespace) sockets[namespace].disconnect();
    delete sockets[namespace];
  }, []);

  if (!namespace) return [undefined, disconnect];

  sockets[namespace] = io.connect(`https://localhost:/ws-${namespace}`);

  sockets[namespace].emit("rootServer", { test: "connect socket..." });

  sockets[namespace].on("rootClient", (data) => {
    console.log("rootClient data >> ", data);
  });

  sockets[namespace].on("rootClient2", (data) => {
    console.log("rootClient2 data >> ", data);
  });

  return [sockets[namespace], disconnect];
};

export default useSocket;
