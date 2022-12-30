export default function sleep(waitTime: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(resolve, waitTime);
  });
}
