"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Dumbbell, Droplets, ChevronDown, ChevronUp, Trophy, X, Gamepad2 } from "lucide-react";

export default function Home() {
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);

	// mock data
	const habits = [
		{ 
			id: "tidy", 
			name: "Tidy", 
			icon: Sparkles, 
			color: "bg-blue-500/20 text-blue-400", 
			streak: 12,
			history: [true, true, false, true, true, true, true]
		},
		{ 
			id: "fit", 
			name: "Fit", 
			icon: Dumbbell, 
			color: "bg-orange-500/20 text-orange-400",
			streak: 3,
			history: [false, false, false, true, true, false, true]
		},
		{ 
			id: "clean", 
			name: "Clean", 
			icon: Droplets, 
			color: "bg-teal-500/20 text-teal-400",
			streak: 0,
			history: [false, false, false, false, false, false, false]
		},
	];

	const toggleExpand = (id: string) => {
		setExpandedId(expandedId === id ? null : id);
	};

	return (
		<div className="px-6 pt-12 pb-24">
			{/* Titolo Hand-Written */}
			<h1 className="font-caveat text-5xl mb-8 text-zinc-100">
				Today I want to be...
			</h1>

			{/* Lista delle Habits */}
			<div className="flex flex-col gap-4">
				{habits.map((habit) => {
					const Icon = habit.icon;
					const isExpanded = expandedId === habit.id;

					return (
						<div
							key={habit.id}
							className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden transition-all duration-300"
						>
							{/* header della card */}
							<button
								onClick={() => toggleExpand(habit.id)}
								className="w-full p-5 flex items-center justify-between active:bg-zinc-800/50 transition-colors"
							>
								<div className="flex items-center gap-4">
									<div className={`p-3 rounded-full ${habit.color}`}>
										<Icon size={28} />
									</div>
									<span className="text-2xl font-semibold text-zinc-200">{habit.name}</span>
								</div>
								{isExpanded ? (
									<ChevronUp className="text-zinc-500" size={24} />
								) : (
									<ChevronDown className="text-zinc-500" size={24} />
								)}
							</button>

							{/* corpo espanso della card */}
							{isExpanded && (
								<div className="px-5 pb-5 pt-2 border-t border-zinc-800/50">

									{/* statistiche e pallini */}
									<div className="flex justify-between items-center mb-6 mt-2">
										<div>
											<p className="text-sm text-zinc-500 font-medium uppercase tracking-wider mb-1">Streak</p>
											<p className="text-3xl font-bold text-white">{habit.streak} <span className="text-lg text-zinc-500 font-normal">days</span></p>
										</div>

										<div className="flex gap-1.5">
											{habit.history.map((isDone, index) => (
												<div
													key={index}
													className={`w-3 h-3 rounded-full ${isDone ? 'bg-green-500' : 'bg-zinc-700'}`}
												/>
											))}
										</div>
									</div>

									{/* mission briefing (phase 1) */}
									<div className="bg-zinc-950 rounded-2xl p-4 mb-6 border border-zinc-800">
										<div className="flex items-center justify-between mb-3">
											<h3 className="text-zinc-300 font-medium uppercase text-xs tracking-widest">Phase 1 Objective</h3>
											<button
												onClick={() => setIsTargetModalOpen(true)}
												className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full p-2 transition-colors flex items-center"
											>
												<Trophy size={14} className="text-yellow-500 mr-1.5" />
												<span className="text-xs font-semibold">View Reward</span>
											</button>
										</div>
										
										<ul className="text-sm text-zinc-400 space-y-2 mb-3">
											<li className="flex items-start">
												<span className="text-zinc-600 mr-2">•</span>
												Reset at least one room buffer per day.
											</li>
											<li className="flex items-start">
												<span className="text-zinc-600 mr-2">•</span>
												Reach a 21-day streak to unlock Phase 2.
											</li>
										</ul>

										<p className="text-[10px] text-zinc-600 italic border-t border-zinc-800/50 pt-2">
											*Skip 1 day: Streak frozen. Skip 2 days: Streak cut in half: Skip 3 days: Back to 0.
										</p>
									</div>

									{/* main CTA button */}
									<Link
										href={`/${habit.id}`}
										className="w-full bg-white text-black font-bold text-lg rounded-2xl py-4 flex items-center justify-center active:scale-95 transition-transform"
										>
											Let's do it!
										</Link>

								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* target modal */}
			{isTargetModalOpen && (
				<div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm">
					{/* cliccare fuori dal modale lo chiude */}
					<div
						className="absolute inset-0"
						onClick={() => setIsTargetModalOpen(false)}
					/>

					<div className="relative bg-zinc-900 w-full sm:w-96 rounded-t-3xl sm:rounded-3xl p-6 border-t sm:border border-zinc-800 shadow-2xl animate-in slide-in-from-bottom-10">
						<button
							onClick={() => setIsTargetModalOpen(false)}
							className="absolute top-4 right-4 bg-zinc-800 rounded-full p-2 text-zinc-400"
						>
							<X size={20} />
						</button>

						<div className="text-center mt-4">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/20 text-yellow-500 mb-4">
								<Trophy size={32} />
							</div>
							<h2 className="text-2xl font-bold text-white mb-2">Phase 1 Target</h2>
							<p className="text-zinc-400 mb-6">Complete your 21-day streak to earn this reward.</p>

							{/* Silksong in bianco e nero - per ora colore grigio */}
							<div className="aspect-video bg-zinc-800 rounded-xl overflow-hidden relative border border-zinc-700">
								{/* immagine segnaposto simulata */}
								<div className="absolute inset-0 flex flex-col items-center justify-center grayscale opacity-50">
									<Gamepad2 size={48} className="text-zinc-500 mb-2" />
									<span className="font-bold text-zinc-600 tracking-widest uppercase">Silksong</span>
								</div>

								{/* barra progresso mock (mostra 12/21) */}
								<div className="absolute bottom-0 left-0 h-1.5 bg-green-500" style={{ width: '57%' }} />
							</div>

							<p className="mt-4 font-bold text-zinc-300">12 / 21 Days</p>
						</div>
					</div>
				</div>
			)}
		</div>
  	);
}