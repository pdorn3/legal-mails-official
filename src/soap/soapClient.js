export function createSoapClient({ baseUrl }) {
  return {
    async submitFiling(envelope) {
      const error = new Error('SOAP_NOT_IMPLEMENTED');
      error.code = 'SOAP_NOT_IMPLEMENTED';
      throw error;
    },

    async searchCase(query) {
      const error = new Error('SOAP_NOT_IMPLEMENTED');
      error.code = 'SOAP_NOT_IMPLEMENTED';
      throw error;
    },

    baseUrl,
  };
}
