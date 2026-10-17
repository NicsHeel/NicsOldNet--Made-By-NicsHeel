
const backmusic = document.getElementById("backgroundMusic")
const rock = document.getElementById("Rock");
    backmusic.volume = 1;
    rock.volume = 0.3;

// quando da play rock: pausa musica de fundo
    rock.addEventListener("play", () => {
        backmusic.pause();
    });
// quando rock pausa: despausa a musica de fundo
    rock.addEventListener("pause", () => {
        backmusic.play();
    })  
// quando rock acaba: musica de fundo volta
    rock.addEventListener("ended", () => {
        backmusic.onplay();
    })