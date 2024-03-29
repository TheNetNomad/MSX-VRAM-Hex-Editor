# MSX VRAM Hex Editor

[Try it here!](https://netnomad.dxcomplex.com/msxVramEdit/)

This webpage allows you to upload MSX VRAM dumps, edit them in a hex editor, and then load them into webMSX to see the result. The code is based on and highly derivitave of Jannone's [webMSX integration template](https://github.com/jannone/webmsx-integration-template) and thiscouldbebetter's [HexEditor](https://github.com/thiscouldbebetter)

## Usage

To begin, you can either start typing in the text areas on the left hand side of the screen, or click the "Upload" button below them to upload VRAM dump. These can be created using the BSAVE command in BASIC or with a tool like Jannone's [MSX Screen Converter](https://msx.jannone.org/conv/). There are two text areas to concern yourself with- the Header area and the main text area. The header area contains the 7-byte header that starst every VRAM dump. THe first byte is typically 0xfe, the next two are the address to start loading at, followed by the address to stop loading at, followed by the execution address (which I believe does nothing when loading to VRAM so they can just stay 0000). The main text area below that is everything that will be loaded into VRAM. The offsets to the left start here, so even though your first byte of VRAM is the eight byte of the dump, it will read here as 0x00. If your start address in the header is 0x0000, these offsets will correspond to the exact address any given line of bytes will appear in VRAM. 

The save button allows you to save the dump you are editing. To the right is a webMSX instance. Below it is a dropdown to select your desired screen mode- VRAM dumps do not contain this information so it is very important that you set it manually yourself otherwise your presumably otherwise beautiful VRAM contents will appear garbled. After selecting a screen mode, hit "View VRAM Dump" to see it in the emulator. You can also download the generated disk by right-clicking the first floppy in the bottom left corner of the emulator and choosing "Save Disk Image" so that you may also view this on a physical MSX. 
