const chalk = require( "chalk")
const chalkAnimation = require("chalk-animation")
const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const { dialog, Menu, MenuItem } = require("electron/main");

const menu = new Menu();

if (process.platform === "darwin") {
  const appMenu = new MenuItem({ role: "appMenu" });
  menu.append(appMenu);
}

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true, // REQUIRED
      nodeIntegration: false,
    },
  });

 

  const submenu = Menu.buildFromTemplate([
    {
      label: "DevTools",
      click: () => win.webContents.openDevTools(),
      accelerator: "CommandOrControl+Alt+F",
    },
    {
      label: "Reset",
      click: () => win.reload(),
      accelerator: "R",
    },
  ]);

  menu.append(new MenuItem({ label: "Settings", submenu }));

  Menu.setApplicationMenu(menu);

  win.loadFile(path.join(__dirname, "public/index.html"));
  //   win.webContents.openDevTools() // ← opens the console
}


ipcMain.handle("get-images", async () => {
  console.log("IPC request received, starting app."); 
  const dir = path.join(__dirname, "public/images");
  const files = await fs.promises.readdir(dir);
  
const rainbow = chalkAnimation.rainbow('Simulation Running')

  return { files }; 
});

app.whenReady().then(createWindow);
