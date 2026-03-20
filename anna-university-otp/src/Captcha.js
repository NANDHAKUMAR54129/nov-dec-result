import React, { useRef, useEffect, useState, useCallback, useImperativeHandle, forwardRef } from 'react';

const Captcha = forwardRef(({ onChange }, ref) => {
  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState('');

  const generateRandomString = (length) => {
    // Avoid ambiguous characters: I, l, 1, O, 0, S, 5, G, 6
    const chars = 'ABCDEFHKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz234789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const drawCaptcha = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Fill background (white with slight opacity or just white)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Generate text
    const text = generateRandomString(6);
    setCaptchaText(text);
    if (onChange) {
      onChange(text);
    }

    // Add noise (dots)
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = `rgba(138, 43, 226, ${Math.random()})`; // Purple-ish noise like in the image
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add text
    ctx.font = 'bold 32px monospace';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    const charWidth = width / text.length;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const x = (i * charWidth) + (charWidth / 2);
      const y = height / 2;

      ctx.save();
      ctx.translate(x, y);
      // Random rotation between -20 and 20 degrees
      const rotation = (Math.random() - 0.5) * 0.4;
      ctx.rotate(rotation);

      // Random color variation around purple
      ctx.fillStyle = `rgb(${100 + Math.random() * 50}, ${30 + Math.random() * 40}, ${180 + Math.random() * 50})`;
      // Outline
      ctx.strokeStyle = `rgba(100, 30, 180, 0.5)`;
      ctx.lineWidth = 1;

      // We want hollow/outlined text effect to match the image closely or solid purple. The image has hollowish purple text.
      ctx.fillText(char, 0, 0);
      ctx.strokeText(char, 0, 0);
      ctx.restore();
    }
  }, [onChange]);

  useImperativeHandle(ref, () => ({
    refreshCaptcha: () => {
      drawCaptcha();
    },
    playAudio: () => {
      if (!captchaText) return;

      // Stop any currently playing audio
      window.speechSynthesis.cancel();

      // Read out the characters one by one for clarity.
      // Adding extra spaces and commas forces the speech engine to pause longer between letters.
      const spokenText = captchaText.split('').join(', ');
      const utterance = new SpeechSynthesisUtterance(spokenText);

      // Attempt to achieve a younger, higher-pitched child's voice
      utterance.pitch = 2.0; // Max pitch for a smaller voice
      utterance.rate = 0.5;  // Very slow so it's perfectly clear

      // Try to select a local female/child voice with Indian/Tamilnadu accent if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice =>
        (voice.lang.includes('ta-IN') || voice.lang.includes('en-IN')) &&
        (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('heera') || voice.name.toLowerCase().includes('girl'))
      ) || voices.find(voice =>
        voice.lang.includes('en-IN') // Fallback to any Indian English voice
      ) || voices.find(voice =>
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('child')
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  }));

  useEffect(() => {
    drawCaptcha();
  }, [drawCaptcha]);

  return (
    <div className="captcha-container">
      <canvas
        ref={canvasRef}
        width={180}
        height={60}
        className="captcha-canvas"
      />
    </div>
  );
});

export default Captcha;
