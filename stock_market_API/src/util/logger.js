import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Use `fileURLToPath` to convert `import.meta.url` to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the logs directory and ensure it exists
const logsDir = path.join(__dirname, "../Logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Arrow function to log messages with a timestamp
const logToFile = (transactionType, message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;
  const filename = `${transactionType.toLowerCase()}_logs.txt`;

  fs.appendFile(path.join(logsDir, filename), logMessage, (err) => {
    if (err) console.error("Failed to write to log file:", err);
  });
};

export { logToFile };
