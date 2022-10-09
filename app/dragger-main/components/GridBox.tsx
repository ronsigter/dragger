import { Box } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useGridContext } from '../context/GridContext'
import { getHighLow } from '../helpers'

type GridBoxProps = { row: number; column: number }

export const GridBox: React.FC<GridBoxProps> = (grid) => {
  const {
    startGrid,
    setStartGrid,
    setHoverGrid,
    hoverGrid,
    color,
    setColor,
    stillDown,
    setStillDown,
  } = useGridContext()
  const gridBoxRef = useRef<HTMLDivElement>(null)
  const [gridColor, setGridColor] = useState<string>('rgb(255, 255, 255)')

  const handleOnMouseDown = (): void => {
    if (!stillDown) {
      setStartGrid(grid)
      setHoverGrid(grid)
      setStillDown(true)

      if (gridBoxRef.current) {
        const currentColor = window.getComputedStyle(
          gridBoxRef.current
        ).backgroundColor

        const selectedColor =
          currentColor === 'rgb(255, 255, 255)' ? 'red' : 'rgb(255, 255, 255)'
        setColor(selectedColor)
      }
    } else {
      setStillDown(false)
      setHoverGrid(grid)
    }
  }

  const handleOnMouseEnter = (): void => {
    if (!stillDown) return
    setHoverGrid(grid)
  }

  useEffect(() => {
    const { row, column } = grid
    const [highRow, lowRow] = getHighLow(startGrid.row, hoverGrid.row)
    const [highCol, lowCol] = getHighLow(startGrid.column, hoverGrid.column)
    const isWithinRow = lowRow <= row && row <= highRow
    const isWithinCol = lowCol <= column && column <= highCol

    if (isWithinRow && isWithinCol) setGridColor(color)
  }, [color, grid, hoverGrid, startGrid])

  return (
    <Box
      w='2rem'
      h='2rem'
      border='solid 1px black'
      bgColor={gridColor}
      onMouseDown={handleOnMouseDown}
      onMouseEnter={handleOnMouseEnter}
      ref={gridBoxRef}
    />
  )
}
