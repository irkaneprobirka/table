export const cellContentRender = (
  colId: string,
  countryParam: any,
  index?: number
) => {
  switch (colId) {
    case 'index':
      return index != undefined ? index + 1 : '';
    case 'name':
      return countryParam;
    case 'languages':
        console.log(countryParam);
      const languages = countryParam.languages
        ? Object.keys(countryParam.languages)
        : [];
      return languages.length > 1
        ? `${languages.length} языка(ов)`
        : languages.join(', ');
    case 'region':
      return countryParam;
    case 'population':
      return countryParam;
    case 'status':
      return countryParam;
    case 'startOfWeek':
      return countryParam;
    default:
      return '';
  }
};
