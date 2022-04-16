//auth related functions only
const doCreateQuote = (e) => {
    e.preventDefault();
    const owner = document.getElementById("owner").value;
    const quote = document.getElementById("quote").value;
    const episode = document.getElementById("episode").value;
    const air_date = document.getElementById("air_date").value;
    
    console.log(owner);
    if (owner == "") {return alert("Must provide owner/speaker");}
    if (quote == "") {return alert("Must provide quote");}

    const res = createQuote({
        owner: owner,
        quote: quote,
        episode: episode,
        air_date: air_date,
    });
    
    console.log(res);

    if (res.msg === null || res.msg === undefined) {
        alert("New quote made!"); 
        window.location.href = "quotes.html";
    } 
    else{
        alert(res.msg); 
    }
};

const doReadQuote = (e) => {}

const doEditQuote = (e, quoteId) => {
    console.log("enter doEditQuote");
    //get current elements
    const block = document.getElementById(quoteId);
    const readOwner = block.getElementsByClassName('owner-text')[0];
    const readQuote = block.getElementsByClassName('quote-text')[0];
    const readEpisode = block.getElementsByClassName('episode-text')[0];
    const readAir_date = block.getElementsByClassName('air_date-text')[0];
    
    //build edit form
    const editForm = document.createElement('form');
    editForm.className = "quote-form";
    editForm.dir="row";
   
    const ownerLabel = document.createElement('label');
    ownerLabel.for = "owner";
    ownerLabel.innerText = "Owner: ";
    const ownerField = document.createElement('input');
    ownerField.id = "editOwner";
    ownerField.type = "text";
    ownerLabel.appendChild(ownerField);
    editForm.appendChild(ownerLabel);

    const quoteLabel = document.createElement('label');
    quoteLabel.for = "quote";
    quoteLabel.innerText = "Quote: ";
    const quoteField = document.createElement('input');
    quoteField.id = "editQuote";
    quoteField.type = "text";
    quoteLabel.appendChild(quoteField);
    editForm.appendChild(quoteLabel);

    const episodeLabel = document.createElement('label');
    episodeLabel.for = "episode";
    episodeLabel.innerText = "Episode: ";
    const episodeField = document.createElement('input');
    episodeField.id = "editEpisode";
    episodeField.type = "number";
    episodeLabel.appendChild(episodeField);
    editForm.appendChild(episodeLabel);

    const air_dateLabel = document.createElement('label');
    air_dateLabel.for = "air_date";
    air_dateLabel.innerText = "Air_date: ";
    const air_dateField = document.createElement('input');
    air_dateField.id = "editAir_date";
    air_dateField.type = "date";
    air_dateLabel.appendChild(air_dateField);
    editForm.appendChild(air_dateLabel);

    const updateDiv = document.createElement('div');
    updateDiv.innerHTML += '<button onclick="doUpdateQuote(event, quoteId, formFieldRefs)">Update</button>';
    const updateButton = updateDiv.firstChild;
    updateButton.className = "quote-update";
    updateButton.quoteId = block.id;
    updateButton.formFieldRefs = {ownerField, quoteField, episodeField, air_dateField};
    editForm.appendChild(updateButton);

    //pass values
    ownerField.value = readOwner.value;
    quoteField.value = readQuote.value;
    if (readEpisode != undefined) {episodeField.value = readEpisode.value;}
    if (readAir_date != undefined) {air_dateField.value = readAir_date.value;}

    
    //replace read only fields with edit forms
    block.replaceChild(editForm, readOwner); //this replaces all nodes

    console.log("exit doEditQuote");
}

const doUpdateQuote = (e, quoteId, formFieldRefs) => {
    e.preventDefault();
    const owner = formFieldRefs.ownerField.value;
    const quote = formFieldRefs.quoteField.value;
    const episode = formFieldRefs.episodeField.value;
    const air_date = formFieldRefs.air_dateField.value;
    
    console.log(owner);
    if (owner == "") {return alert("Must provide owner/speaker");}
    if (quote == "") {return alert("Must provide quote");}

    const res = updateQuote({
        _id: quoteId,
        owner: owner,
        quote: quote,
        episode: episode,
        air_date: air_date,
    });
    
    console.log(res);

    if (res.msg === null || res.msg === undefined) {
        alert("Quote ID " + quoteId + " updated!"); 
        window.location.href = "quotes.html";
    } 
    else{
        alert(res.msg); 
    }
};

const doDeleteQuote = (e, quoteId) => {
    e.preventDefault();
   
    console.log(quoteId);
    const res = deleteQuote(quoteId);
    
    console.log(res);

    if (res.msg === null || res.msg === undefined) {
        alert("Quote deleted!"); 
        window.location.href = "quotes.html";
    } 
    else{
        alert(res.msg); 
    }
};