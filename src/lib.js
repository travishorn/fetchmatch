import { readdir, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

/**
 * @param {string} directory
 * @param {RegExp} regex
 * @returns {Promise<string[]>}
 */
export async function getLocalFiles(directory, regex) {
  try {
    const files = await readdir(directory);
    return files.filter((file) => regex.test(file));
  } catch (err) {
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
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
 * @param {string} regex
 * @returns {Promise<string[]>}
 */
export async function fetchRemoteUrls(url, regex) {
  const { JSDOM } = await import("jsdom");
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const links = doc.getElementsByTagName("a");
  const matches = new Set();

  for (const link of links) {
    const href = link.href;
    if (regex.test(href)) {
      matches.add(new URL(href, url).toString());
    }
  }

  if (matches.size === 0) {
    throw new Error("No matching remote files found");
  }

  return Array.from(matches);
}

/**
 * @param {string[]} urls
 * @param {string} directory
 */
export async function downloadFiles(urls, directory) {
  try {
    await mkdir(directory, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }

  const downloads = urls.map(async (url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const filename = url.split("/").pop();
    const path = join(directory, filename);
    await writeFile(path, Buffer.from(arrayBuffer));
  });

  await Promise.all(downloads);
}
