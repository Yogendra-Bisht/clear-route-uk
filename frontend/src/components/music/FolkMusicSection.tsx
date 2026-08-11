'use client';

import React, { useState } from 'react';
import { FOLK_ARTISTS_DATA, TRADITIONAL_INSTRUMENTS_DATA } from '@/data/mockData';
import { MusicCategory, FolkArtist, TraditionalInstrument } from '@/types/location';
import { Music, Play, Disc, Sparkles, ExternalLink, Radio, Volume2, ShieldAlert } from 'lucide-react';

export const FolkMusicSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | MusicCategory>('All');
  const [activeTrack, setActiveTrack] = useState<{ title: string; artist: string; url?: string } | null>(null);

  const categories: ('All' | MusicCategory)[] = ['All', 'Folk Legend', 'Modern Pahadi Band', 'Traditional Instrument'];

  const filteredArtists = activeTab === 'All'
    ? FOLK_ARTISTS_DATA
    : activeTab === 'Traditional Instrument'
      ? []
      : FOLK_ARTISTS_DATA.filter(a => a.category === activeTab);

  const showInstruments = activeTab === 'All' || activeTab === 'Traditional Instrument';

  return (
    <section className="w-full bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-amber-500/20 shadow-2xl relative overflow-hidden my-8">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm tracking-wider uppercase mb-1">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Discover Pahadi Music & Cultural Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Folk Legends & Modern Pahadi Bands
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
            Explore centuries of divine <span className="text-amber-300 font-medium">Jagar sacred chants</span>, legendary folk balladeers, ancient mountain instruments, and cinematic Pahadi fusion bands.
          </p>
        </div>

        {/* Audio Player Banner if track selected */}
        {activeTrack && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 px-5 flex items-center gap-3 animate-fade-in">
            <Volume2 className="w-5 h-5 text-amber-400 animate-bounce" />
            <div>
              <p className="text-xs text-amber-300 font-medium">Now Playing Preview</p>
              <p className="text-sm font-bold text-white truncate max-w-[200px]">{activeTrack.title}</p>
            </div>
            <a
              href={activeTrack.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition flex items-center gap-1"
            >
              <span>Listen</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 border ${
              activeTab === cat
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
            }`}
          >
            {cat === 'All' && <Sparkles className="w-4 h-4" />}
            {cat === 'Folk Legend' && <Disc className="w-4 h-4" />}
            {cat === 'Modern Pahadi Band' && <Music className="w-4 h-4" />}
            {cat === 'Traditional Instrument' && <Volume2 className="w-4 h-4" />}
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Artist & Bands Grid */}
      {filteredArtists.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredArtists.map((artist) => (
            <div
              key={artist.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                {/* Card Cover Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full">
                    {artist.category}
                  </span>

                  <span className="absolute top-3 right-3 bg-slate-900/80 text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    {artist.region}
                  </span>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition">
                      {artist.name}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-medium">{artist.title}</p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {artist.bio}
                  </p>

                  {/* Associated Valleys */}
                  {artist.associatedValleys && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {artist.associatedValleys.map((v, i) => (
                        <span key={i} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">
                          📍 {v}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Popular Songs */}
                  <div className="space-y-2 mt-3 border-t border-slate-800/80 pt-3">
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                      <Music className="w-3 h-3 text-amber-400" />
                      Popular Tracks
                    </p>

                    {artist.popularTracks.map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 hover:bg-amber-500/10 border border-slate-800/60 transition group/track cursor-pointer"
                        onClick={() => setActiveTrack({ title: track.title, artist: track.artist, url: track.youtubeUrl })}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <button className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 group-hover/track:bg-amber-500 group-hover/track:text-slate-950 flex items-center justify-center transition">
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </button>
                          <div className="truncate">
                            <p className="text-xs font-semibold text-slate-200 truncate">{track.title}</p>
                            <p className="text-[10px] text-slate-400">{track.genre}</p>
                          </div>
                        </div>

                        {track.youtubeUrl && (
                          <a
                            href={track.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-slate-400 hover:text-red-400 p-1 transition"
                            title="Watch on YouTube"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2">
                <button
                  onClick={() => setActiveTrack({ title: artist.popularTracks[0]?.title || artist.name, artist: artist.name, url: artist.popularTracks[0]?.youtubeUrl })}
                  className="w-full py-2.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500 border border-amber-500/30 text-amber-300 hover:text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Featured Track</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Traditional Instruments Section */}
      {showInstruments && (
        <div className="mt-8 border-t border-slate-800 pt-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-amber-400" />
              Traditional Mountain Instruments
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Ancient sacred instruments crafted from Himalayan wood, brass, and copper that form the heartbeat of Pahadi Jagars and royal war calls.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRADITIONAL_INSTRUMENTS_DATA.map((inst) => (
              <div
                key={inst.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 hover:border-amber-500/30 transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-32 rounded-xl overflow-hidden mb-3 bg-slate-950">
                    <img src={inst.imageUrl} alt={inst.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-white text-sm">{inst.name}</h4>
                    <span className="text-xs text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-md">
                      {inst.regionalName}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-300/80 mb-2"><b>Material:</b> {inst.material}</p>
                  <p className="text-xs text-slate-300 leading-snug mb-3">{inst.description}</p>
                </div>
                <div className="bg-slate-950/60 rounded-lg p-2 border border-slate-800 text-[10px] text-slate-400">
                  <b>Used In:</b> {inst.usedIn}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
