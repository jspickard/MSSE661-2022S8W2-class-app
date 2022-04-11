console.log('enter build-quotes-list.js');
(async () => {
    console.log('buidling quotes...');
    const quotes = await getQuotes();
    console.log(quotes);

    if (quotes.length) {
        const div = document.getElementById('quotes-div');
        const firstDiv = div.childNodes[1];
        const list = document.createElement('ul');

        div.replaceChild(list, firstDiv);

        //populate list
        quotes.map((quoteRecord) => {
            //block
            const item = document.createElement('li');
            item.className = 'quote-item';
            const block = document.createElement('div');
            block.className = 'quote-item-block';

            //actual quotes
            const ownerText = document.createElement('p');
            ownerText.className = 'owner-text';
            ownerText.innerText = quoteRecord.owner + ": ";
            
            const quoteText = document.createElement('p');
            quoteText.className = 'quote-text';
            quoteText.innerText = quoteRecord.quote;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'quote-delete';
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = functionNotAvailableYet;

            block.appendChild(ownerText);
            ownerText.appendChild(quoteText);
            quoteText.appendChild(deleteButton);

            item.appendChild(block);
            list.appendChild(item);
        });
    }
    console.log('quotes built');
})();
