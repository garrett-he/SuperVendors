const miscItems = {
    potions: ["Full Rejuvenation Potion"],
    gems: [
        "Chipped Amethyst", "Flawed Amethyst", "Amethyst", "Flawless Amethyst", "Perfect Amethyst",
        "Chipped Topaz", "Flawed Topaz", "Topaz", "Flawless Topaz", "Perfect Topaz",
        "Chipped Sapphire", "Flawed Sapphire", "Sapphire", "Flawless Sapphire", "Perfect Sapphire",
        "Chipped Emerald", "Flawed Emerald", "Emerald", "Flawless Emerald", "Perfect Emerald",
        "Chipped Ruby", "Flawed Ruby", "Ruby", "Flawless Ruby", "Perfect Ruby",
        "Chipped Diamond", "Flawed Diamond", "Diamond", "Flawless Diamond", "Perfect Diamond",
        "Chipped Skull", "Flawed Skull", "Skull", "Flawless Skull", "Perfect Skull"
    ],
    charms: ["Small Charm", "Large Charm", "Grand Charm"],
    runes: [
        "El Rune", "Eld Rune", "Tir Rune",
        "Nef Rune", "Eth Rune", "Ith Rune",
        "Tal Rune", "Ral Rune", "Ort Rune",
        "Thul Rune", "Amn Rune", "Sol Rune",
        "Shael Rune", "Dol Rune", "Hel Rune",
        "Io Rune", "Lum Rune", "Ko Rune",
        "Fal Rune", "Lem Rune", "Pul Rune",
        "Um Rune", "Mal Rune", "Ist Rune",
        "Gul Rune", "Vex Rune", "Ohm Rune",
        "Lo Rune", "Sur Rune", "Ber Rune",
        "Jah Rune", "Cham Rune", "Zod Rune",
    ],
    jewels: ["Ring", "Amulet", "Jewel"]
};

const classItems = {
    amazon: ["Stag Bow", "Reflex Bow", "Maiden Spear", "Maiden Pike", "Maiden Javelin"],
    assassin: ["Katar", "Wrist Blade", "Hatchet Hands", "Cestus", "Claws", "Blade Talons", "Scissors Katar"],
    barbarian: ["Jawbone Cap", "Fanged Helm", "Horned Helm", "Assault Helmet", "Avenger Guard"],
    druid: ["Totemic Mask", "Blood Spirit", "Sky Spirit", "Hunter's Guise"],
    paladin: ["Targe", "Rondache", "Heraldic Shield", "Aerin Shield", "Crown Shield"],
    necromancer: ["Preserved Head", "Zombie Head", "Unraveller Head", "Gargoyle Head", "Demon Head"],
    sorceress: ["Eagle Orb", "Sacred Globe", "Smoked Sphere", "Clasped Orb", "Jared's Stone"],
    warlock: ["Old Book", "Tome", "Codex", "Compendium", "Grimoire"]
};

const vendorSpec = [
    {
        filename: "global\\excel\\misc.txt",
        vendors: [
            // Act 1
            {name: "Akara", items: [...miscItems.potions, ...miscItems.gems, ...miscItems.charms, ...miscItems.runes, ...miscItems.jewels]},

            // Act 2
            {name: "Drognan", items: [...miscItems.potions, ...miscItems.gems, ...miscItems.charms, ...miscItems.runes, ...miscItems.jewels]},

            // Act 3
            {name: "Ormus", items: [...miscItems.potions, ...miscItems.gems, ...miscItems.charms, ...miscItems.runes, ...miscItems.jewels]},

            // Act 4
            {name: "Jamella", items: [...miscItems.potions, ...miscItems.gems, ...miscItems.charms, ...miscItems.runes, ...miscItems.jewels]},

            // Act 5
            {name: "Malah", items: [...miscItems.potions, ...miscItems.gems, ...miscItems.charms, ...miscItems.runes, ...miscItems.jewels]}
        ]
    },
    {
        filename: "global\\excel\\armor.txt",
        vendors: [

            // Act 1
            {name: "Akara", clear: true, items: [...classItems.barbarian, ...classItems.druid, ...classItems.paladin]},
            {name: "Gheed", clear: true, items: [...classItems.necromancer, ...classItems.warlock]},

            // Act 2
            {name: "Drognan", clear: true, items: [...classItems.barbarian, ...classItems.druid, ...classItems.paladin]},
            {name: "Lysander", clear: true, items: [...classItems.necromancer, ...classItems.warlock]},

            // Act 3
            {name: "Ormus", clear: true, items: [...classItems.barbarian, ...classItems.druid, ...classItems.paladin]},
            {name: "Alkor", clear: true, items: [...classItems.necromancer, ...classItems.warlock]},

            // Act 4
            {name: "Jamella", clear: true, items: [...classItems.barbarian, ...classItems.druid, ...classItems.paladin]},
            {name: "Halbu", clear: true, items: [...classItems.necromancer, ...classItems.warlock]},

            // Act 5
            {name: "Malah", clear: true, items: [...classItems.barbarian, ...classItems.druid, ...classItems.paladin]},
            {name: "Larzuk", clear: true, items: [...classItems.necromancer, ...classItems.warlock]},
        ]
    },
    {
        filename: "global\\excel\\weapons.txt",
        vendors: [
            // Act 1
            {name: "Gheed", clear: true, items: [...classItems.amazon, ...classItems.assassin, ...classItems.sorceress]},

            // Act 2
            {name: "Lysander", clear: true, items: [...classItems.amazon, ...classItems.assassin, ...classItems.sorceress]},

            // Act 3
            {name: "Alkor", clear: true, items: [...classItems.amazon, ...classItems.assassin, ...classItems.sorceress]},

            // Act 4
            {name: "Jamella", clear: true, items: [...classItems.amazon, ...classItems.assassin, ...classItems.sorceress]},

            // Act 5
            {name: "Malah", clear: true, items: [...classItems.amazon, ...classItems.assassin, ...classItems.sorceress]},
        ]
    }
];

function assignVendor(row, vendor: string) {
    row["spawnable"] = 1;
    row["cost"] = 1;
    row[`${vendor}Min`] = 1;
    row[`${vendor}Max`] = 1;
    row[`${vendor}MagicMin`] = 1;
    row[`${vendor}MagicMax`] = 1;
    row["PermStoreItem"] = 1;
    row["multibuy"] = 1;
}

function revokeVendor(row, vendor: string) {
    row[`${vendor}Min`] = "";
    row[`${vendor}Max`] = "";
    row[`${vendor}MagicMin`] = "";
    row[`${vendor}MagicMax`] = "";
}

vendorSpec.forEach(spec => {
    const content = D2RMM.readTsv(spec.filename);

    spec.vendors.forEach(vendor => {
        if (vendor.clear) {
            content.rows.forEach(row => {
                revokeVendor(row, vendor.name);
            });
        }

        vendor.items.forEach(item => {
            const row = content.rows.find(r => r["name"].trim() == item);

            if (!row) {
                throw new Error(`Item "${item}" not found.`);
            }

            assignVendor(row, vendor.name);
        });
    });

    D2RMM.writeTsv(spec.filename, content);
});
