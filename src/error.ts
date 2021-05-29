/**
 *
 * Format error that is caused by a simple function.
 * @param {string} functionName - Function that throws the error.
 * @param {any} input - Input value of the function.
 * @param {any} output - Output potential of the function if any.
 * @param {any} error - The actual error.
 */
const logErrorFunctions = (functionName: string, input: any = '', output: any = '', error: any) => {
  const currentTimeStamp = new Date();
  const checkError = error ? error : 'Error contains nothing';
  console.log(`Error on ${currentTimeStamp} at ${functionName}`);
  console.log('Input:');
  console.log(input);
  console.log('Output:');
  console.log(output);
  throw checkError;
};

export {
  logErrorFunctions,
}