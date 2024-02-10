window.addEventListener("load", (e) => {
    var anchoPantalla = e.currentTarget.innerWidth
    console.log(anchoPantalla);
    anchoPantalla < 500 ? alert("La App aun no esta Diseñada para la version movil :c... Lo siento") : console.log("Todo a cargado correctamente...");
})

var pageLoaded = () => {

    // ---- VARIABLES ----
    // -- Get canvas div
    var canvas = document.getElementById("testcanvas");
    var context = canvas.getContext("2d");
    // Var of the pencil
    var size = document.getElementById("size")
    var color = document.getElementById("color")
    var sizePencil = 50;
    var colorPencil = "#0000000";

    // Div de seguimiento
    var div = document.createElement("div")
    var cuerpoDocumento = document.body;
    cuerpoDocumento.appendChild(div);

    div.style.position = "absolute";
    div.style.display = "none"
    div.style.pointerEvents = "none";

    document.addEventListener("mousemove", (e) => {
        controls()
        moveDiv(e)
    })

    function moveDiv(e) {
        div.style.display = "block";
        div.style.left = (e.clientX - sizePencil / 2) + "px";
        div.style.top = (e.clientY - sizePencil / 2) + "px";
    }

    var click = (x, y) => {
        // FILL STYLES AND COLORS -- COLORES A FORMUAS RECTANGULARES
        context.fillStyle = colorPencil;
        context.fillRect(x, y, sizePencil, sizePencil);
    }

    var dibujando = false;

    canvas.addEventListener("mousedown", function (e) {
        dibujando = true
        if (dibujando == true) {
            canvas.addEventListener("mousemove", (e) => {
                if (dibujando != true) {
                    PencilStop()
                } else {
                    const x = e.offsetX - sizePencil / 2;
                    const y = e.offsetY - sizePencil / 2;
                    click(x, y);
                    controls()
                }
            })
        } else {
            PencilStop()
        }
    });

    canvas.addEventListener("mouseup", function () {
        PencilStop()
    });

    const PencilStop = () => {
        dibujando = false;
    }

    const controls = () => {
        sizePencil = size.value
        colorPencil = color.value
        div.style.width = `${sizePencil}px`
        div.style.height = `${sizePencil}px`
        div.style.border = `2px solid ${colorPencil}`
    }

    const clearCanvas = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // FUNCION LIMPIAR LIENZO

    const btn_restart = document.getElementById("btn_restart")
    btn_restart.addEventListener("click", clearCanvas)

    function saveCanvas() {
        var dataURL = canvas.toDataURL();
        var link = document.createElement("a");
        link.href = dataURL;
        link.download = "pintura.png";
        link.click();
    }

    // ---- FUNCION GUARDAR IMAGEN ----
    const btn_download = document.getElementById("btn_download")
    btn_download.addEventListener("click", saveCanvas)

}