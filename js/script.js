jQuery(document).ready(function($){

    const request = axios.get('http://csc225.mockable.io/consoles');
    // logo animation to load console list
    $('#loading-animation2').toggleClass('d-none');
    request.then(function(response){
        $('#loading-animation2').toggleClass('d-none');
        const consoles = response.data;
        const consolesHtml = consoles.map(function(em){

            const { id, name, image } = em;
    
            return `
    
                <div data-id="${id}" id="console-item" class="col- col-lg- card align-items-center bg-dark m-1">
                    <div class="card align-items-center card-item text-center hover-background-gray cursor-pointer">
                    <img src="${image}" class="console-img" alt="Photo of ${name}">
                        <h5 class="mt-0">${name}</h5>
                    </div>
                </div>
    
            `;
        }).join('');
    
        $('#game-consoles').html(consolesHtml);

    });

    jQuery('#game-consoles').on('click', '#console-item', function(){
        const id = $(this).attr('data-id');
        const itemUrl = `http://csc225.mockable.io/consoles/${id}`;
        $('#game-console').html('');
        $('#loading-animation').toggleClass('d-none');

        axios.get(itemUrl).then(function(response){
            // logo animation to load console
            $('#loading-animation').toggleClass('d-none');
            const {id, name, price, country, releaseYear, image} = response.data;
            $('#game-console').html(`
                <div class="card border border-dark" style="width: 18rem;">
                    <img class="card-img-top console-img-large" src="${image}" alt="Photo of ${name}">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Price: <span class="text-danger">$${price}</span></li>
                        <li class="list-group-item">Country: ${country}</li>
                        <li class="list-group-item">Release Year: ${releaseYear}</li>
                    </ul>
                </div> 
            `);
        }).catch(function(error){
            alert('error!!!');
        });
    });
    
    

    

    
});