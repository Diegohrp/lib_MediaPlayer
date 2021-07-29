export class MediaPlayer{
    #media:HTMLMediaElement;
    private plugins:any;
    container:HTMLElement;
    constructor({media,plugins = []}){
        this.#media = media;
        this.plugins = plugins;
        this.initPlayer();
        this.initPlugins();
    }

    initPlayer(){
        this.container = document.createElement("div");
        this.#media.parentNode.insertBefore(this.container,this.media);
        this.container.appendChild(this.media);
    }

    get media():HTMLMediaElement{
        return this.#media;
    }

    playPause(){
        if(this.#media.paused){
            this.playVid();
        }
        else{
            this.pauseVid();
        }
    }

    playVid(){
        this.#media.play();
    }

    pauseVid(){
        this.#media.pause();
    }

    initPlugins(){
        this.plugins.forEach((plugin:any) =>{
            plugin.run(this); //this hace referencia al objeto mediaPlayer
        })
    }

    mute(){
        this.#media.muted = true;
    }

    unmute(){
        this.#media.muted = false;
    }

    muteUnmute(){
        if(this.#media.muted){
            this.unmute();
        }
        else{
            this.mute();
        }
    }
    
}
