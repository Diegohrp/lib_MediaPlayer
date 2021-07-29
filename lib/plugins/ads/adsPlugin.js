import { Ads } from "./ads";
export class AdsPlugin {
    constructor() {
        this.ads = Ads.getInstance();
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.adsContainer = document.createElement("div");
    }
    run(mediaPlayer) {
        this.mediaPlayer = mediaPlayer;
        this.mediaPlayer.container.appendChild(this.adsContainer);
        this.mediaPlayer.media.addEventListener("timeupdate", this.handleTimeUpdate);
    }
    handleTimeUpdate() {
        //console.log(this.mediaPlayer.media.currentTime)
        const currentTime = Math.floor(this.mediaPlayer.media.currentTime);
        if (currentTime % 20 === 0) {
            this.renderAd();
        }
    }
    renderAd() {
        if (this.currentAd) {
            return;
        }
        const ad = this.ads.getAd();
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
        setTimeout(() => {
            this.currentAd = null;
            this.adsContainer.innerHTML = "";
        }, 10000);
    }
}
