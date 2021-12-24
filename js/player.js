let player;
const playerContainer = $(".player");

 
let eventsInit = () => {
 $(".player__start").click(e => {
   e.preventDefault();
 
   if (playerContainer.hasClass("paused")) {
     player.pauseVideo();
   } else {
     player.playVideo();
   }
 });
 
 $(".player__playback").click(e => {
   const bar = $(e.currentTarget);
   const clickedPosition = e.originalEvent.layerX;
   const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
   const newPlaybackPositionSec =
     (player.getDuration() / 100) * newButtonPositionPercent;
 
   $(".player__playback-button").css({
     left: `${newButtonPositionPercent}%`
   });
 
   player.seekTo(newPlaybackPositionSec);
 });
 
 $(".player__splash").click(e => {
   player.playVideo();
 })
};
 
const formatTime = timeSec => {
 const roundTime = Math.round(timeSec);
 
 const minutes = addZero(Math.floor(roundTime / 60));
 const seconds = addZero(roundTime - minutes * 60);
 
 function addZero(num) {
   return num < 10 ? `0${num}` : num;
 }
 
 return `${minutes} : ${seconds}`;
};
 
const onPlayerReady = () => {
 let interval;
 const durationSec = player.getDuration();
 
 $(".player__duration-estimate").text(formatTime(durationSec));
 
 if (typeof interval !== "undefined") {
   clearInterval(interval);
 }
 
 interval = setInterval(() => {
   const completedSec = player.getCurrentTime();
   const completedPercent = (completedSec / durationSec) * 100;
 
   $(".player__playback-button").css({
     left: `${completedPercent}%`
   });
 
   $(".player__duration-completed").text(formatTime(completedSec));
 }, 1000);
};
 
const onPlayerStateChange = event => {
 /*
   -1 (воспроизведение видео не начато)
   0 (воспроизведение видео завершено)
   1 (воспроизведение)
   2 (пауза)
   3 (буферизация)
   5 (видео подают реплики).
 */
 switch (event.data) {
   case 1:
     playerContainer.addClass("active");
     playerContainer.addClass("paused");
     break;
 
   case 2:
     playerContainer.removeClass("active");
     playerContainer.removeClass("paused");
     break;
 }
};
 
function onYouTubeIframeAPIReady() {
 player = new YT.Player("yt-player", {
   height: "405",
   width: "660",
   videoId: "LXb3EKWsInQ",
   events: {
     onReady: onPlayerReady,
     onStateChange: onPlayerStateChange
   },
   playerVars: {
     controls: 0,
     disablekb: 0,
     showinfo: 0,
     rel: 0,
     autoplay: 0,
     modestbranding: 0
   }
 });
}

video.addEventListener('loadeddata', function() {
  // обработчики событий для ползунка громокости
  soundControl = document.getElementById("micLevel");
  soundControl.addEventListener('input', changeSoundVolume);
  // soundControl.addEventListener('onmousemove', changeSoundVolume);

  // задаем максимальные и минимальные значения громокости
  soundControl.min = 0;
  soundControl.max = 10;
  // soundControl.step = 1;
  // присваиваем ползунку максимальное значение
  soundControl.value = soundControl.max;
});

function soundOf() {
  /*
      Делаем проверку уровня громкости. 
      Если у нас нашего видео есть звук, то мы его выключаем. 
      Предварительно запомнив текущую позицию громкости в переменную soundLevel
  */
  if (video.volume === 0) {
      video.volume = soundLevel;
      soundControl.value = soundLevel * 10;
      soundBtn.classList.remove('active');
  } else {
      /*
          Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
          Хранится в перменной soundLevel
      */
      soundLevel = video.volume;
      video.volume = 0;
      soundControl.value = 0;
      soundBtn.classList.add('active');

  }
}

/*
  Управление звуком видео
*/
function changeSoundVolume() {
  /*
      Св-во volume может принимать значения от 0 до 1
      Делим на 10 для того что бы, была возможность более точной регулировки видео. 
 video.volume 0 .... 1 
 soundControl 0 .... 10
      */

  video.volume = soundControl.value / 10;
  if (video.volume == 0) {
      soundBtn.classList.add('active');
  } else {
      soundBtn.classList.remove('active');
  }
  console.log('значение volume у видео ' + video.volume);
  console.log('значение value у micLevel ' + soundControl.value / 10);
  /**У ползунка изначально задано минимальное значение 0 и максимальное 10 чтоб дать нам 10 положений
   * регулировки
   */
}

 
eventsInit();