"use client";

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function WordleTracker() {
  const [scores, setScores] = useState<any[]>([]);
  const [outcome, setOutcome] = useState("Abel won");
  const [tag, setTag] = useState("Normal");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Fetch past scores when the page loads
  useEffect(() => {
    fetchScores();
  }, []);

  async function fetchScores() {
    const { data } = await supabase
      .from("wordle_scores")
      .select("*")
      .order("played_date", { ascending: false });
    
    if (data) setScores(data);
  }

  // Handle submitting a new score
  async function submitScore(e: React.FormEvent) {
    e.preventDefault();
    
    const newScore = {
      played_date: date,
      outcome: outcome,
      special_tag: tag,
    };

    await supabase.from("wordle_scores").insert([newScore]);
    fetchScores(); // Refresh the list instantly
  }

  // Handle deleting a score
  async function deleteScore(id: number) {
    const confirmDelete = window.confirm("Are you sure you want to delete this match?");
    if (!confirmDelete) return;

    await supabase.from("wordle_scores").delete().eq("id", id);
    fetchScores(); // Refresh the list instantly
  }

  // Calculate the live points
  let abelTotal = 27.5;
  let graceTotal = 38.5;

  scores.forEach((score) => {
    if (score.outcome === "Abel won") abelTotal += 1;
    if (score.outcome === "Grace won") graceTotal += 1;
    if (score.outcome === "Draw") {
      abelTotal += 0.5;
      graceTotal += 0.5;
    }
  });

  return (
    <main className="relative min-h-screen text-neutral-100 p-4 font-sans selection:bg-pink-500/30">
      
      {/* Layer 1: The Fixed Background Image */}
      <div className="fixed inset-0 -z-20 h-full w-full bg-[url('/bg.jpg')] bg-cover bg-center"></div>
      
      {/* Layer 2: The Brightness Tint (Change the /40 to adjust!) */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-neutral-950/40"></div>

      <div className="max-w-md mx-auto space-y-8 mt-6">

        {/* The Copyright Message */}
        <div className="text-center text-xs text-neutral-500 font-medium tracking-widest uppercase">
          © 2026 Abel Wang
        </div>

        {/* The Scoreboard */}
        <div className="text-center backdrop-blur-md bg-neutral-900/60 p-6 rounded-3xl border border-neutral-800 shadow-[0_0_40px_-10px_rgba(236,72,153,0.25)]">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500 whitespace-nowrap">
            Abel {abelTotal} - {graceTotal} Grace
          </h1>
          <p className="text-neutral-500 text-sm font-medium uppercase tracking-widest">Wordle Tracker</p>
        </div>

        {/* The Input Form */}
        <form onSubmit={submitScore} className="flex flex-col gap-5 backdrop-blur-md bg-neutral-900/60 p-6 rounded-3xl border border-neutral-800 shadow-xl">
          <h2 className="text-xl font-bold">Log Today's Match</h2>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full max-w-full box-border bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Outcome</label>
            <select
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none cursor-pointer"
            >
              <option value="Abel won">Abel won</option>
              <option value="Grace won">Grace won</option>
              <option value="Draw">Draw</option>
              <option value="-">-</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Special Tag</label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none cursor-pointer"
            >
              <option value="Normal">Normal</option>
              <option value="Tgt😛">Tgt😛</option>
              <option value="ajw hates gkn ☹️">ajw hates gkn ☹️</option>
              <option value="FAILED">FAILED</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-neutral-950 font-bold text-lg py-4 rounded-xl transition-all active:scale-[0.98]"
          >
            Submit Score
          </button>
        </form>

        {/* The History Log */}
        <div className="space-y-3 pb-10">
          <h2 className="text-xl font-bold mb-4 px-2 text-white/90">Match History</h2>
          
          {scores.length === 0 ? (
             <p className="text-neutral-500 text-center py-4">No matches logged yet!</p>
          ) : (
            scores.map((score) => (
              <div key={score.id} className="group flex justify-between items-center backdrop-blur-md bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-neutral-700 hover:shadow-pink-500/10">
                
                <div>
                  <p className="font-bold text-lg text-white/90">{score.outcome}</p>
                  <p className="text-sm text-neutral-400 font-medium">{score.played_date}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  {score.special_tag !== "Normal" && (
                    <span className="bg-neutral-800 border border-neutral-700 text-xs font-bold px-3 py-1.5 rounded-lg text-pink-400 uppercase tracking-wider">
                      {score.special_tag}
                    </span>
                  )}
                  
                  <button 
                    onClick={() => deleteScore(score.id)}
                    className="text-neutral-500 hover:text-red-500 transition-colors p-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    title="Delete Match"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}