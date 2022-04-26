//auth related functions only
const doCreateQuote = async (e, _id, formFieldRefs) => { //_id unused here, but calling code is shared by doUpdateQuote where _id is required 
    e.preventDefault();
    const owner = formFieldRefs.ownerField.value;
    const quote = formFieldRefs.quoteField.value;
    const episode = formFieldRefs.episodeField.value;
    const air_date = formFieldRefs.air_dateField.value;
    
    console.log(owner);
    if (owner == "") {return alert("Must provide owner/speaker");}
    if (quote == "") {return alert("Must provide quote");}

    const quoteRecord = {
        owner: owner,
        quote: quote,
        episode: episode,
        air_date: air_date,
    };

    const res = await quotesAPIService.createQuote(quoteRecord);
    
    console.log("doCreateQuote res: "+res);

    if (res.msg === null || res.msg === undefined) {
        alert("New quote made!"); 
        quoteRecord._id = res._id;
        quotesService.addRow(quoteRecord);
    } 
    else{
        alert(res.msg); 
    }
};

const doReadQuote = (e, _id, formFieldRefs, isCancel) => {    
    e.preventDefault();

    if (!!isCancel) {
        formFieldRefs.ownerField.value = formFieldRefs.ownerField.valueOrig;
        formFieldRefs.quoteField.value = formFieldRefs.quoteField.valueOrig;
        formFieldRefs.episodeField.value = formFieldRefs.episodeField.valueOrig;
        formFieldRefs.air_dateField.value = formFieldRefs.air_dateField.valueOrig;
    }

    quotesService.makeQuoteRead(_id);
}

const doEditQuote = (e, _id, formFieldRefs) => {
    e.preventDefault();

    quotesService.makeQuoteEdit(_id);
}

const doUpdateQuote = async (e, _id, formFieldRefs) => {
    e.preventDefault();
    const owner = formFieldRefs.ownerField.value;
    const quote = formFieldRefs.quoteField.value;
    const episode = formFieldRefs.episodeField.value;
    const air_date = formFieldRefs.air_dateField.value;
    console.log(air_date);
    
    console.log(owner);
    if (owner == "") {return alert("Must provide owner/speaker");}
    if (quote == "") {return alert("Must provide quote");}

    const quoteRecord = {
        _id: _id,
        owner: owner,
        quote: quote,
        episode: episode,
        air_date: air_date,
    };

    const res = await quotesAPIService.updateQuote(quoteRecord);
    
    console.log("doUpdateQuote res: "+res);

    if (res.msg === null || res.msg === undefined) {
        alert("Quote ID " + _id + " updated!"); 
        quotesService.updateRow(quoteRecord);
    } 
    else{
        alert(res.msg); 
    }
};

const doDeleteQuote = (e, _id) => {
    e.preventDefault();
   
    console.log(_id);
    const res = quotesAPIService.deleteQuote(_id);
    
    console.log(res);

    if (res.msg === null || res.msg === undefined) {
        alert("Quote deleted!"); 
        quotesService.deleteRow(_id);
    } 
    else{
        alert(res.msg); 
    }
};