//builds list of quotes and inserts into quotes.html
console.log('enter build-quotes-list.js');
(async () => {
    console.log('buidling quotes...');
    const quotes = await getQuotes();
    console.log("quotes: " + quotes);
    console.log("quotes.length: "+quotes.length);

    if (quotes.length) {
        //record display       
        const quotesDisplay = document.getElementById('quotes-display');
        const quotesDisplayChild = quotesDisplay.childNodes[1];
        const list = document.createElement('ul');

        quotesDisplay.replaceChild(list, quotesDisplayChild);

        //populate list
        quotes.map((quoteRecord) => {
            //block
            const record = document.createElement('li');
            record.className = 'quote-record';
            const block = document.createElement('div');
            block.className = 'quote-record-block';

            //actual quotes
            block.id = quoteRecord._id;

            const ownerText = document.createElement('p');
            ownerText.className = 'owner-text';
            ownerText.value = quoteRecord.owner;
            ownerText.innerText = ownerText.value + ": ";
            
            const quoteText = document.createElement('p');
            quoteText.className = 'quote-text';
            quoteText.value = quoteRecord.quote;
            quoteText.innerText = quoteText.value;

            const episodeText = document.createElement('p');
            episodeText.className = 'episode-text';
            episodeText.value = quoteRecord.episode;
            episodeText.innerText = "Episode: " + episodeText.value;

            const air_dateText = document.createElement('p');
            air_dateText.className = 'air_date-text';
            air_dateText.value = quoteRecord.air_date;
            air_dateText.innerText = "Air Date: " + air_dateText.value;

            const editDiv = document.createElement('div');
            editDiv.innerHTML += '<button onclick="doEditQuote(event, quoteId)">Edit</button>';
            const editButton = editDiv.firstChild;
            editButton.className = "quote-edit";
            editButton.quoteId = block.id;

            const deleteDiv = document.createElement('div');
            deleteDiv.innerHTML += '<button onclick="doDeleteQuote(event, quoteId)">Delete</button>';
            const deleteButton = deleteDiv.firstChild;
            deleteButton.className = "quote-delete";
            deleteButton.quoteId = block.id;

            block.appendChild(ownerText);
            ownerText.appendChild(quoteText);
            quoteText.appendChild(editButton);
            quoteText.appendChild(deleteButton);
            if (quoteRecord.episode != undefined) {quoteText.appendChild(episodeText);}
            if (quoteRecord.air_date != undefined) {episodeText.appendChild(air_dateText);}

            record.appendChild(block);
            list.appendChild(record);
        });
        console.log('quotes page built');
    }
    else if (quotes.msg === "Invalid Token") {
        const quotesFormDiv = document.getElementById('new-quote-form-div');
        const quotesForm = quotesFormDiv.childNodes[1];
        const messageText = document.createElement('form');
        quotesFormDiv.replaceChild(messageText, quotesForm);
        messageText.innerText = "Login to add quotes."
        
        const quotesDisplay = document.getElementById('quotes-display');
        const quotesDisplayChild = quotesDisplay.childNodes[1];
        quotesDisplayChild.innerText = "Login to see stored quotes."
    }
})();
