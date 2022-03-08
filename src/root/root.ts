import { ApiResponse } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = "ktsstudio";

gitHubStore
  .getOrganizationReposList({
    organizationName: EXAMPLE_ORGANIZATION,
    page: 1,
    perPage: 1,
  })
  .then((result: ApiResponse<RepoItem[], any>) => {
    if (result.success) {
      // eslint-disable-next-line no-console
      console.log(
        result.data.map((repo) => {
          return repo.name;
        })
      );
    }

    // eslint-disable-next-line no-console
    console.log(result); // в консоли появится список репозиториев в ktsstudio
  });
