var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MediaPlayer_media;
export class MediaPlayer {
    constructor({ media, plugins = [] }) {
        _MediaPlayer_media.set(this, void 0);
        __classPrivateFieldSet(this, _MediaPlayer_media, media, "f");
        this.plugins = plugins;
        this.initPlayer();
        this.initPlugins();
    }
    initPlayer() {
        this.container = document.createElement("div");
        __classPrivateFieldGet(this, _MediaPlayer_media, "f").parentNode.insertBefore(this.container, this.media);
        this.container.appendChild(this.media);
    }
    get media() {
        return __classPrivateFieldGet(this, _MediaPlayer_media, "f");
    }
    playPause() {
        if (__classPrivateFieldGet(this, _MediaPlayer_media, "f").paused) {
            this.playVid();
        }
        else {
            this.pauseVid();
        }
    }
    playVid() {
        __classPrivateFieldGet(this, _MediaPlayer_media, "f").play();
    }
    pauseVid() {
        __classPrivateFieldGet(this, _MediaPlayer_media, "f").pause();
    }
    initPlugins() {
        this.plugins.forEach((plugin) => {
            plugin.run(this); //this hace referencia al objeto mediaPlayer
        });
    }
    mute() {
        __classPrivateFieldGet(this, _MediaPlayer_media, "f").muted = true;
    }
    unmute() {
        __classPrivateFieldGet(this, _MediaPlayer_media, "f").muted = false;
    }
    muteUnmute() {
        if (__classPrivateFieldGet(this, _MediaPlayer_media, "f").muted) {
            this.unmute();
        }
        else {
            this.mute();
        }
    }
}
_MediaPlayer_media = new WeakMap();
