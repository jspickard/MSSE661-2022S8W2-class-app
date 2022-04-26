//builds list of quotes and inserts into web page
console.log('enter quote.service.js');

class QuotesService{
    list = document.createElement('ul');
    quotesAPIService;
    
    constructor(quotesAPIService) {
        this.quotesAPIService = quotesAPIService;
    }
    
    init() {
        this.render();
    }

    makeQuoteEdit = (_id) => {
        console.log("enter makeQuoteEdit");
        
        //get current elements
        const block = document.getElementById(_id);
        const readOwner = block.getElementsByClassName('owner-text')[0];
        const readQuote = block.getElementsByClassName('quote-text')[0];
        const readEpisode = block.getElementsByClassName('episode-text')[0];
        const readAir_date = block.getElementsByClassName('air_date-text')[0];
    
        let readAir_dateFormatted = "";
        if (!!readAir_date.value) {readAir_dateFormatted = readAir_date.value.substring(0,10);}
        
        //quote values
        const quoteRecord = {
            _id: _id,
            owner: readOwner.value,
            quote: readQuote.value,
            episode: readEpisode.value,
            air_date: readAir_dateFormatted,
        }
    
        //build form
        const submitForm = new SubmitForm(quoteRecord, !!1);  
        
        //replace read only fields with edit forms
        block.replaceChild(submitForm.submitBlock, block.childNodes[0]); //this replaces all nodes
    
        console.log("exit makeQuoteEdit");
    }
    
    makeQuoteRead = (_id) => {
        console.log("enter makeQuoteRead");
        
        //get current elements
        const editBlock = document.getElementById(_id);
        const editNode = editBlock.childNodes[0];
        console.log(editNode);
        const editOwner = editBlock.getElementsByClassName('ownerField')[0];
        console.log(editOwner);
        const editQuote = editBlock.getElementsByClassName('quoteField')[0];
        const editEpisode = editBlock.getElementsByClassName('episodeField')[0];
        const editAir_date = editBlock.getElementsByClassName('air_dateField')[0];
        
        //quote values
        const quoteRecord = {
            _id: _id,
            owner: editOwner.value,
            quote: editQuote.value,
            episode: editEpisode.value,
            air_date: editAir_date.value,
        }
    
        //build read display
        const readDisplay = new ReadDisplay(quoteRecord);
        
        //replace read only fields with edit forms
        editBlock.replaceChild(readDisplay.displayblock, editNode); //this replaces all nodes
    
        console.log("exit makeQuoteRead");
    }
    
    addRow = (quoteRecord) => {
        const record = new ReadDisplay(quoteRecord);
    
        this.list.appendChild(record.displayblock);
    }
    
    updateRow = (quoteRecord) => {
        //updating done inheritantly through element "value" parameter, this converts elements back to read only text
        this.makeQuoteRead(quoteRecord._id);
    }
    
    deleteRow = (_id) => {
        let element = null;
        for (let index = 0; index < this.list.childNodes.length; index++) {
            if (this.list.childNodes[index].id == _id)
            {
                element = this.list.childNodes[index];
                break;
            }
        }  
        if (!!element) {this.list.removeChild(element);}
    }
    
    //create pages (run immediately)
    render = async () => {
        console.log('buidling page...');
        //get div
        const quotesDisplay = document.getElementById('new-quote-form-div');
        //build form
        const createForm = new SubmitForm(0, !!0);
        //replace read only fields with edit forms
        quotesDisplay.replaceChild(createForm.submitBlock, quotesDisplay.childNodes[1]); //this replaces all nodes
    
        const quotes = await quotesAPIService.getQuotes();
        console.log("quotes: " + quotes);
        console.log("quotes.length: "+quotes.length);
    
        if (quotes.length) {
            //record display       
            const quotesDisplay = document.getElementById('quotes-display');
            const quotesDisplayChild = quotesDisplay.childNodes[1];
    
            quotesDisplay.replaceChild(this.list, quotesDisplayChild);
    
            //populate list
            quotes.map((quoteRecord) => {
                const record = new ReadDisplay(quoteRecord);
    
                this.list.appendChild(record.displayblock);
            });
            console.log('page built');
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
    };
}


class SubmitForm {
    
    constructor(quoteRecord, isUpdate) {this.buildForm(quoteRecord, isUpdate);}

    buildForm = (quoteRecord, isUpdate) => {
        this.submitBlock = document.createElement('div');
        this.submitBlock.id = quoteRecord._id;
        this.submitNode = document.createElement('div');
        this.submitBlock.appendChild(this.submitNode);

        this.editForm = document.createElement('form');
        this.editForm.className = "quote-form";
        this.editForm.dir="row";
        this.editForm.id = quoteRecord._id;
        this.submitNode.appendChild(this.editForm);
       
        this.ownerLabel = document.createElement('label');
        this.ownerLabel.for = "owner";
        this.ownerLabel.innerText = "Owner: ";
        this.ownerField = document.createElement('input');
        this.ownerField.id = "editOwner";
        this.ownerField.className = "ownerField";
        this.ownerField.type = "text";
        if (!!quoteRecord.owner) {
            this.ownerField.value = quoteRecord.owner;
            this.ownerField.valueOrig = quoteRecord.owner;
        }
        this.ownerLabel.appendChild(this.ownerField);
        this.editForm.appendChild(this.ownerLabel);
    
        this.quoteLabel = document.createElement('label');
        this.quoteLabel.for = "quote";
        this.quoteLabel.innerText = "Quote: ";
        this.quoteField = document.createElement('input');
        this.quoteField.id = "editQuote";
        this.quoteField.className = "quoteField";
        this.quoteField.type = "text";
        if (!!quoteRecord.quote) {
            this.quoteField.value = quoteRecord.quote;
            this.quoteField.valueOrig = quoteRecord.quote;
        }
        this.quoteLabel.appendChild(this.quoteField);
        this.editForm.appendChild(this.quoteLabel);
    
        this.episodeLabel = document.createElement('label');
        this.episodeLabel.for = "episode";
        this.episodeLabel.innerText = "Episode: ";
        this.episodeField = document.createElement('input');
        this.episodeField.id = "editEpisode";
        this.episodeField.className = "episodeField";
        this.episodeField.type = "number";
        if (!!quoteRecord.episode) {
            this.episodeField.value = quoteRecord.episode;
            this.episodeField.valueOrig = quoteRecord.episode;
        }
        this.episodeLabel.appendChild(this.episodeField);
        this.editForm.appendChild(this.episodeLabel);
    
        this.air_dateLabel = document.createElement('label');
        this.air_dateLabel.for = "air_date";
        this.air_dateLabel.innerText = "Air_date: ";
        this.air_dateField = document.createElement('input');
        this.air_dateField.id = "editAir_date";
        this.air_dateField.className = "air_dateField";
        this.air_dateField.type = "date";
        console.log(quoteRecord.air_date);
        if (!!quoteRecord.air_date) {
            this.air_dateField.value = quoteRecord.air_date;
            this.air_dateField.valueOrig = quoteRecord.air_date;
        }
        this.air_dateLabel.appendChild(this.air_dateField);
        this.editForm.appendChild(this.air_dateLabel);
    
        let submitText = "Create";
        if (!!isUpdate) {submitText = "Update";}
        this.buttonDiv = document.createElement('div');
        this.buttonDiv.innerHTML += '<button onclick="do'+submitText+'Quote(event, _id, formFieldRefs)">'+submitText+'</button>';
        this.submitButton = this.buttonDiv.firstChild;
        this.submitButton.className = "submit-button";
        this.submitButton._id = quoteRecord._id;
        this.submitButton.formFieldRefs = {ownerField: this.ownerField, quoteField: this.quoteField, episodeField: this.episodeField, air_dateField: this.air_dateField};
        this.editForm.appendChild(this.submitButton);
        
        if (!!isUpdate) {
            this.cancelDiv = document.createElement('div');
            this.cancelDiv.innerHTML += '<button onclick="doReadQuote(event, _id, formFieldRefs, isCancel)">Cancel</button>';
            this.cancelButton = this.cancelDiv.firstChild;
            this.cancelButton.className = "cancel-button";
            this.cancelButton._id = quoteRecord._id;
            this.cancelButton.formFieldRefs = {ownerField: this.ownerField, quoteField: this.quoteField, episodeField: this.episodeField, air_dateField: this.air_dateField};
            this.cancelButton.isCancel = 1; //true
            this.editForm.appendChild(this.cancelButton);
        }
    }
}


class ReadDisplay {

    constructor(quoteRecord) {this.buildDisplay(quoteRecord);}

    buildDisplay = (quoteRecord) => {
        this.displayblock = document.createElement('div');
        this.displayblock.id = quoteRecord._id;
        this.displayNode = document.createElement('div');
        this.displayNode.className = 'quote-record-block';
        this.displayblock.appendChild(this.displayNode);

        this.ownerText = document.createElement('p');
        this.ownerText.className = 'owner-text';
        this.ownerText.value = quoteRecord.owner;
        this.ownerText.innerText = this.ownerText.value + ": ";
        this.displayNode.appendChild(this.ownerText);
        
        this.quoteText = document.createElement('p');
        this.quoteText.className = 'quote-text';
        this.quoteText.value = quoteRecord.quote;
        this.quoteText.innerText = this.quoteText.value;
        this.displayNode.appendChild(this.quoteText);

        this.episodeText = document.createElement('p');
        this.episodeText.className = 'episode-text';
        this.episodeText.value = quoteRecord.episode;
        this.episodeText.innerText = "Episode: " + this.episodeText.value;
        this.displayNode.appendChild(this.episodeText);
        if (!this.episodeText.value) {this.episodeText.style.display = 'none';}

        this.air_dateText = document.createElement('p');
        this.air_dateText.className = 'air_date-text';
        this.air_dateText.value = quoteRecord.air_date;
        this.air_dateText.innerText = "Air Date: " + this.air_dateText.value;
        this.displayNode.appendChild(this.air_dateText);
        if (!this.air_dateText.value) {this.air_dateText.style.display = 'none';}

        this.editDiv = document.createElement('div');
        this.editDiv.innerHTML += '<button onclick="doEditQuote(event, _id)">Edit</button>';
        this.editButton = this.editDiv.firstChild;
        this.editButton.className = "quote-edit";
        this.editButton._id = quoteRecord._id;
        this.displayNode.appendChild(this.editButton);

        this.deleteDiv = document.createElement('div');
        this.deleteDiv.innerHTML += '<button onclick="doDeleteQuote(event, _id)">Delete</button>';
        this.deleteButton = this.deleteDiv.firstChild;
        this.deleteButton.className = "quote-delete";
        this.deleteButton._id = quoteRecord._id;
        this.displayNode.appendChild(this.deleteButton);
    }
}
