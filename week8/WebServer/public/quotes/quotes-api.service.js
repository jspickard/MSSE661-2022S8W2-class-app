//quote service that configs messages for CRUD
const QUOTES_API = BASE_API_URL+ '/quotes';

class QuotesAPIService {
    getQuotes = () => _get(QUOTES_API, DEFAULT_OPTIONS_WITH_AUTH);

    createQuote = (formData) => _post(QUOTES_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

    readQuote = (_id) => _post(QUOTES_API, _id, DEFAULT_OPTIONS_WITH_AUTH);

    updateQuote = (formData) => _post(QUOTES_API + '/' + formData._id, formData, DEFAULT_OPTIONS_WITH_AUTH);

    deleteQuote = (_id) => _delete(QUOTES_API + '/' + _id, DEFAULT_OPTIONS_WITH_AUTH);
}