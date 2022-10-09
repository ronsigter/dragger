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
  startGrid?: StartGrid
  setStartGrid: Dispatch<SetStateAction<StartGrid | undefined>>
  hoverGrid?: StartGrid
  setHoverGrid: Dispatch<SetStateAction<StartGrid | undefined>>
  color: string
  setColor: Dispatch<SetStateAction<string>>
  stillDown: boolean
  setStillDown: Dispatch<SetStateAction<boolean>>
}

const GridContext = createContext<ContextType>({
  startGrid: undefined,
  setStartGrid: () => {},
  hoverGrid: undefined,
  setHoverGrid: () => {},
  color: 'white',
  setColor: () => {},
  stillDown: false,
  setStillDown: () => {},
})

export const GridContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [startGrid, setStartGrid] = useState<StartGrid | undefined>()
  const [hoverGrid, setHoverGrid] = useState<StartGrid | undefined>()
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
