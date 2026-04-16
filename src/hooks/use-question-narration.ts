import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type NarrationRate = 0.75 | 1 | 1.25;

const DEFAULT_ERROR = 'Audio narration is not supported in this browser.';

export function useQuestionNarration() {
    const isSupported =
        typeof window !== 'undefined' &&
        'speechSynthesis' in window &&
        'SpeechSynthesisUtterance' in window;

    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [rate, setRate] = useState<NarrationRate>(1);
    const [error, setError] = useState('');

    const selectedVoice = useMemo(
        () => voices.find((voice) => voice.voiceURI === selectedVoiceURI),
        [voices, selectedVoiceURI],
    );

    useEffect(() => {
        if (!isSupported) {
            setError(DEFAULT_ERROR);
            return;
        }

        const synth = window.speechSynthesis;

        const loadVoices = () => {
            const available = synth.getVoices();
            setVoices(available);

            setSelectedVoiceURI((previous) => {
                if (previous) return previous;

                const preferredVoice =
                    available.find((voice) => /en(-|_)/i.test(voice.lang)) ??
                    available[0];

                return preferredVoice?.voiceURI ?? '';
            });
        };

        loadVoices();
        synth.onvoiceschanged = loadVoices;

        return () => {
            synth.onvoiceschanged = null;
            synth.cancel();
        };
    }, [isSupported]);

    const stop = useCallback(() => {
        if (!isSupported) return;

        window.speechSynthesis.cancel();
        utteranceRef.current = null;
        setIsSpeaking(false);
        setIsPaused(false);
    }, [isSupported]);

    const speak = useCallback(
        (text: string) => {
            if (!isSupported) {
                setError(DEFAULT_ERROR);
                return;
            }

            if (!text.trim()) return;

            const synth = window.speechSynthesis;
            synth.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = rate;

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                utterance.lang = selectedVoice.lang;
            }

            utterance.onstart = () => {
                setError('');
                setIsSpeaking(true);
                setIsPaused(false);
            };

            utterance.onend = () => {
                setIsSpeaking(false);
                setIsPaused(false);
                utteranceRef.current = null;
            };

            utterance.onerror = () => {
                setError('Unable to play narration on this device.');
                setIsSpeaking(false);
                setIsPaused(false);
                utteranceRef.current = null;
            };

            utteranceRef.current = utterance;
            synth.speak(utterance);
        },
        [isSupported, rate, selectedVoice],
    );

    const pause = useCallback(() => {
        if (!isSupported) return;

        const synth = window.speechSynthesis;
        if (synth.speaking && !synth.paused) {
            synth.pause();
            setIsSpeaking(false);
            setIsPaused(true);
        }
    }, [isSupported]);

    const resume = useCallback(() => {
        if (!isSupported) return;

        const synth = window.speechSynthesis;
        if (synth.paused) {
            synth.resume();
            setIsSpeaking(true);
            setIsPaused(false);
        }
    }, [isSupported]);

    return {
        isSupported,
        isSpeaking,
        isPaused,
        rate,
        setRate,
        error,
        speak,
        pause,
        resume,
        stop,
    };
}
