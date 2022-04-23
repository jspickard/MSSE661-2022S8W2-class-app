const quotesAPIService = new QuotesAPIService();
const quotesService = new QuotesService(quotesAPIService);

quotesService.init();

function functionNotAvailableYet() {
    alert('Function not available yet.');
}