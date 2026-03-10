import { createContext, useState, useMemo } from "react";

export const PaginationContext = createContext(null);

export const PageProvider =({children})=>{
    const [page, setPage] = useState(1);

  const moveToNextPage = () => setPage(prev => prev + 1);
  const moveToPrevPage = () => setPage(prev => prev - 1);

  const value = useMemo(()=>({
    page,
    setPage,
    moveToNextPage,
    moveToPrevPage
  }),[page])
return(
    <PaginationContext.Provider value={value}>
        {children}
    </PaginationContext.Provider>
)
}
