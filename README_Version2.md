# Bitfocus Companion Module: Sierra Video Aspen Video Router

This module controls Sierra Video Aspen Video Routers (72x72) via TCP/IP using the published ASCII protocol.

## Features

- Set up router IP and port
- Route any input to any output (1-72)

## Installation

1. Extract the contents of this archive to your Companion user modules directory:
   - `C:\ProgramData\bitfocus\companion\modules\user\companion-module-sierra-aspen`
2. Restart Bitfocus Companion.
3. Add the module in the Companion UI, configure IP/port, and start routing!

## Building .tgz for Installation

To package as a `.tgz` for upload/install:
1. In this folder, run:

   ```
   npm pack
   ```

   This will create `companion-module-sierra-aspen-1.0.0.tgz`.

2. In Companion UI, go to Modules → User Modules → Install from file, and select the `.tgz` file.

---

**Protocol Reference:**  
[Sierra Aspen Video Router Protocol PDF](https://www.bhphotovideo.com/lit_files/1073278.pdf)