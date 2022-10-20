import { useMatch } from "@tanstack/react-location";
import { useQuery } from "react-query";

import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";
import TestResultTable from "/src/components/test-result/test-result-table";

import { QueryKeys } from "/src/constants/query-keys";
import { getTestResultsByCourseApi } from "/src/helpers/fetchers";

export default function CourseLeaderboard() {
  // location
  const {
    params: { courseId },
  } = useMatch();

  // query
  const testResultsQuery = useQuery(
    [QueryKeys.TEST_RESULTS_BY_COURSE, courseId],
    () => getTestResultsByCourseApi(courseId)
  );

  //console.log(testResultsQuery);

  return (
    <div className="space-y-4 lg:space-y-8">
      <div className="flex items-center gap-2 lg:gap-4">
        <button
          className="btn btn-primary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <h2 className="text-2xl font-bold lg:text-3xl">Leaderboard</h2>
      </div>

      {testResultsQuery.isLoading ? (
        <Loading />
      ) : testResultsQuery.isError || !testResultsQuery.data ? (
        <Error text={testResultsQuery.error.response?.data?.message} />
      ) : (
        <TestResultTable testResults={testResultsQuery.data} />
      )}
    </div>
  );
}
