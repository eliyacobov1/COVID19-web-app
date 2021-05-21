export const serverAPIPort = 3232;
export const host = 'http://localhost'
export const APIDomain = 'covid-trip';
export const APIPath = `/api/${APIDomain}`;
export const APIRootPath = `${host}:${serverAPIPort}${APIPath}`
export const APIRootPagePath = `${APIRootPath}?page=`;
export const staticsPort = 3000;
export const staticsUrl = `${host}:${staticsPort}/`;
export const restrictionsPath = `${APIRootPath}/restrictions`
// string query paths for the search parameter, page number, page size
export const APIPageLimitQuery = '&PageLimit=';
export const APIPageQuery = 'page=';
export const APISearchQuery = '?superSearch=';
export  const restrictionsSearchQuery = '?rest='
