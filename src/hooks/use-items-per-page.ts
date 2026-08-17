import * as React from "react";

export function useItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(12);

  React.useEffect(() => {
    const updateItems = () => {
      // Celular (< 640px): 10 produtos (5 fileiras x 2 colunas)
      // PC / Telas maiores (>= 640px): 12 produtos (3 fileiras x 4 colunas)
      setItemsPerPage(window.innerWidth < 640 ? 10 : 12);
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  return itemsPerPage;
}
