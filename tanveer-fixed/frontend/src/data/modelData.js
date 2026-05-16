import ShreddersImg from '../assets/shredders.png';
import AppShreddersImg from '../assets/application-shredders.png';
import LaminatorsImg from '../assets/binders-and-laminators.png';

// Helper to create common specs with brochure and video
const createModel = (id, title, subtitle, specs, description = "") => ({
    id,
    title,
    subtitle,
    description,
    image: ShreddersImg,
    category: "Document Shredders",
    specs,
    brochureLink: "#",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isAvailableOnGeM: subtitle && subtitle.includes('GeM')
});

const createAppModel = (id, title, subtitle, specs, description = "") => ({
    id,
    title,
    subtitle,
    description,
    image: AppShreddersImg,
    category: "Multipurpose Application Shredders",
    specs,
    brochureLink: "#",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isAvailableOnGeM: subtitle && subtitle.includes('GeM')
});

const createLaminatorModel = (id, title, subtitle, specs, description = "") => ({
    id,
    title,
    subtitle,
    description,
    image: LaminatorsImg,
    category: "Document Laminators & Binders",
    specs,
    brochureLink: "#",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isAvailableOnGeM: subtitle && subtitle.includes('GeM')
});

const createWasteModel = (id, title, subtitle, specs, description = "") => ({
    id,
    title,
    subtitle,
    description,
    image: LaminatorsImg, // Can replace this with PetShreddersImg if imported, or keep default
    category: "Waste Management & Recycling",
    specs,
    brochureLink: "#",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isAvailableOnGeM: subtitle && subtitle.includes('GeM')
});

export const modelData = {
    // Office and Desk Side Office Shredders
    "antiva-ps-225": {
        id: "antiva-ps-225",
        title: "ANTIVA PS 225",
        subtitle: "DESK SIDE DOCUMENT SHREDDER",
        description: "For high security shredding and continuous operation.",
        image: ShreddersImg,
        category: "Document Shredders",
        keyFeatures: [
            "Auto Start & Stop",
            "Cutters are made of high grade special alloy steel",
            "Designed fo minimumm noise level",
            "Rugged body all metals construction",
            "Overload protection with buzzer",
            "Can be used continuously for 30 minutes",
            "Total assurance for supply of spares"
        ],
        specs: {
            "Feed width (mm)": "225 mm",
            "Shred size (mm)": "Strip Cut",
            "Shred Capacity (70 gsm A4 sheets)": "8 sheets",
            "Voltage": "220 V",
            "Power": "190 watts",
            "Speed (metres/minute)": "2 mtrs/min",
            "Waste Volume (Litres)": "18 Liters",
            "Weight (kgs)": "17 Kg",
            "Machines Dimensions (mm) HxWxD": "575x335x420",
            "Overload Protection": "-",
            "Overheat Protection": "-",
            "Auto Reverse": "-",
            "Motor Start/Off": "Paper Sensor",
            "Working cycle": "Continuous"
        },
        brochureLink: "#",
        videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    "antiva-ps-225-e": createModel("antiva-ps-225-e", "ANTIVA PS 225 E", "DESK SIDE DOCUMENT SHREDDER - PRODUCT AVAILABLE ON GeM", { "Shred Capacity (70 gsm A4 sheets)": "12 sheets", "Shred size (mm)": "Strip Cut" }),

    // Departmental Office Shred Series
    "antiva-ps-240": createModel("antiva-ps-240", "ANTIVA PS 240", "Departmental Office Shredder", { "Shred Capacity (70 gsm A4 sheets)": "28-32 sheets", "Shred size (mm)": "Strip Cut" }),
    "antiva-ps-240-hd": createModel("antiva-ps-240-hd", "ANTIVA PS 240 HD", "Departmental Office Shredder - PRODUCT AVAILABLE ON GeM", { "Shred Capacity (70 gsm A4 sheets)": "42-46 sheets", "Shred size (mm)": "Strip Cut" }),
    "antiva-ps-240-cc": createModel("antiva-ps-240-cc", "ANTIVA PS 240 CC", "Departmental Office Shredder - PRODUCT AVAILABLE ON GeM", { "Shred Capacity (70 gsm A4 sheets)": "26-28 sheets", "Shred size (mm)": "Cross Cut" }),
    "antiva-ps-240-ccx": createModel("antiva-ps-240-ccx", "ANTIVA PS 240 CCX", "Departmental Office Shredder - PRODUCT AVAILABLE ON GeM", { "Shred Capacity (70 gsm A4 sheets)": "16-18 sheets", "Shred size (mm)": "Micro Cut" }),

    // Departmental Shredders
    "antiva-ps-300": createModel("antiva-ps-300", "ANTIVA PS 300", "Departmental Shredder", { "Shred Capacity (70 gsm A4 sheets)": "15 sheets", "Shred size (mm)": "Strip cut" }),
    "antiva-ps-300-cc": createModel("antiva-ps-300-cc", "ANTIVA PS 300 CC", "Departmental Shredder - PRODUCT AVAILABLE ON GeM", { "Shred Capacity (70 gsm A4 sheets)": "18-20 sheets", "Shred size (mm)": "Cross cut" }),
    "antiva-ps-300-hd": createModel("antiva-ps-300-hd", "ANTIVA PS 300 HD", "Departmental Shredder - PRODUCT AVAILABLE ON GeM", { "Shred Capacity (70 gsm A4 sheets)": "27-30 sheets", "Shred size (mm)": "Strip cut" }),

    // Heavy Duty Shredders
    "antiva-ps-400": createModel("antiva-ps-400", "ANTIVA PS 400", "Heavy Duty Shredder - PRODUCT AVAILABLE ON GeM", { "Shred Capacity (70 gsm A4 sheets)": "30 sheets", "Shred size (mm)": "Strip cut" }),
    "antiva-ps-403": createModel("antiva-ps-403", "ANTIVA PS 403", "Heavy Duty Shredder", { "Shred Capacity (70 gsm A4 sheets)": "40 sheets", "Shred size (mm)": "Strip cut" }),
    "antiva-ps-306": createModel("antiva-ps-306", "ANTIVA PS 306", "Heavy Duty Shredder", { "Shred Capacity (70 gsm A4 sheets)": "50 sheets", "Shred size (mm)": "Strip cut" }),

    // Departmental Heavy Duty Shredders
    "antiva-ps-404": createModel("antiva-ps-404", "ANTIVA PS 404", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "55 sheets", "Shred size (mm)": "Stripcut" }),
    "antiva-ps-404-cc": createModel("antiva-ps-404-cc", "ANTIVA PS 404 CC", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "70 sheets", "Shred size (mm)": "Crosscut" }),
    "antiva-ps-407": createModel("antiva-ps-407", "ANTIVA PS 407", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "75 sheets", "Shred size (mm)": "Stripcut" }),
    "antiva-ps-407-cc": createModel("antiva-ps-407-cc", "ANTIVA PS 407 CC", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "100 sheets", "Shred size (mm)": "Crosscut" }),
    "antiva-ps-407-ccx": createModel("antiva-ps-407-ccx", "ANTIVA PS 407 CCX", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "60 sheets", "Shred size (mm)": "Crosscut" }),
    "antiva-ps-409": createModel("antiva-ps-409", "ANTIVA PS 409", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "95 sheets", "Shred size (mm)": "Stripcut" }),
    "antiva-ps-409-cc": createModel("antiva-ps-409-cc", "ANTIVA PS 409 CC", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "125 sheets", "Shred size (mm)": "Crosscut" }),
    "antiva-ps-409-ccx": createModel("antiva-ps-409-ccx", "ANTIVA PS 409 CCX", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "80 sheets", "Shred size (mm)": "Crosscut" }),

    // Departmental Heavy Duty Document Shredders With High Speed & High Motor Power
    "antiva-ps-4071": createModel("antiva-ps-4071", "ANTIVA PS 4071", "With High Speed & High Motor Power", { "Shred Capacity (70 gsm A4 sheets)": "70 sheets", "Shred size (mm)": "Stripcut" }),
    "antiva-ps-4071-cc": createModel("antiva-ps-4071-cc", "ANTIVA PS 4071 CC", "With High Speed & High Motor Power", { "Shred Capacity (70 gsm A4 sheets)": "95 sheets", "Shred size (mm)": "Crosscut" }),

    // High Capacity Departmental Heavy Duty Document Shredders With High Speed and High Motor Power
    "antiva-ps-4091": createModel("antiva-ps-4091", "ANTIVA PS 4091", "High Capacity With High Speed & Motor Power", { "Shred Capacity (70 gsm A4 sheets)": "95 sheets", "Shred size (mm)": "Stripcut" }),
    "antiva-ps-4091-cc": createModel("antiva-ps-4091-cc", "ANTIVA PS 4091 CC", "High Capacity With High Speed & Motor Power", { "Shred Capacity (70 gsm A4 sheets)": "125 sheets", "Shred size (mm)": "Crosscut" }),

    // Industrial Shredders
    "antiva-ps-409-hd": createModel("antiva-ps-409-hd", "ANTIVA PS 409 HD", "Industrial Shredder", { "Shred Capacity (70 gsm A4 sheets)": "100 sheets", "Shred size (mm)": "Strip Cut" }),
    "antiva-ps-409-hdcc": createModel("antiva-ps-409-hdcc", "ANTIVA PS 409 HDCC", "Industrial Shredder", { "Shred Capacity (70 gsm A4 sheets)": "125 sheets", "Shred size (mm)": "Cross Cut" }),
    "antiva-ps-500": createModel("antiva-ps-500", "ANTIVA PS 500", "Industrial Shredder", { "Shred Capacity (70 gsm A4 sheets)": "96 sheets", "Shred size (mm)": "Strip Cut" }),
    "antiva-ps-500-cc": createModel("antiva-ps-500-cc", "ANTIVA PS 500 CC", "Industrial Shredder", { "Shred Capacity (70 gsm A4 sheets)": "125 sheets", "Shred size (mm)": "Cross Cut" }),

    // AVANTI Models
    "avanti-ps-225": createModel("avanti-ps-225", "AVANTI PS 225", "DESK SIDE DOCUMENT SHREDDER", { "Shred Capacity (70 gsm A4 sheets)": "8 sheets", "Shred size (mm)": "Strip cut" }),
    "avanti-ps-225-e": createModel("avanti-ps-225-e", "AVANTI PS 225 E", "DESK SIDE DOCUMENT SHREDDER", { "Shred Capacity (70 gsm A4 sheets)": "12 sheets", "Shred size (mm)": "Strip cut" }),
    "avanti-ps-240": createModel("avanti-ps-240", "AVANTI PS 240", "Departmental Office Shredder", { "Shred Capacity (70 gsm A4 sheets)": "28-32 sheets", "Shred size (mm)": "Strip Cut" }),
    "avanti-ps-240-hd": createModel("avanti-ps-240-hd", "AVANTI PS 240 HD", "Departmental Office Shredder", { "Shred Capacity (70 gsm A4 sheets)": "42-46 sheets", "Shred size (mm)": "Strip Cut" }),
    "avanti-ps-240-cc": createModel("avanti-ps-240-cc", "AVANTI PS 240 CC", "Departmental Office Shredder", { "Shred Capacity (70 gsm A4 sheets)": "26-28 sheets", "Shred size (mm)": "Cross Cut" }),
    "avanti-ps-240-ccx": createModel("avanti-ps-240-ccx", "AVANTI PS 240 CCX", "Departmental Office Shredder", { "Shred Capacity (70 gsm A4 sheets)": "16-18 sheets", "Shred size (mm)": "Micro Cut" }),
    "avanti-ps-300": createModel("avanti-ps-300", "AVANTI PS 300", "Departmental Shredder", { "Shred Capacity (70 gsm A4 sheets)": "15 sheets", "Shred size (mm)": "Strip cut" }),
    "avanti-ps-300-cc": createModel("avanti-ps-300-cc", "AVANTI PS 300 CC", "Departmental Shredder", { "Shred Capacity (70 gsm A4 sheets)": "18-20 sheets", "Shred size (mm)": "Cross cut" }),
    "avanti-ps-300-hd": createModel("avanti-ps-300-hd", "AVANTI PS 300 HD", "Departmental Shredder", { "Shred Capacity (70 gsm A4 sheets)": "27-30 sheets", "Shred size (mm)": "Strip cut" }),
    "avanti-ps-400": createModel("avanti-ps-400", "AVANTI PS 400", "Heavy Duty Shredder", { "Shred Capacity (70 gsm A4 sheets)": "30 sheets", "Shred size (mm)": "Strip cut" }),
    "avanti-ps-403": createModel("avanti-ps-403", "AVANTI PS 403", "Heavy Duty Shredder", { "Shred Capacity (70 gsm A4 sheets)": "40 sheets", "Shred size (mm)": "Strip cut" }),
    "avanti-ps-306": createModel("avanti-ps-306", "AVANTI PS 306", "Heavy Duty Shredder", { "Shred Capacity (70 gsm A4 sheets)": "50 sheets", "Shred size (mm)": "Strip cut" }),
    "avanti-ps-404": createModel("avanti-ps-404", "AVANTI PS 404", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "55 sheets", "Shred size (mm)": "Stripcut" }),
    "avanti-ps-404-cc": createModel("avanti-ps-404-cc", "AVANTI PS 404 CC", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "70 sheets", "Shred size (mm)": "Crosscut" }),
    "avanti-ps-407": createModel("avanti-ps-407", "AVANTI PS 407", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "75 sheets", "Shred size (mm)": "Stripcut" }),
    "avanti-ps-407-cc": createModel("avanti-ps-407-cc", "AVANTI PS 407 CC", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "100 sheets", "Shred size (mm)": "Crosscut" }),
    "avanti-ps-407-ccx": createModel("avanti-ps-407-ccx", "AVANTI PS 407 CCX", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "60 sheets", "Shred size (mm)": "Crosscut" }),
    "avanti-ps-409": createModel("avanti-ps-409", "AVANTI PS 409", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "95 sheets", "Shred size (mm)": "Stripcut" }),
    "avanti-ps-409-cc": createModel("avanti-ps-409-cc", "AVANTI PS 409 CC", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "125 sheets", "Shred size (mm)": "Crosscut" }),
    "avanti-ps-409-ccx": createModel("avanti-ps-409-ccx", "AVANTI PS 409 CCX", "Departmental Heavy Duty", { "Shred Capacity (70 gsm A4 sheets)": "80 sheets", "Shred size (mm)": "Crosscut" }),
    "avanti-ps-4071": createModel("avanti-ps-4071", "AVANTI PS 4071", "With High Speed & High Motor Power", { "Shred Capacity (70 gsm A4 sheets)": "70 Sheets", "Shred size (mm)": "Stripcut" }),
    "avanti-ps-4071-cc": createModel("avanti-ps-4071-cc", "AVANTI PS 4071 CC", "With High Speed & High Motor Power", { "Shred Capacity (70 gsm A4 sheets)": "95 Sheets", "Shred size (mm)": "Crosscut" }),
    "avanti-ps-4091": createModel("avanti-ps-4091", "AVANTI PS 4091", "High Capacity With High Speed & Motor Power", { "Shred Capacity (70 gsm A4 sheets)": "95 Sheets", "Shred size (mm)": "Stripcut" }),
    "avanti-ps-4091-cc": createModel("avanti-ps-4091-cc", "AVANTI PS 4091 CC", "High Capacity With High Speed & Motor Power", { "Shred Capacity (70 gsm A4 sheets)": "125 Sheets", "Shred size (mm)": "Crosscut" }),
    "avanti-ps-409-hd": createModel("avanti-ps-409-hd", "AVANTI PS 409 HD", "Industrial Shredder", { "Shred Capacity (70 gsm A4 sheets)": "100 Sheets", "Shred size (mm)": "Strip Cut" }),
    "avanti-ps-409-hdcc": createModel("avanti-ps-409-hdcc", "AVANTI PS 409 HDCC", "Industrial Shredder", { "Shred Capacity (70 gsm A4 sheets)": "125 Sheets", "Shred size (mm)": "Cross Cut" }),
    "avanti-ps-500": createModel("avanti-ps-500", "AVANTI PS 500", "Industrial Shredder", { "Shred Capacity (70 gsm A4 sheets)": "96 Sheets", "Shred size (mm)": "Strip Cut" }),
    "avanti-ps-500-cc": createModel("avanti-ps-500-cc", "AVANTI PS 500 CC", "Industrial Shredder", { "Shred Capacity (70 gsm A4 sheets)": "125 Sheets", "Shred size (mm)": "Cross Cut" }),

    // --- Multipurpose Application Shredders ---

    // Plastic Bottle Shredders
    "avanti-bs-300": createWasteModel("avanti-bs-300", "AVANTI BS 300", "High Technology Document, Volumetric Material & Bottle Shredder cum Disentegrator", {}),
    "avanti-bs-300x": createWasteModel("avanti-bs-300x", "AVANTI BS 300X", "Plastic Film Shredder", {}),
    "avanti-pws-300": createWasteModel("avanti-pws-300", "AVANTI PWS 300", "Plastic Bottle Shredder", {}),
    "avanti-bs-400": createWasteModel("avanti-bs-400", "AVANTI BS 400", "Plastic Bottle Shredder", {}),

    // Industrial Multipurpose Shredder
    "avanti-bs-5620": createAppModel("avanti-bs-5620", "AVANTI BS 5620", "INDUSTRIAL MULTIPURPOSE SHREDDER TWIN MOTOR", {}),
    "avanti-msw401": createAppModel("avanti-msw401", "AVANTI MSW401", "Suitable for Shredding Polythene Bags, Synthetic Cloth & Cotton Cloth Waste", {}),
    "avanti-ms-400": createAppModel("avanti-ms-400", "AVANTI MS 400", "WOVEN BAG SHREDDER", {}),

    // Multi Application Shredder with Hopper
    "avanti-es-5012": createAppModel("avanti-es-5012", "AVANTI ES 5012", "Multi Application Shredder with Hopper", {}),
    "avanti-ps-409-hu": createAppModel("avanti-ps-409-hu", "AVANTI PS 409 HU", "Multi Application Shredder with Hopper", {}),

    // Food Waste Shredder
    "avanti-fs-300": createWasteModel("avanti-fs-300", "AVANTI FS 300", "Food Waste Shredder", {}),

    // Glass Waste Shredder
    "avanti-bc-300": createWasteModel("avanti-bc-300", "AVANTI BC 300", "Glass Waste Shredder", {}),
    "avanti-bc-400": createWasteModel("avanti-bc-400", "AVANTI BC 400", "Glass Waste Shredder", {}),

    // Garden Waste Shredder
    "avanti-ms-4050": createWasteModel("avanti-ms-4050", "AVANTI MS 4050", "Garden Waste Shredder", {}),

    // E-Waste Shredder
    "avanti-ec-300-hdd-combo": createWasteModel("avanti-ec-300-hdd-combo", "AVANTI EC 300 HDD COMBO", "E-Waste Shredder", {}),
    "avanti-es-400-hd-combo": createWasteModel("avanti-es-400-hd-combo", "AVANTI ES 400 HD COMBO", "E-Waste Shredder", {}),
    "avanti-ews-4050": createWasteModel("avanti-ews-4050", "AVANTI EWS 4050", "E-Waste Shredder", {}),
    "avanti-ews-5010": createWasteModel("avanti-ews-5010", "AVANTI EWS 5010", "E-Waste Shredder", {}),
    "avanti-ews-5515": createWasteModel("avanti-ews-5515", "AVANTI EWS 5515", "E-Waste Shredder", {}),
    "avanti-ews-5620": createWasteModel("avanti-ews-5620", "AVANTI EWS 5620", "E-Waste Shredder", {}),

    // Laminate Shredder
    "avanti-ps-404-l": createAppModel("avanti-ps-404-l", "AVANTI PS 404 L", "Laminate Shredder", {}),

    // Large Format & Carton Box Shredders
    "avanti-ps-750": createAppModel("avanti-ps-750", "AVANTI PS 750", "Large Format & Carton Box Shredder", {}),

    // Cardboard Perforator & Shredder
    "avanti-cp-450": createAppModel("avanti-cp-450", "AVANTI CP 450", "Cardboard Perforator & Shredder", {}),
    "avanti-cp-450-v": createAppModel("avanti-cp-450-v", "AVANTI CP 450 V", "Cardboard Perforator & Shredder", {}),
    "avanti-cp-455": createAppModel("avanti-cp-455", "AVANTI CP 455", "Cardboard Perforator & Shredder", {}),
    "avanti-cp-455-v": createAppModel("avanti-cp-455-v", "AVANTI CP 455 V", "Cardboard Perforator & Shredder", {}),

    // Shredder with Segregator
    "avanti-mr-300": createAppModel("avanti-mr-300", "AVANTI MR 300", "Shredder with Segregator", {}),
    "avanti-mr-302-ss": createAppModel("avanti-mr-302-ss", "AVANTI MR 302 SS", "Shredder with Segregator", {}),

    // Municipal Waste Shredder
    // (None listed separately in provided text under this header, skipping or using generic if needed. Assuming 'with Conveyer' ones below cover it or it's a category header with no items immediately below)

    // Compost Shredder
    "avanti-ms-202": createAppModel("avanti-ms-202", "AVANTI MS 202", "Compost Shredder", {}),

    // Pet Bottle Crusher Shredders
    "avanti-bs-100p": createAppModel("avanti-bs-100p", "AVANTI BS 100P", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-200-p": createAppModel("avanti-bs-200-p", "AVANTI BS 200 P", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-202-p": createAppModel("avanti-bs-202-p", "AVANTI BS 202 P", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-203-p": createAppModel("avanti-bs-203-p", "AVANTI BS 203 P", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-200-pv": createAppModel("avanti-bs-200-pv", "AVANTI BS 200 PV", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-202-pv": createAppModel("avanti-bs-202-pv", "AVANTI BS 202 PV", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-203-pv": createAppModel("avanti-bs-203-pv", "AVANTI BS 203 PV", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-200-px": createAppModel("avanti-bs-200-px", "AVANTI BS 200 PX", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-202-px": createAppModel("avanti-bs-202-px", "AVANTI BS 202 PX", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-203-px": createAppModel("avanti-bs-203-px", "AVANTI BS 203 PX", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-200-pe": createAppModel("avanti-bs-200-pe", "AVANTI BS 200 PE", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-202-pe": createAppModel("avanti-bs-202-pe", "AVANTI BS 202 PE", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-203-pe": createAppModel("avanti-bs-203-pe", "AVANTI BS 203 PE", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-200-pears": createAppModel("avanti-bs-200-pears", "AVANTI BS 200 PEARS", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-200-pearl": createAppModel("avanti-bs-200-pearl", "AVANTI BS 200 PEARL", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-201-pva": createAppModel("avanti-bs-201-pva", "AVANTI BS 201 PVA", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-300-p": createAppModel("avanti-bs-300-p", "AVANTI BS 300 P", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-400-p": createAppModel("avanti-bs-400-p", "AVANTI BS 400 P", "Pet Bottle Crusher Shredder", {}),
    "avanti-bs-4050-p": createAppModel("avanti-bs-4050-p", "AVANTI BS 4050 P", "Pet Bottle Crusher Shredder", {}),

    // Multipurpose Packaging Material & Document Shredders
    "avanti-hs-404": createAppModel("avanti-hs-404", "AVANTI HS 404", "Hopper 55 sheets /Stripcut", { "Capacity": "55 sheets", "Type": "Stripcut", "Feature": "Hopper" }),
    "avanti-hs-404-cc": createAppModel("avanti-hs-404-cc", "AVANTI HS 404 CC", "Hopper 65-70 sheets /Crosscut", { "Capacity": "65-70 sheets", "Type": "Crosscut", "Feature": "Hopper" }),
    "avanti-hs-404-ccx": createAppModel("avanti-hs-404-ccx", "AVANTI HS 404 CCX", "Hopper / 28-32 sheets / Super Cross cut", { "Capacity": "28-32 sheets", "Type": "Super Cross cut", "Feature": "Hopper" }),
    "avanti-hs-407": createAppModel("avanti-hs-407", "AVANTI HS 407", "Hopper / 65-70 sheets / Strip cut", { "Capacity": "65-70 sheets", "Type": "Strip cut", "Feature": "Hopper" }),
    "avanti-hs-407-cc": createAppModel("avanti-hs-407-cc", "AVANTI HS 407 CC", "Hopper / 90-95 sheets / Cross cut", { "Capacity": "90-95 sheets", "Type": "Cross cut", "Feature": "Hopper" }),
    "avanti-hs-407-ccx": createAppModel("avanti-hs-407-ccx", "AVANTI HS 407 CCX", "Hopper / 30-35 sheets / Super Cross cut", { "Capacity": "30-35 sheets", "Type": "Super Cross cut", "Feature": "Hopper" }),
    "avanti-hs-409": createAppModel("avanti-hs-409", "AVANTI HS 409", "Hopper / 90-95 sheets / Strip cut", { "Capacity": "90-95 sheets", "Type": "Strip cut", "Feature": "Hopper" }),
    "avanti-hs-409-cc": createAppModel("avanti-hs-409-cc", "AVANTI HS 409 CC", "Hopper / 120-125 sheets / Cross cut", { "Capacity": "120-125 sheets", "Type": "Cross cut", "Feature": "Hopper" }),
    "avanti-hs-409-ccx": createAppModel("avanti-hs-409-ccx", "AVANTI HS 409 CCX", "Hopper / 55-60 sheets / Super Cross cut", { "Capacity": "55-60 sheets", "Type": "Super Cross cut", "Feature": "Hopper" }),

    // Automated Shredding Solutions
    "avanti-es-5012-automated": createAppModel("avanti-es-5012-automated", "AVANTI ES 5012", "Automated Shredding Solutions", {}), // Added suffix to avoid collision if duplicate

    // Cellulose/Pulp Shredder
    "avanti-ps-1000-cc": createAppModel("avanti-ps-1000-cc", "AVANTI PS 1000 CC", "Cellulose/Pulp Shredder", {}),

    // UV C Sterilizer
    "avanti-uv-36": createAppModel("avanti-uv-36", "AVANTI UV 36", "UV C Sterilizer", {}),

    // --- Laminators and Binders ---
    // Comb Binders
    "avanti-clp-21": createLaminatorModel("avanti-clp-21", "AVANTI CLP 21", "Comb Binder", {}),
    "avanti-clp-21-s": createLaminatorModel("avanti-clp-21-s", "AVANTI CLP 21 S", "Comb Binder", {}),

    // Spiral Binders
    "avanti-sb-340": createLaminatorModel("avanti-sb-340", "AVANTI SB 340", "Spiral Binder", {}),

    // Roll Laminators
    "avanti-dl-685": createLaminatorModel("avanti-dl-685", "AVANTI DL 685", "Roll Laminator", {}),
    "avanti-dl-1000": createLaminatorModel("avanti-dl-1000", "AVANTI DL 1000", "Roll Laminator", {}),

    // Pouch Laminators
    "avanti-dl-300": createLaminatorModel("avanti-dl-300", "AVANTI DL 300", "Pouch Laminator", {}),
};
