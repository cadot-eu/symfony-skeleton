import BuildEditor from '/assets/ckeditor/build/ckeditor';
import "../styles/template.scss" //call by {{ encore_entry_link_tags('template') }}

/* ------------------ mise à jour du max des boutons protos ----------------- */
$('form fieldset').each(function (num) {
    updateBoutonProto($(this).find('.blocktemp').attr('idtemp'), -1);
})


/* -------------------------------------------------------------------------- */
/*                          ajout du bouton supprimer au anciens proto        */
/* -------------------------------------------------------------------------- */
$('fieldset').each(function () {
    if ($(this).find('#form_templates').length != 1) {//pour ne pas toucher la boite à boutons
        $('<button type="button" class="btn btn-sm btn-danger float-right boutonsupprimer" style="margin-top:-1rem">X</button>').on('click', function () {
            //on ajoute 1 au max du bouton add template
            let idtemp = $(this).parent().find('.blocktemp').attr('idtemp');
            updateBoutonProto($(this).parent().find('.blocktemp').attr('idtemp'), +1)
            $(this).parent().remove();
            $(this).remove();

        }).prependTo($(this))
    }
})

/* -------------------------------------------------------------------------- */
/*                             ajout d'un proptype par click sur bouton proto */
/* -------------------------------------------------------------------------- */
$('.boutonProto').on('click', function () {
    let newblock = $('#protoT' + $(this).attr('idtemp')).clone().css('display', 'block').removeAttr('id').addClass('block');//creation du block
    transformenCK(newblock)
    geticons(newblock)
    //ajout du bouton supprimer au nouveau proto
    $(newblock).find('.boutonsupprimer').on('click', function () {
        //définition des max et idtemp des boutons
        updateBoutonProto($(this).parent().find('.blocktemp').attr('idtemp'), +1)
        $(this).parent().remove();
        $(this).remove();
    })
    $(newblock).insertBefore($(this).closest('fieldset'))
    //quand proto ajouter modifie max bouton
    updateBoutonProto($(this).attr('idtemp'), -1)
})
/* -------------------------------------------------------------------------- */
/*             function de modification du maxi des  boutons proto            */
/* -------------------------------------------------------------------------- */
function updateBoutonProto(idtemp, valeur) {
    let bouton = $('#BtnProto-' + idtemp + ' button')
    $(bouton).attr('max', parseInt($(bouton).attr('max')) + valeur)
    if ($(bouton).attr('max') == 0) { //si on a atteint 0
        $(bouton).prop("disabled", true); //on met le bouton est disabled et on ajoute le small help
        $('<small id="' + $(bouton).attr('id') + '" class="form-text text-muted">Maximum atteint</small>').appendTo($(bouton).parent())
    }
    else {
        $(bouton).next('small').remove();//on supprime le messge maxi atteint
        $(bouton).prop('disabled', false);// on réactive le bouton

    }
}

transformenCK('.block') //pour les anciens

/* ---------------- transformation des textareas en fckeditor --------------- */
//fckeditor se modifie ici à partir de la version téléchargé de l'online builder
//pour avoir la version complète de la toolbar et des plugins
//utiliser /assets/ckeditor/src/ckeditor.js
function transformenCK(e) {
    $('textarea').not('.blocck').each(function () {
        let uniqid = (new Date()).getTime();
        $(this).attr('id', uniqid)
        $(this).addClass('blocck');// for no selection
        let toolbar;
        if ($(this).attr('options') != undefined)
            toolbar = JSON.parse($(this).attr('options')).toolbar;
        if (toolbar == 'simple') {
            BuildEditor.create((this),
                {
                    restrictedEditing: {
                        allowedCommands: ['highlight',
                            'specialCharacters',],
                        allowedAttributes: ['highlight',
                            'specialCharacters']
                    },
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                        ]
                    },
                    highlight: {
                        options: [
                            {
                                model: 'Marker',
                                class: '',
                                title: 'Marqueur',
                                type: 'marker'
                            }
                        ]
                    },
                    toolbar: {
                        items: [
                            'highlight',
                            'specialCharacters'
                        ]
                    },
                    language: 'fr'
                })
                .then(editor => {
                    editor.editing.view.document.on('clipboardInput', (evt, data) => {
                        data.content = editor.data.htmlProcessor.toView(data.dataTransfer.getData('text/plain'));
                    });
                })
                .catch(error => {
                    console.error(error.stack);
                });
        }
        else {
            BuildEditor.create((this),
                {
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                        ]
                    },
                    highlight: {
                        options: [
                            {
                                model: 'Marker',
                                class: '',
                                title: 'Marqueur',
                                type: 'marker'
                            }
                        ]
                    },
                    toolbar: {
                        items: [
                            'heading',
                            'highlight',
                            '|',
                            'bold',
                            'italic',
                            'underline',
                            'specialCharacters',
                            'link',
                            'bulletedList',
                            'numberedList',
                            'todoList',
                            'pageBreak',
                            '|',
                            'alignment',
                            'outdent',
                            'indent',
                            '|',
                            'horizontalLine',
                            'blockQuote',
                            'mediaEmbed',
                            'undo',
                            'redo',
                            'removeFormat',
                            'sourceEditing'
                        ]
                    },
                    language: 'fr'
                })
                .then(editor => {

                })
                .catch(error => {
                    console.error(error.stack);
                });
        }
    })
}
/* -------------------------------------------------------------------------- */
/*                           déplacement des blocks                           */
/* -------------------------------------------------------------------------- */
require('jquery-ui/ui/widgets/sortable.js');
$(".block").sortable(
    {
        itemSelector: 'fieldset',
        axis: 'y',
        containment: 'form',
        cursor: 'move',
        handle: "legend",
        update: function (event, ui) {
            $('.block').each(function () {

            })
        }
    }
)



/* -------------------------------------------------------------------------- */
/*                          renumérotation sur envoie  et gestion fichier     */
/* -------------------------------------------------------------------------- */
$("#envoyer").on('click', function (e) {
    e.preventDefault();
    $('#original').remove()//suppression des protos

    //renumérotation
    $('fieldset').each(function (num) {
        $(this).find('.blocktemp').each(function () {
            if ($(this).attr('name')) {
                $(this).attr('name', 'form[' + num + '][' + $(this).attr('idtemp') + '][' + $(this).attr('idchamp') + ']')
            }
        })
    })

    //fichiers
    $("input:file").each(function () {
        if ($(this)[0].files.length == 0) { //si on a pas de nouvelle valeur dans l'input
            if ($(this).parent().next().text())//si on a le nom du fichier dans le small help
            {
                $(this).append($('<input type="hidden" value="' + $(this).parent().next().text() + '" name="' + $(this).attr('name') + '">'))
                $(this).attr('name', '')//permet de supprimer le input file sans le faire disparaitre
            }
        }
    })

    //textarea
    $('textarea').each(function () {
        $(this).text($(this).parent().find('.ck-content').text())
    })

    $(form).submit();
});


/* -------------------------------------------------------------------------- */
/*                                autocomplete                                */
/* -------------------------------------------------------------------------- */
require("jquery-ui/ui/widgets/autocomplete");

autocomplete($("#categories"));


function autocomplete(champ) {
    //définition de la liste
    let datalist = champ.data('list')
    champ
        //on active les actions clavier
        .on("keydown", function (event) {
            if (
                event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active
            ) {
                event.preventDefault();
            }
        })
        //on définis la source par recherche des premieres lettres
        .autocomplete({
            minLength: 1,
            // source: $("#categories").data('list') //n'importe ou
            source: function (request, response) {
                //test si les premières lettres conrrespondent
                var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
                response($.grep(datalist, function (item) {
                    return matcher.test(item);
                }));
            },
        },
            {
                //une fois sélectionné, on ajoute si n'existe pas déjà
                select: function (event, ui) {
                    let trouve = false;
                    $('a[name^="selected"]').each(function (num, element) {
                        if (ui.item.value == element.text) trouve = true;
                    });
                    //on ajoute
                    if (trouve == false)
                        champ.after("<a class='btn btn-xs btn-secondary select' onclick='this.remove()' ><input type='hidden' value='" + ui.item.value + "' name='selected[]'> " + ui.item.value + "</a>")
                    this.value = "";
                    return false;
                }
            }
        );
}

/* ------------------- génération d'une couleur aléatoire ------------------- */
function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



/* -------------------------------------------------------------------------- */
/*                        //gestion de l'icône builder                        */
/* -------------------------------------------------------------------------- */
var icons = require('../fontawesome5.json')
import Iconpicker from 'codethereal-iconpicker'

geticons($('.block'))

function geticons(objet) {
    $(objet).find('.iconpicker').each(function () {
        //add preview
        const iconpicker = new Iconpicker(this, {
            showSelectedIn: $(this).find('a.selected-icon'),
            // hide the icon picker on select
            hideOnSelect: true,
            // CSS class added to the selected icon
            selectedClass: 'selected',
            // default icon
            defaultValue: $(this).val(),
            // all icons
            searchable: true,
            // CSS class added to the container
            containerClass: '',
            // enable fade animation
            fade: true,
            // custom value format
            icons: icons,
            valueFormat: val => `${val}`
        })
        //iconpicker.set() // Set as empty
        // iconpicker.set('bi-alarm') // Reset with a value
        // $(this).after('<i class="position-absolute " style="margin-top: -1.8rem;"></i>')

    })

}