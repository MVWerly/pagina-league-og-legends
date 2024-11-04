// Variáveis

let card = null;
let title = null;
let characterName = null;

// Eventos

$('#personagens button').click((e)=>{
    card = $(e.target)
    card.attr('data-bs-toggle', 'modal');
    card.attr('data-bs-target', '#exampleModal');
    title = card.parent().find('h5');
    characterName = title.text();

    $('body').append(createModalBackdrop());
    $('body').append(createModal(characterName));

    bodyShowModal()
});

$(document).click((e)=>{
    const target = $(e.target)
    const modal = target.closest('div.modal');
    const divBackdrop = $('body').find('.modal-backdrop');

    if(target.hasClass('btn-close')){
        divBackdrop.remove();
        modal.remove();

        card = null;
        title = null;
        characterName = null;
        bodyHiddenModal();
    }
})

// Funções

function bodyShowModal(){
    $('body').addClass('modal-open');
    $('body').attr('style', 'overflow: hidden; padding-right: 17px');
}

function bodyHiddenModal(){
    $('body').removeClass('modal-open');
    $('body').removeAttr('style');
    $('body').removeAttr('data-bs-overflow');
    $('body').removeAttr('data-bs-padding-right');
}

function createModalBackdrop(){
    const divModalBackdrop = $('<div></div>');
    divModalBackdrop.addClass('modal-backdrop fade show');

    return divModalBackdrop;
}

function createModal(characterName){
    const divModal = $('<div></div>');
    divModal.addClass('modal fade show');
    divModal.attr('tabindex', '-1');
    divModal.attr('style', 'display: block;')

    const divModalDialog = $('<div></div>');
    divModalDialog.addClass('modal-dialog modal-dialog-centered');

    const divModalContent = $('<div></div>');
    divModalContent.addClass('modal-content');

    divModalContent.append(createModalHeader(characterName));
    divModalContent.append(createModalBody(characterName));
    divModalDialog.append(divModalContent);
    divModal.append(divModalDialog);

    return divModal;
};

function createModalHeader(characterName){
    const divModalHeader = $('<div></div>');
    divModalHeader.addClass('modal-header');

    const headerTitle = $('<h1></h1>');
    headerTitle.addClass('modal-title fs-5');
    headerTitle.text(characterName);

    divModalHeader.append(headerTitle);

    divModalHeader.append(createBtnHeader('btn-close'));

    return divModalHeader;
};

function createBtnHeader(btnClass){
    const btn = $('<button></button>');
    btn.attr('type', 'button');
    btn.addClass(btnClass);

    return btn;
};

function createModalBody(characterName){
    const divModalBody = $('<div></div>');
    divModalBody.addClass('modal-body');

    const divCarouselSlides = $('<div></div>');
    divCarouselSlides.attr('id', 'carouselSkins');
    divCarouselSlides.addClass('carousel slide');

    const divCarouselIndicators = $('<div></div>');
    divCarouselIndicators.addClass('carousel-indicators');

    divCarouselIndicators.append(createBtnCarouselIndicators('0', 'Slide 1', 'true', 'active'));
    divCarouselIndicators.append(createBtnCarouselIndicators('1', 'Slide 2'));
    divCarouselIndicators.append(createBtnCarouselIndicators('2', 'Slide 3'));

    divCarouselSlides.append(divCarouselIndicators);
    divCarouselSlides.append(createCarouselInner(characterName));
    divCarouselSlides.append(createBtnCarouselControl('carousel-control-prev', 'prev', 'carousel-control-prev-icon'));
    divCarouselSlides.append(createBtnCarouselControl('carousel-control-next', 'next', 'carousel-control-next-icon'));

    divModalBody.append(divCarouselSlides);

    return divModalBody;
};

function createBtnCarouselIndicators(slideNumber, firstAria, secondAria, btnClass){
    const btn = $('<button></button>');
    btn.attr('type', 'button');
    btn.attr('data-bs-target',  '#carouselSkins');
    btn.attr('data-bs-slide-to',  slideNumber);
    btn.attr('aria-label', firstAria);
    btn.attr('aria-current', secondAria);
    btn.addClass(btnClass);

    return btn;
};

function createCarouselInner(characterName){
    const divCarouselInner = $('<div></div>');
    divCarouselInner.addClass('carousel-inner');

    divCarouselInner.append(createItem(characterName, '1', 'active'));
    divCarouselInner.append(createItem(characterName, '2'));
    divCarouselInner.append(createItem(characterName, '3'));

    return divCarouselInner;
};

function createItem(characterName, index, active){
    const div = $('<div></div>');
    div.addClass('carousel-item');
    div.addClass(active);


    const img = $('<img></img>');
    img.attr('src', './assets/'+ characterName + '/' + characterName + '-' + index + '.jpg');
    img.addClass('d-block w-100');
    img.attr('alt', characterName + ' Skin');

    div.append(img);

    return div;
};

function createBtnCarouselControl(classBtn, secondData, firstspanClass){
    const btn = $('<button></button>');
    btn.addClass(classBtn);
    btn.attr('type', 'button');
    btn.attr('data-bs-target', '#carouselSkins');
    btn.attr('data-bs-slide', secondData);

    const firstspan = $('<span></span>');
    firstspan.addClass(firstspanClass);
    firstspan.attr('aria-hidden', 'true');

    const secondSpan = $('<span></span>');
    secondSpan.addClass('visually-hidden');

    btn.append(firstspan);
    btn.append(secondSpan);

    return btn
};