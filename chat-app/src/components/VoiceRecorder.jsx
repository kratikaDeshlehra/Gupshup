import React, { useState ,useRef} from 'react'

const VoiceRecorder = () => {
    const [isRecording,setIsRecording]=useState(false);

    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);
  
    const startRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => audioChunks.current.push(event.data);
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/mp3' });
        onSendAudio(audioBlob);
        audioChunks.current = [];
      };
      mediaRecorder.current.start();
      setIsRecording(true);
    };
  
    const stopRecording = () => {
      mediaRecorder.current?.stop();
      setIsRecording(false);
    };

  return (
    <button
    onClick={isRecording ? stopRecording : startRecording}
    >
        {isRecording ? 'Stop' : 'Record'}
    </button>
   
  )
}

export default VoiceRecorder
