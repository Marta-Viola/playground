"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, Sparkles, Monitor, Armchair, CircleDashed, Square, CheckSquare, Dices, Gift } from "lucide-react";

const BUFFERS = [
    { id: "desk", name: "Desk", icon: Monitor, color: "text-blue-400" },
    { id: "pouf", name: "Pouf", icon: CircleDashed, color: "text-teal-400" },
    { id: "chair", name: "Chair", icon: Armchair, color: "text-purple-400" },
    { id: "table", name: "Glass Table", icon: Square, color: "text-emerald-400" },
    { id: "nothing", name: "NOTHING! 🎉", icon: Gift, color: "text-yellow-400" },
];

export default function TidyFlow() {
    // game state
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    // --- STATI DELLO STEP 1 ---
    const [selectedToClean, setSelectedToClean] = useState<string[]>([]);
    const [enabledForWheel, setEnabledForWheel] = useState<string[]>(BUFFERS.map(b => b.id));   // tutti abilitati di default
    const [showWheel, setShowWheel] = useState(false);

    // -- stati per l'animazione della ruota --
    const [isSpinning, setIsSpinning] = useState(false);
    const [wheelResult, setWheelResult] = useState<string | null>(null);
    const [hasSpun, setHasSpun] = useState(false);

    // colori a tema tidy
    const themeColor = "text-blue-400";
    const themeBtn = "bg-blue-600 hover:bg-blue-500";

    // gestisce le spunte della checklist principale
    const toggleCleanSelection = (id: string) => {
        // se esce "nothing", non selezioniamo nulla, andiamo solo avanti
        if (id === "nothing") return;

        setSelectedToClean(prev =>
            prev.includes(id) ? prev.filter(b=> b !== id) : [...prev, id]
        );
    };

    // gestisce gli interruttori per la ruota
    const toggleWheelInclusion = (id: string) => {
        setEnabledForWheel(prev => {
            // impedisci di deselezionare tutto (devono rimanere almeno 2 opzioni)
            if (prev.includes(id) && prev.length <= 2) return prev;
            return prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
        });
    };

    const spinWheel = () => {
        if (isSpinning || hasSpun) return;

        setIsSpinning(true);
        setHasSpun(true);
        setWheelResult(null);

        // simuliamo il tempo di "giro" (2 secondi)
        setTimeout(() => {
            // 1. prendi un buffer a caso tra quelli abilitati
            const randomIndex = Math.floor(Math.random() * enabledForWheel.length);
            const winnerId = enabledForWheel[randomIndex];

            setWheelResult(winnerId);
            setIsSpinning(false);

            // 2. dopo aver mostrato il risultato per 1 secondo, chiudi la ruota e seleziona
            setTimeout(() => {
                if (winnerId === "nothing") {
                    setSelectedToClean([]);
                } else if (!selectedToClean.includes(winnerId)) {
                    // aggiunge il vincitore alla lista
                    setSelectedToClean(prev => [...prev, winnerId]);
                }
                setShowWheel(false);    // torna alla checklist
            }, 1500);

        }, 2000);   // = 2 secondi
    };

    const handleEverythingTidy = () => {
        // TODO: qui apriremo il modale per il PIN
        alert("Inserisci PIN (implementazione futura)");
    };

    // reinderizza lo step corrente
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="flex flex-col flex-1 h-full animate-in fade-in slide-in-from-bottom-4">
                        <h2 className="text-3xl font-bold mb-2">Choose your target</h2>
                        <p className="text-zinc-400 mb-8">What are we resetting today?</p>

                        {!showWheel ? (
                            // VISTA 1: la checklist normale
                            <div className="space-y-6 flex-1">
                                <div className="space-y-3">
                                    {BUFFERS.filter(b => b.id !== "nothing").map((buffer) => {
                                        const Icon = buffer.icon;
                                        const isSelected = selectedToClean.includes(buffer.id);
                                        return (
                                            <button
                                                key={buffer.id}
                                                onClick={() => toggleCleanSelection(buffer.id)}
                                                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                                                    isSelected ? 'bg-blue-950/40 border-blue-500' : 'bg-zinc-900 border-zinc-800'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-400'}`}>
                                                        <Icon size={20} />
                                                    </div>
                                                    <span className={`font-medium ${isSelected ? 'text-white' : 'text-zinc-300'}`}>{buffer.name}</span>
                                                </div>
                                                {isSelected ? <CheckSquare className="text-blue-500" size={24} /> : <Square className="text-zinc-600" size={24} />}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button onClick={handleEverythingTidy} className="w-full py-4 rounded-2xl border-2 border-dashed border-zinc-700 text-zinc-400 hover:text-white font-medium">
                                    ✨ Everything is already Tidy!
                                </button>

                                <button onClick={() => setShowWheel(true)} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-zinc-800 text-white font-bold mt-4">
                                    <Dices size={20} /> Let the Wheel decide
                                </button>
                            </div>
                        ) : (
                            // VISTA 2: preparazione ruota
                            <div className="flex-1 flex flex-col">
                                <p className="text-sm text-zinc-400 mb-4 uppercase tracking-wider">Configure Wheel</p>
                                <div className="space-y-3 mb-8">
                                    {BUFFERS.map((buffer) => {
                                        const isEnabled = enabledForWheel.includes(buffer.id);
                                        const isNothing = buffer.id === "nothing";
                                        return (
                                            <div key={buffer.id} className={`flex items-center justify-between p-3 rounded-xl border ${isEnabled ? 'bg-zinc-900 border-zinc-800' : 'opacity-50 border-transparent'}`}>
                                                <span className={`font-medium ${isNothing ? 'text-yellow-400' : 'text-zinc-300'}`}>{buffer.name}</span>
                                                {/* toggle switch */}
                                                <button
                                                    onClick={() => toggleWheelInclusion(buffer.id)}
                                                    disabled={hasSpun}
                                                    className={`w-12 h-6 rounded-full transition-colors relative ${isEnabled ? (isNothing ? 'bg-yellow-500' : 'bg-blue-500') : 'bg-zinc-700'}`}
                                                >
                                                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${isEnabled ? 'left-6' : 'left-0.5'}`} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* LA RUOTA */}
                                <div className="relative h-32 bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden flex items-center justify-center mb-6">
                                    {/* bordo indicatore centrale */}
                                    <div className="absolute inset-y-0 w-full flex items-center justify-center pointer-events-none">
                                        <div className="w-full h-12 border-y-2 border-zinc-600/50 bg-white/5" />
                                    </div>

                                    {isSpinning ? (
                                        <div className="animate-pulse flex items-center gap-2 text-zinc-400">
                                            <Dices className="animate-spin" size={24} />
                                            <span className="font-bold tracking-widest uppercase">Spinning...</span>
                                        </div>
                                    ) : wheelResult ? (
                                        <div className="flex items-center gap-3 animate-in zoom-in spin-in-12 duration-300">
                                            {(() => {
                                                const winner = BUFFERS.find(b => b.id === wheelResult);
                                                const Icon = winner!.icon;
                                                return (
                                                    <>
                                                        <Icon size={32} className={winner!.color} />
                                                        <span className={`text-2xl font-bold ${winner!.color}`}>{winner!.name}</span>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    ) : (
                                        <span className="text-zinc-500 font-medium">Ready to spin</span>
                                    )}
                                </div>

                                <div className="mt-auto flex gap-3">
                                    <button
                                        onClick={() => setShowWheel(false)}
                                        disabled={isSpinning}
                                        className="flex-1 py-4 rounded-2xl bg-zinc-800 text-white font-bold disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={spinWheel}
                                        disabled={isSpinning || hasSpun}
                                        className={`flex-1 py-4 rounded-2xl text-white font-bold disabled:opacity-50 ${themeBtn}`}
                                    >
                                        {hasSpun ? "Already Spun!" : "Spin!"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 2:
                return (
                    <div className="flex flex-col items-center justify-center flex-1 h-full">
                        <h2 className="text-3xl font-bold mb-4">Step 2: L'Azione</h2>
                        <button onClick={() => setStep(3)} className="px-8 py-4 mt-8 rounded-2xl bg-white text-black font-bold">Finito (Mock)</button>
                    </div>
                );
            case 3:
                return (
                    <div className="flex flex-col items-center justify-center flex-1 h-full text-center">
                        <h2 className="text-4xl font-bold mb-4">Perfect! ✅</h2>
                        <Link href="/" className="px-8 py-4 rounded-2xl bg-blue-500 text-white font-bold w-full max-w-xs">Torna alla Dashboard</Link>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            {/* header del flow */}
            <header className="px-6 py-4 flex items-center justify-between border-b border-zinc-800">
                <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-zinc-800 text-zinc-400 transition-colors"><X size={24} /></Link>
                <div className="flex items-center gap-2"><Sparkles size={20} className={themeColor} /><span className="font-bold tracking-wider uppercase text-sm">Tidy Flow</span></div>
                <div className="w-8" />
            </header>
            {/* progress bar in alto */}
            <div className="w-full bg-zinc-900 h-1"><div className="h-full bg-blue-500 transition-all duration-500 ease-out" style={{ width: `${(step / totalSteps) * 100}%` }} /></div>
            {/* area di contenuto dinamica */}
            <main className="flex-1 flex flex-col px-6 py-8">
                {renderStep()}

                {/* bottone globale per avanzare */}
                {step === 1 && !showWheel && (selectedToClean.length > 0 || wheelResult === "nothing") && (
                    <button
                        onClick={() => setStep(2)}
                        className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg mt-8 ${themeBtn} animate-in fade-in slide-in-from-bottom-4`}
                    >
                        {wheelResult === "nothing" ? "Lucky day! Skip to end" : `Let's Go! (${selectedToClean.length})`}
                    </button>
                )}
            </main>
        </div>
    );
}