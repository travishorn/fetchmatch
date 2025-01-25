# fetchmatch

A command-line tool to download files that match a specific pattern.

Simply provide a URL and a regular expression (regex) pattern. The tool will
search the page for all file links, and automatically download any files whose
names match your pattern.

## Installation

```sh
npm install -g fetchmatch
```

The `fetchmatch` command will be available on the command line.

## Usage

```sh
fetchmatch -u "yoururl" -r "yourregex"
```

Example:

```sh
fetchmatch -u "https://cdimage.debian.org/debian-cd/current/amd64/bt-cd/" -r "debian-\d+\.\d+\.\d+-amd64-netinst\.iso\.torrent"
```

This will download the current Debian torrent file from debian.org.

## Arguments

- `-u, --url <url>`: The remote URL from which to fetch files.
- `-r, --regex <regex>`: The regex to match files.
- `-d, --dir <directory>`: The directory to write files, defaults to the current
  working directory.

## Contributing

Contributions are welcome! Kindly run `npm run format` and `npm run lint` before
committing code and submitting a pull request.

## License

The MIT License (MIT)

Copyright © 2025 Travis Horn

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
