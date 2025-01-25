import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
/**
 * @param {string} directory
 * @param {RegExp} regex
 * @returns {Promise<string[]>}
 */
export async function getLocalFiles(directory, regex) {
  const files = await readdir(directory);
  return files.filter((file) => regex.test(file));
}

/**
 * @param {string} url
 * @param {string} regex
 * @returns {Promise<string>}
 */
export async function fetchRemoteUrl(url, regex) {
  const { JSDOM } = await import("jsdom");
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const links = doc.getElementsByTagName("a");

  for (const link of links) {
    const href = link.href;
    if (regex.test(href)) {
      return new URL(href, url).toString();
    }
  }

  throw new Error("No matching remote torrent found");
}

/**
 * @param {string} url
 * @returns {string}
 */
export function getFilenameFromUrl(url) {
  return url.split("/").pop();
}

/**
 * @param {string} url
 * @param {string} directory
 */
export async function downloadFile(url, directory) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const filename = url.split("/").pop();
  const path = join(directory, filename);
  await writeFile(path, Buffer.from(arrayBuffer));
}
