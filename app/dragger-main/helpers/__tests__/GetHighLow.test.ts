import { getHighLow } from '../getHighLow'

describe('getHighLow(x, y)', () => {
  it('return the high-low values in array form', () => {
    expect(getHighLow(4, 5)).toStrictEqual([5, 4])
    expect(getHighLow(5, 4)).toStrictEqual([5, 4])
    expect(getHighLow(3, 3)).toStrictEqual([3, 3])
    expect(getHighLow(0, 5)).toStrictEqual([5, 0])
  })
})
