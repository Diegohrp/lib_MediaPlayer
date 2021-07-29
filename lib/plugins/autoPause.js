export class AutoPause {
    constructor() {
        this.threshold = 0.4;
        //utilizando bind para que el this en handler haga referencia al obj AutoPause
        this.handler = this.handler.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }
    run(mediaPlayer) {
        this.mediaPlayer = mediaPlayer;
        //new IntersectionObserver(handlerIntersection,{threshold:})
        const observer = new IntersectionObserver(this.handler, { threshold: this.threshold });
        observer.observe(this.mediaPlayer.media);
        document.addEventListener("visibilitychange", this.handleVisibilityChange);
    }
    //Handle intersection
    handler(entries) {
        //Se extrae la posición 0 ya que en esta se encuentra toda la info (en objeto)
        const entry = entries[0];
        //console.log(entry.intersectionRatio);
        const isVisible = entry.intersectionRatio >= this.threshold;
        if (isVisible) {
            this.mediaPlayer.playVid();
        }
        else {
            this.mediaPlayer.pauseVid();
        }
    }
    handleVisibilityChange() {
        const isVisible = document.visibilityState === "visible";
        if (isVisible) {
            this.mediaPlayer.playVid();
        }
        else {
            this.mediaPlayer.pauseVid();
        }
    }
}
