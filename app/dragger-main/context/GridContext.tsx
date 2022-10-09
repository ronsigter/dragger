import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

type StartGrid = {
  row: number
  column: number
}

type ContextType = {
  startGrid: StartGrid
  setStartGrid: Dispatch<SetStateAction<StartGrid>>
  hoverGrid: StartGrid
  setHoverGrid: Dispatch<SetStateAction<StartGrid>>
  color: string
  setColor: Dispatch<SetStateAction<string>>
  stillDown: boolean
  setStillDown: Dispatch<SetStateAction<boolean>>
}

const initialGrid = {
  row: 0,
  column: 0,
}

const GridContext = createContext<ContextType>({
  startGrid: initialGrid,
  setStartGrid: () => {},
  hoverGrid: initialGrid,
  setHoverGrid: () => {},
  color: 'white',
  setColor: () => {},
  stillDown: false,
  setStillDown: () => {},
})

export const GridContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [startGrid, setStartGrid] = useState<StartGrid>(initialGrid)
  const [hoverGrid, setHoverGrid] = useState<StartGrid>(initialGrid)
  const [stillDown, setStillDown] = useState<boolean>(false)
  const [color, setColor] = useState<string>('white')

  const value = useMemo(
    () => ({
      startGrid,
      setStartGrid,
      hoverGrid,
      setHoverGrid,
      color,
      setColor,
      stillDown,
      setStillDown,
    }),
    [
      startGrid,
      setStartGrid,
      hoverGrid,
      setHoverGrid,
      color,
      setColor,
      stillDown,
      setStillDown,
    ]
  )

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>
}

export const useGridContext = () => useContext(GridContext)
