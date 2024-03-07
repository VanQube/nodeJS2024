import os from "os";
import child_process from "child_process";
import fs from "fs";

const isWin = os.type().toLowerCase() === "win32";

const execProcess = (command) => {
  const outArr = [];
  setInterval(() => {
    child_process.exec(command, (error, stdout, stderr) => {
        console.clear();
        console.log(stdout);
        outArr.push(`${Date.now()} : ${stdout}`);

        if (stderr) {
          console.log(`error: ${error}`);
        }
      });
  }, 100);

  setInterval(() => {
    fs.appendFile('activityMonitor.log', outArr.join(''), 'utf-8', (err) => {
        if (err) throw err;
        outArr.length = 0;
      });
}, 60000);
};

execProcess(
  isWin
    ? `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }`
    : "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1"
);
