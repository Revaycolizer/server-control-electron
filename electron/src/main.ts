import { is } from "@electron-toolkit/utils";
import { exec } from "child_process";
import { app, BrowserWindow, ipcMain, Menu, Tray } from "electron";
import { getPort } from "get-port-please";
import { startServer } from "next/dist/server/lib/start-server";
import {join } from 'path';


let tray:any;

const controlService = (service:any, action:any) => {
  const command = `pkexec systemctl ${action} ${service}`;
  exec(command, (error, stdout, stderr) => {
    const message = error ? `Error: ${stderr}` : `Success: ${stdout}`;
 
    if (tray) {
      tray.displayBalloon({
        title: `${action?.charAt(0)?.toUpperCase() + action?.slice(1)} ${service?.charAt(0)?.toUpperCase() + service?.slice(1)}`,
        content: message,
      });
    }
  });
};


function createTray(mainWindow:any) {
  tray = new Tray(join(__dirname, '../public/icon.png')); 
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Start Apache',
      click: () => controlService('apache2', 'start'),
    },
    {
      label: 'Stop Apache',
      click: () => controlService('apache2', 'stop'),
    },
    {
      label: 'Start MySQL',
      click: () => controlService('mysql', 'start'),
    },
    {
      label: 'Stop MySQL',
      click: () => controlService('mysql', 'stop'),
    },
    {
      type: 'separator',
    },
    {
      label: 'Exit',
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip('Server Control');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  return tray; 
}  

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 450,
    maxWidth: 800,
    maxHeight: 450,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': ['default-src \'self\' \'unsafe-inline\' \'unsafe-eval\' data:'],
        },
      });
    });
  });

  mainWindow.on("ready-to-show", () => mainWindow.show());

  const loadURL = async () => {
    if (is.dev) {
      mainWindow.loadURL("http://localhost:3000");
    } else {
      try {
        const port = await startNextJSServer();
        console.log("Next.js server started on port:", port);
        mainWindow.loadURL(`http://localhost:${port}`);
      } catch (error) {
        console.error("Error starting Next.js server:", error);
      }
    }
  };
  tray = createTray(mainWindow);
  loadURL();
  return mainWindow;
};

const startNextJSServer = async () => {
  try {
    const nextJSPort = await getPort({ portRange: [30_011, 50_000] });
    const webDir = join(app.getAppPath(), "app");

    await startServer({
      dir: webDir,
      isDev: false,
      hostname: "localhost",
      port: nextJSPort,
      customServer: true,
      allowRetry: false,
      keepAliveTimeout: 5000,
      minimalMode: true,
    });

    return nextJSPort;
  } catch (error) {
    console.error("Error starting Next.js server:", error);
    throw error;
  }
};

app.whenReady().then(() => {
  createWindow();

  ipcMain.on("ping", () => console.log("pong"));
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on('control-service', (event, service, action) => {
  controlService(service, action);
});