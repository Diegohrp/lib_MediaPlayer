import { MediaPlayer } from "../MediaPlayer";

export class AutoPlay{
    
    run(mediaPlayer:MediaPlayer){
        mediaPlayer.mute();
        mediaPlayer.playVid();
        
    }
}

