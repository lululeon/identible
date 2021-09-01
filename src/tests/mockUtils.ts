export const wait = (millisecs: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, millisecs))
}
