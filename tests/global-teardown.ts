import fs from "fs";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function globalTeardown() {
  await fs.unlink("data.json", (err) => {
    if (err) {
      throw err;
    }
  });
}

export default globalTeardown;