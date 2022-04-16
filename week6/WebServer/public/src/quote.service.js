//quote service that configs messages for CRUD
const QUOTES_API = BASE_API_URL+ '/quotes';

const getQuotes = () => _get(QUOTES_API, DEFAULT_OPTIONS_WITH_AUTH);

const createQuote = (formData) => _post(QUOTES_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

const readQuote = (quoteId) => _post(QUOTES_API, quoteId, DEFAULT_OPTIONS_WITH_AUTH);

const updateQuote = (formData) => _post(QUOTES_API + '/' + formData._id, formData, DEFAULT_OPTIONS_WITH_AUTH);

const deleteQuote = (quoteId) => _delete(QUOTES_API + '/' + quoteId, DEFAULT_OPTIONS_WITH_AUTH);
