// ============================================================================
// Bitburner v3.0.1 Static Game Data
// Factions, augmentation tags, and augmentation definitions.
// ============================================================================

/**
 * Compact raw faction definitions: [name, category, defaultJoinedFlag (1 or 0)].
 * @type {Array<[string, string, number]>}
 */
const F_RAW = [
  ["CyberSec", "Hacking", 1],
  ["Netburners", "Hacking", 1],
  ["NiteSec", "Hacking", 1],
  ["The Black Hand", "Hacking", 1],
  ["BitRunners", "Hacking", 1],
  ["Tian Di Hui", "Asian Alliance", 1],
  ["Sector-12", "City", 0],
  ["Chongqing", "City", 1],
  ["New Tokyo", "City", 1],
  ["Ishima", "City", 1],
  ["Aevum", "City", 0],
  ["Volhaven", "City", 0],
  ["Slum Snakes", "Criminal", 1],
  ["Tetrads", "Criminal", 0],
  ["Silhouette", "Criminal", 0],
  ["Speakers for the Dead", "Criminal", 0],
  ["The Dark Army", "Criminal", 0],
  ["The Syndicate", "Criminal", 0],
  ["ECorp", "Megacorp", 0],
  ["MegaCorp", "Megacorp", 0],
  ["KuaiGong International", "Megacorp", 0],
  ["Four Sigma", "Megacorp", 0],
  ["NWO", "Megacorp", 0],
  ["Blade Industries", "Megacorp", 0],
  ["OmniTek Incorporated", "Megacorp", 0],
  ["Bachman & Associates", "Megacorp", 0],
  ["Clarke Incorporated", "Megacorp", 0],
  ["Fulcrum Secret Technologies", "Megacorp", 0],
  ["The Covenant", "Endgame", 0],
  ["Daedalus", "Endgame", 0],
  ["Illuminati", "Endgame", 0],
  ["Bladeburners", "Special", 0],
  ["Church of the Machine God", "Special", 0],
  ["Shadows of Anarchy", "Infiltration", 0]
];

/**
 * Category tags referenced by index in A_RAW.
 * @type {string[]}
 */
const TAGS = [
  "Hacking",
  "Combat",
  "Charisma/Rep",
  "Hacknet",
  "Bladeburner",
  "Crime",
  "All-Around",
  "Infiltration",
  "Special"
];

/**
 * Compact raw augmentation definitions:
 * [name, prerequisiteName, basePrice, repReq, factionIndices, tagIndex, effectSummary].
 * @type {Array<[string, string, number, number, number[], number, string]>}
 */
const A_RAW = [
  ["ADR-V1 Pheromone Gene", "", 17500000.0, 3750, [5, 17, 22, 19, 21], 2, "+10% faction/company rep; +5% cha exp"],
  ["ADR-V2 Pheromone Gene", "", 550000000.0, 62500, [14, 21, 25, 26], 2, "+20% faction/company rep; +10% cha"],
  ["Artificial Bio-neural Network Implant", "", 3000000000.0, 275000, [4, 27], 0, "+12% hack; +3% hack/grow/weaken speed; +15% hack() power"],
  ["Artificial Synaptic Potentiation", "", 80000000.0, 6250, [3, 2], 0, "+5% hack exp; +2% speed; +5% hack() chance"],
  ["Beauty of Aphrodite", "", 1000000.0, 10000, [33], 7, "+10% cha; Easier Bribe minigame"],
  ["Bionic Arms", "", 275000000.0, 62500, [13], 1, "+30% str & dex"],
  ["Bionic Legs", "", 375000000.0, 150000, [15, 17, 20, 24, 23], 1, "+60% agi"],
  ["Bionic Spine", "", 125000000.0, 45000, [15, 17, 20, 24, 23], 1, "+15% str, def, dex, agi"],
  ["BitWire", "", 10000000.0, 3750, [0, 2], 0, "+5% hack"],
  ["BLADE-51b Tesla Armor", "", 1375000000.0, 12500, [31], 4, "+4% combat; +2% BB stam gain; +3% BB success"],
  ["BLADE-51b Tesla Armor: Energy Shielding Upgrade", "BLADE-51b Tesla Armor", 5500000000.0, 21250, [31], 4, "+5% def; +6% BB success"],
  ["BLADE-51b Tesla Armor: IPU Upgrade", "BLADE-51b Tesla Armor", 1100000000.0, 15000, [31], 4, "+15% BB analysis; +2% BB success"],
  ["BLADE-51b Tesla Armor: Omnibeam Upgrade", "BLADE-51b Tesla Armor: Unibeam Upgrade", 27500000000.0, 62500, [31], 4, "+10% BB success"],
  ["BLADE-51b Tesla Armor: Power Cells Upgrade", "BLADE-51b Tesla Armor", 2750000000.0, 18750, [31], 4, "+5% BB max stam; +2% stam gain; +5% success"],
  ["BLADE-51b Tesla Armor: Unibeam Upgrade", "BLADE-51b Tesla Armor", 16500000000.0, 31250, [31], 4, "+8% BB success"],
  ["Blade's Simulacrum", "", 150000000000.0, 1250, [31], 4, "Perform Bladeburner and other actions simultaneously"],
  ["BrachiBlades", "", 90000000.0, 12500, [17], 5, "+15% str & def; +10% crime success; +15% crime money"],
  ["CashRoot Starter Kit", "", 125000000.0, 12500, [6], 8, "Start with $1m and BruteSSH.exe"],
  ["Chaos of Dionysus", "", 1000000.0, 10000, [33], 7, "Easier Backwards minigame"],
  ["Combat Rib I", "", 23750000.0, 7500, [12, 16, 17, 11, 9, 24, 20, 23], 1, "+10% str & def"],
  ["Combat Rib II", "Combat Rib I", 65000000.0, 18750, [16, 17, 11, 24, 20, 23], 1, "+14% str & def"],
  ["Combat Rib III", "Combat Rib II", 120000000.0, 35000, [16, 17, 24, 20, 23, 28], 1, "+18% str & def"],
  ["CordiARC Fusion Reactor", "", 5000000000.0, 1125000, [19], 1, "+35% combat skills & exp"],
  ["Cranial Signal Processors - Gen I", "", 70000000.0, 10000, [0, 2], 0, "+5% hack; +1% speed"],
  ["Cranial Signal Processors - Gen II", "Cranial Signal Processors - Gen I", 125000000.0, 18750, [0, 2], 0, "+7% hack; +2% speed; +5% hack() chance"],
  ["Cranial Signal Processors - Gen III", "Cranial Signal Processors - Gen II", 550000000.0, 50000, [2, 3, 4], 0, "+9% hack; +2% speed; +15% hack() power"],
  ["Cranial Signal Processors - Gen IV", "Cranial Signal Processors - Gen III", 1100000000.0, 125000, [3, 4], 0, "+2% speed; +20% hack() power; +25% grow() power"],
  ["Cranial Signal Processors - Gen V", "Cranial Signal Processors - Gen IV", 2250000000.0, 250000, [4], 0, "+30% hack; +25% hack() power; +75% grow() power"],
  ["CRTX42-AA Gene Modification", "", 225000000.0, 45000, [2], 0, "+8% hack; +15% hack exp"],
  ["DataJack", "", 450000000.0, 112500, [4, 3, 2, 7, 8], 0, "+25% hack() power"],
  ["DermaForce Particle Barrier", "", 50000000.0, 15000, [11], 1, "+40% def; +3% cha"],
  ["Eloquence", "", 250000000.0, 25000, [15], 2, "+5% cha; +10% crime success; +20% work money"],
  ["Embedded Netburner Module", "", 250000000.0, 15000, [4, 3, 2, 18, 19, 27, 22, 23], 0, "+8% hack"],
  ["Embedded Netburner Module Analyze Engine", "Embedded Netburner Module", 6000000000.0, 625000, [18, 19, 27, 22, 29, 28, 30], 0, "+10% hack/grow/weaken speed"],
  ["Embedded Netburner Module Core Implant", "Embedded Netburner Module", 2500000000.0, 175000, [4, 3, 18, 19, 27, 22, 23], 0, "+7% hack & exp; +3% speed; +3% chance; +10% power"],
  ["Embedded Netburner Module Core V2 Upgrade", "Embedded Netburner Module Core Implant", 4500000000.0, 1000000, [4, 18, 19, 27, 22, 23, 24, 20], 0, "+8% hack; +15% exp; +5% speed; +5% chance; +30% power"],
  ["Embedded Netburner Module Core V3 Upgrade", "Embedded Netburner Module Core V2 Upgrade", 7500000000.0, 1750000, [18, 19, 27, 22, 29, 28, 30], 0, "+10% hack; +25% exp; +5% speed; +10% chance; +40% power"],
  ["Embedded Netburner Module Direct Memory Access Upgrade", "Embedded Netburner Module", 7000000000.0, 1000000, [18, 19, 27, 22, 29, 28, 30], 0, "+40% hack() power; +20% hack() chance"],
  ["EMS-4 Recombination", "", 275000000.0, 2500, [31], 4, "+3% BB success; +5% BB analysis; +2% stam gain"],
  ["Enhanced Myelin Sheathing", "", 1375000000.0, 100000, [27, 4, 3], 0, "+8% hack; +10% hack exp; +3% speed"],
  ["Enhanced Social Interaction Implant", "", 1375000000.0, 375000, [25, 22, 26, 24, 21], 2, "+60% cha & cha exp"],
  ["Esper Eyewear", "", 165000000.0, 1250, [31], 4, "+5% dex; +3% BB success"],
  ["Flood of Poseidon", "", 1000000.0, 10000, [33], 7, "Easier Symbol Matching minigame"],
  ["FocusWire", "", 900000000.0, 75000, [25, 26, 21, 20], 6, "+5% all exp; +10% company rep; +20% work money"],
  ["Glib", "", 2500000000.0, 40500, [13, 31], 2, "+20% cha exp; +10% company rep"],
  ["Golden Tongue", "", 125000000.0, 125000, [15], 2, "+10% cha; +30% cha exp"],
  ["GOLEM Serum", "", 11000000000.0, 31250, [31], 4, "+7% combat; +5% BB stam gain"],
  ["Graphene Bionic Arms", "Bionic Arms", 3750000000.0, 500000, [16], 1, "+85% str & dex"],
  ["Graphene Bionic Legs", "Bionic Legs", 4500000000.0, 750000, [19, 18, 27], 1, "+150% agi"],
  ["Graphene Bionic Spine", "Bionic Spine", 6000000000.0, 1625000, [27, 18], 1, "+60% str, def, dex, agi"],
  ["Graphene Bone Lacings", "", 4250000000.0, 1125000, [27, 28], 1, "+70% str & def"],
  ["Graphene BrachiBlades", "BrachiBlades", 2500000000.0, 225000, [15], 5, "+40% str & def; +10% crime success; +30% crime money"],
  ["Hacknet Node Cache Architecture Neural-Upload", "", 5500000.0, 2500, [1], 3, "+10% hacknet prod; -15% level cost"],
  ["Hacknet Node Core Direct-Neural Interface", "", 60000000.0, 12500, [1], 3, "+45% hacknet prod"],
  ["Hacknet Node CPU Architecture Neural-Upload", "", 11000000.0, 3750, [1], 3, "+15% hacknet prod; -15% purchase cost"],
  ["Hacknet Node Kernel Direct-Neural Interface", "", 40000000.0, 7500, [1], 3, "+25% hacknet prod"],
  ["Hacknet Node NIC Architecture Neural-Upload", "", 4500000.0, 1875, [1], 3, "+10% hacknet prod; -10% purchase cost"],
  ["HemoRecirculator", "", 45000000.0, 10000, [13, 16, 17], 1, "+8% combat & cha"],
  ["HiveMind", "", 5500000000.0, 1500000, [18], 0, "+200% grow() power"],
  ["Hunt of Artemis", "", 1000000.0, 10000, [33], 7, "Easier Minesweeper minigame"],
  ["Hydroflame Left Arm", "", 2500000000000.0, 1250000, [22], 1, "+180% str"],
  ["Hyperion Plasma Cannon V1", "", 2750000000.0, 12500, [31], 4, "+6% BB success"],
  ["Hyperion Plasma Cannon V2", "Hyperion Plasma Cannon V1", 5500000000.0, 25000, [31], 4, "+8% BB success"],
  ["HyperSight Corneal Implant", "", 2750000000.0, 150000, [23, 20], 0, "+40% dex; +3% cha; +3% speed; +10% hack() power"],
  ["INFRARET Enhancement", "", 30000000.0, 7500, [9], 5, "+10% dex; +25% crime success; +10% crime money"],
  ["INTERLINKED", "", 5500000000.0, 25000, [31], 4, "+5% combat exp; +10% BB max stam"],
  ["Knowledge of Apollo", "", 1000000.0, 10000, [33], 7, "Easier Wire Cutting minigame"],
  ["LuminCloaking-V1 Skin Implant", "", 5000000.0, 1500, [12, 13], 5, "+5% agi; +3% cha; +10% crime money"],
  ["LuminCloaking-V2 Skin Implant", "LuminCloaking-V1 Skin Implant", 30000000.0, 5000, [12, 13], 5, "+10% agi & def; +10% cha exp; +25% crime money"],
  ["Magnetism", "", 250000000.0, 15000, [3, 16], 2, "+5% cha; +10% company rep"],
  ["Might of Ares", "", 1000000.0, 10000, [33], 7, "Easier Slash minigame"],
  ["Nanofiber Weave", "", 125000000.0, 37500, [16, 17, 24, 23, 5, 15, 27], 1, "+20% str & def; +5% cha"],
  ["Neotra", "", 2875000000.0, 562500, [23], 1, "+55% str, def, cha"],
  ["Neural Accelerator", "", 1750000000.0, 200000, [4], 0, "+10% hack; +15% hack exp; +20% hack() power"],
  ["Neural-Retention Enhancement", "", 250000000.0, 20000, [2], 0, "+25% hack exp"],
  ["Neuralstimulator", "", 3000000000.0, 50000, [3, 7, 6, 8, 10, 9, 11, 25, 26, 21], 0, "+12% hack exp; +2% speed; +10% hack() chance"],
  ["Neuregen Gene Modification", "", 375000000.0, 37500, [7], 0, "+40% hack exp"],
  ["NeuroFlux Governor", "", 750000, 500, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 6, "+1% to most multipliers per level (infinite)"],
  ["BitRunners Neurolink", "", 4375000000.0, 875000, [4], 0, "+15% hack; +20% exp; +5% speed; +10% chance; Start with FTPCrack/relaySMTP"],
  ["Neuronal Densification", "", 1375000000.0, 187500, [26], 0, "+15% hack; +10% hack exp; +3% speed"],
  ["Neuroreceptor Management Implant", "", 550000000.0, 75000, [5], 8, "Removes penalty for not focusing on jobs/factions"],
  ["Neurotrainer I", "", 4000000.0, 1000, [0, 10], 6, "+10% exp for all skills"],
  ["Neurotrainer II", "", 45000000.0, 10000, [4, 2], 6, "+15% exp for all skills"],
  ["Neurotrainer III", "", 130000000.0, 25000, [22, 21], 6, "+20% exp for all skills"],
  ["Nuoptimal Nootropic Injector Implant", "", 20000000.0, 5000, [5, 11, 8, 7, 26, 21, 25], 2, "+20% company rep; +3% cha"],
  ["NutriGen Implant", "", 2500000.0, 6250, [8], 1, "+20% combat exp"],
  ["nextSENS Gene Modification", "", 1925000000.0, 437500, [26], 6, "+20% all skills"],
  ["OmniTek InfoLoad", "", 2875000000.0, 625000, [24], 0, "+20% hack; +25% hack exp"],
  ["ORION-MKIV Shoulder", "", 550000000.0, 6250, [31], 4, "+5% str, def, dex; +4% BB success"],
  ["PC Direct-Neural Interface", "", 3750000000.0, 375000, [21, 24, 18, 23], 0, "+8% hack; +30% company rep"],
  ["PC Direct-Neural Interface: Neural Network Upgrade", "PC Direct-Neural Interface", 7500000000.0, 1500000, [27], 0, "+10% hack; +5% speed; +100% company rep"],
  ["PC Direct-Neural Interface: Optimization Submodule", "PC Direct-Neural Interface", 4500000000.0, 500000, [27, 18, 23], 0, "+10% hack; +75% company rep"],
  ["PCMatrix", "", 2000000000.0, 100000, [10], 2, "+7.77% cha/rep/crime; +77.7% work money; Start with DeepscanV1/AutoLink"],
  ["Photosynthetic Cells", "", 2750000000.0, 562500, [20], 1, "+40% str, def, agi; +20% cha"],
  ["Power Recirculation Core", "", 180000000.0, 25000, [13, 16, 17, 22], 6, "+5% all skills; +10% all exp"],
  ["Primer", "", 3375000000.0, 187500, [16, 17], 2, "+5% cha; +20% cha exp"],
  ["QLink", "", 25000000000000.0, 1875000, [30], 0, "+75% hack; +100% speed; +150% chance; +300% power"],
  ["Social Negotiation Assistant (S.N.A)", "", 30000000.0, 6250, [5], 2, "+15% cha exp; +10% work money; +15% faction/company rep"],
  ["Social Dynamo", "", 1200000000.0, 225000, [19, 18, 24], 2, "+10% cha; +30% company rep"],
  ["SPTN-97 Gene Modification", "", 4875000000.0, 1250000, [28], 1, "+75% combat; +15% hack"],
  ["Shadows' Simulacrum", "", 400000000.0, 37500, [17, 16, 15], 2, "+15% faction & company rep"],
  ["SmartJaw", "", 2750000000.0, 375000, [25], 2, "+50% cha & exp; +25% faction/company rep"],
  ["SmartSonar Implant", "", 75000000.0, 22500, [12], 5, "+10% dex; +15% dex exp; +25% crime money"],
  ["Speech Enhancement", "", 12500000.0, 2500, [5, 15, 21, 20, 26, 25], 2, "+5% cha; +10% company rep"],
  ["Speech Processor Implant", "", 50000000.0, 7500, [5, 7, 6, 8, 10, 9, 11, 14], 2, "+10% cha"],
  ["Stanek's Gift - Genesis", "", 0, 0, [32], 8, "Unlocks Stanek's Gift grid (-10% all stats)"],
  ["Stanek's Gift - Awakening", "Stanek's Gift - Genesis", 0, 1000000.0, [32], 8, "Reduces Stanek's Gift penalty to -5%"],
  ["Stanek's Gift - Serenity", "Stanek's Gift - Awakening", 0, 100000000.0, [32], 8, "Removes Stanek's Gift penalty"],
  ["NEMEAN Subdermal Weave", "", 3250000000.0, 875000, [17, 27, 30, 29, 28], 1, "+120% def"],
  ["Synaptic Enhancement Implant", "", 7500000.0, 2000, [0, 10], 0, "+3% hack/grow/weaken speed"],
  ["Synfibril Muscle", "", 1125000000.0, 437500, [20, 27, 15, 22, 28, 29, 30, 23], 1, "+30% str & def"],
  ["Synthetic Heart", "", 2875000000.0, 750000, [20, 27, 15, 22, 28, 29, 30], 1, "+50% agi & str; +15% cha"],
  ["TITN-41 Gene-Modification Injection", "", 190000000.0, 25000, [14], 2, "+15% cha & cha exp"],
  ["Augmented Targeting I", "", 15000000.0, 5000, [12, 16, 17, 6, 9, 24, 20, 23], 1, "+10% dex"],
  ["Augmented Targeting II", "Augmented Targeting I", 42500000.0, 8750, [16, 17, 6, 24, 20, 23], 1, "+20% dex"],
  ["Augmented Targeting III", "Augmented Targeting II", 115000000.0, 27500, [16, 17, 24, 20, 23, 28], 1, "+30% dex"],
  ["The Black Hand", "", 550000000.0, 100000, [3], 0, "+15% str & dex; +10% hack; +2% speed; +10% power"],
  ["The Red Pill", "", 0, 2500000.0, [29], 8, "Unlocks w0r1d_d43m0n"],
  ["Trickery of Hermes", "", 1000000.0, 10000, [33], 7, "Easier Cheat Code minigame"],
  ["Vangelis Virus", "", 2750000000.0, 18750, [31], 4, "+10% dex & cha exp; +10% BB analysis; +4% BB success"],
  ["Vangelis Virus 3.0", "Vangelis Virus", 11000000000.0, 37500, [31], 4, "+10% def, dex, cha exp; +15% BB analysis; +5% BB success"],
  ["WKS harmonizer", "", 1000000.0, 10000, [33], 7, "Makes all infiltration easier and more rewarding"],
  ["Wired Reflexes", "", 2500000.0, 1250, [5, 12, 6, 11, 10, 9, 17, 16, 15], 1, "+5% agi & dex"],
  ["Wisdom of Athena", "", 1000000.0, 10000, [33], 7, "Easier Bracket minigame"],
  ["Wit", "", 10000000.0, 5000, [12, 4], 2, "+3% cha; +5% cha exp; +5% company rep"],
  ["Xanipher", "", 4250000000.0, 875000, [22], 6, "+20% all skills; +15% all exp"],
  ["BladeRunner", "", 8250000000.0, 20000, [31], 4, "+5% agi; +5% BB max stam & stam gain"]
];

/**
 * Normalized faction list with mutable membership and reputation fields.
 * @type {Array<{name: string, cat: string, joined: boolean, rep: number}>}
 */
const FACTIONS = F_RAW.map(([name, cat, joined]) => ({
  name,
  cat,
  joined: !!joined,
  rep: 0
}));

/**
 * Normalized augmentation catalog.
 * @type {Array<{name: string, prereq: string, price: number, rep: number, factions: string[], tag: string, desc: string}>}
 */
const AUGS = A_RAW.map(([name, prereq, price, rep, factionIndices, tagIndex, desc]) => ({
  name,
  prereq,
  price,
  rep,
  factions: factionIndices.map((idx) => FACTIONS[idx].name),
  tag: TAGS[tagIndex],
  desc
}));

/**
 * Fast O(1) lookup map of augmentation objects keyed by name.
 * @type {Record<string, typeof AUGS[number]>}
 */
const augMap = Object.fromEntries(AUGS.map((aug) => [aug.name, aug]));
