
function VideoPlayer(props) {

    return(
        <div>
          <video width="750" controls src={props.videoPath}>
            Your browser does not support the video tag.
          </video>
          <br />
          <a href={props.videoPath} download="predictedVideo.mp4">Download Video</a>
        </div>
    );
}

export default VideoPlayer