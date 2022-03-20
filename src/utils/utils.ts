export const dateFormatFromString = (date: string) => {
  const dateF: Date = new Date(date);
  return dateF.toDateString();
};

export const dateFormatFromDate = (date: Date) => {
  return date.toDateString();
};

export const urls = {
  BASE_URL: "https://api.github.com",
  api: {
    orgRepos: (organizationName: string): string =>
      `/orgs/${organizationName}/repos`,
    repoBranches: (ownerName: string, repoName: string): string =>
      `/repos/${ownerName}/${repoName}/branches`,
  },
  router: {
    openRepo: (loginOwner: string, nameRepo: string): string =>
      `/repos/${loginOwner}/${nameRepo}`,
  },
};
