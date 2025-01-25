#!/usr/bin/env node

import { program } from "commander";
import {
  getLocalFiles,
  fetchRemoteUrl,
  getFilenameFromUrl,
  downloadFile,
} from "./lib.js";

program
  .name("debtorrent")
  .description("Downloads the latest Debian netinst torrent file")
  .version("0.1.0")
  .option("-v, --verbose", "print verbose output")
  .option(
    "-d, --dir <directory>",
    "directory to store torrent files",
    process.cwd()
  )
  .option(
    "-a, --arch <architecture>",
    "CPU architecture (amd64, i386, arm64, etc)",
    "amd64"
  );

program.parse();

const options = program.opts();

const TORRENT_REGEX = new RegExp(
  `debian-\\d+\\.\\d+\\.\\d+-${options.arch}-netinst\\.iso\\.torrent`
);
const TORRENTS_URL = `https://cdimage.debian.org/debian-cd/current/${options.arch}/bt-cd/`;

const localTorrents = await getLocalFiles(options.dir, TORRENT_REGEX);
if (options.verbose) {
  console.log(`Found ${localTorrents.length} local torrent files`);
}

const remoteTorrentUrl = await fetchRemoteUrl(TORRENTS_URL, TORRENT_REGEX);
if (options.verbose) {
  console.log(`Found remote torrent: ${remoteTorrentUrl}`);
}

const remoteTorrent = getFilenameFromUrl(remoteTorrentUrl);

if (!localTorrents.includes(remoteTorrent)) {
  await downloadFile(remoteTorrentUrl, options.dir);
  if (options.verbose) {
    console.log("Downloaded new torrent file");
  }
} else if (options.verbose) {
  console.log("Latest torrent file already exists locally");
}
