let index = 0;
let vids = ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', 
'https://dash.akamaized.net/dash264/TestCasesIOP41/CMAF/UnifiedStreaming/ToS_AVC_MultiRate_MultiRes_AAC_Eng_WebVTT.mpd', 'https://dash.akamaized.net/dash264/TestCases/2c/qualcomm/1/MultiResMPEG2.mpd'];
let manifestUri = vids[index];

    function initApp() {
      // Install built-in polyfills to patch browser incompatibilities.
      shaka.polyfill.installAll();

      // Check to see if the browser supports the basic APIs Shaka needs.
      if (shaka.Player.isBrowserSupported()) {
        // Everything looks good!
        initPlayer();
      } else {
        // This browser does not have the minimum set of APIs we need.
        console.error('Browser not supported!');
      }
}

    async function initPlayer() {
        // Create a Player instance.
        const video = document.getElementById('video');
        const player = new shaka.Player(video);
        // Attach player to the window to make it easy to access in the JS console.
        window.player = player;
        // Listen for error events.
        player.addEventListener('error', onErrorEvent);
        // Try to load a manifest.
        // This is an asynchronous process.
        try {
           await player.load(manifestUri);
           // This runs if the asynchronous load is successful.
        console.log('The video has now been loaded!');
        } catch (e) {
           // onError is executed if the asynchronous load fails.
           onError(e);
        }
    }

    function onErrorEvent(event) {
        // Extract the shaka.util.Error object from the event.
        onError(event.detail);
    }

    function onError(error) {
        // Log the error.
        console.error('Error code', error.code, 'object', error);
    }
        
    function next(){
        //Check if at end of playlist and if so, start over
        if (index == vids.length - 1){
            index = 0;
        }
        //Move to next video in the list
        else{
            index++;
        }

        manifestUri= vids[index];
        initPlayer();
        
    }
    

    document.addEventListener('DOMContentLoaded', initApp);