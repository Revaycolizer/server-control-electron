import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel: string, data: any) => ipcRenderer.send(channel, data),
    on: (channel: string, listener: (event: any, ...args: any[]) => void) => ipcRenderer.on(channel, listener),
    removeListener: (channel: string, func: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.removeListener(channel, func)
  },
});
