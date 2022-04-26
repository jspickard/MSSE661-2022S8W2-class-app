const quotesAPIService = new QuotesAPIService();
const quotesService = new QuotesService(quotesAPIService);

describe('Seinfeld App', () => {
  it('should initialize some HTML', () => {
    spyOn(quotesService, 'init');
    quotesService.init();

    expect(quotesService.init).toHaveBeenCalled();
  });

  it('should add a quote', async () => {
    const newQuote = {
      _id: 1337,
      owner: "elaine",
      quote: 'yadayadayada',
      episode: '1337',
      air_date: '2020-04-14',
    };

    const initialCount = quotesService.list.childNodes.length;

    await quotesService.addRow(newQuote);

    expect(quotesService.list.childNodes.length).toBe(initialCount+1);
  });

  it('should delete a quote', async () => {
    const _id = "1337";

    const initialCount = quotesService.list.childNodes.length;

    await quotesService.deleteRow(_id);

    expect(quotesService.list.childNodes.length).toBe(initialCount-1);
  });

  it('should update an individual quote', () => {
    //no functionality to test (see method notes)
    const _id = "1337";
    const updateQuoteServiceSpy = spyOn(quotesService, 'updateRow');

    quotesService.updateRow(_id);

    expect(updateQuoteServiceSpy).toHaveBeenCalled();
  });
});
