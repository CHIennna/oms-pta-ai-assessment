'use strict';

(function exposeJudgeScore(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.OMS_JUDGE_SCORE = api;
})(typeof globalThis === 'object' ? globalThis : this, () => {
  const rounded = value => Math.round((Number(value) || 0) * 10) / 10;

  function calculate(result = {}, question = {}) {
    const maxScore = Math.max(0, Number(question.score) || 0);
    const testCases = Array.isArray(result.testCases) ? result.testCases : [];
    const totalTests = Math.max(0, Number(result.totalTests) || testCases.length);
    const configuredScores = testCases.map(test => Math.max(0, Number(test.score) || 0));
    const configuredTotal = configuredScores.reduce((sum, score) => sum + score, 0);
    const useConfiguredScores = testCases.length === totalTests
      && configuredScores.some(score => score > 0)
      && Math.abs(configuredTotal - maxScore) < 0.01;
    const equalScore = totalTests ? maxScore / totalTests : 0;
    const caseScores = testCases.map((test, index) => useConfiguredScores ? configuredScores[index] : equalScore);
    let score = testCases.reduce((sum, test, index) => sum + (test.verdict === 'Accepted' ? caseScores[index] : 0), 0);

    if (!testCases.length && result.verdict === 'Accepted') score = maxScore;
    score = rounded(Math.max(0, Math.min(maxScore, score)));
    const status = result.verdict === 'Accepted' || (maxScore > 0 && score >= maxScore)
      ? 'accepted'
      : score > 0 ? 'partial' : 'wrong';
    return { score, maxScore, status, caseScores, totalTests };
  }

  return { calculate };
});
