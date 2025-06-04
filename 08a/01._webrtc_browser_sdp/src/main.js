import './style.css';

let localStream;
let remoteStream;
let peerConnection;

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302'],
    }
  ]
};

// Aktiverer kamera/mikrofon
async function init() {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  document.getElementById("localVideo").srcObject = localStream;
}

async function createPeerConnection(sdpTextAreaId) {
  peerConnection = new RTCPeerConnection(servers);

  remoteStream = new MediaStream();
  document.getElementById("remoteVideo").srcObject = remoteStream;

  localStream.getTracks().forEach((track) =>
    peerConnection.addTrack(track, localStream)
  );

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      document.getElementById(sdpTextAreaId).textContent = JSON.stringify(peerConnection.localDescription);
    }
  };
}

async function createOffer() {
  await init(); // Aktiver kamera
  await createPeerConnection("sdpOfferTextArea");

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  document.getElementById("sdpOfferTextArea").textContent = JSON.stringify(offer);
}

async function createAnswer() {
  await init(); // Aktiver kamera
  await createPeerConnection("sdpAnswerTextArea");

  let offer = document.getElementById("sdpOfferTextArea").value;
  if (!offer) return alert("Offer is required");
  offer = JSON.parse(offer);

 
 
  // Her modtager client 2 SDP offer fra client 1 og sætter det som remote description.
  // Dette trin etablere WebRTC-forbindelsen mellem de to browsere.
  await peerConnection.setRemoteDescription(offer);  // her sker integration


  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  document.getElementById("sdpAnswerTextArea").textContent = JSON.stringify(answer);
}

async function addAnswer() {
  let answer = document.getElementById("sdpAnswerTextArea").value;
  if (!answer) return alert("Answer is required");
  answer = JSON.parse(answer);

   // her sker integration (start) // Sætter SDP answer fra client 2 som remote description hos client 1 for at fuldføre WebRTC-forbindelsen
  if (!peerConnection.currentRemoteDescription) {
    await peerConnection.setRemoteDescription(answer);
  }
  // her sker integration (slut)
}

// Event listeners
document.getElementById("createOfferButton").addEventListener("click", createOffer);
document.getElementById("createAnswerButton").addEventListener("click", createAnswer);
document.getElementById("addAnswerButton").addEventListener("click", addAnswer);
