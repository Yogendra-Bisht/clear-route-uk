'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mountain, 
  Trees, 
  Landmark, 
  Sparkles, 
  Feather, 
  Compass, 
  MapPin, 
  Sun, 
  Waves, 
  ShieldCheck, 
  ChevronRight,
  Flower2,
  BookOpen,
  Scroll,
  PhoneCall,
  Flame,
  Shield,
  Camera
} from 'lucide-react';

export const UttarakhandGuide: React.FC = () => {
  const [guideTab, setGuideTab] = useState<
    'overview' | 'divisions' | 'mythology' | 'folklore' | 'wildlife' | 'heritage' | 'flora_fauna' | 'culture'
  >('overview');

  return (
    <div className="space-y-10">
      {/* Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 p-8 md:p-12 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Devbhoomi — Land of Gods & Sacred Legends</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Discover Uttarakhand’s Mythology, Folklore & Heritage
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Nestled in the lap of the Greater Himalayas, Uttarakhand is divided into two distinct cultural and geographic regions: <strong className="text-emerald-400">Garhwal</strong> and <strong className="text-cyan-400">Kumaon</strong>. Revered since the Vedic ages as <em>Devbhoomi</em>, it is the cradle of sacred epics, ancient Nagara stone shrines, Panch Kedar legends, and timeless Pahari folklore.
          </p>

          {/* Quick State Symbols */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] text-slate-500 uppercase font-bold">State Animal</span>
              <p className="font-extrabold text-slate-200 mt-0.5">Himalayan Musk Deer</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] text-slate-500 uppercase font-bold">State Bird</span>
              <p className="font-extrabold text-emerald-400 mt-0.5">Himalayan Monal</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] text-slate-500 uppercase font-bold">State Flower</span>
              <p className="font-extrabold text-cyan-400 mt-0.5">Brahma Kamal</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] text-slate-500 uppercase font-bold">State Tree</span>
              <p className="font-extrabold text-purple-400 mt-0.5">Buransh (Rhododendron)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Interactive Sub-Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'overview', label: 'State Overview', icon: BookOpen },
          { id: 'divisions', label: 'Garhwal vs Kumaon', icon: Compass },
          { id: 'mythology', label: 'Mythological Importance', icon: Flame },
          { id: 'folklore', label: 'Folk Stories & Legends', icon: Scroll },
          { id: 'wildlife', label: 'Wildlife & Sanctuaries', icon: ShieldCheck },
          { id: 'heritage', label: 'Archaeology & Temples', icon: Landmark },
          { id: 'flora_fauna', label: 'Flora & Alpine Bugyals', icon: Flower2 },
          { id: 'culture', label: 'Culture & Festivals', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = guideTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setGuideTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20 font-black'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Section Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={guideTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          {/* TAB 1: OVERVIEW */}
          {guideTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Visual Card 1: Holy Rivers */}
                <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-emerald-500/40 transition-all">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80"
                      alt="Sacred Ganga Origin"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                      Sacred Origins
                    </span>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">Holy Rivers & Glaciers</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Birthplace of River Ganga (Gaumukh glacier) and Yamuna (Yamunotri). Five sacred river confluences form the Panch Prayag.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual Card 2: Himalayan Peaks */}
                <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-cyan-500/40 transition-all">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
                      alt="Nanda Devi Peak"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
                      7,816m Elevation
                    </span>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">Majestic Himalayan Peaks</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Dominated by Nanda Devi (7,816m), Kamet, Trishul, Chaukhamba, and Panchachuli peaks across Garhwal & Kumaon.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual Card 3: Panch Prayag Corridor */}
                <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-purple-500/40 transition-all">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1545652985-5edd365b12eb?auto=format&fit=crop&w=800&q=80"
                      alt="Devprayag Confluence"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-purple-950/90 text-purple-300 border border-purple-500/40">
                      River Confluence
                    </span>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">Panch Prayag Corridor</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        The 5 holy confluences (Devprayag, Rudraprayag, Karnaprayag, Nandaprayag, Vishnuprayag) where Ganga is forged.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GARHWAL VS KUMAON */}
          {guideTab === 'divisions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Garhwal Division Card */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-emerald-500/30 bg-slate-950 flex flex-col hover:shadow-2xl hover:shadow-emerald-500/10 transition-all">
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80"
                    alt="Garhwal Division Kedarnath"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg text-xs font-black bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                      Garhwal Division
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900/80 text-slate-300 backdrop-blur-md">
                      7 Districts
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <h3 className="text-2xl font-black text-white">Garhwal — Land of Char Dham & High Passes</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Garhwal forms the western administrative region of Uttarakhand. Revered globally for the holy <strong>Char Dham Yatra</strong> (Yamunotri, Gangotri, Kedarnath, Badrinath), Rishikesh, and alpine treks.
                  </p>
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">Garhwal Highlights</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {['Kedarnath', 'Badrinath', 'Rishikesh', 'Mussoorie', 'Valley of Flowers', 'Auli'].map((item, i) => (
                        <span key={i} className="text-[11px] bg-slate-900 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Kumaon Division Card */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-950 flex flex-col hover:shadow-2xl hover:shadow-cyan-500/10 transition-all">
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1000&q=80"
                    alt="Kumaon Division Naini Lake"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg text-xs font-black bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
                      Kumaon Division
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900/80 text-slate-300 backdrop-blur-md">
                      6 Districts
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <h3 className="text-2xl font-black text-white">Kumaon — Land of Lakes & Ancient Temples</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Kumaon forms the eastern region bordering Nepal and Tibet. World-renowned for its emerald lakes (Nainital, Bhimtal), Jim Corbett tiger sanctuary, and 124 Nagara stone temples of Jageshwar.
                  </p>
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">Kumaon Highlights</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {['Nainital', 'Jim Corbett', 'Jageshwar Dham', 'Katarmal Sun Temple', 'Kausani', 'Munsiyari'].map((item, i) => (
                        <span key={i} className="text-[11px] bg-slate-900 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MYTHOLOGICAL IMPORTANCE */}
          {guideTab === 'mythology' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Myth Card 1: Descent of Ganga */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-amber-500/40 transition-all">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
                    alt="Gaumukh Ganga Torrent"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-amber-950/90 text-amber-300 border border-amber-500/40">
                    Vedic Lore
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">The Descent of River Ganga</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      King Bhagirath's penance at Gangotri led Lord Shiva to catch the celestial torrent in his matted locks at Gaumukh glacier before releasing her to Earth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Myth Card 2: Panch Kedar */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-purple-500/40 transition-all">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80"
                    alt="Tungnath Shrine"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-purple-950/90 text-purple-300 border border-purple-500/40">
                    Mahabharata Legend
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">Panch Kedar & Shiva's Bull Form</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Lord Shiva assumed a bull form to evade Pandavas; parts re-emerged across Kedarnath, Tungnath, Rudranath, Madhyamaheshwar, and Kalpeshwar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Myth Card 3: Badrinath */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-emerald-500/40 transition-all">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80"
                    alt="Badrinath Shrine"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                    Vishnu Meditative Abode
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">Badrinath & Badri Vana</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Lord Vishnu performed penance under the Badri berry tree while Goddess Lakshmi shielded him as the tree from mountain storms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Myth Card 4: Swargarohini */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-cyan-500/40 transition-all">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80"
                    alt="Swargarohini Summit"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
                    Pathway to Heaven
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">Swargarohini Summit</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      The glacial peak above Mana village where Yudhisthira and his faithful dog ascended physically to heaven.
                    </p>
                  </div>
                </div>
              </div>

              {/* Myth Card 5: Nanda Devi Abode */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-rose-500/40 transition-all">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                    alt="Nanda Devi Sanctuary"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-rose-950/90 text-rose-300 border border-rose-500/40">
                    Goddess Sanctuary
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">Nanda Devi Mountain Shrine</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Sacred peak ringed by 6,000m barrier mountains, venerated as Goddess Parvati’s divine sanctuary.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FOLK STORIES & LEGENDS */}
          {guideTab === 'folklore' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Story 1: Chitai Golu Devta */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-amber-500/40 transition-all">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80"
                    alt="Chitai Golu Devta Bells"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-black bg-amber-950/90 text-amber-300 border border-amber-500/40">
                    Kumaon Folk Legend
                  </span>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">Chitai Golu Devta — God of Written Justice</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      King Golu of Almora is revered as the supreme god of justice. Devotees tie written petitions on stamp paper at his shrine, hanging thousands of brass bells when their prayers are answered.
                    </p>
                  </div>
                </div>
              </div>

              {/* Story 2: Roopkund Mystery Lake */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-purple-500/40 transition-all">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
                    alt="Roopkund Skeleton Lake"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-black bg-purple-950/90 text-purple-300 border border-purple-500/40">
                    Garhwali Folk Ballad
                  </span>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-purple-400 transition-colors">The Mystery of Roopkund Skeleton Lake</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      Folk songs recount King Jasdhawal and Queen Latu bringing loud dancers onto Nanda Devi pilgrimage. Enraged by disrespect, the Goddess unleashed cricket-ball-sized hail at 5,029m.
                    </p>
                  </div>
                </div>
              </div>

              {/* Story 3: Dunagiri Sanjeevani */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-emerald-500/40 transition-all">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1000&q=80"
                    alt="Dunagiri Herb Mountain"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-black bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                    Ramayana Lore
                  </span>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">Dunagiri & Sanjeevani Mountain Fragment</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      When Hanuman carried the Sanjeevani herb mountain to Lanka, local legend holds that a piece fell at Dunagiri in Almora, creating a rich medicinal plant haven.
                    </p>
                  </div>
                </div>
              </div>

              {/* Story 4: Mahasu Devta */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-cyan-500/40 transition-all">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80"
                    alt="Hanol Mahasu Temple"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-black bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
                    Jaunsari Legend
                  </span>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors">Mahasu Devta & The Four Divine Brothers</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      Four divine brothers (Mahasu, Pavasi, Vasik, Chalda) protected the Jaunsar-Bawar region from demons. Today, Hanol temple is their sacred seat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: WILDLIFE & SANCTUARIES */}
          {guideTab === 'wildlife' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Corbett */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-amber-500/40 transition-all">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80"
                    alt="Bengal Tiger Corbett"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-amber-950/90 text-amber-300 border border-amber-500/40">
                    Project Tiger
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">Jim Corbett National Park</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      India’s oldest national park (est. 1936). Ramnagar home for 250+ Royal Bengal Tigers & Asian Elephants.
                    </p>
                  </div>
                </div>
              </div>

              {/* Rajaji */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-emerald-500/40 transition-all">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80"
                    alt="Asian Elephants Rajaji"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                    Elephant Reserve
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">Rajaji Elephant Reserve</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      820 sq km Shivalik reserve protecting Asian Elephants, leopards, and over 400 migratory bird species.
                    </p>
                  </div>
                </div>
              </div>

              {/* Askot */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-cyan-500/40 transition-all">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80"
                    alt="Musk Deer Sanctuary Askot"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
                    High Alpine Reserve
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">Askot Musk Deer Sanctuary</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Pithoragarh sanctuary conserving endangered Musk Deer, Snow Leopards, and Himalayan Monals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: HERITAGE & ARCHAEOLOGY */}
          {guideTab === 'heritage' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Jageshwar */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-purple-500/40 transition-all">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"
                    alt="Jageshwar Dham 124 Temples"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-purple-950/90 text-purple-300 border border-purple-500/40">
                    124 Stone Shrines
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">Jageshwar Dham (7th-14th Century)</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Cluster of 124 ancient Nagara stone shrines in a giant Deodar canyon in Almora.
                    </p>
                  </div>
                </div>
              </div>

              {/* Katarmal */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-amber-500/40 transition-all">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
                    alt="Katarmal Sun Temple Pillars"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-amber-950/90 text-amber-300 border border-amber-500/40">
                    9th-Century Katyuri
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">Katarmal Sun Temple</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Rare Katyuri Sun Temple with 44 carved sub-shrines aligned with the rising solar rays.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lakhamandal */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-emerald-500/40 transition-all">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80"
                    alt="Lakhamandal Stone Lingam"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                    Mahabharata Site
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">Lakhamandal Archeology Site</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Ancient site associated with Lakshagriha. Preserves graphite lingams & Katyuri rock edicts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FLORA & FAUNA */}
          {guideTab === 'flora_fauna' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Brahma Kamal */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-cyan-500/40 transition-all">
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
                    alt="Brahma Kamal Bloom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-black bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
                    State Flower (4,000m)
                  </span>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors">Brahma Kamal & Alpine Flora</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      The mythical <strong>Brahma Kamal</strong> blooms between July & September at high altitudes above Kedarnath, Hemkund Sahib, and Valley of Flowers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Alpine Bugyals */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-emerald-500/40 transition-all">
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
                    alt="Dayara Bugyal Meadow"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-black bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                    Velvet Alpine Grasslands
                  </span>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">Alpine Meadows (Bugyals)</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      High pasturelands above tree-line (3,000m to 4,500m). Iconic Bugyals like Dayara, Bedni, & Ali offer endless green grass and mountain views.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: CULTURE & FESTIVALS */}
          {guideTab === 'culture' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Nanda Raj Jat */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-amber-500/40 transition-all">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80"
                    alt="Nanda Devi Raj Jat Procession"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-amber-950/90 text-amber-300 border border-amber-500/40">
                    Every 12 Years Yatra
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">Nanda Devi Raj Jat Yatra</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Grand 280km barefoot pilgrimage following the four-horned ram to Homkund Lake.
                    </p>
                  </div>
                </div>
              </div>

              {/* Choliya Dance */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-purple-500/40 transition-all">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"
                    alt="Choliya Folk Sword Dance"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-purple-950/90 text-purple-300 border border-purple-500/40">
                    Martial Folk Art
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">Choliya Martial Sword Dance</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Ancient martial sword dance performed by Kumaoni dancers in white traditional robes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phool Dei */}
              <div className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col hover:border-emerald-500/40 transition-all">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                    alt="Phool Dei Spring Festival"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                    Spring Festival
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">Phool Dei Spring Festival</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Children place fresh yellow Phyoli flowers on village doorsteps to welcome prosperity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* DEDICATED UTTARAKHAND DISCOVERY FOOTER */}
      <footer className="mt-12 pt-8 border-t border-slate-800/80 space-y-6">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: State Portal & Authorities */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Shield className="w-5 h-5" />
              <h4 className="text-sm font-extrabold text-white">Uttarakhand Tourism Board</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              ClearRoute UK integrates real-time telemetry with administrative division data for Garhwal & Kumaon.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-300 font-semibold pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                Garhwal HQ: Dehradun
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                Kumaon HQ: Nainital
              </span>
            </div>
          </div>

          {/* Column 2: Emergency Helplines & Yatra */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <PhoneCall className="w-5 h-5" />
              <h4 className="text-sm font-extrabold text-white">Tourist & Disaster Helplines</h4>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
              <li className="flex justify-between border-b border-slate-800/60 pb-1">
                <span>Disaster Management (SDRF):</span>
                <span className="text-emerald-400 font-bold">1070 / 112</span>
              </li>
              <li className="flex justify-between border-b border-slate-800/60 pb-1">
                <span>Chardham Yatra Helpline:</span>
                <span className="text-cyan-400 font-bold">1364</span>
              </li>
              <li className="flex justify-between">
                <span>Tourist Police Helpline:</span>
                <span className="text-purple-400 font-bold">0135-2712685</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Pahari Saying & Copyright */}
          <div className="space-y-3 flex flex-col justify-between">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-500">Pahari Wisdom</span>
              <p className="text-xs text-slate-200 italic">
                "पहाड़ की हवा और पहाड़ का पानी, यहाँ आने वालों की बना दे ज़िंदगी सुहानी।"
              </p>
              <p className="text-[11px] text-slate-400 text-right font-medium">— Devbhoomi Folklore</p>
            </div>
            <p className="text-[11px] text-slate-500 text-center md:text-left">
              © {new Date().getFullYear()} ClearRoute UK • Real-Time Density & Heritage Explorer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
