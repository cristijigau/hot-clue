const platform = process.platform;
const isMac = platform === "darwin";
const isWindows = platform === "win32";
const isLinux = platform === "linux";

module.exports = {
  isMac,
  isWindows,
  isLinux,
};
