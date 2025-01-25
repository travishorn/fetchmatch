#!/usr/bin/env node

import { program } from "commander";
import {
  fetchRemoteUrls,
  getFilenameFromUrl,
  getLocalFiles,
  downloadFiles,
} from "./lib.js";

program
  .name("fetchmatch")
  .description("Downloads files matching a regex from a remote URL")
  .version("0.1.0")
  .requiredOption("-u, --url <url>", "remote URL from which to fetch files")
  .requiredOption("-r, --regex <regex>", "regex to match files")
  .option("-d, --dir <directory>", "directory to write files", process.cwd());

program.parse();

const { url, regex: regexStr, dir } = program.opts();
const regex = new RegExp(regexStr);

const remoteUrls = await fetchRemoteUrls(url, regex);

const remoteFilenames = remoteUrls.map((url) => getFilenameFromUrl(url));

const localFiles = await getLocalFiles(dir, regex);

const newRemoteUrls = remoteUrls.filter(
  (_, i) => !localFiles.includes(remoteFilenames[i]),
);

if (newRemoteUrls.length === 0) {
  process.exit(0);
}

await downloadFiles(newRemoteUrls, dir);
