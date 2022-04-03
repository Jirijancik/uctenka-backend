import Redis from "ioredis";
import consola from "consola";

let count = 0;

const retryStrategy = (times: number) => {
  if (times > 3) {
    consola.warn({
      badge: true,
      message: `Reddis is retrying connection!`,
    });
  }

  if (times > 5) {
    consola.error({
      badge: true,
      message: `Reddis NOT connected!`,
    });
    return undefined;
  }
  // reconnect after
  return Math.min(times * 600, 6000);
};

const onError = (error: unknown) => {
  return undefined;
  // process.exit(1);
};

export const redis = new Redis({ retryStrategy }).on("error", onError);
