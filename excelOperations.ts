export async function handleSortOperation(
  context: Excel.RequestContext,
  range: Excel.Range,
  aiResponse: string
) {
  const match = aiResponse.match(/sort.*by\s+(\w+)/i);
  if (match) {
    const columnName = match[1];
    const header = range.getRow(0);
    await context.sync();
    
    const headerValues = header.values[0];
    const columnIndex = headerValues.findIndex(
      (h: string) => h.toLowerCase() === columnName.toLowerCase()
    );
    
    if (columnIndex !== -1) {
      range.sort.apply([{
        key: columnIndex,
        ascending: true
      }]);
    }
  }
}

export async function handleFilterOperation(
  context: Excel.RequestContext,
  range: Excel.Range,
  aiResponse: string
) {
  const match = aiResponse.match(/filter.*where\s+(\w+)\s*(>|<|=|>=|<=)\s*(\d+)/i);
  if (match) {
    const [_, column, operator, value] = match;
    const header = range.getRow(0);
    await context.sync();
    
    const headerValues = header.values[0];
    const columnIndex = headerValues.findIndex(
      (h: string) => h.toLowerCase() === column.toLowerCase()
    );
    
    if (columnIndex !== -1) {
      range.autoFilter.apply(range, {
        columnIndex,
        criteria1: `${operator}${value}`,
        filterOn: Excel.FilterOn.values
      });
    }
  }
}