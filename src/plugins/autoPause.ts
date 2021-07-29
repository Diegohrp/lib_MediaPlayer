import { MediaPlayer } from "../MediaPlayer";
export class AutoPause{
    private threshold:number;
    private mediaPlayer:MediaPlayer;
    constructor(){
        this.threshold = 0.4;
        //utilizando bind para que el this en handler haga referencia al obj AutoPause
        this.handler = this.handler.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    run(mediaPlayer:MediaPlayer){
        this.mediaPlayer = mediaPlayer;
        //new IntersectionObserver(handlerIntersection,{threshold:})
        const observer = new IntersectionObserver(this.handler,{threshold: this.threshold});

        observer.observe(this.mediaPlayer.media);

        document.addEventListener("visibilitychange",this.handleVisibilityChange);
    }

    //Handle intersection
    private handler(entries:IntersectionObserverEntry[]){
        //Se extrae la posición 0 ya que en esta se encuentra toda la info (en objeto)
        const entry = entries[0];
        //console.log(entry.intersectionRatio);
        const isVisible:boolean = entry.intersectionRatio >= this.threshold;

        if(isVisible){
            this.mediaPlayer.playVid();
        }
        else{
            this.mediaPlayer.pauseVid();
        }
    }

    private handleVisibilityChange(){
        const isVisible:boolean = document.visibilityState === "visible";
        if(isVisible){
            this.mediaPlayer.playVid()
        }
        else{
            this.mediaPlayer.pauseVid();
        }
    }
}