export function toCamelCase(rows, includeValues = false) {
  return rows.map((row) => {
    const replaced = {};
    console.log("row: ", row);
    for (let key in row) {
      const camelCaseKey = key.replace(/([-_][a-z])/gi, ($1) =>
        $1.toUpperCase().replace("_", "")
      );
      if (includeValues) {
        const camelCaseValue =
          typeof row[key] === "string"
            ? row[key].replace(/([-_][a-z])/gi, ($1) =>
                $1.toUpperCase().replace("_", "")
              )
            : row[key];
        replaced[camelCaseKey] = camelCaseValue;
      } else {
        replaced[camelCaseKey] = row[key];
      }
    }
    return replaced;
  });
}
