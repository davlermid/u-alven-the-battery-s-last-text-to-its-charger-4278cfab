import { closeSync, fsyncSync, mkdirSync, openSync, renameSync, writeFileSync } from "node:fs";

// Teks pemenang — jangan diubah: 97 karakter, tanpa trailing newline.
const TEXT =
  "1%. this is my last text. not because i'm dying, because you never plug me in. goodbye, stranger.";
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;

mkdirSync(OUTPUT_DIR, { recursive: true });

// Tulis atomik: tulis ke file temp + fsync, lalu rename ke entry.txt,
// supaya entry.txt tidak pernah berisi tulisan setengah jadi bila proses mati di tengah jalan.
const tmpPath = `${OUTPUT_PATH}.tmp-${process.pid}`;
const fd = openSync(tmpPath, "w");
try {
  writeFileSync(fd, TEXT);
  fsyncSync(fd);
} finally {
  closeSync(fd);
}
renameSync(tmpPath, OUTPUT_PATH);
