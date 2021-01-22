jest.mock('axios');
const service = require('./quadratic');

describe('Test Quadratic Equation Solver Services', () => {
  it('expects rejection if ai is not configured', () => {
    // given
    // when
    expect.assertions(1);
    service.solveSync(1, 2, 1)
      .catch((err) => {
        expect(err).not.toBeNull();
      });
    // then
  });
});
