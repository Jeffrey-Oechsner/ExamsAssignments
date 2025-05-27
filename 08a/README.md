# WebRTC Browser SDP Example

Dette projekt demonstrerer, hvordan to browser-klienter kan forbinde direkte via WebRTC ved at udveksle SDP (Session Description Protocol) beskeder manuelt. 

## Sådan virker koden

1. **Start projektet**
   - Kør `npm install` og derefter `npm run dev` i mappen `01._webrtc_browser_sdp`.
   - Åbn to Chrome-browser vinduer og gå til den lokale server (typisk `http://localhost:5173`).

2. **Opret forbindelse mellem to browsere**
   - I **Client 1**: Klik på `Create Offer`. Kopiér indholdet fra `SDP Offer` feltet.
   - I **Client 2**: Indsæt det kopierede offer i `SDP Offer` feltet og klik på `Create Answer`. Kopiér nu indholdet fra `SDP Answer` feltet.
   - Tilbage i **Client 1**: Indsæt svaret i `SDP Answer` feltet og klik på `Add Answer`.
   - Nu bør video og lyd blive delt mellem de to browsere.

## Hvor sker integrationen i koden?

Integration mellem browser-klienterne sker i filen [`src/main.js`](01._webrtc_browser_sdp/src/main.js), i funktionen `createAnswer`. Her indsættes det modtagne SDP offer fra den anden browser:

```js
// INTEGRATION POINT: Her integreres SDP offer fra client 1 til client 2
await peerConnection.setRemoteDescription(offer);
```

Denne linje markerer det sted, hvor integrationen mellem de to browsere sker via udveksling af SDP-data.

## Fordele og ulemper

**Fordele:**
- Simpelt setup uden behov for en signaleringsserver.
- Giver god forståelse for, hvordan WebRTC-forbindelser etableres.
- Let at debugge og eksperimentere med.

**Ulemper:**
- Manuel udveksling af SDP-data er ikke praktisk til produktion.
- Ingen NAT traversal eller fallback-mekanismer (kræver ofte STUN/TURN-servere i virkelige apps).
- Ikke skalerbart til mange brugere eller automatiseret kommunikation.

## Kommentar i koden

Se kommentaren `// INTEGRATION POINT: Her integreres SDP offer fra client 1 til client 2` i `src/main.js` for at finde det præcise sted, hvor integrationen sker.

---


