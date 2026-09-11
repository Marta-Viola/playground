import Link from "next/link";
import { Sparkles, Dumbbell, Droplets } from "lucide-react";

export default function Home() {
	const habits = [
		{ id: "tidy", name: "Tidy", icon: Sparkles, color: "bg-blue-500/20 text-blue-400", href: "/tidy" },
		{ id: "fit", name: "Fit", icon: Dumbbell, color: "bg-orange-500/20 text-orange-400", href: "/fit" },
    	{ id: "clean", name: "Clean", icon: Droplets, color: "bg-teal-500/20 text-teal-400", href: "/clean" },
	];

	return (
		<div className="px-6 pt-12">
			{/* Titolo Hand-Written */}
			<h1 className="font-caveat text-5xl mb-8 text-zinc-100">
				Today I want to be...
			</h1>

			{/* Griglia delle Habits */}
			<div className="grid grid-cols-2 gap-4">
				{habits.map((habit) => {
					const Icon = habit.icon;
					return (
						<Link
							key={habit.id}
							href={habit.href}
							className="bg-zinc-900 rounded-3xl p-5 flex flex-col items-start justify-between aspect-square border border-zinc-800 active:scale-95 transition-transform"
						>
							<div className={`p-3 rounded-full ${habit.color}`}>
								<Icon size={28} />
							</div>
							<span className="text-xl font-semibold text-zinc-200">{habit.name}</span>
						</Link>
					);
				})}
			</div>
		</div>
  	);
}
