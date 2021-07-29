import {MediaPlayer} from "../../MediaPlayer"
import { Ad, Ads } from "./ads";


export class AdsPlugin{
    private mediaPlayer:MediaPlayer;
    private ads: Ads;
    private currentAd:Ad;
    private adsContainer:HTMLElement;
    constructor(){
        this.ads = Ads.getInstance();
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.adsContainer = document.createElement("div");
    }
    run(mediaPlayer:MediaPlayer){
        this.mediaPlayer = mediaPlayer;
        this.mediaPlayer.container.appendChild(this.adsContainer);
        this.mediaPlayer.media.addEventListener("timeupdate",this.handleTimeUpdate);
    }

    private handleTimeUpdate(){
        //console.log(this.mediaPlayer.media.currentTime)
        const currentTime:number = Math.floor(this.mediaPlayer.media.currentTime);
        if(currentTime%20 === 0){
            this.renderAd();
        }
    }

    private renderAd(){
        if(this.currentAd){
            return;
        }
        const ad:Ad = this.ads.getAd();
        this.currentAd = ad;
        this.adsContainer.innerHTML = 
        `<div class="ads">
            <a  class="ads__link" href="${this.currentAd.url}" target="_blank">
                <img class="ads__img" src="${this.currentAd.imageUrl}" />
                <div class="ads__info">
                <h5 class="ads__title">${this.currentAd.title}</h5>
                <p class="ads__body">${this.currentAd.body}</p>
                </div>
            </a>
        </div>`;

        setTimeout(() =>{
            this.currentAd = null;
            this.adsContainer.innerHTML = "";
        },10000);
    }
}