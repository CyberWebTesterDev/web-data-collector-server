export const doOnException = (e: NodeJS.ErrnoException) => {
  console.error(e);
};

export const doOnFileNotFound = (fileName: string) => {
  console.error(`File with name ${fileName} has not been found`);
};
