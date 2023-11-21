async function withLoading(dispatch, action, handleError) {
  try {
    dispatch(setIsLoading(true));
    await action();
  } catch (error) {
    console.error(error);
    if (handleError) {
      handleError(error);
    }
  } finally {
    dispatch(setIsLoading(false));
  }
}

export default withLoading;
