"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

export default function QRCodeScanner() {
  const [result, setResult] = useState("Nenhum QR lido ainda");
  const qrCodeRegionId = "html5qr-code-full-region";
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          // procura a câmera traseira
          const rearCamera =
            devices.find(
              (device) => device.label.toLowerCase().includes("back") || device.label.toLowerCase().includes("rear"),
            ) || devices[0];

          html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);

          html5QrCodeRef.current
            .start(
              rearCamera.id, // passa o deviceId correto
              {
                fps: 10,
                qrbox: 250,
              },
              (decodedText, decodedResult) => {
                setResult(decodedText);
              },
              (errorMessage) => {
                console.warn("Erro ao ler QR code:", errorMessage);
              },
            )
            .catch((err) => console.error("Não foi possível iniciar o scanner", err));
        }
      })
      .catch((err) => console.error("Não conseguiu listar câmeras", err));

    return () => {
      html5QrCodeRef.current?.stop().catch((err) => console.error(err));
    };
  }, []);

  return (
    <div>
      <div id={qrCodeRegionId} style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}></div>
      <p>Resultado: {result}</p>
    </div>
  );
}
