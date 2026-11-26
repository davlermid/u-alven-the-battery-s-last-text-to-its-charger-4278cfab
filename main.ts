import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", "1%. this is my last text. not because i'm dying, because you never plug me in. goodbye, stranger.");
