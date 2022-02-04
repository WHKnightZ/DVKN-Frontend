/**
 * Add column number to the table
 * @param item
 * @param index
 * @param page
 */
export const addNumber = (item: any, index: number, page: number, pageSize: number) => {
  return { ...item, number: index + 1 + pageSize * (page - 1) }
}
