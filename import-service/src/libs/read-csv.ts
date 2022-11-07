import csv from "csv-parser";

const defaultOptions = { separator: ';' }

export const readCsvFile = async (stream, callback, options = {}): Promise<void> =>
  new Promise((resolve, reject) => {
    stream
      .pipe(csv({ ...defaultOptions, ...options }))
      .on("data", async (data) => await callback(data))
      .on("end", () => {
        console.info("[CSV Stream] End");
        resolve();
      })
      .on("error", (error) => {
        console.error("[CSV Stream] Error:\n");
        reject();
        throw error;
      });
  });