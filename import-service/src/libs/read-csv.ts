import csv from "csv-parser";

export const readCsvFile = async (stream, callback): Promise<void> =>
  new Promise((resolve, reject) => {
    stream
      .pipe(csv({ separator: ';' }))
      .on("start", () => console.info("[CSV Stream] Start"))
      .on("data", callback)
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
