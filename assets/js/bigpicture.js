import BigPicture from "bigpicture";

// window.onload = function () {
//     let elements = document.getElementsByClassName("bigpicture");
//     for (let i = 0; i < elements.length; i++) {
//         elements[i].onclick = function () {
//             event.preventDefault();
//             BigPicture({
//                 el: this,
//                 imgSrc: this.href,
//             });
//         };
//     }
// };
let elements = document.getElementsByClassName("bigP");
for (let i = 0; i < elements.length; i++) {
    //on change l'icone de l'élément
    elements[i].style.cursor = "ne-resize"
    elements[i].onclick = function () {
        event.preventDefault();
        let source = this.src
        if (this.getAttribute('bPsrc')) //on remplace src si on a un attribu bPsrc
            source = this.getAttribute('bPsrc');
        BigPicture({
            el: this,
            imgSrc: source,
        });
    };
}