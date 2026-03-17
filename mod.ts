const FILE_SPECS = [
    {
        files: ["global\\excel\\misc.txt", "global\\excel\\base\\misc.txt"],
        groups: ["Potions", "Charms", "Gems", "Runes", "Jewels"]
    },
    {
        files: ["global\\excel\\weapons.txt", "global\\excel\\base\\weapons.txt"],
        groups: ["AmazonWeapons", "AssassinKatars", "SorceressOrbs"]
    },
    {
        files: ["global\\excel\\armor.txt", "global\\excel\\base\\armor.txt"],
        groups: ["BarbarianHelms", "DruidPelts", "PaladinShields", "NecromancerHeads", "WarlockGrimoires"]
    }
];

const GEMS_SPECS = {
    chipped: ["Chipped Amethyst", "Chipped Topaz", "Chipped Sapphire", "Chipped Emerald", "Chipped Ruby", "Chipped Diamond", "Chipped Skull"],
    flawed: ["Flawed Amethyst", "Flawed Topaz", "Flawed Sapphire", "Flawed Emerald", "Flawed Ruby", "Flawed Diamond", "Flawed Skull"],
    standard: ["Amethyst", "Topaz", "Sapphire", "Emerald", "Ruby", "Diamond", "Skull"],
    flawless: ["Flawless Amethyst", "Flawless Topaz", "Flawless Sapphire", "Flawless Emerald", "Flawless Ruby", "Flawless Diamond", "Flawless Skull"],
    perfect: ["Perfect Amethyst", "Perfect Topaz", "Perfect Sapphire", "Perfect Emerald", "Perfect Ruby", "Perfect Diamond", "Perfect Skull"]
};

const ITEM_SPECS = {
    Potions: ["Full Rejuvenation Potion"],
    Charms: ["Small Charm", "Large Charm", "Grand Charm"],
    Gems: [],
    Runes: [
        "El Rune", "Eld Rune", "Tir Rune", "Nef Rune", "Eth Rune", "Ith Rune",
        "Tal Rune", "Ral Rune", "Ort Rune", "Thul Rune", "Amn Rune", "Sol Rune",
        "Shael Rune", "Dol Rune", "Hel Rune", "Io Rune", "Lum Rune", "Ko Rune",
        "Fal Rune", "Lem Rune", "Pul Rune", "Um Rune", "Mal Rune", "Ist Rune",
        "Gul Rune", "Vex Rune", "Ohm Rune", "Lo Rune", "Sur Rune", "Ber Rune",
        "Jah Rune", "Cham Rune", "Zod Rune",
    ],
    Jewels: ["Amulet", "Ring", "Jewel"],
    AmazonWeapons: ["Stag Bow", "Reflex Bow", "Maiden Spear", "Maiden Pike", "Maiden Javelin"],
    AssassinKatars: ["Katar", "Wrist Blade", "Hatchet Hands", "Cestus", "Claws", "Blade Talons", "Scissors Katar"],
    BarbarianHelms: ["Jawbone Cap", "Fanged Helm", "Horned Helm", "Assault Helmet", "Avenger Guard"],
    DruidPelts: ["Totemic Mask", "Blood Spirit", "Sky Spirit", "Hunter's Guise"],
    PaladinShields: ["Targe", "Rondache", "Heraldic Shield", "Aerin Shield", "Crown Shield"],
    NecromancerHeads: ["Preserved Head", "Zombie Head", "Unraveller Head", "Gargoyle Head", "Demon Head"],
    SorceressOrbs: ["Eagle Orb", "Sacred Globe", "Smoked Sphere", "Clasped Orb", "Jared's Stone"],
    WarlockGrimoires: ["Old Book", "Tome", "Codex", "Compendium", "Grimoire"]
};

Object.keys(GEMS_SPECS).forEach(group => {
    if (config[`${group}GemsEnabled`]) {
        ITEM_SPECS["Gems"] = ITEM_SPECS["Gems"].concat(GEMS_SPECS[group]);
    }
});

FILE_SPECS.forEach(fileSpec => {
    fileSpec.files.forEach(filename => {
        const content = D2RMM.readTsv(filename);
        const vendors = {};

        for (let act = 1; act <= 5; act++) {
            fileSpec.groups.forEach(group => {
                const vendor = config[`a${act}${group}Vendor`];

                if (vendor == "None") {
                    return;
                }

                if (!vendors[vendor]) {
                    vendors[vendor] = [];
                }

                vendors[vendor].push(group);
            });
        }

        if (config["clearExistingSales"]) {
            Object.keys(vendors).forEach(vendor => {
                content.rows.forEach(row => {
                    row[`${vendor}Min`] = "";
                    row[`${vendor}Max`] = "";
                    row[`${vendor}MagicMin`] = "";
                    row[`${vendor}MagicMax`] = "";
                });
            });
        }

        Object.keys(vendors).forEach(vendor => {
            vendors[vendor].forEach(group => {
                ITEM_SPECS[group].forEach(item => {
                    const row = content.rows.find(r => r["name"].trim() == item);

                    if (!row) {
                        throw new Error(`Item "${item}" not found.`);
                    }

                    row["spawnable"] = 1;

                    if (config["baseCost"] != -1) {
                        row["cost"] = config["baseCost"];
                    }

                    row[`${vendor}Min`] = 1;
                    row[`${vendor}Max`] = 1;
                    row[`${vendor}MagicMin`] = 1;
                    row[`${vendor}MagicMax`] = 1;
                    row["PermStoreItem"] = 1;
                    row["multibuy"] = 1;
                });
            });
        });

        D2RMM.writeTsv(filename, content);
    });
});
