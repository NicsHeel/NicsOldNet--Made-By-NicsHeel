/*
const backmusic = document.getElementById("backmusic")
const rock = document.getElementById("audio");
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
*/
// Audio player here: 


const audio = document.getElementById("audio");
const backgroundMusic = document.getElementById("backgroundMusic");

const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");

const progress = document.getElementById("progress");
const currentTimeText = document.getElementById("current-time");
const durationText = document.getElementById("duration");

const volume = document.getElementById("volume");

// Volume inicial do player.
audio.volume = Number(volume.value);

// Formata os segundos em minutos e segundos.
function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return String(minutes).padStart(2, "0") + ":" +
           String(remainingSeconds).padStart(2, "0");
}

// PLAY: pausa o fundo e toca a música do player.
playButton.addEventListener("click", async () => {
    backgroundMusic.pause();

    try {
        await audio.play();
    } catch (error) {
        console.log("Não foi possível tocar o áudio:", error);
        backgroundMusic.play().catch(() => {});
    }
});

// PAUSE: pausa o player e retoma a música de fundo.
pauseButton.addEventListener("click", () => {
    audio.pause();

    backgroundMusic.play().catch(error => {
        console.log("Não foi possível retomar a música de fundo:", error);
    });
});

// Mostra a duração da música.
audio.addEventListener("loadedmetadata", () => {
    durationText.textContent = formatTime(audio.duration);
});

// Atualiza o tempo e a barra de progresso.
audio.addEventListener("timeupdate", () => {
    currentTimeText.textContent = formatTime(audio.currentTime);

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
        progress.value =
            (audio.currentTime / audio.duration) * 100;
    }
});

// Permite escolher a parte da música.
progress.addEventListener("input", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime =
            (Number(progress.value) / 100) * audio.duration;
    }
});

// Controla o volume do player.
volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
});

// Se a música terminar, retoma a música de fundo.
audio.addEventListener("ended", () => {
    backgroundMusic.play().catch(error => {
        console.log("Não foi possível retomar a música de fundo:", error);
    });
});
