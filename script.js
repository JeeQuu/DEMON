document.addEventListener('DOMContentLoaded', (event) => {
  const mouseVideo = document.getElementById('mouseVideo');
  const fireVideo = document.getElementById('fireVideo');
  const playButton = document.getElementById('playButton');
  
  function togglePlay() {
    if (mouseVideo.paused && fireVideo.paused) {
      mouseVideo.play().catch(e => console.error('Mouse video play failed:', e));
      fireVideo.play().catch(e => console.error('Fire video play failed:', e));
      playButton.textContent = 'Pause';
    } else {
      mouseVideo.pause();
      fireVideo.pause();
      playButton.textContent = 'Play';
    }
  }

  playButton.addEventListener('click', togglePlay);

  // Debug information
  function logVideoInfo(video, name) {
    console.log(`${name} Video Info:`);
    console.log(`- Supported: ${!!video.canPlayType}`);
    console.log(`- WebM support: ${video.canPlayType('video/webm')}`);
    console.log(`- MP4 support: ${video.canPlayType('video/mp4')}`);
    console.log(`- Current source: ${video.currentSrc}`);
    console.log(`- Network state: ${video.networkState}`);
    console.log(`- Ready state: ${video.readyState}`);
    console.log(`- Error: ${video.error ? video.error.message : 'None'}`);
  }

  mouseVideo.addEventListener('loadedmetadata', () => logVideoInfo(mouseVideo, 'Mouse'));
  fireVideo.addEventListener('loadedmetadata', () => logVideoInfo(fireVideo, 'Fire'));

  // Attempt to play when videos are loaded
  mouseVideo.addEventListener('canplay', () => {
    mouseVideo.play().catch(e => console.log('Mouse video autoplay prevented:', e));
  });
  fireVideo.addEventListener('canplay', () => {
    fireVideo.play().catch(e => console.log('Fire video autoplay prevented:', e));
  });
});