// ============================================================================
// Bitburner v3.0.1 Static Game Data
// Synced against official Bitburner Enums.ts and Augmentations.ts.
// ============================================================================

/**
 * Compact raw faction definitions: [name, category, defaultJoinedFlag (1 or 0)].
 * @type {Array<[string, string, number]>}
 */
const F_RAW = [
  [
    "CyberSec",
    "Hacking",
    1
  ],
  [
    "Netburners",
    "Hacking",
    1
  ],
  [
    "NiteSec",
    "Hacking",
    1
  ],
  [
    "The Black Hand",
    "Hacking",
    1
  ],
  [
    "BitRunners",
    "Hacking",
    1
  ],
  [
    "Tian Di Hui",
    "Asian Alliance",
    1
  ],
  [
    "Sector-12",
    "City",
    0
  ],
  [
    "Chongqing",
    "City",
    1
  ],
  [
    "New Tokyo",
    "City",
    1
  ],
  [
    "Ishima",
    "City",
    1
  ],
  [
    "Aevum",
    "City",
    0
  ],
  [
    "Volhaven",
    "City",
    0
  ],
  [
    "Slum Snakes",
    "Criminal",
    1
  ],
  [
    "Tetrads",
    "Criminal",
    0
  ],
  [
    "Silhouette",
    "Criminal",
    0
  ],
  [
    "Speakers for the Dead",
    "Criminal",
    0
  ],
  [
    "The Dark Army",
    "Criminal",
    0
  ],
  [
    "The Syndicate",
    "Criminal",
    0
  ],
  [
    "ECorp",
    "Megacorp",
    0
  ],
  [
    "MegaCorp",
    "Megacorp",
    0
  ],
  [
    "KuaiGong International",
    "Megacorp",
    0
  ],
  [
    "Four Sigma",
    "Megacorp",
    0
  ],
  [
    "NWO",
    "Megacorp",
    0
  ],
  [
    "Blade Industries",
    "Megacorp",
    0
  ],
  [
    "OmniTek Incorporated",
    "Megacorp",
    0
  ],
  [
    "Bachman & Associates",
    "Megacorp",
    0
  ],
  [
    "Clarke Incorporated",
    "Megacorp",
    0
  ],
  [
    "Fulcrum Secret Technologies",
    "Megacorp",
    0
  ],
  [
    "The Covenant",
    "Endgame",
    0
  ],
  [
    "Daedalus",
    "Endgame",
    0
  ],
  [
    "Illuminati",
    "Endgame",
    0
  ],
  [
    "Bladeburners",
    "Special",
    0
  ],
  [
    "Church of the Machine God",
    "Special",
    0
  ],
  [
    "Shadows of Anarchy",
    "Infiltration",
    0
  ]
];

/**
 * Category tags referenced by index in A_RAW.
 * @type {string[]}
 */
const TAGS = ["Hacking","Combat","Charisma/Rep","Hacknet","Bladeburner","Crime","All-Around","Infiltration","Special"];

/**
 * Compact raw augmentation definitions synced with official Bitburner sources:
 * [name, prerequisiteName, basePrice, repReq, factionIndices, tagIndex, desc, lore, aliases].
 * @type {Array<[string, string, number, number, number[], number, string, string, string[]]>}
 */
const A_RAW = [
  ["ADR-V1 Pheromone Gene","",17500000,3750,[5,17,22,19,21],2,"+5% cha exp; +10% faction & company rep","The body is genetically re-engineered so that it produces the ADR-V1 pheromone, an artificial pheromone discovered by scientists. The ADR-V1 pheromone, when excreted, triggers feelings of admiration and approval in other people.",["ADRPheromone1"]],
  ["ADR-V2 Pheromone Gene","",550000000,62500,[14,21,25,26],2,"+10% cha; +20% faction & company rep","The body is genetically re-engineered so that it produces the ADR-V2 pheromone, which is similar to but more potent than ADR-V1. This pheromone, when excreted, triggers feelings of admiration, approval, and respect in others.",["ADRPheromone2"]],
  ["Artificial Bio-neural Network Implant","",3000000000,275000,[4,27],0,"+12% hack; +3% hack/grow/weaken speed; +15% hack() money","A network consisting of millions of nanoprocessors is embedded into the brain. The network is meant to mimic the way a biological brain solves a problem, with each nanoprocessor acting similar to the way a neuron would in a neural network. However, these nanoprocessors are programmed to perform computations much faster than organic neurons, allowing the user to solve much more complex problems at a much faster rate.",["ArtificialBioNeuralNetwork"]],
  ["Artificial Synaptic Potentiation","",80000000,6250,[3,2],0,"+5% hack exp; +2% hack/grow/weaken speed; +5% hack() chance","The body is injected with a chemical that artificially induces synaptic potentiation, otherwise known as the strengthening of synapses. This results in enhanced cognitive abilities.",["ArtificialSynapticPotentiation"]],
  ["SoA - Beauty of Aphrodite","",1000000,10000,[33],7,"+10% cha; Easier Bribe minigame","Pheromone extruder injected in the thoracodorsal nerve. Emits a pleasing scent guaranteed to make conversational partners more agreeable. (This augmentation makes the Bribe minigame easier by indicating the incorrect paths.)",["BeautyOfAphrodite","Beauty of Aphrodite"]],
  ["Bionic Arms","",275000000,62500,[13],1,"+30% str; +30% dex","Cybernetic arms created from plasteel and carbon fibers that completely replace the user's organic arms.",["BionicArms"]],
  ["Bionic Legs","",375000000,150000,[15,17,20,24,23],1,"+60% agi","Cybernetic legs, created from plasteel and carbon fibers, enhance running speed.",["BionicLegs"]],
  ["Bionic Spine","",125000000,45000,[15,17,20,24,23],1,"+15% combat","The spine is reconstructed using plasteel and carbon fibers. It is now capable of stimulating and regulating neural signals passing through the spinal cord, improving senses and reaction speed. The 'Bionic Spine' also interfaces with all other 'Bionic' implants.",["BionicSpine"]],
  ["BitWire","",10000000,3750,[0,2],0,"+5% hack","A small brain implant embedded in the cerebrum. This regulates and improves the brain's computing capabilities.",[]],
  ["BLADE-51b Tesla Armor","",1375000000,12500,[31],4,"+4% combat; +2% BB stam gain; +3% BB success","A powered exoskeleton suit designed as armor for Bladeburners units. This exoskeleton is incredibly adaptable and can protect the wearer from blunt, piercing, concussive, thermal, chemical, and electric trauma. It also enhances the user's physical abilities.",["BladeArmor"]],
  ["BLADE-51b Tesla Armor: Energy Shielding Upgrade","BLADE-51b Tesla Armor",5500000000,21250,[31],4,"+5% def; +6% BB success","Upgrades the BLADE-51b Tesla Armor with a plasma energy propulsion system that is capable of projecting an energy shielding force field.",["BladeArmorEnergyShielding"]],
  ["BLADE-51b Tesla Armor: IPU Upgrade","BLADE-51b Tesla Armor",1100000000,15000,[31],4,"+15% BB analysis; +2% BB success","Upgrades the BLADE-51b Tesla Armor with an AI Information Processing Unit that was specially designed to analyze Synthoid related data and information.",["BladeArmorIPU"]],
  ["BLADE-51b Tesla Armor: Omnibeam Upgrade","BLADE-51b Tesla Armor: Unibeam Upgrade",27500000000,62500,[31],4,"+10% BB success","Upgrades the BLADE-51b Tesla Armor Unibeam augmentation to use a multiple-fiber system. This upgraded weapon uses multiple fiber laser modules that combine together to form a single, more powerful beam of up to 2000MW.",["BladeArmorOmnibeam"]],
  ["BLADE-51b Tesla Armor: Power Cells Upgrade","BLADE-51b Tesla Armor",2750000000,18750,[31],4,"+5% BB max stam; +2% BB stam gain; +5% BB success","Upgrades the BLADE-51b Tesla Armor with Ion Power Cells, which are capable of more efficiently storing and using power.",["BladeArmorPowerCells"]],
  ["BLADE-51b Tesla Armor: Unibeam Upgrade","BLADE-51b Tesla Armor",16500000000,31250,[31],4,"+8% BB success","Upgrades the BLADE-51b Tesla Armor with a concentrated deuterium-fluoride laser weapon. Its precision and accuracy makes it useful for quickly neutralizing threats while keeping casualties to a minimum.",["BladeArmorUnibeam"]],
  ["The Blade's Simulacrum","",150000000000,1250,[31],4,"Perform Bladeburner and other actions simultaneously","A highly advanced matter phase-shifter module that is embedded in the brainstem and cerebellum. This augmentation allows the user to project and control a holographic simulacrum within an extremely large radius. These specially modified holograms were specifically weaponized by Bladeburner units to be used against Synthoids. (This augmentation allows you to perform Bladeburner actions and other actions (such as working, committing crimes, etc.) at the same time.)",["BladesSimulacrum","Blade's Simulacrum"]],
  ["BrachiBlades","",90000000,12500,[17],5,"+15% str; +15% def; +10% crime success; +15% crime money","A set of retractable plasteel blades that are implanted in the arm, underneath the skin.",[]],
  ["CashRoot Starter Kit","",125000000,12500,[6],8,"Start with $1m & BruteSSH.exe","A collection of digital assets saved on a small chip. The chip is implanted into your wrist. A small jack in the chip allows you to connect it to a computer and upload the assets.",["CashRoot"]],
  ["SoA - Chaos of Dionysus","",1000000,10000,[33],7,"Easier Backwards minigame","Opto-occipito implant to process visual signals before brain interpretation. (This augmentation makes the Backwards minigame easier by flipping the words.)",["ChaosOfDionysus","Chaos of Dionysus"]],
  ["Combat Rib I","",23750000,7500,[12,16,17,11,9,24,20,23],1,"+10% str; +10% def","The rib cage is augmented to continuously release boosters into the bloodstream which increase the oxygen-carrying capacity of blood.",["CombatRib1"]],
  ["Combat Rib II","Combat Rib I",65000000,18750,[16,17,11,24,20,23],1,"+14% str; +14% def","An upgraded version of the 'Combat Rib' augmentation that adds potent stimulants which improve focus and endurance while decreasing reaction time and fatigue.",["CombatRib2"]],
  ["Combat Rib III","Combat Rib II",120000000,35000,[16,17,24,20,23,28],1,"+18% str; +18% def","The latest version of the 'Combat Rib' augmentation releases advanced anabolic steroids that improve muscle mass and physical performance while being safe and free of side effects.",["CombatRib3"]],
  ["CordiARC Fusion Reactor","",5000000000,1125000,[19],1,"+35% combat; +35% combat exp","The thoracic cavity is equipped with a small chamber designed to hold and sustain hydrogen plasma. The plasma is used to generate power through nuclear fusion, providing limitless amounts of clean energy for the body.",["CordiARCReactor"]],
  ["Cranial Signal Processors - Gen I","",70000000,10000,[0,2],0,"+5% hack; +1% hack/grow/weaken speed","The first generation of Cranial Signal Processors. Cranial Signal Processors are a set of specialized microprocessors that are attached to neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations so that the brain doesn't have to.",["CranialSignalProcessorsG1"]],
  ["Cranial Signal Processors - Gen II","Cranial Signal Processors - Gen I",125000000,18750,[0,2],0,"+7% hack; +2% hack/grow/weaken speed; +5% hack() chance","The second generation of Cranial Signal Processors. Cranial Signal Processors are a set of specialized microprocessors that are attached to neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations so that the brain doesn't have to.",["CranialSignalProcessorsG2"]],
  ["Cranial Signal Processors - Gen III","Cranial Signal Processors - Gen II",550000000,50000,[2,3,4],0,"+9% hack; +2% hack/grow/weaken speed; +15% hack() money","The third generation of Cranial Signal Processors. Cranial Signal Processors are a set of specialized microprocessors that are attached to neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations so that the brain doesn't have to.",["CranialSignalProcessorsG3"]],
  ["Cranial Signal Processors - Gen IV","Cranial Signal Processors - Gen III",1100000000,125000,[3,4],0,"+2% hack/grow/weaken speed; +20% hack() money; +25% grow() power","The fourth generation of Cranial Signal Processors. Cranial Signal Processors are a set of specialized microprocessors that are attached to neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations so that the brain doesn't have to.",["CranialSignalProcessorsG4"]],
  ["Cranial Signal Processors - Gen V","Cranial Signal Processors - Gen IV",2250000000,250000,[4],0,"+30% hack; +25% hack() money; +75% grow() power","The fifth generation of Cranial Signal Processors. Cranial Signal Processors are a set of specialized microprocessors that are attached to neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations so that the brain doesn't have to.",["CranialSignalProcessorsG5"]],
  ["CRTX42-AA Gene Modification","",225000000,45000,[2],0,"+8% hack; +15% hack exp","The CRTX42-AA gene is injected into the genome. The CRTX42-AA is an artificially-synthesized gene that targets the visual and prefrontal cortex and improves cognitive abilities.",["CRTX42AA"]],
  ["DataJack","",450000000,112500,[4,3,2,7,8],0,"+25% hack() money","A brain implant that provides an interface for direct, wireless communication between a computer's main memory and the mind. This implant allows the user to not only access a computer's memory, but also alter and delete it.",[]],
  ["DermaForce Particle Barrier","",50000000,15000,[11],1,"+40% def; +3% cha","Synthetic skin that is grafted onto the body. This skin consists of millions of nanobots capable of projecting high-density muon beams, creating an energy barrier around the user.",["DermaForce"]],
  ["Eloquence Module","",250000000,25000,[15],2,"+5% cha; +20% work money; +10% crime success","A neural implant that enhances the user's ability to resonate with others. It is capable of analyzing and interpreting the emotions of those nearby, allowing the user to better understand and influence them.",["Eloquence"]],
  ["Embedded Netburner Module","",250000000,15000,[4,3,2,18,19,27,22,23],0,"+8% hack","A thin device embedded inside the arm containing a wireless module capable of connecting to nearby networks. Once connected, the Netburner Module is capable of capturing and processing all of the traffic on that network. By itself, the Embedded Netburner Module does not do much, but a variety of very powerful upgrades can be installed that allow you to fully control the traffic on a network.",["ENM"]],
  ["Embedded Netburner Module Analyze Engine","Embedded Netburner Module",6000000000,625000,[18,19,27,22,29,28,30],0,"+10% hack/grow/weaken speed","Installs the Analyze Engine for the Embedded Netburner Module, which is a CPU cluster that vastly outperforms the Netburner Module's native single-core processor.",["ENMAnalyzeEngine"]],
  ["Embedded Netburner Module Core Implant","Embedded Netburner Module",2500000000,175000,[4,3,18,19,27,22,23],0,"+7% hack; +7% hack exp; +3% hack/grow/weaken speed; +3% hack() chance; +10% hack() money","The Core library is an implant that upgrades the firmware of the Embedded Netburner Module. This upgrade allows the Embedded Netburner Module to generate its own data on a network.",["ENMCore"]],
  ["Embedded Netburner Module Core V2 Upgrade","Embedded Netburner Module Core Implant",4500000000,1000000,[4,18,19,27,22,23,24,20],0,"+8% hack; +15% hack exp; +5% hack/grow/weaken speed; +5% hack() chance; +30% hack() money","The Core V2 library is an implant that upgrades the firmware of the Embedded Netburner Module. This upgraded firmware allows the Embedded Netburner Module to control information on a network by re-routing traffic, spoofing IP addresses, and altering the data inside network packets.",["ENMCoreV2"]],
  ["Embedded Netburner Module Core V3 Upgrade","Embedded Netburner Module Core V2 Upgrade",7500000000,1750000,[18,19,27,22,29,28,30],0,"+10% hack; +25% hack exp; +5% hack/grow/weaken speed; +10% hack() chance; +40% hack() money","The Core V3 library is an implant that upgrades the firmware of the Embedded Netburner Module. This upgraded firmware allows the Embedded Netburner Module to seamlessly inject code into any device on a network.",["ENMCoreV3"]],
  ["Embedded Netburner Module Direct Memory Access Upgrade","Embedded Netburner Module",7000000000,1000000,[18,19,27,22,29,28,30],0,"+20% hack() chance; +40% hack() money","This implant installs a Direct Memory Access (DMA) controller into the Embedded Netburner Module. This allows the Module to send and receive data directly to and from the main memory of devices on a network.",["ENMDMA"]],
  ["EMS-4 Recombination","",275000000,2500,[31],4,"+2% BB stam gain; +5% BB analysis; +3% BB success","A DNA recombination of the EMS-4 Gene. This genetic engineering technique was originally used on Bladeburners during the Synthoid uprising to induce wakefulness and concentration, suppress fear, reduce empathy, improve reflexes, and improve memory, among other things.",["EMS4Recombination"]],
  ["Enhanced Myelin Sheathing","",1375000000,100000,[27,4,3],0,"+8% hack; +10% hack exp; +3% hack/grow/weaken speed","Electrical signals are used to induce a new, artificial form of myelinogenesis in the human body. This process results in the proliferation of new, synthetic myelin sheaths in the nervous system. These myelin sheaths can propagate neuro-signals much faster than their organic counterparts, leading to greater processing speeds and better brain function.",["EnhancedMyelinSheathing"]],
  ["Enhanced Social Interaction Implant","",1375000000,375000,[25,22,26,24,21],2,"+60% cha; +60% cha exp","A cranial implant that greatly assists in the user's ability to analyze social situations and interactions. The system uses a wide variety of factors such as facial expression, body language, voice tone, and inflection to determine the best course of action during social situations. The implant also uses deep learning software to continuously learn new behavior patterns and how to best respond.",["EnhancedSocialInteractionImplant"]],
  ["EsperTech Bladeburner Eyewear","",165000000,1250,[31],4,"+5% dex; +3% BB success","Ballistic-grade protective and retractable eyewear that was designed specifically for Bladeburner units. This is implanted by installing a mechanical frame in the skull's orbit. This frame interfaces with the brain and allows the user to automatically extrude and extract the eyewear. The eyewear protects against debris, shrapnel, lasers, blinding flashes, and gas. It is also embedded with a data processing chip that can be programmed to display an AR HUD to assist the user in field missions.",["EsperEyewear","Esper Eyewear"]],
  ["SoA - Flood of Poseidon","",1000000,10000,[33],7,"Easier Symbol Matching minigame","Transtinatium VVD reticulator used in optico-sterbing recognition. (This augmentation makes the Symbol matching minigame easier by indicating the correct choice.)",["FloodOfPoseidon","Flood of Poseidon"]],
  ["FocusWire","",900000000,75000,[25,26,21,20],6,"+5% all exp; +10% company rep; +20% work money","A cranial implant that stops procrastination by blocking specific neural pathways in the brain.",[]],
  ["Glibness Enhancement","",2500000000,40500,[13,31],2,"+20% cha exp; +10% company rep","An implant that, when activated, makes the speaker sound unbelievably reasonable and plausible to listeners for the next hour. It requires no concentration from the user, and only a verbal activation component. It even affects most electronic detection methods.",["Glib"]],
  ["Golden Tongue Module","",125000000,125000,[15],2,"+10% cha; +30% cha exp","An aural implant that enhances the user's ability to communicate and persuade others. The implant uses a predictive model that lets the user say precisely what their audience wants to hear. This implant is commonly used by many high-level executives and government officials.",["GoldenTongue","Golden Tongue"]],
  ["GOLEM Serum","",11000000000,31250,[31],4,"+7% combat; +5% BB stam gain","A serum that permanently enhances many aspects of human capabilities, including strength, speed, immune system enhancements, and mitochondrial efficiency. The serum was originally developed by the Chinese military in an attempt to create super soldiers.",["GolemSerum"]],
  ["Graphene Bionic Arms Upgrade","Bionic Arms",3750000000,500000,[16],1,"+85% str; +85% dex","An upgrade to the 'Bionic Arms' augmentation. It infuses the prosthetic arms with an advanced graphene material to make them stronger and lighter.",["GrapheneBionicArms","Graphene Bionic Arms"]],
  ["Graphene Bionic Legs Upgrade","Bionic Legs",4500000000,750000,[19,18,27],1,"+150% agi","An upgrade to the 'Bionic Legs' augmentation. The legs are fused with graphene, greatly enhancing jumping ability.",["GrapheneBionicLegs","Graphene Bionic Legs"]],
  ["Graphene Bionic Spine Upgrade","Bionic Spine",6000000000,1625000,[27,18],1,"+60% combat","An upgrade to the 'Bionic Spine' augmentation. The spine is fused with graphene which enhances durability and supercharges all body functions.",["GrapheneBionicSpine","Graphene Bionic Spine"]],
  ["Graphene Bone Lacings","",4250000000,1125000,[27,28],1,"+70% str; +70% def","Graphene is grafted and fused into the skeletal structure, enhancing bone density and tensile strength.",["GrapheneBoneLacings"]],
  ["Graphene BrachiBlades Upgrade","BrachiBlades",2500000000,225000,[15],5,"+40% str; +40% def; +10% crime success; +30% crime money","An upgrade to the BrachiBlades augmentation. It infuses the retractable blades with an advanced graphene material, making them stronger and lighter.",["GrapheneBrachiBlades","Graphene BrachiBlades"]],
  ["Hacknet Node Cache Architecture Neural-Upload","",5500000,2500,[1],3,"+10% hacknet prod; -15% hacknet level cost","Uploads the architecture and design details of a Hacknet Node's main-memory cache into the brain. This allows the user to engineer custom cache hardware for the Hacknet Node that offers better performance.",["HacknetNodeCacheUpload"]],
  ["Hacknet Node Core Direct-Neural Interface","",60000000,12500,[1],3,"+45% hacknet prod","Installs a Direct-Neural Interface jack into the arm that is capable of connecting to a Hacknet Node. This lets the user access and manipulate the Node's processing logic using electrochemical signals.",["HacknetNodeCoreDNI"]],
  ["Hacknet Node CPU Architecture Neural-Upload","",11000000,3750,[1],3,"+15% hacknet prod; -15% hacknet purchase cost","Uploads the architecture and design details of a Hacknet Node's CPU into the brain. This allows the user to engineer custom hardware and software for the Hacknet Node that provides better performance.",["HacknetNodeCPUUpload"]],
  ["Hacknet Node Kernel Direct-Neural Interface","",40000000,7500,[1],3,"+25% hacknet prod","Installs a Direct-Neural Interface jack into the arm that is capable of connecting to a Hacknet Node. This lets the user access and manipulate the Node's kernel using electrochemical signals.",["HacknetNodeKernelDNI"]],
  ["Hacknet Node NIC Architecture Neural-Upload","",4500000,1875,[1],3,"+10% hacknet prod; -10% hacknet purchase cost","Uploads the architecture and design details of a Hacknet Node's Network Interface Card (NIC) into the brain. This allows the user to engineer a custom NIC for the Hacknet Node that offers better performance.",["HacknetNodeNICUpload"]],
  ["HemoRecirculator","",45000000,10000,[13,16,17],1,"+8% combat; +8% cha","A heart implant that greatly increases the body's ability to effectively use and pump blood.",[]],
  ["ECorp HVMind Implant","",5500000000,1500000,[18],0,"+200% grow() power","A brain implant developed by ECorp. They do not reveal what exactly the implant does, but they promise that it will greatly enhance your abilities. (Many hackers say that they can spoof money much better than normal after installing this augmentation. A leaked document from ECorp contains this weird message: \"vnmehidi's gorw oprwe si ebesaccisl aiv sliguntayir\".)",["HiveMind"]],
  ["SoA - Hunt of Artemis","",1000000,10000,[33],7,"Easier Minesweeper minigame","Magneto-turboencabulator based on technology by Micha Eike Siemon, increases the user's electro-magnetic sensitivity. (This augmentation makes the Minesweeper minigame easier by showing the location of all mines and keeping their position.)",["HuntOfArtemis","Hunt of Artemis"]],
  ["Hydroflame Left Arm","",2500000000000,1250000,[22],1,"+180% str","The left arm of a legendary BitRunner who ascended beyond this world. It projects a light blue energy shield that protects the exposed inner parts. Even though it contains no weapons, the advanced tungsten titanium alloy increases the user's strength to unbelievable levels.",["HydroflameLeftArm"]],
  ["Hyperion Plasma Cannon V1","",2750000000,12500,[31],4,"+6% BB success","A pair of mini plasma cannons embedded into the hands. The Hyperion is capable of rapidly firing bolts of high-density plasma. The weapon is meant to be used against augmented enemies as the ionized nature of the plasma disrupts the electrical systems of Augmentations. However, it can also be effective against non-augmented enemies due to its high temperature and concussive force.",["HyperionV1"]],
  ["Hyperion Plasma Cannon V2","Hyperion Plasma Cannon V1",5500000000,25000,[31],4,"+8% BB success","A pair of mini plasma cannons embedded into the hands. This augmentation is more advanced and powerful than the original V1 model. This V2 model is more power-efficient, more accurate, and can fire plasma bolts at a much higher velocity than the V1 model.",["HyperionV2"]],
  ["HyperSight Corneal Implant","",2750000000,150000,[23,20],0,"+40% dex; +3% cha; +3% hack/grow/weaken speed; +10% hack() money","A bionic eye implant that enhances the user's sight far beyond that of a natural human. Embedded circuitry within the implant provides the ability to detect heat and movement through solid objects such as walls, thus providing 'x-ray vision'-like capabilities.",["Hypersight"]],
  ["INFRARET Enhancement","",30000000,7500,[9],5,"+10% dex; +25% crime success; +10% crime money","A tiny chip that sits behind the retina. This implant lets the user visually detect infrared radiation.",["INFRARet"]],
  ["I.N.T.E.R.L.I.N.K.E.D","",5500000000,25000,[31],4,"+5% combat exp; +10% BB max stam","A drug which incites a DNA modification to the body's extracellular matrix (ECM). This improves the ECM's ability to structurally support the body, granting heightened strength and durability.",["INTERLINKED"]],
  ["SoA - Knowledge of Apollo","",1000000,10000,[33],7,"Easier Wire Cutting minigame","Neodynic retention fjengeln spoofer using -φ karmions, net positive effect on implantee's delta wave. (This augmentation makes the Wire Cutting minigame easier by indicating the incorrect wires.)",["KnowledgeOfApollo","Knowledge of Apollo"]],
  ["LuminCloaking-V1 Skin Implant","",5000000,1500,[12,13],5,"+5% agi; +3% cha; +10% crime money","A skin implant that reinforces the skin with highly advanced synthetic cells. These cells, when powered, have a negative refractive index. As a result, they bend light around the skin, making the user much harder to see with the naked eye.",["LuminCloaking1"]],
  ["LuminCloaking-V2 Skin Implant","LuminCloaking-V1 Skin Implant",30000000,5000,[12,13],5,"+10% def; +10% agi; +10% cha exp; +25% crime money","This is a more advanced version of the LuminCloaking-V1 augmentation. This skin implant reinforces the skin with highly advanced synthetic cells. These cells, when powered, are capable of not only bending light but also of bending heat, making the user more resilient as well as stealthy.",["LuminCloaking2"]],
  ["Magnetism Amplifier","",250000000,15000,[3,16],2,"+5% cha; +10% company rep","A cranial implant that increases the attractive force of the wearer. (Even its inventor isn't quite sure how it works).",["Magnetism"]],
  ["SoA - Might of Ares","",1000000,10000,[33],7,"Easier Slash minigame","Extra-ocular neurons taken from old martial arts master. Injecting them gives the user the ability to predict the enemy's movement. (This augmentation makes the Slash minigame easier by showing you via an indicator when the sentinel is distracted.)",["MightOfAres","Might of Ares"]],
  ["Nanofiber Weave","",125000000,37500,[16,17,24,23,5,15,27],1,"+20% str; +20% def; +5% cha","Synthetic nanofibers are woven into the skin's extracellular matrix using electrospinning, which improves its regenerative and extracellular homeostasis abilities.",["NanofiberWeave"]],
  ["Neotra","",2875000000,562500,[23],1,"+55% str; +55% def; +55% cha","A highly advanced techno-organic drug that is injected into the skeletal and integumentary system. The drug permanently modifies the DNA of the body's skin and bone cells, granting them the ability to repair and restructure themselves.",[]],
  ["Neural Accelerator","",1750000000,200000,[4],0,"+10% hack; +15% hack exp; +20% hack() money","A microprocessor that accelerates the processing speed of biological neural networks. This is a cranial implant that is embedded inside the brain.",["NeuralAccelerator"]],
  ["Neural-Retention Enhancement","",250000000,20000,[2],0,"+25% hack exp","Chemical injections are used to permanently alter and strengthen the brain's neuronal circuits, strengthening the ability to retain information.",["NeuralRetentionEnhancement"]],
  ["Neuralstimulator","",3000000000,50000,[3,7,6,8,10,9,11,25,26,21],0,"+12% hack exp; +2% hack/grow/weaken speed; +10% hack() chance","A cranial implant that intelligently stimulates certain areas of the brain in order to improve cognitive functions.",[]],
  ["Neuregen Gene Modification","",375000000,37500,[7],0,"+40% hack exp","A drug that genetically modifies the neurons in the brain, resulting in neurons that continuously regenerate and strengthen themselves.",["Neuregen"]],
  ["NeuroFlux Governor","",750000,500,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],6,"+1% to most multipliers per level (infinite)","Undetectable adamantium nanobots injected in the user's bloodstream. The NeuroFlux Governor monitors and regulates all aspects of the human body, essentially 'governing' the body. By doing so, it improves the user's performance for most actions. (This special augmentation can be leveled up infinitely. Each level of this augmentation increases MOST multipliers by 1% (+0.000000%), stacking multiplicatively.)",["NeuroFluxGovernor"]],
  ["BitRunners Neurolink","",4375000000,875000,[4],0,"+15% hack; +20% hack exp; +5% hack/grow/weaken speed; +10% hack() chance; Start with FTPCrack.exe, relaySMTP.exe","A brain implant that provides a high-bandwidth, direct neural link between your mind and the BitRunners' data servers, which reportedly contain the largest database of hacking tools and information in the world.",["Neurolink"]],
  ["Neuronal Densification","",1375000000,187500,[26],0,"+15% hack; +10% hack exp; +3% hack/grow/weaken speed","The brain is surgically re-engineered to have increased neuronal density by decreasing the neuron gap junction. Then, the body is genetically modified to enhance the production and capabilities of its neural stem cells.",["NeuronalDensification"]],
  ["Neuroreceptor Management Implant","",550000000,75000,[5],8,"Removes penalty for not focusing on jobs/factions","A brain implant carefully assembled around the synapses, which micromanages the activity and levels of various neuroreceptor chemicals and modulates electrical activity to optimize concentration, allowing the user to multitask much more effectively. (This augmentation removes the penalty for not focusing on actions such as working in a job or working for a faction.)",["NeuroreceptorManager"]],
  ["Neurotrainer I","",4000000,1000,[0,10],6,"+10% all exp","A decentralized cranial implant that improves the brain's ability to learn. It is installed by releasing millions of nanobots into the human brain, each of which attaches to a different neural pathway to enhance the brain's ability to retain and retrieve information.",["Neurotrainer1"]],
  ["Neurotrainer II","",45000000,10000,[4,2],6,"+15% all exp","A decentralized cranial implant that improves the brain's ability to learn. This is a more powerful version of the Neurotrainer I augmentation, but it does not require Neurotrainer I to be installed as a prerequisite.",["Neurotrainer2"]],
  ["Neurotrainer III","",130000000,25000,[22,21],6,"+20% all exp","A decentralized cranial implant that improves the brain's ability to learn. This is a more powerful version of the Neurotrainer I and Neurotrainer II augmentation, but it does not require either of them to be installed as a prerequisite.",["Neurotrainer3"]],
  ["Nuoptimal Nootropic Injector Implant","",20000000,5000,[5,11,8,7,26,21,25],2,"+3% cha; +20% company rep","This torso implant automatically injects nootropic supplements into the bloodstream to improve memory, increase focus, and provide other cognitive enhancements.",["NuoptimalInjectorImplant"]],
  ["NutriGen Implant","",2500000,6250,[8],1,"+20% combat exp","A thermal-powered artificial nutrition generator. Endogenously synthesizes glucose, amino acids, and vitamins, and redistributes them across the body. The device is powered by the body's naturally wasted energy in the form of heat.",["NutriGen"]],
  ["nextSENS Gene Modification","",1925000000,437500,[26],6,"+20% all skills","The body is genetically re-engineered to maintain a state of negligible senescence, preventing the body from deteriorating with age.",["nextSENS"]],
  ["OmniTek InfoLoad","",2875000000,625000,[24],0,"+20% hack; +25% hack exp","OmniTek's data and information repository is uploaded into your brain, enhancing your programming and hacking abilities.",["OmniTekInfoLoad"]],
  ["ORION-MKIV Shoulder","",550000000,6250,[31],4,"+5% str; +5% def; +5% dex; +4% BB success","A bionic shoulder augmentation for the right shoulder. Using cybernetics, the ORION-MKIV shoulder enhances the strength and dexterity of the user's right arm. It also provides protection due to its crystallized graphene plating.",["OrionShoulder"]],
  ["PC Direct-Neural Interface","",3750000000,375000,[21,24,18,23],0,"+8% hack; +30% company rep","Installs a Direct-Neural Interface jack into your arm that is compatible with most computers. Connecting to a computer through this jack allows you to interface with it using the brain's electrochemical signals.",["PCDNI"]],
  ["PC Direct-Neural Interface NeuroNet Injector","PC Direct-Neural Interface",7500000000,1500000,[27],0,"+10% hack; +5% hack/grow/weaken speed; +100% company rep","This is an additional installation that upgrades the functionality of the PC Direct-Neural Interface augmentation. When connected to a computer, the Neural Network upgrade allows the user to use their own brain's processing power to aid the computer in computational tasks.",["PCDNINeuralNetwork","PC Direct-Neural Interface: Neural Network Upgrade"]],
  ["PC Direct-Neural Interface Optimization Submodule","PC Direct-Neural Interface",4500000000,500000,[27,18,23],0,"+10% hack; +75% company rep","This is a submodule upgrade to the PC Direct-Neural Interface augmentation. It improves the performance of the interface and gives the user more control options to a connected computer.",["PCDNIOptimizer","PC Direct-Neural Interface: Optimization Submodule"]],
  ["PCMatrix","",2000000000,100000,[10],2,"+7.77% cha; +7.77% cha exp; +7.77% faction & company rep; +77.7% work money; +7.77% crime success; +7.77% crime money; Start with DeepscanV1.exe, AutoLink.exe","A 'Probability Computation Matrix' is installed in the frontal cortex. This implant uses advanced mathematical algorithms to rapidly identify and compute statistical outcomes of nearly every situation.",[]],
  ["Photosynthetic Cells","",2750000000,562500,[20],1,"+40% str; +40% def; +40% agi; +20% cha","Chloroplasts are added to epidermal stem cells and are applied to the body using a skin graft. The result is photosynthetic skin cells, allowing users to generate their own energy and nutrition using solar power.",["PhotosyntheticCells"]],
  ["Power Recirculation Core","",180000000,25000,[13,16,17,22],6,"+5% all skills; +10% all exp","The body's nerves are attached with polypyrrole nanocircuits that are capable of capturing wasted energy, in the form of heat, and converting it back into usable power.",["PowerRecirculator"]],
  ["The Illustrated Primer","",3375000000,187500,[16,17],2,"+5% cha; +20% cha exp","A cutting-edge knowledgebase entirely built off of nanotech rod-logic, training the user on social engineering. Thought to be stolen technology, its existence has been a secret until recently.",["Primer"]],
  ["QLink","",25000000000000,1875000,[30],0,"+75% hack; +100% hack/grow/weaken speed; +150% hack() chance; +300% hack() money","A brain implant that wirelessly connects you to the Illuminati's quantum supercomputer, allowing you to access and use its incredible computing power.",[]],
  ["Social Negotiation Assistant (S.N.A)","",30000000,6250,[5],2,"+15% cha exp; +15% faction & company rep; +10% work money","A cranial implant that affects the user's personality, making them better at negotiation in social situations.",["SNA"]],
  ["Social Dynamics Processor","",1200000000,225000,[19,18,24],2,"+10% cha; +30% company rep","Makes the wearer a better leader and mentor by greatly increasing their awareness of social dynamics. Not actually a standard implant, but rather a series of training courses and seminars, led by a famous speaker named Denis.",["SocialDynamo","Social Dynamo"]],
  ["SPTN-97 Gene Modification","",4875000000,1250000,[28],1,"+15% hack; +75% combat","The SPTN-97 gene is injected into the genome. The SPTN-97 gene is an artificially synthesized gene that was developed by DARPA to create super-soldiers through genetic modification. The gene was outlawed in 2056.",["SPTN97"]],
  ["The Shadow's Simulacrum","",400000000,37500,[17,16,15],2,"+15% faction & company rep","A crude but functional matter phase-shifter module that is embedded in the brainstem and cerebellum. This augmentation was developed by criminal organizations and allows the user to project and control holographic simulacrums within a large radius. These simulacrums are commonly used for espionage and surveillance work.",["ShadowsSimulacrum","Shadows' Simulacrum"]],
  ["SmartJaw","",2750000000,375000,[25],2,"+50% cha; +50% cha exp; +25% faction & company rep","A bionic jaw that contains advanced hardware and software capable of psychoanalyzing and profiling the personality of others using optical imaging software.",[]],
  ["SmartSonar Implant","",75000000,22500,[12],5,"+10% dex; +15% dex exp; +25% crime money","A cochlear implant that helps the player detect and locate enemies using sound propagation.",["SmartSonar"]],
  ["Speech Enhancement","",12500000,2500,[5,15,21,20,26,25],2,"+5% cha; +10% company rep","An advanced neural implant that improves your speaking abilities, making you more convincing and likable in conversations and overall improving your social interactions.",["SpeechEnhancement"]],
  ["Speech Processor Implant","",50000000,7500,[5,7,6,8,10,9,11,14],2,"+10% cha","A cochlear implant with an embedded computer that analyzes incoming speech. The embedded computer processes characteristics of incoming speech, such as tone and inflection, to pick up on subtle cues and aid in social interactions.",["SpeechProcessor"]],
  ["Stanek's Gift - Genesis","",0,0,[32],8,"-10% all multipliers; Unlocks Stanek's Gift grid","Allison \"Mother\" Stanek imparts you with her gift. An experimental Augmentation implanted at the base of the neck. It allows you to overclock your entire system by carefully changing the configuration. (Its unstable nature decreases all your stats by 10%.)",["StaneksGift1"]],
  ["Stanek's Gift - Awakening","Stanek's Gift - Genesis",0,1000000,[32],8,"+5.56% all multipliers (reduces penalty to -5%)","The next evolution is near, a union of man and machine. A synthesis greater than the birth of the human organism. Time spent with the gift has allowed for acclimatization of the invasive augment and the toll it takes upon your frame, reducing the stat penalty to 5%. (The penalty for the gift is reduced to 5%.)",["StaneksGift2"]],
  ["Stanek's Gift - Serenity","Stanek's Gift - Awakening",0,100000000,[32],8,"+5.26% all multipliers (removes Stanek's Gift penalty)","The synthesis of human and machine is nothing to fear. It is our destiny. You will become greater than the sum of our parts. As One. Embrace your gift fully and wholly free of its accursed toll. Serenity brings tranquility in the form of no longer suffering a stat penalty. (Stanek's Gift has no penalty.)",["StaneksGift3"]],
  ["NEMEAN Subdermal Weave","",3250000000,875000,[17,27,30,29,28],1,"+120% def","The NEMEAN Subdermal Weave is a thin, lightweight, graphene plating that houses a dilatant fluid. The material is implanted underneath the skin, and is the most advanced form of defensive enhancement that has ever been created. The dilatant fluid, despite being thin and light, is extremely effective at stopping piercing blows and reducing blunt trauma. The properties of graphene allow the plating to mitigate damage from any fire or electrical traumas.",["SubdermalArmor"]],
  ["Synaptic Enhancement Implant","",7500000,2000,[0,10],0,"+3% hack/grow/weaken speed","A small cranial implant that continuously uses weak electrical signals to stimulate the brain and induce stronger synaptic activity. This improves the user's cognitive abilities.",["SynapticEnhancement"]],
  ["Synfibril Muscle","",1125000000,437500,[20,27,15,22,28,29,30,23],1,"+30% str; +30% def","The myofibrils in human muscles are injected with special chemicals that react with the proteins inside the myofibrils, altering their underlying structure. The end result is muscles that are stronger and more elastic. Scientists have named these artificially enhanced units 'synfibrils'.",["SynfibrilMuscle"]],
  ["Synthetic Heart","",2875000000,750000,[20,27,15,22,28,29,30],1,"+50% str; +50% agi; +15% cha","This advanced artificial heart, created from plasteel and graphene, is capable of pumping blood more efficiently than an organic heart.",["SyntheticHeart"]],
  ["TITN-41 Gene-Modification Injection","",190000000,25000,[14],2,"+15% cha; +15% cha exp","TITN is a series of viruses that targets and alters the sequences of human DNA in genes that control personality. The TITN-41 strain alters these genes so that the subject becomes more outgoing and sociable.",["TITN41Injection"]],
  ["Augmented Targeting I","",15000000,5000,[12,16,17,6,9,24,20,23],1,"+10% dex","A cranial implant that is embedded within the inner ear structures and optic nerves. It regulates and enhances balance and hand-eye coordination.",["Targeting1"]],
  ["Augmented Targeting II","Augmented Targeting I",42500000,8750,[16,17,6,24,20,23],1,"+20% dex","This upgraded version of the 'Augmented Targeting' implant is capable of augmenting reality by digitally displaying weaknesses and vital signs of threats.",["Targeting2"]],
  ["Augmented Targeting III","Augmented Targeting II",115000000,27500,[16,17,24,20,23,28],1,"+30% dex","The latest version of the 'Augmented Targeting' implant adds the ability to lock-on and track threats.",["Targeting3"]],
  ["The Black Hand","",550000000,100000,[3],0,"+10% hack; +15% str; +15% dex; +2% hack/grow/weaken speed; +10% hack() money","A highly advanced bionic hand. This prosthetic not only enhances the user's strength and dexterity, but is also embedded with hardware and firmware that lets them connect to, access, and hack devices and machines by just touching them.",["TheBlackHand"]],
  ["The Red Pill","",0,2500000,[29],8,"Unlocks w0r1d_d43m0n (completes BitNode)","It's time to leave the cave.",["TheRedPill"]],
  ["SoA - Trickery of Hermes","",1000000,10000,[33],7,"Easier Cheat Code minigame","Penta-dynamo-neurovascular-valve inserted in the carpal ligament, enhances dexterity. (This augmentation makes the Cheat Code minigame easier by showing what character will come next.)",["TrickeryOfHermes","Trickery of Hermes"]],
  ["Vangelis Virus","",2750000000,18750,[31],4,"+10% dex exp; +10% cha exp; +10% BB analysis; +4% BB success","A synthetic symbiotic virus that is injected into human brain tissue. The Vangelis virus heightens the senses and focus of its host while also enhancing their intuition.",["VangelisVirus"]],
  ["Vangelis Virus 3.0","Vangelis Virus",11000000000,37500,[31],4,"+10% def exp; +10% dex exp; +10% cha exp; +15% BB analysis; +5% BB success","An improved version of Vangelis, a synthetic symbiotic virus that is injected into human brain tissue. On top of the benefits of the original virus, this also grants accelerated healing and enhanced reflexes.",["VangelisVirus3"]],
  ["SoA - phyzical WKS harmonizer","",1000000,10000,[33],7,"Easier & more rewarding infiltration","A copy of the WKS harmonizer from the MIA leader of the Shadows of Anarchy injects *Γ-based cells that provide general enhancement to the body. (This augmentation makes many aspects of infiltration easier and more productive via increased timer and rewards, reduced damage taken, etc.)",["WKSharmonizer","WKS harmonizer"]],
  ["Wired Reflexes","",2500000,1250,[5,12,6,11,10,9,17,16,15],1,"+5% dex; +5% agi","Synthetic nerve-enhancements are injected into all major parts of the somatic nervous system, supercharging the spread of neural signals and increasing reflex speed.",["WiredReflexes"]],
  ["SoA - Wisdom of Athena","",1000000,10000,[33],7,"Easier Bracket minigame","A connective brain implant to SASHA that focuses on pattern recognition and predictive templating. (This augmentation makes the Bracket minigame easier by removing all '[' ']'.)",["WisdomOfAthena","Wisdom of Athena"]],
  ["Neural Wit Amplifier","",10000000,5000,[12,4],2,"+3% cha; +5% cha exp; +5% company rep","A connective brain implant that greatly increases the user's speech reaction time. This allows the user to think faster and respond quicker in negotiations, and always have the last word.",["Wit"]],
  ["Xanipher","",4250000000,875000,[22],6,"+20% all skills; +15% all exp","A concoction of advanced nanobots that is orally ingested into the body. These nanobots induce physiological changes and significantly improve the body's functioning in all aspects.",[]],
  ["Blade's Runners","",8250000000,20000,[31],4,"+5% agi; +5% BB max stam; +5% BB stam gain","A cybernetic foot augmentation that was specifically created for Bladeburners during the Synthoid Uprising. The organic musculature of the human foot is enhanced with flexible carbon nanotube matrices that are controlled by intelligent servomotors.",["BladeRunner"]]
];

/**
 * Non-faction special, Grafting, and Labyrinth augmentations from official Enums.ts
 * tracked for bulletproof save-file matching without cluttering the Browser table.
 * Format: [canonicalName, aliases].
 * @type {Array<[string, string[]]>}
 */
const SPECIAL_RAW = [
  ["Unstable Circadian Modulator",["UnstableCircadianModulator"]],
  ["violet Congruity Implant",["CongruityImplant"]],
  ["BigD's Big ... Brain",["BigDsBigBrain"]],
  ["Z.O.Ë.",["ZOE"]],
  ["The W1ngs of Icarus",["TheBrokenWings"]],
  ["The B00ts of Perseus",["TheBoots"]],
  ["The St4ff of Asclepius",["TheStaff"]],
  ["The H4mmer of Daedalus",["TheHammer"]],
  ["The L4w of Bayes",["TheLaw"]],
  ["The B1ade of Solomonoff",["TheSword"]],
  ["The Thr3ad of Ariadne",["TheThread"]]
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
 * Normalized augmentation catalog (127 faction-purchasable augmentations).
 * @type {Array<{
 *   name: string,
 *   prereq: string,
 *   price: number,
 *   rep: number,
 *   factions: string[],
 *   tag: string,
 *   desc: string,
 *   lore: string,
 *   aliases: string[]
 * }>}
 */
const AUGS = A_RAW.map(([name, prereq, price, rep, factionIndices, tagIndex, desc, lore, aliases]) => ({
  name,
  prereq,
  price,
  rep,
  factions: factionIndices.map((idx) => FACTIONS[idx].name),
  tag: TAGS[tagIndex],
  desc,
  lore: lore || '',
  aliases: aliases || []
}));

/**
 * Fast O(1) lookup map of Browser augmentation objects keyed by canonical name.
 * @type {Record<string, typeof AUGS[number]>}
 */
const augMap = Object.fromEntries(AUGS.map((aug) => [aug.name, aug]));

/**
 * Fast O(1) lookup map of special/Grafting/Labyrinth augmentations recognized during save import.
 * @type {Record<string, {name: string, aliases: string[]}>}
 */
const specialAugMap = Object.fromEntries(
  SPECIAL_RAW.map(([name, aliases]) => [name, { name, aliases: aliases || [] }])
);

/**
 * Normalizes an augmentation string for resilient matching across save files,
 * internal enum keys, punctuation differences, and case/whitespace variations.
 * @param {string} raw - Raw augmentation name or enum key.
 * @returns {string} Normalized alphanumeric token string.
 */
function normalizeAugName(raw) {
  if (typeof raw !== 'string') return '';
  return raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['\u2018\u2019`]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Lookup table mapping normalized canonical names and aliases to canonical display names.
 * @type {Map<string, string>}
 */
const augLookupIndex = (() => {
  const map = new Map();
  const register = (canonicalName, aliases) => {
    map.set(normalizeAugName(canonicalName), canonicalName);
    for (const alias of aliases || []) {
      map.set(normalizeAugName(alias), canonicalName);
    }
  };
  for (const aug of AUGS) register(aug.name, aug.aliases);
  for (const spec of Object.values(specialAugMap)) register(spec.name, spec.aliases);
  return map;
})();

/**
 * Resolves any raw augmentation name, legacy planner label, or Enums.ts key
 * to its canonical official Bitburner display name.
 * @param {string} raw - Input augmentation identifier.
 * @returns {string|null} Canonical display name, or null if unrecognized.
 */
function resolveAugName(raw) {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (augMap[trimmed] || specialAugMap[trimmed]) return trimmed;
  return augLookupIndex.get(normalizeAugName(trimmed)) || null;
}
