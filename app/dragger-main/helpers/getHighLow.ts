type GetHighLow = (x: number, y: number) => [number, number]

export const getHighLow: GetHighLow = (x: number, y: number) => {
  return [Math.max(...[x, y]), Math.min(...[x, y])]
}
