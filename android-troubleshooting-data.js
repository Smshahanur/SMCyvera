/**
 * SMCyvera by Shahanur Mollah — Android Troubleshooting Center Data
 * Complete database of 12 categories and 60 problems with interactive diagnostic trees,
 * OEM variations (Samsung One UI, Google Pixel, Xiaomi HyperOS, OnePlus OxygenOS),
 * safety notices, and cross-references to original SMCyvera technical explainers.
 */

window.ANDROID_TROUBLESHOOTING_DATA = {
  categories: [
    {
        "id": "battery-charging",
        "name": "Battery and Charging",
        "icon": "\u26a1",
        "count": 8,
        "description": "Diagnose power delivery, charging protocols, thermal safety, port debris, and sudden battery level drops."
    },
    {
        "id": "wifi-network",
        "name": "Wi-Fi, Mobile Data and Network",
        "icon": "\ud83d\udcf6",
        "count": 8,
        "description": "Resolve captive portal issues, DNS drops, APN misconfigurations, SIM detection, and cellular handshakes."
    },
    {
        "id": "storage-performance",
        "name": "Storage and Performance",
        "icon": "\ud83d\ude80",
        "count": 6,
        "description": "Free hidden storage, eliminate UI stutter, troubleshoot aggressive RAM management, and prevent thermal throttling."
    },
    {
        "id": "apps-notifications",
        "name": "Apps and Notifications",
        "icon": "\ud83d\udd14",
        "count": 6,
        "description": "Fix Play Store cache errors, OEM battery optimization delaying push alerts, and misbehaving app runtimes."
    },
    {
        "id": "bluetooth-audio",
        "name": "Bluetooth, Audio and Accessories",
        "icon": "\ud83c\udfa7",
        "count": 5,
        "description": "Pairing failures, Bluetooth absolute volume bugs, speaker grilles, and microphone permissions."
    },
    {
        "id": "display-touch",
        "name": "Display and Touchscreen",
        "icon": "\ud83d\udcf1",
        "count": 5,
        "description": "Touch digitizer sensitivity, screen refresh rate flickers, ambient light sensors, and pocket mode."
    },
    {
        "id": "security-privacy",
        "name": "Security and Privacy",
        "icon": "\ud83d\udee1\ufe0f",
        "count": 4,
        "description": "Identify rogue adware apps with full-screen draw overlay privileges, excessive permissions, and browser redirects."
    },
    {
        "id": "system-updates",
        "name": "Android System and Updates",
        "icon": "\u2699\ufe0f",
        "count": 4,
        "description": "OTA cache validation failures, boot loops, system recovery partitions, and System UI crash loops."
    },
    {
        "id": "camera-photos",
        "name": "Camera and Photos",
        "icon": "\ud83d\udcf7",
        "count": 4,
        "description": "Camera service conflicts, optical image stabilization rattles, thermal flashlight disablement, and scoped storage."
    },
    {
        "id": "usb-sharing",
        "name": "USB, Files and Sharing",
        "icon": "\ud83d\udcbe",
        "count": 4,
        "description": "MTP driver negotiation, faulty USB data lines, Download Manager service, and Quick Share / Nearby Share."
    },
    {
        "id": "location-calls",
        "name": "Location and Calls",
        "icon": "\ud83d\udccd",
        "count": 3,
        "description": "A-GPS cache resets, VoLTE / Wi-Fi calling handshake drops, and secondary noise-cancellation mic blocks."
    },
    {
        "id": "everyday-features",
        "name": "Everyday Phone Features",
        "icon": "\u23f0",
        "count": 3,
        "description": "Doze mode alarm bypasses, internal audio loopback DRM blocks, and Android virtual keyboard service restarts."
    }
],
  problems: [
    {
        "id": "battery-drains-quickly",
        "title": "Battery drains quickly",
        "category": "battery-charging",
        "categoryName": "Battery and Charging",
        "severity": "medium",
        "symptom": "Phone battery drops significantly faster than normal during light usage or screen-off standby.",
        "causes": [
            "Rogue background application wake-locks",
            "Weak cellular signal causing RF amplifier max power",
            "High display brightness or 120Hz refresh rate",
            "Aged lithium-ion battery with degraded chemical capacity"
        ],
        "relatedGuide": "/phone-battery-drain.html",
        "relatedGuideTitle": "Why Your Phone Battery Drains Quickly (Guide)",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Check your Android Battery Usage breakdown in Settings. Does a single third-party app account for excessive consumption (over 20%)?",
                "options": [
                    {
                        "text": "Yes, a specific app (social media, game, or utility) is dominating battery usage",
                        "next": "step-app-fix"
                    },
                    {
                        "text": "No, usage is dominated by 'Screen', 'Android System', or 'Mobile Network Standby'",
                        "next": "step-system-check"
                    },
                    {
                        "text": "The phone is over 2-3 years old and drains quickly regardless of usage",
                        "next": "step-health-check"
                    }
                ]
            },
            {
                "id": "step-app-fix",
                "title": "Restrict Rogue Background Activity",
                "instruction": "Go to Settings > Apps > [Selected App] > Battery. Change the setting from 'Unrestricted' or 'Optimized' to 'Restricted'. This prevents the app from holding CPU wakelocks while your screen is off.",
                "oemNotes": {
                    "samsung": "In Samsung One UI: Settings > Battery > Background usage limits > Add app to 'Deep sleeping apps'.",
                    "xiaomi": "In Xiaomi HyperOS / MIUI: Settings > Apps > Manage apps > Battery saver > Select 'Restrict background activity'.",
                    "pixel": "In Google Pixel: Settings > Battery > Battery usage > Tap app > Choose 'Restricted'."
                },
                "test": "Lock the phone for 2 hours and check if idle drainage drops below 1-2% per hour.",
                "expectedResult": "Idle battery consumption drops significantly."
            },
            {
                "id": "step-system-check",
                "title": "Audit RF Power and Display Refresh Rates",
                "instruction": "1. If 'Mobile Network Standby' is high, your phone is in an area with weak 5G/4G coverage where the antenna ramps up to maximum transmission wattage. Switch Preferred Network Type to LTE/4G temporarily.\n2. Enable Adaptive Brightness and set screen timeout to 30 or 60 seconds.",
                "test": "Enable Dark Theme (OLED screens turn off black pixels) and test drainage for one full charge cycle.",
                "expectedResult": "Screen-on time improves by 15% to 30%."
            },
            {
                "id": "step-health-check",
                "title": "Assess Chemical Degradation",
                "instruction": "Lithium-ion cells lose capacity after 500-800 charge cycles. Check Settings > Battery (Android 14+) or use manufacturer diagnostics to inspect cycle count and state of health.",
                "crossLink": {
                    "url": "/android-battery-health.html",
                    "text": "Read our comprehensive Android Battery Health guide"
                },
                "test": "If health is below 75% or cycle count exceeds 700, hardware replacement is the authentic permanent fix.",
                "expectedResult": "Identified whether problem is software wakelock or physical battery aging."
            }
        ]
    },
    {
        "id": "overheating-while-charging",
        "title": "Overheating while charging",
        "category": "battery-charging",
        "categoryName": "Battery and Charging",
        "severity": "high",
        "symptom": "The back glass or frame becomes uncomfortably hot (exceeding 43\u00b0C / 110\u00b0F) while plugged into the charger.",
        "causes": [
            "Thick protective cases trapping heat",
            "Simultaneous gaming or GPS navigation while fast charging",
            "Faulty third-party charger with excessive AC ripple",
            "Thermal throttling protection kicking in"
        ],
        "relatedGuide": "/usb-c-charging.html",
        "relatedGuideTitle": "USB-C Charging Explained: Power, Cables and Chargers",
        "safetyWarning": "CRITICAL SAFETY: If the phone smells of sweet chemicals, the back cover is bulging or lifting, or the screen is flexing outward, STOP CHARGING IMMEDIATELY. Power off the phone, place it on a non-flammable surface, and seek professional battery replacement.",
        "steps": [
            {
                "id": "step-1",
                "question": "Is the phone inside a thick protective case, or are you actively gaming or streaming while charging?",
                "options": [
                    {
                        "text": "Yes, phone has a case or was running intensive apps while plugged in",
                        "next": "step-case-load"
                    },
                    {
                        "text": "No, phone is idle with no case, but still gets scorching hot",
                        "next": "step-charger-check"
                    }
                ]
            },
            {
                "id": "step-case-load",
                "title": "Remove Case and Disable Boost Charging During High Ambient Heat",
                "instruction": "1. Remove thick TPU or silicone cases during fast charging; modern 45W-120W chargers generate heat that must dissipate through the phone's frame.\n2. Avoid running high-FPS games or GPS navigation while plugged in.",
                "oemNotes": {
                    "samsung": "Settings > Battery > Charging settings > Turn off 'Fast charging' temporarily to test baseline temperature.",
                    "pixel": "Settings > Battery > Adaptive Charging (slows charge overnight to preserve thermals).",
                    "xiaomi": "Settings > Battery > Additional features > Turn off 'Boost charging speed'."
                },
                "test": "Charge the device from 20% to 80% without case on a flat, hard surface (avoid beds/couches).",
                "expectedResult": "Phone remains comfortably warm (35-39\u00b0C) rather than scalding hot."
            },
            {
                "id": "step-charger-check",
                "title": "Verify Charger Compliance and Cable Rating",
                "instruction": "Cheap, uncertified third-party power adapters often deliver dirty DC voltage with high AC ripple current, forcing internal battery protection PMICs into high thermal stress.",
                "test": "Test with an official USB-PD PPS compliant charger and certified 5A cable from the original phone manufacturer.",
                "expectedResult": "Operating temperatures stabilize within safe limits."
            }
        ]
    },
    {
        "id": "slow-charging",
        "title": "Slow charging",
        "category": "battery-charging",
        "categoryName": "Battery and Charging",
        "severity": "medium",
        "symptom": "Phone takes 3 to 6+ hours to charge, or screen displays 'Charging slowly' instead of 'Fast Charging' or 'Super Fast Charging'.",
        "causes": [
            "Incompatible charging protocol (USB-PD vs QC vs proprietary VOOC/HyperCharge)",
            "Damaged cable wire with high internal resistance",
            "Lint or pocket debris inside USB-C port",
            "Dirty contacts"
        ],
        "relatedGuide": "/usb-c-charging.html",
        "relatedGuideTitle": "USB-C Charging Explained (Guide)",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does the charging message on your lockscreen say 'Charging slowly' or does the cable feel loose inside the USB-C port?",
                "options": [
                    {
                        "text": "The cable feels loose or doesn't click securely into place",
                        "next": "step-clean-port"
                    },
                    {
                        "text": "The cable clicks securely, but charging is still sluggish",
                        "next": "step-charger-protocol"
                    }
                ]
            },
            {
                "id": "step-clean-port",
                "title": "Inspect and Safely Clean USB-C Port",
                "instruction": "Pocket lint commonly packs into the bottom of the USB-C port, preventing the connector pins from making full contact with CC (Configuration Channel) negotiation pins.\n1. Turn off your phone.\n2. Use a wooden or non-conductive plastic toothpick with a bright flashlight. (NEVER use metal needles, safety pins, or paperclips as metal shorts electrical contacts and damages delicate pins).\n3. Gently sweep the floor of the port around the center tongue.\n4. Use gentle compressed air held at an angle to blow out loose lint.",
                "test": "Re-insert your USB-C cable until you hear or feel a mechanical click.",
                "expectedResult": "Cable fits flush with the frame and charging speed recovers immediately."
            },
            {
                "id": "step-charger-protocol",
                "title": "Verify Charging Protocol and Cable Wattage Rating",
                "instruction": "Not all USB chargers and cables deliver high wattage. Google Pixel and modern Samsung devices require USB Power Delivery (USB-PD) with PPS (Programmable Power Supply). Old USB-A to USB-C cables limit current to 5V/1.5A\u20132.4A (7.5W\u201312W max).",
                "oemNotes": {
                    "samsung": "Requires a 25W or 45W USB-PD PPS charger. Standard Quick Charge 3.0 blocks Super Fast Charging.",
                    "xiaomi": "Requires proprietary Xiaomi charger and 6A marked cable for 67W/120W Turbo Charge.",
                    "pixel": "Requires USB-PD 3.0 PPS charger for full 30W/45W charging."
                },
                "test": "Test with a certified USB-C to USB-C PD cable and charger rated for at least 30W.",
                "expectedResult": "Lockscreen updates to 'Fast Charging' or 'Super Fast Charging'."
            }
        ]
    },
    {
        "id": "phone-wont-charge",
        "title": "Phone won't charge",
        "category": "battery-charging",
        "categoryName": "Battery and Charging",
        "severity": "high",
        "symptom": "No charging indicator, LED light, or vibration when plugged into any known working wall outlet.",
        "causes": [
            "Deep battery discharge (voltage below cutoff threshold)",
            "Moisture detected lock in USB port",
            "Damaged charging brick or blown fuse",
            "Faulty sub-board or flex cable connection"
        ],
        "relatedGuide": "/usb-c-charging.html",
        "relatedGuideTitle": "USB-C Power & Cable Diagnostics",
        "safetyWarning": "If phone received water exposure, do NOT charge until 100% dry. Charging with wet contacts causes electrolytic corrosion.",
        "steps": [
            {
                "id": "step-1",
                "question": "Has the phone had any water exposure recently, or does the screen show a droplet moisture icon?",
                "options": [
                    {
                        "text": "Yes, moisture was detected or phone got wet",
                        "next": "step-moisture-safe"
                    },
                    {
                        "text": "No water exposure, phone just completely died and won't respond",
                        "next": "step-hard-reset-charge"
                    }
                ]
            },
            {
                "id": "step-moisture-safe",
                "title": "Clear Moisture Sensor Safely",
                "instruction": "1. Do NOT plug in the charging cable while moisture is detected. The charging circuit locks itself to prevent pin shorting.\n2. Gently tap the phone against your hand with the charging port facing down to dislodge water.\n3. Place the phone in an upright position in a well-ventilated area with a room-temperature fan blowing directly into the port for 2\u20134 hours. Do not use heat guns or hair dryers.",
                "test": "After 4 hours of air drying, plug in an official charger.",
                "expectedResult": "Moisture warning clears and normal charging resumes."
            },
            {
                "id": "step-hard-reset-charge",
                "title": "Perform a Forced PMIC Power Cycle & Trickle Charge",
                "instruction": "When a battery drains to extreme 0%, the battery management IC enters low-voltage sleep. Connect to a standard 5V wall adapter (not ultra-fast charging), leave it plugged in for 30 minutes without touching, then press and hold Volume Down + Power for 15-20 seconds to force a hardware reset.",
                "test": "Observe screen for battery icon or vibration.",
                "expectedResult": "Battery icon appears and charging restarts."
            }
        ]
    },
    {
        "id": "charging-disconnects-repeatedly",
        "title": "Charging disconnects repeatedly",
        "category": "battery-charging",
        "categoryName": "Battery and Charging",
        "severity": "medium",
        "symptom": "Phone continuously chimes, vibrates, and toggles between charging and discharging every few seconds.",
        "causes": [
            "Compacted pocket lint preventing plug seating",
            "Frayed internal cable wire near strain relief",
            "Loose or worn female USB-C port retention springs"
        ],
        "relatedGuide": "/usb-c-charging.html",
        "relatedGuideTitle": "USB-C Cable & Connection Troubleshooting",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does the disconnection happen when you gently wiggle the cable near the phone port, or near the wall adapter?",
                "options": [
                    {
                        "text": "When wiggling near the phone connector",
                        "next": "step-port-retention"
                    },
                    {
                        "text": "When flexing the cable along its length or near the charger",
                        "next": "step-replace-cable"
                    }
                ]
            },
            {
                "id": "step-port-retention",
                "title": "Clean Lint & Test Connector Retention",
                "instruction": "In 85% of cases, repeated disconnects are caused by lint preventing the locking springs from clicking past the USB-C detents. Use a wooden toothpick or non-conductive plastic pick (NEVER metal pins or needles) to gently scrape out compacted dust. If clean and still wobbles, the port's internal spring clips are worn.",
                "test": "Try a brand-new cable. If a new cable also disconnects when lightly touched, the USB-C daughterboard needs replacement.",
                "expectedResult": "Connection stays solid without intermittent drops."
            },
            {
                "id": "step-replace-cable",
                "title": "Replace Fatigued Cable Wire",
                "instruction": "Copper conductors inside the flexible cable neck break from repeated bending, causing intermittent open circuits during charging.",
                "test": "Swap with a quality braided USB-IF certified cable.",
                "expectedResult": "Disconnect chimes stop completely."
            }
        ]
    },
    {
        "id": "fast-charging-not-working",
        "title": "Fast charging not working",
        "category": "battery-charging",
        "categoryName": "Battery and Charging",
        "severity": "low",
        "symptom": "Device only charges at standard 5W/10W speeds; fast charging setting ignored.",
        "causes": [
            "Software toggle for Fast Charging turned off in Settings",
            "Thermal throttling restricting current",
            "USB cable lacking CC communication pin",
            "Incompatible charger protocol"
        ],
        "relatedGuide": "/usb-c-charging.html",
        "relatedGuideTitle": "USB-C Standards and Fast Charging",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Did fast charging stop working after a recent update, or when using a new third-party charging adapter or cable?",
                "options": [
                    {
                        "text": "Using a new or different charger or cable",
                        "next": "step-protocol-match"
                    },
                    {
                        "text": "Using the original charger, but fast charging no longer triggers",
                        "next": "step-toggle-check"
                    }
                ]
            },
            {
                "id": "step-protocol-match",
                "title": "Verify Charger Protocol Handshake",
                "instruction": "Fast charging requires bidirectional digital negotiation between phone PMIC and charger over CC lines. Many chargers only support Quick Charge (QC), while modern Android devices require USB Power Delivery (USB-PD) with PPS (Programmable Power Supply).",
                "test": "Test with an official OEM charger or USB-IF certified USB-PD 3.0 PPS charger.",
                "expectedResult": "Fast charging indicator appears on lockscreen."
            },
            {
                "id": "step-toggle-check",
                "title": "Check Software Fast Charging Toggles",
                "instruction": "Ensure fast charging hasn't been disabled in Android system settings.",
                "oemNotes": {
                    "samsung": "Go to Settings > Battery > Charging settings. Verify 'Fast charging' and 'Fast wireless charging' are turned ON.",
                    "pixel": "Settings > Battery > Adaptive Charging. If phone is plugged in overnight, it deliberately holds fast charging until shortly before your morning alarm.",
                    "xiaomi": "Settings > Battery > Additional features > Enable 'Boost charging speed'."
                },
                "test": "Plug in when device temperature is cool (below 30\u00b0C).",
                "expectedResult": "Fast charging negotiates properly."
            }
        ]
    },
    {
        "id": "battery-percentage-jumps-or-freezes",
        "title": "Battery percentage jumps or freezes",
        "category": "battery-charging",
        "categoryName": "Battery and Charging",
        "severity": "medium",
        "symptom": "Battery level suddenly drops from 40% to 5% in seconds, or stays stuck at a fixed number for hours then dies.",
        "causes": [
            "Degraded battery cell with high internal impedance (IR)",
            "Cell voltage sag under sudden CPU/GPU current load",
            "Active battery protection caps (80% / 85% limit)",
            "System battery stats calculation desync"
        ],
        "relatedGuide": "/android-battery-health.html",
        "relatedGuideTitle": "Android Battery Health & Capacity Guide",
        "safetyWarning": "Avoid deep discharge myths: Draining lithium-ion batteries to 0% repeatedly degrades cathode chemistry and will not fix a worn-out cell.",
        "steps": [
            {
                "id": "step-1",
                "question": "Does the percentage suddenly plunge when opening a heavy app (camera, 3D game, flashlight), or does it stop charging at exactly 80% or 85%?",
                "options": [
                    {
                        "text": "It stops charging at 80% or 85% every time",
                        "next": "step-protect-battery-toggle"
                    },
                    {
                        "text": "It plunges suddenly from 20-40% down to 0-5% under load",
                        "next": "step-impedance-health"
                    }
                ]
            },
            {
                "id": "step-protect-battery-toggle",
                "title": "Check Battery Protection Settings",
                "instruction": "Modern Android devices feature 'Protect Battery' / 'Battery Health Management' settings designed to limit maximum charging voltage to 80% or 85% to extend cell longevity. This is an intentional feature, not a bug.",
                "oemNotes": {
                    "samsung": "Settings > Battery > Battery protection. Check if set to 'Basic', 'Adaptive', or 'Maximum' (caps at 80%).",
                    "pixel": "Settings > Battery > Adaptive Charging / Battery Health Protection.",
                    "xiaomi": "Settings > Battery > Optimized charging / Battery protection."
                },
                "test": "Disable the protection cap temporarily and verify if device charges to 100%.",
                "expectedResult": "Phone charges smoothly to 100% when cap is turned off."
            },
            {
                "id": "step-impedance-health",
                "title": "Diagnose Cell Voltage Sag & Degradation",
                "instruction": "As lithium-ion batteries age chemically (typically beyond 500 charge cycles), their internal resistance (impedance) climbs. When the phone demands a burst of current (e.g. taking a flash photo or launching a game), high impedance causes instantaneous cell voltage sag below the cutoff threshold (3.4V), triggering emergency low-battery shutdown.\n1. Check cycle count in Settings > Battery (Android 14+) or OEM diagnostics.\n2. Boot into Safe Mode to confirm no rogue software load is spiking CPU current.\n3. If health is degraded below 75%, professional cell replacement is required.",
                "crossLink": {
                    "url": "/android-battery-health.html",
                    "text": "Learn more in our Android Battery Health guide"
                },
                "test": "Recharge to 50% and avoid launching high-current apps; observe if discharge curve stabilizes.",
                "expectedResult": "Identified whether voltage sag is caused by degraded chemical cell or background load."
            }
        ]
    },
    {
        "id": "overnight-battery-drain",
        "title": "Overnight battery drain",
        "category": "battery-charging",
        "categoryName": "Battery and Charging",
        "severity": "medium",
        "symptom": "Losing 15% to 30%+ battery while sleeping with screen completely off and phone idle.",
        "causes": [
            "Aggressive background sync loops",
            "Weak cell tower searching (RF power ramp)",
            "Unrestricted location beacons / Bluetooth scanning",
            "Always-On Display (AOD) consuming power"
        ],
        "relatedGuide": "/phone-battery-drain.html",
        "relatedGuideTitle": "How to Fix Android Overnight Battery Drain",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does overnight battery drain still happen if you put the phone in Airplane Mode before sleeping?",
                "options": [
                    {
                        "text": "In Airplane Mode, drain drops to only 1-2%",
                        "next": "step-network-sync-drain"
                    },
                    {
                        "text": "Even in Airplane Mode, battery drops 15-25% overnight",
                        "next": "step-local-wakelock-drain"
                    }
                ]
            },
            {
                "id": "step-network-sync-drain",
                "title": "Fix Network Standby and Background Sync",
                "instruction": "Because drain drops in Airplane Mode, your battery is being consumed by RF transmission (poor cellular signal where radio amplifier boosts output wattage) or background cloud sync (Google Photos, WhatsApp backups, email sync).\n1. Schedule cloud backups only while charging.\n2. In Settings > Location > Location services > Turn OFF 'Wi-Fi scanning' and 'Bluetooth scanning'.",
                "test": "Check drain over one night with background scanning disabled.",
                "expectedResult": "Overnight drain decreases to under 3-5%."
            },
            {
                "id": "step-local-wakelock-drain",
                "title": "Audit Local App Wakelocks and Always-On Display",
                "instruction": "A local background process or display feature is preventing the CPU from entering Android 'Deep Sleep' (Doze mode).\n1. Schedule Always-On Display to turn off between 11 PM and 7 AM.\n2. Check Settings > Battery > Battery usage since last full charge to identify apps running background CPU audio or pedometer tracking.",
                "test": "Enable Bedtime Mode or Sleep Routine.",
                "expectedResult": "CPU enters deep sleep mode overnight."
            }
        ]
    },
    {
        "id": "wifi-connected-without-internet",
        "title": "Wi-Fi connected without internet",
        "category": "wifi-network",
        "categoryName": "Wi-Fi, Mobile Data and Network",
        "severity": "medium",
        "symptom": "Wi-Fi icon shows an exclamation mark (!), lockscreen says 'Connected, no internet', and websites refuse to load.",
        "causes": [
            "Captive portal authentication pending",
            "Upstream ISP outage or router DHCP lease expiration",
            "Private DNS resolver failure or expired AdGuard/NextDNS profile",
            "Static IP address conflict"
        ],
        "relatedGuide": "/wifi-no-internet.html",
        "relatedGuideTitle": "Wi-Fi Connected but No Internet: Diagnostic Steps",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Can other devices (laptops, other phones) access the internet on the same Wi-Fi network?",
                "options": [
                    {
                        "text": "Yes, other devices browse fine; only this Android phone is stuck",
                        "next": "step-private-dns"
                    },
                    {
                        "text": "No, every device on the Wi-Fi has lost internet access",
                        "next": "step-router-isp"
                    }
                ]
            },
            {
                "id": "step-private-dns",
                "title": "Disable or Reconfigure Private DNS",
                "instruction": "Android has a built-in 'Private DNS' feature (DNS-over-TLS). If the configured DNS hostname is unreachable, Android blocks all internet connectivity.\n1. Go to Settings > Network & Internet (or Connections) > More connection settings > Private DNS.\n2. Change it from a custom hostname to 'Off' or 'Automatic'.\n3. Forget the Wi-Fi network and reconnect.",
                "test": "Open Chrome and visit a standard site.",
                "expectedResult": "Websites load immediately and exclamation mark disappears."
            },
            {
                "id": "step-router-isp",
                "title": "Inspect Upstream Router and DHCP Leases",
                "instruction": "Since all devices are affected, the issue is on the local network or ISP gateway.\n1. Power cycle the router by unplugging power for 30 seconds.\n2. Verify the WAN/Internet LED indicator on the router is solid green/white.\n3. If red/orange, contact your broadband service provider.",
                "crossLink": {
                    "url": "/wifi-no-internet.html",
                    "text": "See our complete Wi-Fi No Internet guide"
                },
                "test": "Test connectivity once the router finishes booting (2 minutes).",
                "expectedResult": "Broadband link restores to all devices."
            }
        ]
    },
    {
        "id": "wifi-disconnects",
        "title": "Wi-Fi disconnects repeatedly",
        "category": "wifi-network",
        "categoryName": "Wi-Fi, Mobile Data and Network",
        "severity": "medium",
        "symptom": "Wi-Fi repeatedly drops and switches to mobile data every few minutes, especially when walking around the home.",
        "causes": [
            "Aggressive Wi-Fi to Mobile handoff setting",
            "Dual-band 2.4GHz/5GHz band steering flapping",
            "MAC address randomization causing DHCP lease renegotiation",
            "Power saving mode sleeping network card"
        ],
        "relatedGuide": "/wifi-slow.html",
        "relatedGuideTitle": "Why Wi-Fi Drops and How to Troubleshoot It",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does the disconnect occur primarily when moving between rooms, or even while sitting next to the router?",
                "options": [
                    {
                        "text": "While moving around between rooms (roaming issue)",
                        "next": "step-band-steering"
                    },
                    {
                        "text": "Even when stationary right next to the router",
                        "next": "step-mac-randomization"
                    }
                ]
            },
            {
                "id": "step-band-steering",
                "title": "Separate 2.4GHz and 5GHz SSIDs or Disable Aggressive Handover",
                "instruction": "When routers broadcast the same SSID for both 2.4GHz and 5GHz, Android phones repeatedly flap between bands as signal strength fluctuates.\n1. In router settings, split network names into 'Home_2.4G' and 'Home_5G'. Connect stationary devices to 5G.\n2. In Android Settings > Developer options, verify 'Wi-Fi non-persistent MAC' and 'Aggressive Wi-Fi to cellular handover' are not enabled.",
                "oemNotes": {
                    "samsung": "Settings > Connections > Wi-Fi > Tap 3 dots > Intelligent Wi-Fi > Turn off 'Switch to mobile data'.",
                    "pixel": "Settings > Network & internet > Adaptive connectivity > Turn off temporarily to test.",
                    "xiaomi": "Settings > Wi-Fi > Wi-Fi assistant > Turn off 'Select best networks automatically'."
                },
                "test": "Walk between rooms while streaming audio.",
                "expectedResult": "Wi-Fi maintains solid lock without dropping."
            },
            {
                "id": "step-mac-randomization",
                "title": "Switch Wi-Fi MAC Address to Phone MAC",
                "instruction": "Android randomizes your MAC address by default for privacy. Some home routers with security tables repeatedly de-authenticate randomized MACs.\n1. Go to Settings > Wi-Fi > Tap the gear icon next to your network.\n2. Tap 'Advanced' or 'Privacy'.\n3. Change from 'Use randomized MAC' to 'Use device MAC'.",
                "test": "Reconnect and monitor connection stability for 30 minutes.",
                "expectedResult": "DHCP lease stabilizes and disconnection stops."
            }
        ]
    },
    {
        "id": "mobile-data-not-working",
        "title": "Mobile data not working",
        "category": "wifi-network",
        "categoryName": "Wi-Fi, Mobile Data and Network",
        "severity": "high",
        "symptom": "Cellular signal bars are visible, but mobile internet icons (LTE, 4G, 5G) are absent and web traffic fails.",
        "causes": [
            "Misconfigured or deleted APN (Access Point Name)",
            "Data limit threshold exceeded in system settings",
            "SIM carrier provisioning deactivation",
            "Stuck cellular radio state"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Can you still make standard phone calls and receive SMS messages over cellular?",
                "options": [
                    {
                        "text": "Yes, calls and SMS work fine, but mobile internet won't connect",
                        "next": "step-apn-reset"
                    },
                    {
                        "text": "No, both phone calls and internet are completely down",
                        "next": "step-sim-carrier"
                    }
                ]
            },
            {
                "id": "step-apn-reset",
                "title": "Reset Access Point Names (APN) to Default",
                "instruction": "APN profiles contain the carrier gateway addresses required to route cellular IP packets.\n1. Go to Settings > Network & Internet > Mobile Network > Access Point Names.\n2. Tap the 3 dots in the top right corner.\n3. Tap 'Reset to default'.\n4. Toggle Airplane Mode ON for 10 seconds, then OFF.",
                "oemNotes": {
                    "samsung": "Settings > Connections > Mobile networks > Access Point Names > 3 dots > Reset to default.",
                    "pixel": "Settings > Network & internet > SIMs > [Your SIM] > Access Point Names > 3 dots > Reset to default."
                },
                "test": "Disable Wi-Fi and observe if 4G or 5G data icon appears next to signal bars.",
                "expectedResult": "Cellular data connection establishes."
            },
            {
                "id": "step-sim-carrier",
                "title": "Check Carrier Plan and Data Cap Limits",
                "instruction": "1. Verify in Settings > Network & Internet > Data Warning & Limit that 'Set data limit' has not automatically disabled mobile data.\n2. Log into your cellular provider's app or call customer support to confirm your plan is active with positive balance.",
                "test": "Check carrier account balance and toggle Mobile Data switch in Quick Settings.",
                "expectedResult": "Account provisioning verified."
            }
        ]
    },
    {
        "id": "4g-5g-unavailable",
        "title": "4G or 5G unavailable",
        "category": "wifi-network",
        "categoryName": "Wi-Fi, Mobile Data and Network",
        "severity": "medium",
        "symptom": "Phone remains stuck on 2G (EDGE) or 3G (HSPA+) and never connects to available high-speed 4G LTE or 5G networks.",
        "causes": [
            "Preferred network type restricted to 2G/3G in settings",
            "Outdated SIM card lacking 5G SA/NSA provisioning",
            "Power saving mode restricting 5G radio bands",
            "Local cell tower antenna maintenance"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Is your phone in Battery Saver mode, or is the Preferred Network Type set to 3G/2G?",
                "options": [
                    {
                        "text": "Battery Saver is ON or network type is uncertain",
                        "next": "step-network-mode"
                    },
                    {
                        "text": "Network type is set to 5G/LTE, but device still connects to 2G/3G",
                        "next": "step-sim-5g-upgrade"
                    }
                ]
            },
            {
                "id": "step-network-mode",
                "title": "Set Preferred Network Type to 5G / LTE Auto",
                "instruction": "1. Turn OFF Battery Saver (Android automatically disables 5G radios to conserve power).\n2. Go to Settings > Network & Internet > SIMs > Preferred network type.\n3. Select '5G (recommended)' or '5G/LTE/3G/2G (auto connect)'.",
                "oemNotes": {
                    "samsung": "Settings > Connections > Mobile networks > Network mode > Select '5G/LTE/3G/2G (auto connect)'.",
                    "pixel": "Settings > Network & internet > SIMs > Preferred network type > 5G."
                },
                "test": "Toggle Airplane Mode for 5 seconds.",
                "expectedResult": "Phone negotiates high-speed 4G LTE or 5G carrier link."
            },
            {
                "id": "step-sim-5g-upgrade",
                "title": "Audit SIM Card Revision and 5G Standalone Provisioning",
                "instruction": "SIM cards older than 4-5 years often lack the USIM profile required to authenticate on 5G Standalone (5G SA) networks. Contact your carrier to request an updated 5G SIM card or convert to an eSIM profile.",
                "test": "Insert SIM into another known 5G device in the same location to compare network band reception.",
                "expectedResult": "Identified whether SIM upgrade or carrier profile update is required."
            }
        ]
    },
    {
        "id": "hotspot-not-working",
        "title": "Hotspot not working",
        "category": "wifi-network",
        "categoryName": "Wi-Fi, Mobile Data and Network",
        "severity": "medium",
        "symptom": "Other devices cannot find the phone's Wi-Fi hotspot, or connect but get 'No internet access'.",
        "causes": [
            "Carrier carrier-provisioned entitlement block (DUN APN type)",
            "5GHz broadcast band incompatibility with older receiving devices",
            "WPA3 security incompatibility",
            "Data Saver mode active"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Can client devices see the hotspot name in their Wi-Fi list, or does the hotspot fail to broadcast completely?",
                "options": [
                    {
                        "text": "Client devices cannot see the hotspot network at all",
                        "next": "step-band-broadcast"
                    },
                    {
                        "text": "Client devices connect successfully, but have no internet access",
                        "next": "step-hotspot-data-saver"
                    }
                ]
            },
            {
                "id": "step-band-broadcast",
                "title": "Switch Hotspot Broadcast Band to 2.4 GHz and WPA2",
                "instruction": "Many older laptops, smart TVs, and IoT gadgets cannot see 5 GHz Wi-Fi hotspots or lack WPA3 handshake support.\n1. Go to Settings > Network & Internet > Hotspot & tethering > Wi-Fi hotspot.\n2. Under 'AP Band', change from '5.0 GHz' to '2.4 GHz'.\n3. Under 'Security', select 'WPA2-Personal'.",
                "test": "Scan for Wi-Fi on the connecting device.",
                "expectedResult": "Hotspot SSID appears in the Wi-Fi list and connects."
            },
            {
                "id": "step-hotspot-data-saver",
                "title": "Turn Off Android Data Saver Mode",
                "instruction": "Android's system Data Saver feature automatically blocks cellular packet forwarding across tethered interfaces.\n1. Go to Settings > Network & Internet > Data Saver > Turn OFF.\n2. Verify that your cellular plan permits mobile hotspot tethering (some unlimited plans require a separate hotspot add-on).",
                "test": "Connect a laptop and load a webpage.",
                "expectedResult": "Internet routing flows smoothly through the hotspot."
            }
        ]
    },
    {
        "id": "slow-mobile-internet",
        "title": "Slow mobile internet",
        "category": "wifi-network",
        "categoryName": "Wi-Fi, Mobile Data and Network",
        "severity": "low",
        "symptom": "Speed test results show under 1-2 Mbps, media buffers constantly, and downloads stall on cellular data.",
        "causes": [
            "Carrier deprioritization during peak cell tower congestion",
            "High-frequency band signal attenuation indoors",
            "Outdated network operator carrier profile",
            "Heavy background cloud syncing"
        ],
        "relatedGuide": "/internet-speed-needed.html",
        "relatedGuideTitle": "How Much Internet Speed Do You Actually Need?",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Is speed slow everywhere, or only inside large concrete/steel buildings and during peak evening hours?",
                "options": [
                    {
                        "text": "Only inside buildings or during peak evening hours",
                        "next": "step-band-lte-toggle"
                    },
                    {
                        "text": "Slow everywhere, even outdoors in strong signal areas",
                        "next": "step-carrier-services-reset"
                    }
                ]
            },
            {
                "id": "step-band-lte-toggle",
                "title": "Force LTE / 4G to Bypass Weak 5G Carrier Aggregation",
                "instruction": "In fringe coverage areas, phones cling to weak mid-band 5G signals with high packet loss instead of robust 4G LTE carrier aggregation.\n1. Go to Settings > Network & Internet > SIMs > Preferred network type.\n2. Switch to 'LTE / 4G' temporarily.\n3. Test download speed.",
                "test": "Run a speed test on fast.com.",
                "expectedResult": "Throughput and latency improve substantially on LTE."
            },
            {
                "id": "step-carrier-services-reset",
                "title": "Update Carrier Services & Reset Network Settings",
                "instruction": "1. Open Google Play Store and update 'Carrier Services'.\n2. Go to Settings > System > Reset options > Reset Mobile Network Settings.\n3. Restart phone.",
                "test": "Test mobile internet speed outdoors.",
                "expectedResult": "Clean carrier handshake restores maximum cellular throughput."
            }
        ]
    },
    {
        "id": "sim-not-detected",
        "title": "SIM not detected",
        "category": "wifi-network",
        "categoryName": "Wi-Fi, Mobile Data and Network",
        "severity": "high",
        "symptom": "Lockscreen displays 'No SIM card inserted' or 'Insert SIM' despite a valid physical SIM card installed in the tray.",
        "causes": [
            "Oxidized or dirty gold SIM contacts",
            "Misaligned SIM card in tray",
            "Bent internal SIM slot contact pins",
            "Corrupted baseband modem firmware"
        ],
        "relatedGuide": null,
        "safetyWarning": "SAFETY: Never force oversized SIM cards or cut nano-SIMs with scissors. Never poke needles into the SIM slot interior.",
        "steps": [
            {
                "id": "step-1",
                "question": "Did this happen immediately after dropping the phone or ejecting the tray, or suddenly out of nowhere?",
                "options": [
                    {
                        "text": "After dropping the phone or reseating the tray",
                        "next": "step-realign-sim"
                    },
                    {
                        "text": "Suddenly out of nowhere on a phone that hadn't been touched",
                        "next": "step-clean-contacts"
                    }
                ]
            },
            {
                "id": "step-realign-sim",
                "title": "Eject and Re-align SIM in Card Tray",
                "instruction": "1. Power off the phone.\n2. Insert an official SIM ejector tool straight into the ejector pinhole (never use needles, safety pins, or metal clips).\n3. Inspect the SIM card orientation; the angled notch must match the tray cutout perfectly.\n4. Ensure the card sits completely flush in the tray without bulging.",
                "test": "Push tray back gently until flush and power on.",
                "expectedResult": "Phone detects SIM and displays carrier name."
            },
            {
                "id": "step-clean-contacts",
                "title": "Clean Gold Contact Pads",
                "instruction": "Microscopic skin oils and pocket humidity create an insulating oxidation layer over gold SIM contact pads.\n1. Remove the SIM card.\n2. Gently wipe the gold contacts with a clean microfiber cloth slightly dampened with 99% isopropyl alcohol or a pencil eraser.\n3. Allow to dry completely (30 seconds) before reinserting.",
                "test": "Power on device and verify signal bars.",
                "expectedResult": "Baseband modem authenticates SIM card."
            }
        ]
    },
    {
        "id": "no-service-or-emergency-calls-only",
        "title": "No service or emergency calls only",
        "category": "wifi-network",
        "categoryName": "Wi-Fi, Mobile Data and Network",
        "severity": "high",
        "symptom": "Phone shows empty signal triangle, an 'X' icon, or displays 'Emergency calls only'.",
        "causes": [
            "Temporary cellular tower outage",
            "Baseband radio modem software freeze",
            "Corrupted network settings",
            "Blacklisted IMEI or unpaid account suspend"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Open the Phone dialer and enter *#06#. Does your device display a valid 15-digit IMEI number?",
                "options": [
                    {
                        "text": "Yes, valid IMEI number(s) appear on screen",
                        "next": "step-radio-power-cycle"
                    },
                    {
                        "text": "No, IMEI is blank, null, or shows 'Unknown'",
                        "next": "step-baseband-hardware"
                    }
                ]
            },
            {
                "id": "step-radio-power-cycle",
                "title": "Re-register on Network Operator Manually",
                "instruction": "1. Go to Settings > Network & Internet > SIMs > Automatically select network > Turn OFF.\n2. Wait 30 seconds for available carrier networks to scan.\n3. Select your carrier manually from the list.\n4. Once registered, switch 'Automatically select network' back ON.",
                "test": "Check if signal bars reappear and status updates to your carrier name.",
                "expectedResult": "Cellular registration successful."
            },
            {
                "id": "step-baseband-hardware",
                "title": "Baseband Modem Diagnostic Escalation",
                "instruction": "If the IMEI displays as blank or 000000, the phone's baseband modem firmware or motherboard radio IC has failed or was corrupted during a failed system flash.",
                "test": "Verify in Settings > About phone > Baseband version.",
                "expectedResult": "If Baseband says 'Unknown', motherboard service is required."
            }
        ]
    },
    {
        "id": "storage-full",
        "title": "Storage full",
        "category": "storage-performance",
        "categoryName": "Storage and Performance",
        "severity": "high",
        "symptom": "System notification warns 'Storage space running out', camera refuses to save photos, and apps crash due to zero cache headroom.",
        "causes": [
            "Un-emptied 30-day Trash bins in Gallery and Files",
            "Accumulated app caches (TikTok, Instagram, Telegram)",
            "Hidden offline media downloads (Spotify, YouTube, Netflix)",
            "WhatsApp automatic media backup accumulation"
        ],
        "relatedGuide": "/android-storage-full.html",
        "relatedGuideTitle": "Android Storage Full Even After Deleting Files (Guide)",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Did you recently delete files or photos, but your available storage space remained unchanged?",
                "options": [
                    {
                        "text": "Yes, deleted files but free space did not increase",
                        "next": "step-empty-trash"
                    },
                    {
                        "text": "No, storage is filled by 'Apps' and 'System' categories",
                        "next": "step-app-cache-audit"
                    }
                ]
            },
            {
                "id": "step-empty-trash",
                "title": "Empty 30-Day Trash / Recycle Bins Across All File Managers",
                "instruction": "Android does not immediately delete photos or files; it moves them to hidden Trash folders where they remain for 30 days.\n1. Open Google Photos / Gallery > Collections / Library > Trash > Tap 'Empty Trash'.\n2. Open Google Files (or Samsung My Files) > Trash > Select All > Delete permanently.",
                "crossLink": {
                    "url": "/android-storage-full.html",
                    "text": "Read our complete guide to clearing hidden Android storage"
                },
                "test": "Check Settings > Storage.",
                "expectedResult": "Reclaimed 5GB to 30GB+ of immediate flash storage."
            },
            {
                "id": "step-app-cache-audit",
                "title": "Clear Bloated App Caches & Offline Downloads",
                "instruction": "Social apps and streaming tools cache gigabytes of video previews.\n1. Go to Settings > Apps > Sort by Size.\n2. Tap heavy apps (e.g. Chrome, TikTok, Instagram) > Storage & Cache > Tap 'Clear Cache' (do NOT tap 'Clear Storage/Data' unless you want to log out).\n3. Open Spotify / Netflix / YouTube and delete watched offline videos.",
                "test": "Confirm free storage exceeds 15% of device capacity.",
                "expectedResult": "System warning dismisses and camera functions resume."
            }
        ]
    },
    {
        "id": "slow-phone",
        "title": "Slow phone",
        "category": "storage-performance",
        "categoryName": "Storage and Performance",
        "severity": "medium",
        "symptom": "Apps open sluggishly, typing lags noticeably behind keystrokes, and the home screen redraws frequently.",
        "causes": [
            "Internal UFS/eMMC flash storage filled above 85% capacity",
            "Aggressive third-party 'cleaner' or 'RAM booster' apps",
            "Thermal throttling due to high ambient temperature",
            "Excessive window animation duration scales"
        ],
        "relatedGuide": "/android-make-phone-faster.html",
        "relatedGuideTitle": "How to Make an Android Phone Faster (Guide)",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Is your internal storage currently more than 85% full, or are you running third-party 'RAM Booster' apps?",
                "options": [
                    {
                        "text": "Internal storage is nearly full (over 85-90%)",
                        "next": "step-storage-headroom"
                    },
                    {
                        "text": "Storage has plenty of free space, but the UI still stutters",
                        "next": "step-animation-cleaners"
                    }
                ]
            },
            {
                "id": "step-storage-headroom",
                "title": "Free Up Storage to Restore Flash Memory Controller Speed",
                "instruction": "Flash storage (eMMC and UFS) relies on SLC write caching and background garbage collection (TRIM). When free space drops below 10-15%, write operations slow down by up to 10x, causing systemic UI freezes across the entire operating system.",
                "crossLink": {
                    "url": "/android-make-phone-faster.html",
                    "text": "See full performance diagnosis in our Android speed guide"
                },
                "test": "Free up at least 15% of total internal capacity and restart.",
                "expectedResult": "Touch responsiveness and app launch speeds immediately recover."
            },
            {
                "id": "step-animation-cleaners",
                "title": "Uninstall Cleaner Apps & Optimize Window Animation Scale",
                "instruction": "1. Uninstall all third-party 'RAM Cleaner', 'Battery Doctor', and 'Speed Booster' apps. Android manages Linux memory automatically; cleaner apps force constant CPU cycles re-launching killed processes.\n2. Go to Settings > Developer options > Set 'Window animation scale', 'Transition animation scale', and 'Animator duration scale' to 0.5x.",
                "test": "Navigate between home screen and apps.",
                "expectedResult": "Animations feel snappier and memory thrashing stops."
            }
        ]
    },
    {
        "id": "apps-freezing",
        "title": "Apps freezing",
        "category": "storage-performance",
        "categoryName": "Storage and Performance",
        "severity": "medium",
        "symptom": "Screen freezes mid-scroll, followed by an Android system prompt: 'App isn't responding. Close app or Wait?'.",
        "causes": [
            "Corrupted Android System WebView runtime",
            "Memory pressure causing OOM (Out Of Memory) killer thrashing",
            "App compatibility conflict with current Android OS version",
            "Corrupted local app database (SQLite)"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does the freeze happen in multiple different apps (including web browsers), or in only one specific app?",
                "options": [
                    {
                        "text": "Freezes across multiple different apps and web views",
                        "next": "step-update-webview"
                    },
                    {
                        "text": "Only freezes in one specific application",
                        "next": "step-app-storage-reset"
                    }
                ]
            },
            {
                "id": "step-update-webview",
                "title": "Update Android System WebView & Chrome",
                "instruction": "Almost all Android apps render web content, login forms, and social feeds using 'Android System WebView'. A bug in an outdated WebView version will cause multiple unrelated apps to freeze simultaneously.\n1. Open Google Play Store > Search for 'Android System WebView'.\n2. Tap 'Update'.\n3. Also update 'Google Chrome'.\n4. Restart your phone.",
                "test": "Open previously freezing apps.",
                "expectedResult": "ANR ('Application Not Responding') dialogs cease completely."
            },
            {
                "id": "step-app-storage-reset",
                "title": "Clear App Cache & Data for Misbehaving App",
                "instruction": "1. Go to Settings > Apps > [Problem App] > Storage & cache.\n2. Tap 'Clear Cache'.\n3. If freezing persists, tap 'Clear Storage / Data' (note: requires re-login).\n4. Check Play Store to ensure the app is on its latest build.",
                "test": "Launch the app and perform the previously freezing action.",
                "expectedResult": "App runs smoothly with fresh local database."
            }
        ]
    },
    {
        "id": "random-restarts",
        "title": "Random restarts",
        "category": "storage-performance",
        "categoryName": "Storage and Performance",
        "severity": "high",
        "symptom": "Phone abruptly turns black and reboots to the manufacturer logo while in your pocket or during normal use.",
        "causes": [
            "Corrupted system cache partition",
            "Loose physical battery connector or degraded power cell",
            "Stuck physical power button",
            "Rogue app causing Linux kernel panic"
        ],
        "relatedGuide": "/android-make-phone-faster.html",
        "relatedGuideTitle": "Android System Stability & Performance",
        "safetyWarning": "CRITICAL BACKUP WARNING: If random restarts are increasing in frequency, perform an immediate backup to Google Drive or PC before the device enters an unrecoverable state.",
        "steps": [
            {
                "id": "step-1",
                "question": "Does the phone restart only when handled / physically tapped, or while running third-party software?",
                "options": [
                    {
                        "text": "Restarts while running apps or idle (software kernel issue)",
                        "next": "step-safe-mode-test"
                    },
                    {
                        "text": "Restarts when physically tapped or power button feels mushy/stuck",
                        "next": "step-hardware-power-button"
                    }
                ]
            },
            {
                "id": "step-safe-mode-test",
                "title": "Boot Into Android Safe Mode",
                "instruction": "Safe Mode boots Android with all third-party apps disabled to isolate software crashes.\n1. Press and hold Power button until power menu appears.\n2. Touch and hold the 'Power off' or 'Restart' icon on screen until 'Reboot to Safe Mode' prompt appears. Tap OK.\n3. Use the phone in Safe Mode for 2\u20134 hours.",
                "test": "If no restarts occur in Safe Mode, a recently installed third-party app is triggering kernel panics. Uninstall recent apps.",
                "expectedResult": "Isolates whether crash is caused by third-party software or firmware."
            },
            {
                "id": "step-hardware-power-button",
                "title": "Inspect Physical Power Button & Battery Health",
                "instruction": "1. Inspect the physical power key. If lint or sticky liquid holds the switch partially closed, the device repeatedly triggers the 10-second hardware force-restart.\n2. Rapidly click the power button 10-15 times to free any mechanical binding.",
                "test": "Observe device behavior over 24 hours.",
                "expectedResult": "Hardware switch moves freely without unintended reboots."
            }
        ]
    },
    {
        "id": "unusually-high-ram-usage",
        "title": "Unusually high RAM usage",
        "category": "storage-performance",
        "categoryName": "Storage and Performance",
        "severity": "low",
        "symptom": "System memory shows 85-95% utilized at all times; background apps close immediately when switching away.",
        "causes": [
            "Misunderstanding of Linux memory architecture (free RAM is wasted RAM)",
            "Virtual RAM / RAM Plus / Memory Extension thrashing flash storage",
            "Memory leak in an active background service"
        ],
        "relatedGuide": "/choose-ram.html",
        "relatedGuideTitle": "How Much RAM Do You Really Need?",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Are you using 'Virtual RAM' / 'RAM Plus' / 'Memory Extension' in your phone's settings?",
                "options": [
                    {
                        "text": "Yes, Virtual RAM / Memory Extension is enabled",
                        "next": "step-disable-virtual-ram"
                    },
                    {
                        "text": "No, but background apps close instantly when switching away",
                        "next": "step-audit-running-services"
                    }
                ]
            },
            {
                "id": "step-disable-virtual-ram",
                "title": "Disable or Reduce Virtual RAM (RAM Plus / Memory Extension)",
                "instruction": "Virtual RAM uses internal flash storage (UFS) as a swap file (zRAM swap). Flash memory is 10x\u201320x slower than real LPDDR5 RAM. When the OS swaps memory pages to flash, the CPU waits on I/O, causing stutter and premature app reloads.",
                "oemNotes": {
                    "samsung": "Settings > Device care > Memory > RAM Plus > Turn OFF (requires restart).",
                    "xiaomi": "Settings > Additional settings > Memory extension > Turn OFF.",
                    "pixel": "Google Pixel does not expose virtual RAM toggles to avoid flash storage wear."
                },
                "test": "Restart device and switch between 5 daily apps.",
                "expectedResult": "Apps stay cached in fast physical RAM without swapping lag."
            },
            {
                "id": "step-audit-running-services",
                "title": "Inspect Running Services in Developer Options",
                "instruction": "1. Go to Settings > Developer options > Running services.\n2. Inspect real-time RAM usage by app and process.\n3. Identify any third-party app utilizing more than 500MB of RAM continuously and configure it to Restricted background usage.",
                "test": "Check memory pressure indicator.",
                "expectedResult": "Memory distribution normalizes."
            }
        ]
    },
    {
        "id": "gaming-lag",
        "title": "Gaming lag",
        "category": "storage-performance",
        "categoryName": "Storage and Performance",
        "severity": "medium",
        "symptom": "Frame rates plunge dramatically from 60/90 FPS down to 20 FPS after 10-15 minutes of 3D gaming (thermal throttling).",
        "causes": [
            "SoC thermal throttling to prevent chip damage",
            "OEM Game Optimization Service (GOS) throttling GPU clock speeds",
            "Background downloads or screen recorders consuming GPU cycles",
            "Playing while fast-charging"
        ],
        "relatedGuide": "/choose-ram.html",
        "relatedGuideTitle": "Hardware Demands & Performance Explained",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does the frame drop happen immediately when starting the game, or only after 10-15 minutes of play as the phone gets warm?",
                "options": [
                    {
                        "text": "After 10-15 minutes of play as the phone warms up (thermal throttling)",
                        "next": "step-thermal-throttle-fix"
                    },
                    {
                        "text": "Immediately upon starting the game (settings/driver bottleneck)",
                        "next": "step-game-settings-tuning"
                    }
                ]
            },
            {
                "id": "step-thermal-throttle-fix",
                "title": "Mitigate Thermal Throttling & Bypass Charging",
                "instruction": "When the CPU/GPU junction temperature reaches ~42-45\u00b0C, Android kernel governor cuts clock speeds in half.\n1. Remove phone case during prolonged gaming sessions.\n2. Never game while fast-charging. If your phone supports 'Bypass Charging' / 'Pause USB Power Delivery', enable it in Game Booster so current powers the motherboard directly without heating the battery.",
                "oemNotes": {
                    "samsung": "Open Game Booster app > Settings > Turn ON 'Pause USB Power Delivery'.",
                    "xiaomi": "Open Game Turbo > Performance settings > Balance thermals.",
                    "oneplus": "Games app > Game Toolkit > Balanced mode."
                },
                "test": "Play a 30-minute match and observe FPS consistency.",
                "expectedResult": "Sustained frame rates without sudden throttling drops."
            },
            {
                "id": "step-game-settings-tuning",
                "title": "Tune In-Game Graphic Presets and Shader Cache",
                "instruction": "1. Lower graphic details from 'Ultra' to 'Smooth/High', but keep Frame Rate at 'Extreme/90fps'. Lower resolution shaders reduce GPU load drastically.\n2. Ensure device has at least 10GB free internal storage for game asset caches.",
                "test": "Monitor gameplay responsiveness.",
                "expectedResult": "Smooth 60/90 FPS with stable frame times."
            }
        ]
    },
    {
        "id": "apps-crashing",
        "title": "Apps crashing",
        "category": "apps-notifications",
        "categoryName": "Apps and Notifications",
        "severity": "medium",
        "symptom": "Apps close immediately back to the home screen upon launch or after interacting with specific buttons.",
        "causes": [
            "Corrupted local app cache data",
            "Outdated Google Play Services or Android System WebView",
            "Missing runtime permissions for storage or media",
            "OS architecture incompatibility (64-bit only Android 14/15)"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does the app crash immediately upon tapping its icon, or only when opening specific photos, links, or camera features inside it?",
                "options": [
                    {
                        "text": "Immediately upon launch before rendering any screen",
                        "next": "step-clear-app-cache"
                    },
                    {
                        "text": "Only when trying to attach photos, use camera, or open web links",
                        "next": "step-runtime-permission-check"
                    }
                ]
            },
            {
                "id": "step-clear-app-cache",
                "title": "Clear App Cache and Verify Play Services",
                "instruction": "1. Go to Settings > Apps > [Crashing App] > Storage & cache > Tap 'Clear Cache'.\n2. Open Google Play Store > Search for 'Google Play services' > Ensure it is updated to latest build.\n3. Restart your phone.",
                "test": "Launch the crashing app.",
                "expectedResult": "App opens cleanly without closing."
            },
            {
                "id": "step-runtime-permission-check",
                "title": "Grant Required Runtime Permissions",
                "instruction": "Under Android Scoped Storage and runtime permission architecture, an app will crash with a SecurityException if it tries to read photos or camera without user consent.\n1. Go to Settings > Apps > [Crashing App] > Permissions.\n2. Ensure Photos and Videos, Camera, and Microphone are set to 'Allow'.",
                "crossLink": {
                    "url": "/android-permissions.html",
                    "text": "See our complete guide on Android App Permissions"
                },
                "test": "Trigger the photo attachment or camera action again.",
                "expectedResult": "Feature loads without security exception crash."
            }
        ]
    },
    {
        "id": "apps-wont-install",
        "title": "Apps won't install",
        "category": "apps-notifications",
        "categoryName": "Apps and Notifications",
        "severity": "medium",
        "symptom": "Google Play Store displays error code 910, 'Can't install app', or 'Your device isn't compatible with this version'.",
        "causes": [
            "Google Play Store download cache corruption",
            "Insufficient free internal storage for APK decompression",
            "64-bit OS requirement dropping support for 32-bit legacy APKs",
            "Pending Google Play Protect certification"
        ],
        "relatedGuide": "/android-storage.html",
        "relatedGuideTitle": "Android Storage & Package Management",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does Play Store display 'Can't install app' with a download failure, or 'Your device isn't compatible with this version'?",
                "options": [
                    {
                        "text": "Displays 'Can't install app' or download error code",
                        "next": "step-play-store-cache-wipe"
                    },
                    {
                        "text": "Displays 'Your device isn't compatible with this version'",
                        "next": "step-compatibility-check"
                    }
                ]
            },
            {
                "id": "step-play-store-cache-wipe",
                "title": "Clear Google Play Store & Download Manager Cache",
                "instruction": "1. Go to Settings > Apps > Google Play Store > Storage & cache > Tap 'Clear Storage / Data'. (This is completely safe; it re-syncs with your Google account).\n2. In Settings > Apps > Tap 3 dots > Show system > Tap 'Download Manager' > Clear Cache.\n3. Restart phone.",
                "test": "Retry installing the app in Play Store.",
                "expectedResult": "Download starts and APK completes installation."
            },
            {
                "id": "step-compatibility-check",
                "title": "Verify OS Version & 64-Bit Chipset Requirements",
                "instruction": "Modern Android versions (Android 14+) drop 32-bit CPU library support. If an app was compiled exclusively for older 32-bit ARMv7 architectures or requires Android API level 34+, Google Play blocks installation by design.",
                "test": "Check app requirements on web Play Store.",
                "expectedResult": "Identified hardware/software architecture requirements."
            }
        ]
    },
    {
        "id": "apps-wont-update",
        "title": "Apps won't update",
        "category": "apps-notifications",
        "categoryName": "Apps and Notifications",
        "severity": "low",
        "symptom": "App updates remain stuck at 'Pending' or progress circle spins endlessly without byte progress.",
        "causes": [
            "Play Store waiting for Wi-Fi download setting",
            "Multiple background app updates queued concurrently",
            "Corrupted package installer cache",
            "Google account payment authorization flag"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Is the update status stuck on 'Pending', or does it download to 100% and fail during the 'Installing...' phase?",
                "options": [
                    {
                        "text": "Stuck indefinitely on 'Pending' (queue deadlock)",
                        "next": "step-clear-update-queue"
                    },
                    {
                        "text": "Downloads to 100% but installation phase aborts",
                        "next": "step-package-installer-cache"
                    }
                ]
            },
            {
                "id": "step-clear-update-queue",
                "title": "Cancel Pending Queue & Check Network Download Preference",
                "instruction": "1. Open Google Play Store > Tap Profile Icon > Manage apps & device > Tap 'See recent updates'.\n2. Tap 'Cancel all' to break stuck concurrent download locks.\n3. Tap Profile Icon > Settings > Network preferences > App download preference > Choose 'Over any network'.\n4. Update apps individually one by one.",
                "test": "Tap update on a single small app.",
                "expectedResult": "Update begins downloading immediately."
            },
            {
                "id": "step-package-installer-cache",
                "title": "Clear Package Installer Cache",
                "instruction": "1. Go to Settings > Apps > Tap 3 dots (or system filter) > Show system apps.\n2. Find 'Package Installer' > Storage & cache > Clear Cache.\n3. Ensure phone has at least 3GB free internal flash storage for delta patching.",
                "test": "Retry app update.",
                "expectedResult": "Package installer writes update and completes."
            }
        ]
    },
    {
        "id": "delayed-notifications",
        "title": "Delayed notifications",
        "category": "apps-notifications",
        "categoryName": "Apps and Notifications",
        "severity": "medium",
        "symptom": "WhatsApp, Gmail, or banking push notifications only arrive minutes or hours late when you physically turn on the screen.",
        "causes": [
            "Aggressive OEM background killer closing FCM (Firebase Cloud Messaging) sockets",
            "Android Doze Mode putting network radio to sleep",
            "Battery Saver mode restricting background data"
        ],
        "relatedGuide": "/android-permissions.html",
        "relatedGuideTitle": "Android Permissions & Background Controls",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Do notifications arrive the instant you unlock your phone, but stay silent while the screen is off?",
                "options": [
                    {
                        "text": "Yes, alerts flood in as soon as I unlock the device",
                        "next": "step-unrestricted-battery"
                    },
                    {
                        "text": "No, notifications don't show up even after opening the app",
                        "next": "step-notification-channel-audit"
                    }
                ]
            },
            {
                "id": "step-unrestricted-battery",
                "title": "Set App Battery Usage to 'Unrestricted'",
                "instruction": "OEM proprietary power managers kill background push listening sockets to save battery, violating standard Android Doze maintenance windows.\n1. Go to Settings > Apps > [Messaging App] > Battery.\n2. Select 'Unrestricted'.\n3. Also go to Mobile Data & Wi-Fi > Turn ON 'Unrestricted data usage'.",
                "oemNotes": {
                    "samsung": "Settings > Battery > Background usage limits > Ensure app is NOT in 'Sleeping' or 'Deep sleeping' lists.",
                    "oneplus": "Settings > Battery > More settings > Optimize battery use > Select app > 'Don't optimize'.",
                    "xiaomi": "Settings > Apps > Manage apps > [App] > Autostart > Turn ON, and Battery saver > Select 'No restrictions'."
                },
                "test": "Send a test message from another device while phone is locked for 15 minutes.",
                "expectedResult": "Chime and notification badge appear immediately."
            },
            {
                "id": "step-notification-channel-audit",
                "title": "Check Android Notification Channels",
                "instruction": "Android categorizes notifications into separate 'Channels'. A channel may be accidentally set to 'Silent' or 'Delivered quietly'.\n1. Go to Settings > Apps > [App] > Notifications.\n2. Tap each notification category and ensure 'Alerting' / 'Pop on screen' is enabled.",
                "test": "Trigger notification event.",
                "expectedResult": "Full sound and heads-up banner display."
            }
        ]
    },
    {
        "id": "missing-notifications",
        "title": "Missing notifications",
        "category": "apps-notifications",
        "categoryName": "Apps and Notifications",
        "severity": "medium",
        "symptom": "No notifications, sound, or badges appear at all; you only see new messages when manually opening the app.",
        "causes": [
            "App notification permission revoked (Android 13+ POST_NOTIFICATIONS)",
            "Active Do Not Disturb (DND) mode or Focus routine",
            "Full-screen gaming mode hiding alert banners"
        ],
        "relatedGuide": "/android-permissions.html",
        "relatedGuideTitle": "Android Notification Permissions",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Is Do Not Disturb (DND) active, or was this app installed on Android 13 or newer?",
                "options": [
                    {
                        "text": "Do Not Disturb or Bedtime mode might be enabled",
                        "next": "step-dnd-rules"
                    },
                    {
                        "text": "App was recently installed or permissions were reset",
                        "next": "step-post-notifications-permission"
                    }
                ]
            },
            {
                "id": "step-dnd-rules",
                "title": "Audit Do Not Disturb & Bedtime Schedules",
                "instruction": "1. Swipe down Quick Settings twice and ensure 'Do Not Disturb' is turned OFF.\n2. Go to Settings > Sound & Vibration > Do Not Disturb > Schedules > Verify no automatic calendar or bedtime rules are suppressing alerts.\n3. Under 'Apps that can interrupt DND', add critical messaging or security apps.",
                "test": "Turn off DND and send a test alert.",
                "expectedResult": "Audio and visual banners restore immediately."
            },
            {
                "id": "step-post-notifications-permission",
                "title": "Enable Android 13+ Notification Permission",
                "instruction": "Starting in Android 13, all apps require explicit POST_NOTIFICATIONS permission. If declined on first launch, Android completely mutes the app.\n1. Go to Settings > Apps > [Selected App] > Notifications.\n2. Toggle 'All [App] notifications' to ON.",
                "test": "Check notification history.",
                "expectedResult": "Notifications appear on status bar and lockscreen."
            }
        ]
    },
    {
        "id": "apps-stuck-loading",
        "title": "Apps stuck loading",
        "category": "apps-notifications",
        "categoryName": "Apps and Notifications",
        "severity": "low",
        "symptom": "App opens to splash screen and displays endless spinning circle without loading content.",
        "causes": [
            "Stale authentication tokens in local app cache",
            "Corrupted HTTP disk cache",
            "AdBlocker / VPN intercepting API endpoints",
            "Incompatible TLS certificate on legacy Android"
        ],
        "relatedGuide": "/browser-cache.html",
        "relatedGuideTitle": "Browser & App Cache Explained",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Are you using an active VPN, AdBlocker (AdGuard, Blokada), or custom DNS profile?",
                "options": [
                    {
                        "text": "Yes, a VPN or AdBlocker is running on the device",
                        "next": "step-vpn-bypass"
                    },
                    {
                        "text": "No VPN running; app is stuck on standard home internet",
                        "next": "step-wipe-app-data"
                    }
                ]
            },
            {
                "id": "step-vpn-bypass",
                "title": "Temporarily Disconnect VPN or AdBlocker",
                "instruction": "Many financial, banking, and streaming apps block connections if they detect a local TUN VPN interface or blocked analytics telemetry endpoints.\n1. Turn off active VPN apps.\n2. In Settings > Network & Internet > VPN > Ensure 'Always-on VPN' is off.",
                "test": "Re-open the stuck app.",
                "expectedResult": "App authenticates and loads feed."
            },
            {
                "id": "step-wipe-app-data",
                "title": "Clear App Cache and Force Restart",
                "instruction": "1. Go to Settings > Apps > [Stuck App] > Tap 'Force Stop'.\n2. Tap Storage & cache > Tap 'Clear Cache'.\n3. Restart app.",
                "test": "Launch app fresh.",
                "expectedResult": "Stuck loading spinner resolves."
            }
        ]
    },
    {
        "id": "bluetooth-wont-turn-on",
        "title": "Bluetooth won't turn on",
        "category": "bluetooth-audio",
        "categoryName": "Bluetooth, Audio and Accessories",
        "severity": "medium",
        "symptom": "Bluetooth toggle switch immediately flips back off, or stays in a dimmed grayed-out state.",
        "causes": [
            "Bluetooth system service crash",
            "Airplane mode stuck state",
            "Corrupted Bluetooth cache and paired devices table"
        ],
        "relatedGuide": "/windows-bluetooth.html",
        "relatedGuideTitle": "Bluetooth Pairing & Audio Diagnosis",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Is the Bluetooth toggle button grayed out / unclickable, or does it turn on briefly and flip back off?",
                "options": [
                    {
                        "text": "Grayed out / frozen toggle switch",
                        "next": "step-clear-bluetooth-cache"
                    },
                    {
                        "text": "Turns on briefly then immediately shuts off",
                        "next": "step-reset-network-bt"
                    }
                ]
            },
            {
                "id": "step-clear-bluetooth-cache",
                "title": "Clear Bluetooth System Service Cache",
                "instruction": "1. Go to Settings > Apps > Tap 3 dots (or filters) > Show system apps.\n2. Scroll down and tap 'Bluetooth' (or 'Bluetooth Legacy').\n3. Tap 'Force Stop'.\n4. Tap Storage & cache > Tap 'Clear Cache' and 'Clear Storage'.\n5. Restart phone.",
                "test": "Toggle Bluetooth switch in Quick Settings.",
                "expectedResult": "Bluetooth radio turns on normally."
            },
            {
                "id": "step-reset-network-bt",
                "title": "Reset Wi-Fi, Mobile & Bluetooth Settings",
                "instruction": "Corrupted paired device keys (link keys) in the Bluetooth stack can deadlock the radio controller.\n1. Go to Settings > System > Reset options.\n2. Tap 'Reset Mobile Network Settings' / 'Reset Wi-Fi & Bluetooth'. (This removes saved Wi-Fi passwords and paired Bluetooth accessories; does NOT erase personal photos or apps).",
                "test": "Pair accessory fresh.",
                "expectedResult": "Bluetooth hardware resets and connects."
            }
        ]
    },
    {
        "id": "earbuds-wont-connect",
        "title": "Earbuds won't connect",
        "category": "bluetooth-audio",
        "categoryName": "Bluetooth, Audio and Accessories",
        "severity": "medium",
        "symptom": "Wireless earbuds fail to connect, or connect for 2 seconds and disconnect immediately.",
        "causes": [
            "Earbuds already connected to a secondary paired device (laptop, tablet)",
            "Desynced TWS (True Wireless Stereo) master/slave earbud pairing",
            "Stale pairing keys in phone Bluetooth cache"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Are the earbuds actively paired with another nearby device (computer, tablet, partner's phone)?",
                "options": [
                    {
                        "text": "Yes, earbuds were paired with a laptop or other device nearby",
                        "next": "step-disconnect-other-devices"
                    },
                    {
                        "text": "No, they only connect to this phone, but fail to handshake",
                        "next": "step-hardware-earbud-reset"
                    }
                ]
            },
            {
                "id": "step-disconnect-other-devices",
                "title": "Disconnect from Secondary Bluetooth Hosts",
                "instruction": "Unless earbuds support Bluetooth Multipoint, they will stubbornly hold their RF connection to whichever device connected first.\n1. Turn off Bluetooth on your nearby laptop, tablet, or secondary phone.\n2. Place earbuds into charging case, close lid for 10 seconds, then reopen.",
                "test": "Tap earbud name in phone's Bluetooth settings.",
                "expectedResult": "Handshake connects immediately."
            },
            {
                "id": "step-hardware-earbud-reset",
                "title": "Factory Reset Earbuds & Unpair on Phone",
                "instruction": "1. On phone: Settings > Bluetooth > Tap gear icon next to earbuds > Tap 'Forget' / 'Unpair'.\n2. Place both earbuds in their charging case. Press and hold the case pairing button for 10-15 seconds until the LED flashes red/white (hardware factory reset).\n3. Re-pair fresh with your phone.",
                "test": "Open case and verify pop-up or pair in Bluetooth settings.",
                "expectedResult": "Earbuds re-sync and audio streams reliably."
            }
        ]
    },
    {
        "id": "connected-bluetooth-without-sound",
        "title": "Connected Bluetooth without sound",
        "category": "bluetooth-audio",
        "categoryName": "Bluetooth, Audio and Accessories",
        "severity": "low",
        "symptom": "Earbuds show 'Connected', but audio continues playing through phone speaker or plays silently.",
        "causes": [
            "Media audio profile toggle turned off in Bluetooth settings",
            "Bluetooth Absolute Volume desync between phone and headphone firmware",
            "Audio output routing directed to another stream"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does audio play out of the phone's bottom speaker, or does it play with zero volume anywhere?",
                "options": [
                    {
                        "text": "Audio plays out of the phone speaker instead of earbuds",
                        "next": "step-media-audio-profile"
                    },
                    {
                        "text": "Audio plays silently with no sound anywhere",
                        "next": "step-disable-absolute-volume"
                    }
                ]
            },
            {
                "id": "step-media-audio-profile",
                "title": "Enable Media Audio Profile in Bluetooth Device Settings",
                "instruction": "Android separates Bluetooth profiles for Calls (HFP) and Media (A2DP). If Media is unchecked, sound bypasses headphones.\n1. Go to Settings > Bluetooth.\n2. Tap the gear icon next to your connected device.\n3. Ensure the toggle for 'Media audio' is switched ON.",
                "test": "Play music in Spotify or YouTube.",
                "expectedResult": "Sound routes immediately into earbuds."
            },
            {
                "id": "step-disable-absolute-volume",
                "title": "Disable Bluetooth Absolute Volume in Developer Options",
                "instruction": "Bluetooth Absolute Volume syncs phone volume with accessory hardware volume. When firmware desyncs, volume gets stuck at 0%.\n1. Go to Settings > Developer options.\n2. Scroll down and turn ON 'Disable absolute volume'.\n3. Disconnect and reconnect your Bluetooth headset.",
                "test": "Adjust volume on both phone and physical headphone buttons.",
                "expectedResult": "Full volume control restores."
            }
        ]
    },
    {
        "id": "microphone-not-working",
        "title": "Microphone not working",
        "category": "bluetooth-audio",
        "categoryName": "Bluetooth, Audio and Accessories",
        "severity": "high",
        "symptom": "Callers cannot hear you, voice notes record silence, and Google Assistant fails to detect your voice.",
        "causes": [
            "Android global microphone access toggle switched OFF",
            "Lint blocking bottom primary microphone pinhole",
            "Third-party call recording app monopolizing audio HAL"
        ],
        "relatedGuide": "/android-permissions.html",
        "relatedGuideTitle": "Android Audio & Privacy Permissions",
        "safetyWarning": "Never poke needles or metal pins deeply into the microphone hole, which punctures the water-resistant acoustic mesh.",
        "steps": [
            {
                "id": "step-1",
                "question": "Does the microphone work on Speakerphone, or is it silent across all modes and voice recorder apps?",
                "options": [
                    {
                        "text": "Works on Speakerphone, but callers can't hear me in normal handset mode",
                        "next": "step-clean-mic-pinhole"
                    },
                    {
                        "text": "Completely silent across all apps including voice recorder",
                        "next": "step-global-mic-toggle"
                    }
                ]
            },
            {
                "id": "step-clean-mic-pinhole",
                "title": "Clean Bottom Microphone Pinhole Safely",
                "instruction": "Smartphones use two separate microphones: a primary mic at the bottom for handset calls, and a secondary mic at the top for speakerphone noise-cancellation.\n1. Inspect the tiny pinhole on the bottom edge near the USB-C port.\n2. Use a soft, dry toothbrush to gently sweep away packed lint. (NEVER insert metal pins, sewing needles, or toothpicks into mic holes, as this punctures the acoustic waterproof membrane).",
                "test": "Make a standard phone call in handset mode.",
                "expectedResult": "Caller hears voice with clarity."
            },
            {
                "id": "step-global-mic-toggle",
                "title": "Enable Global Microphone Access Switch",
                "instruction": "Starting in Android 12, Android introduced a global master kill-switch for camera and microphone sensors.\n1. Swipe down Quick Settings twice.\n2. Ensure 'Mic access' is turned ON (green/active).\n3. Go to Settings > Security & privacy > Privacy > Ensure 'Microphone access' is allowed.",
                "test": "Open Voice Recorder app and record a 5-second sample.",
                "expectedResult": "Audio waveform animates and voice playback works."
            }
        ]
    },
    {
        "id": "speaker-volume-too-low",
        "title": "Speaker volume too low",
        "category": "bluetooth-audio",
        "categoryName": "Bluetooth, Audio and Accessories",
        "severity": "low",
        "symptom": "Phone loudspeaker sounds muffled, quiet, or tinny even when volume slider is at 100%.",
        "causes": [
            "Fine metal dust, makeup powder, or earwax clogging speaker mesh",
            "Water droplet trapped in speaker cavity after rain exposure",
            "Sound equalizer set to extreme attenuation"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Did the speaker become quiet after water exposure, or has it gradually become muffled over months of use?",
                "options": [
                    {
                        "text": "After water exposure or rain",
                        "next": "step-eject-water-sound"
                    },
                    {
                        "text": "Gradually over months (dust/debris buildup)",
                        "next": "step-clean-speaker-grille"
                    }
                ]
            },
            {
                "id": "step-eject-water-sound",
                "title": "Eject Trapped Water Using Low-Frequency Audio",
                "instruction": "Surface tension holds water droplets across the micro-mesh of the speaker grille, dampening acoustic membrane movement.\n1. Open YouTube or Chrome and search for 'Speaker water eject 165Hz tone'.\n2. Play the tone at max volume for 60 seconds with the speaker grille pointed downwards.\n3. The acoustic vibration expels trapped droplets.",
                "test": "Play a normal song.",
                "expectedResult": "Full speaker volume and fidelity recover."
            },
            {
                "id": "step-clean-speaker-grille",
                "title": "Clean Speaker Grille Mesh Safely",
                "instruction": "1. Use an ultra-soft, clean toothbrush or blue adhesive putty (Blu-Tack) gently pressed against the grille.\n2. The putty lifts dirt and pocket lint out of the tiny holes without pushing it deeper.\n3. Check Settings > Sound & vibration > Sound quality and effects > Enable Dolby Atmos.",
                "test": "Test ringer volume.",
                "expectedResult": "Loud, clear speaker output."
            }
        ]
    },
    {
        "id": "touchscreen-unresponsive",
        "title": "Touchscreen unresponsive",
        "category": "display-touch",
        "categoryName": "Display and Touchscreen",
        "severity": "high",
        "symptom": "Screen displays content but ignores finger taps and swipes completely, or registers touches intermittently.",
        "causes": [
            "Low-quality thick tempered glass screen protector",
            "Moisture or oil layer on glass digitizer",
            "Android System UI crash freeze",
            "Separated digitizer flex cable after drop"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Is the phone screen completely frozen, or does it respond in some areas and ignore others?",
                "options": [
                    {
                        "text": "Completely frozen everywhere (no response at all)",
                        "next": "step-force-restart-digitizer"
                    },
                    {
                        "text": "Responds slowly, or requires hard presses through screen protector",
                        "next": "step-touch-sensitivity-setting"
                    }
                ]
            },
            {
                "id": "step-force-restart-digitizer",
                "title": "Perform a Hardware Forced Restart",
                "instruction": "If the Android touch driver or System UI thread hangs, software reboot via touchscreen is impossible.\n1. Press and hold Volume Down and Power buttons simultaneously for 10-15 seconds without letting go.\n2. Release buttons as soon as the phone vibrates and manufacturer logo appears.",
                "test": "Swipe lockscreen once reboot completes.",
                "expectedResult": "Touch responsiveness restores completely."
            },
            {
                "id": "step-touch-sensitivity-setting",
                "title": "Enable Touch Sensitivity for Screen Protectors",
                "instruction": "Thick tempered glass increases digitizer capacitance gap.\n1. Go to Settings > Display > Scroll down to 'Touch sensitivity' (or 'Increase touch sensitivity') > Turn ON.\n2. Clean the screen surface with a microfiber cloth to remove oily films.",
                "test": "Type on keyboard.",
                "expectedResult": "Light taps register accurately."
            }
        ]
    },
    {
        "id": "screen-flickering",
        "title": "Screen flickering",
        "category": "display-touch",
        "categoryName": "Display and Touchscreen",
        "severity": "medium",
        "symptom": "Display brightness pulses rapidly, or horizontal lines appear when brightness is dimmed below 20%.",
        "causes": [
            "PWM (Pulse Width Modulation) flicker at low brightness",
            "Dynamic refresh rate (LTPO 1Hz\u2013120Hz) switching bug",
            "Hardware ribbon cable micro-fracture"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does flickering happen only at very low brightness levels in a dark room, or at all brightness levels?",
                "options": [
                    {
                        "text": "Only at very low brightness levels in the dark",
                        "next": "step-extra-dim-pwm"
                    },
                    {
                        "text": "At all brightness levels or when refreshing apps",
                        "next": "step-lock-refresh-rate"
                    }
                ]
            },
            {
                "id": "step-extra-dim-pwm",
                "title": "Disable 'Extra Dim' & Enable Anti-Flicker / DC Dimming",
                "instruction": "OLED panels control dimming by strobing the screen (PWM). At low levels, this causes noticeable strobe flicker.\n1. Swipe down Quick Settings > Turn OFF 'Extra Dim'.\n2. In Settings > Display > Look for 'DC Dimming' or 'Anti-flicker mode' (available on Xiaomi and OnePlus) > Turn ON.",
                "test": "Observe screen at 15% brightness in dark room.",
                "expectedResult": "Flicker stops and backlight remains solid."
            },
            {
                "id": "step-lock-refresh-rate",
                "title": "Lock Motion Smoothness to Standard 60Hz",
                "instruction": "A bug in variable refresh rate (VRR / LTPO) governors causes screen voltage fluctuation when dynamically switching between 120Hz and 24Hz.\n1. Go to Settings > Display > Motion smoothness (or Refresh rate).\n2. Change from 'Adaptive' to 'Standard (60Hz)'.",
                "test": "Scroll through menus.",
                "expectedResult": "Display renders at constant, flicker-free refresh frequency."
            }
        ]
    },
    {
        "id": "incorrect-auto-brightness",
        "title": "Incorrect auto-brightness",
        "category": "display-touch",
        "categoryName": "Display and Touchscreen",
        "severity": "low",
        "symptom": "Screen stays blindingly bright in pitch-dark bedrooms or stays dim in direct bright sunlight.",
        "causes": [
            "Ambient light sensor obscured by opaque screen protector borders",
            "Corrupted adaptive brightness machine learning database",
            "Dirty top bezel area"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does your screen protector have black painted borders around the top speaker/camera notch?",
                "options": [
                    {
                        "text": "Yes, screen protector has black edges near top bezel",
                        "next": "step-sensor-obstruction"
                    },
                    {
                        "text": "No, screen is clear glass, but brightness adjustments are erratic",
                        "next": "step-reset-adaptive-brightness"
                    }
                ]
            },
            {
                "id": "step-sensor-obstruction",
                "title": "Inspect Ambient Light Sensor Bezel",
                "instruction": "The ambient light sensor is located under the OLED display or near the top earpiece. Screen protectors with black borders frequently shade the sensor by 80%, tricking Android into believing you are in a dark room.",
                "test": "Shine a flashlight directly onto the top bezel area. If brightness jumps up, the sensor is blocked.",
                "expectedResult": "Sensor verified; reposition or replace protector."
            },
            {
                "id": "step-reset-adaptive-brightness",
                "title": "Reset Adaptive Brightness Machine Learning Model",
                "instruction": "Android learns your brightness preferences over time via Device Health Services. If miscalibrated:\n1. Go to Settings > Apps > Tap Show system apps > 'Device Health Services'.\n2. Tap Storage & cache > Tap 'Manage space' > Tap 'Reset adaptive brightness'.\n3. Manually adjust slider in different lighting conditions for 2 days to retrain.",
                "test": "Move from indoor light to outdoor sunlight.",
                "expectedResult": "Screen adapts smoothly without abrupt jumping."
            }
        ]
    },
    {
        "id": "screen-timeout-issues",
        "title": "Screen timeout issues",
        "category": "display-touch",
        "categoryName": "Display and Touchscreen",
        "severity": "low",
        "symptom": "Display turns off after 5 seconds while reading an article, or never turns off and stays on indefinitely.",
        "causes": [
            "Screen timeout set to 15 seconds",
            "Developer options 'Stay Awake while charging' toggle active",
            "Third-party app holding a WAKE_LOCK",
            "Face detection 'Keep screen on while viewing' failing"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does the screen stay on indefinitely while charging, or does it turn off prematurely while reading?",
                "options": [
                    {
                        "text": "Stays on forever while plugged in / never sleeps",
                        "next": "step-stay-awake-toggle"
                    },
                    {
                        "text": "Turns off prematurely within seconds while reading",
                        "next": "step-screen-attention"
                    }
                ]
            },
            {
                "id": "step-stay-awake-toggle",
                "title": "Turn Off 'Stay Awake' in Developer Options",
                "instruction": "1. Go to Settings > Developer options.\n2. Find 'Stay awake (Screen will never sleep while charging)' > Turn OFF.\n3. In Settings > Display > Screen timeout > Set to 1 or 2 minutes.",
                "test": "Plug phone in and leave idle for 2 minutes.",
                "expectedResult": "Screen locks and sleeps automatically."
            },
            {
                "id": "step-screen-attention",
                "title": "Enable 'Keep Screen On While Viewing' (Screen Attention)",
                "instruction": "Modern Android uses the front camera to detect your face while reading.\n1. Go to Settings > Display > Screen timeout.\n2. Turn ON 'Keep screen on while viewing' / 'Screen attention'.",
                "oemNotes": {
                    "samsung": "Settings > Advanced features > Motions and gestures > Turn ON 'Keep screen on while viewing'.",
                    "pixel": "Settings > Display > Screen attention > Turn ON."
                },
                "test": "Read a long webpage without touching screen.",
                "expectedResult": "Screen remains illuminated while your eyes are detected."
            }
        ]
    },
    {
        "id": "accidental-pocket-touches",
        "title": "Accidental pocket touches",
        "category": "display-touch",
        "categoryName": "Display and Touchscreen",
        "severity": "low",
        "symptom": "Phone dials emergency numbers, changes tracks, or takes burst photos while stored inside your pants pocket.",
        "causes": [
            "Accidental touch protection / Pocket Mode disabled",
            "'Double tap to wake' triggered by fabric moisture",
            "Always-on fingerprint sensor scanning fabric"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Is 'Accidental Touch Protection' turned ON in your display settings?",
                "options": [
                    {
                        "text": "Not sure or turned off",
                        "next": "step-enable-pocket-mode"
                    },
                    {
                        "text": "Turned on, but pocket still wakes screen",
                        "next": "step-disable-double-tap"
                    }
                ]
            },
            {
                "id": "step-enable-pocket-mode",
                "title": "Turn On Accidental Touch Protection",
                "instruction": "Pocket mode uses the proximity sensor to disable touch inputs whenever the top of the phone is in a dark confined space.\n1. Go to Settings > Display.\n2. Scroll down and toggle 'Accidental touch protection' to ON.",
                "oemNotes": {
                    "samsung": "Settings > Display > Turn ON 'Accidental touch protection'.",
                    "xiaomi": "Settings > Lock screen > Turn ON 'Pocket mode'.",
                    "oneplus": "Settings > Home screen & Lock screen > Pocket mistouch prevention."
                },
                "test": "Cover the top bezel with your hand and tap screen.",
                "expectedResult": "Screen remains asleep or displays pocket warning."
            },
            {
                "id": "step-disable-double-tap",
                "title": "Disable 'Double Tap to Wake' & 'Lift to Wake'",
                "instruction": "Thin or moist pocket fabric conducts touch capacitance.\n1. Go to Settings > Advanced features > Motions and gestures (or Lock Screen settings).\n2. Turn OFF 'Double tap to wake' and 'Lift to wake'.",
                "test": "Carry phone in pocket during a 10-minute walk.",
                "expectedResult": "Zero accidental unlocks or pocket dials."
            }
        ]
    },
    {
        "id": "suspicious-pop-up-ads",
        "title": "Suspicious pop-up ads",
        "category": "security-privacy",
        "categoryName": "Security and Privacy",
        "severity": "high",
        "symptom": "Full-screen advertisement pop-ups hijack the screen while on your home screen or using unrelated apps.",
        "causes": [
            "Rogue sideloaded utility app abusing SYSTEM_ALERT_WINDOW (Display over other apps)",
            "Adware masquerading as invisible transparent icon",
            "Browser notification push spam"
        ],
        "relatedGuide": "/android-permissions.html",
        "relatedGuideTitle": "Android Permissions & Adware Identification",
        "safetyWarning": "Never call phone numbers or enter credit cards on pop-ups claiming 'Your phone has 13 viruses'.",
        "steps": [
            {
                "id": "step-1",
                "question": "Do the pop-up ads appear inside Google Chrome, or everywhere even on your device Home screen?",
                "options": [
                    {
                        "text": "Everywhere across the phone (system overlay adware)",
                        "next": "step-find-overlay-app"
                    },
                    {
                        "text": "Only when Google Chrome is open",
                        "next": "step-chrome-notification-spam"
                    }
                ]
            },
            {
                "id": "step-find-overlay-app",
                "title": "Identify and Revoke 'Display Over Other Apps' Permissions",
                "instruction": "Adware requires the 'Draw over other apps' privilege to display ads outside its own container.\n1. Go to Settings > Apps > Special app access > 'Display over other apps'.\n2. Look for suspicious utilities (Flashlight, PDF reader, Cleaner, File Manager, Battery Saver) or apps with a BLANK name and white icon.\n3. Revoke permission immediately, then navigate to Settings > Apps and uninstall the culprit.",
                "crossLink": {
                    "url": "/android-permissions.html",
                    "text": "Learn how overlay permissions work in our security guide"
                },
                "test": "Return to home screen and observe for 30 minutes.",
                "expectedResult": "System pop-up ads vanish permanently."
            },
            {
                "id": "step-chrome-notification-spam",
                "title": "Clear Chrome Malicious Notification Subscriptions",
                "instruction": "Rogue websites trick users into clicking 'Allow' on push notification alerts that spoof system virus warnings.\n1. Open Google Chrome > Tap 3 dots > Settings > Notifications > In-app notification settings (or Site settings > Notifications).\n2. Review 'Allowed' websites. Delete and block any unfamiliar URLs.\n3. Clear Chrome cache.",
                "test": "Observe notification shade.",
                "expectedResult": "Fake virus warning notifications stop completely."
            }
        ]
    },
    {
        "id": "unknown-apps",
        "title": "Unknown apps",
        "category": "security-privacy",
        "categoryName": "Security and Privacy",
        "severity": "high",
        "symptom": "Unfamiliar applications appear on your home screen or app drawer that you never intentionally downloaded.",
        "causes": [
            "Carrier bloatware auto-install profiles (Mobile Services Manager / DT Ignite)",
            "Third-party APK installer app silently installing payloads",
            "Malicious device administrator profile"
        ],
        "relatedGuide": "/android-permissions.html",
        "relatedGuideTitle": "Reviewing Android App Permissions",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Did the unknown apps appear immediately after a carrier SIM insertion or system update, or from a web download?",
                "options": [
                    {
                        "text": "After a carrier SIM insertion / software update (carrier bloatware)",
                        "next": "step-disable-carrier-manager"
                    },
                    {
                        "text": "From browsing or sideloaded APK (potential malware)",
                        "next": "step-device-admin-removal"
                    }
                ]
            },
            {
                "id": "step-disable-carrier-manager",
                "title": "Disable Carrier Bloatware Installers (DT Ignite / App Selector)",
                "instruction": "Carriers bundle background services that silently install sponsored games and apps.\n1. Go to Settings > Apps > Tap Show system apps.\n2. Search for 'Mobile Services Manager', 'DT Ignite', 'App Selector', or 'Carrier Hub'.\n3. Tap 'Disable' and 'Force Stop'.\n4. Uninstall any unwanted games from your home screen.",
                "test": "Check app drawer after next restart.",
                "expectedResult": "Zero unauthorized app downloads occur."
            },
            {
                "id": "step-device-admin-removal",
                "title": "Revoke Rogue Device Admin Apps and Run Play Protect",
                "instruction": "Malware protects itself from uninstallation by registering as a Device Administrator.\n1. Go to Settings > Security & privacy > More security settings > 'Device admin apps'.\n2. Deactivate any unfamiliar apps.\n3. Open Google Play Store > Tap Profile Icon > Play Protect > Tap 'Scan'.\n4. Uninstall flagged APKs in Safe Mode.",
                "test": "Verify clean scan.",
                "expectedResult": "Malicious payload removed from device storage."
            }
        ]
    },
    {
        "id": "excessive-app-permissions",
        "title": "Excessive app permissions",
        "category": "security-privacy",
        "categoryName": "Security and Privacy",
        "severity": "medium",
        "symptom": "Simple flashlight or calculator apps demanding access to your Contacts, Precise Location, and Call Logs.",
        "causes": [
            "Data harvesting SDKs embedded in free utility apps",
            "Legacy apps bypassing modern runtime permission prompts",
            "Unchecked permissions granted during setup"
        ],
        "relatedGuide": "/android-permissions.html",
        "relatedGuideTitle": "Android App Permissions: What to Review and Why",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Do you want to audit permissions across all apps at once, or restrict permissions for a specific app?",
                "options": [
                    {
                        "text": "Audit all permissions globally across the entire phone",
                        "next": "step-privacy-dashboard-audit"
                    },
                    {
                        "text": "Lock down permissions on a specific suspicious app",
                        "next": "step-individual-app-permission"
                    }
                ]
            },
            {
                "id": "step-privacy-dashboard-audit",
                "title": "Use Android Privacy Dashboard",
                "instruction": "Android includes a dedicated Privacy Dashboard showing every sensor access in the last 24 hours.\n1. Go to Settings > Security & privacy > Privacy > 'Privacy Dashboard'.\n2. Tap 'Location', 'Camera', and 'Microphone'.\n3. Tap any app that accessed sensors in the background without user interaction, and change permission to 'Allow only while using the app' or 'Don't allow'.",
                "crossLink": {
                    "url": "/android-permissions.html",
                    "text": "See our complete guide on Android App Permissions"
                },
                "test": "Verify sensor indicator dots on status bar.",
                "expectedResult": "Background sensor harvesting blocked."
            },
            {
                "id": "step-individual-app-permission",
                "title": "Enable 'Auto-Revoke Unused Permissions'",
                "instruction": "1. Go to Settings > Apps > [App Name] > Permissions.\n2. Revoke sensitive permissions (Contacts, SMS, Phone).\n3. Turn ON 'Pause app activity if unused' (Android automatically removes all permissions if you don't open the app for a few months).",
                "test": "Open app to ensure core function works without excessive scopes.",
                "expectedResult": "App functions securely with minimal privileges."
            }
        ]
    },
    {
        "id": "browser-redirects-to-unfamiliar-sites",
        "title": "Browser redirects to unfamiliar sites",
        "category": "security-privacy",
        "categoryName": "Security and Privacy",
        "severity": "medium",
        "symptom": "Clicking normal search links automatically redirects you to gambling, survey, or deceptive update portals.",
        "causes": [
            "Hijacked default search engine in Chrome settings",
            "Rogue DNS server assigned via compromised router DHCP",
            "Malicious site service workers caching redirects"
        ],
        "relatedGuide": "/browser-cache.html",
        "relatedGuideTitle": "Browser Cache & Security Diagnostics",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does the redirection happen on both Wi-Fi and Mobile Data, or ONLY on your home Wi-Fi network?",
                "options": [
                    {
                        "text": "On both Wi-Fi and Mobile Data (browser setting/cache issue)",
                        "next": "step-chrome-search-engine-reset"
                    },
                    {
                        "text": "Only when connected to home Wi-Fi (router DNS hijacking)",
                        "next": "step-router-dns-audit"
                    }
                ]
            },
            {
                "id": "step-chrome-search-engine-reset",
                "title": "Reset Chrome Search Engine and Clear Site Data",
                "instruction": "Adware scripts quietly change your default browser search engine to a tracking intermediary URL.\n1. Open Google Chrome > Tap 3 dots > Settings > 'Search engine' > Ensure 'Google' is selected.\n2. Under Settings > Privacy and security > Tap 'Clear browsing data' > Advanced > Check 'Cookies and site data' and 'Cached images and files' for All Time > Clear data.",
                "crossLink": {
                    "url": "/browser-cache.html",
                    "text": "Read our guide to clearing browser cache and data"
                },
                "test": "Search for a query in Chrome.",
                "expectedResult": "Direct Google results appear without intermediary redirects."
            },
            {
                "id": "step-router-dns-audit",
                "title": "Audit Router DNS and Enable Android Private DNS",
                "instruction": "Compromised home routers have their WAN DNS redirected to rogue resolver IPs.\n1. Enable Android Private DNS: Settings > Network & Internet > Private DNS > Enter 'dns.google' or 'one.one.one.one'.\n2. Log into your home router admin portal and verify DNS servers are set to legitimate resolvers (e.g. 8.8.8.8 or 1.1.1.1).",
                "test": "Test web browsing on home Wi-Fi.",
                "expectedResult": "Encrypted DNS-over-TLS prevents local network redirection."
            }
        ]
    },
    {
        "id": "system-update-failure",
        "title": "System update failure",
        "category": "system-updates",
        "categoryName": "Android System and Updates",
        "severity": "high",
        "symptom": "System update finishes downloading, reboots to install, then shows 'Installation problem' or 'Error' and rolls back.",
        "causes": [
            "Corrupted OTA update package in cache",
            "Insufficient internal storage for A/B seamless partition swap",
            "Root / unlocked bootloader / modified recovery partition"
        ],
        "relatedGuide": "/android-backup-reset.html",
        "relatedGuideTitle": "How to Back Up Android Before System Maintenance",
        "safetyWarning": "DATA SAFETY: Always ensure you have a verified backup before attempting major OS upgrades. See /android-backup-reset.html.",
        "steps": [
            {
                "id": "step-1",
                "question": "How much free internal storage is currently available on your device?",
                "options": [
                    {
                        "text": "Less than 10GB of free space",
                        "next": "step-free-update-space"
                    },
                    {
                        "text": "More than 15GB free, but update still throws an error",
                        "next": "step-wipe-cache-recovery"
                    }
                ]
            },
            {
                "id": "step-free-update-space",
                "title": "Free Up 10GB\u201315GB for A/B Seamless Partition Staging",
                "instruction": "Modern Android uses A/B partition systems. The phone extracts and writes the entire new operating system onto inactive partition B while you use partition A. This requires at least 8GB\u201312GB of free internal space.",
                "test": "Clear space and re-initiate update in Settings > System update.",
                "expectedResult": "OTA package extracts and installs successfully."
            },
            {
                "id": "step-wipe-cache-recovery",
                "title": "Clear System Cache Partition in Recovery Mode",
                "instruction": "Corrupted temp files from previous update attempts block verification.\n1. Power off device completely.\n2. Hold Volume Up + Power until Recovery Mode screen appears.\n3. Use volume keys to highlight 'Wipe Cache Partition' (NOT Factory Reset) and press Power to confirm.\n4. Select 'Reboot system now'.",
                "crossLink": {
                    "url": "/android-backup-reset.html",
                    "text": "Review our Android Backup Guide before performing recovery actions"
                },
                "test": "Check for system update fresh.",
                "expectedResult": "Update verifies digital signature and installs."
            }
        ]
    },
    {
        "id": "update-stuck-downloading",
        "title": "Update stuck downloading",
        "category": "system-updates",
        "categoryName": "Android System and Updates",
        "severity": "medium",
        "symptom": "Progress bar remains frozen at a specific percentage (e.g. 47%) for hours over high-speed Wi-Fi.",
        "causes": [
            "Google Play Services framework download lock",
            "Corrupted temporary OTA package chunk",
            "Power saving mode sleeping updater service"
        ],
        "relatedGuide": "/wifi-slow.html",
        "relatedGuideTitle": "Wi-Fi Stability & Download Troubleshooting",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does restarting the phone resume the download, or does it stay stuck at the exact same percentage?",
                "options": [
                    {
                        "text": "Stays frozen at the exact same percentage even after reboot",
                        "next": "step-clear-google-services-framework"
                    },
                    {
                        "text": "Download speed is just agonizingly slow",
                        "next": "step-download-speed-fix"
                    }
                ]
            },
            {
                "id": "step-clear-google-services-framework",
                "title": "Clear Google Services Framework & System Update Cache",
                "instruction": "1. Go to Settings > Apps > Tap Show system apps.\n2. Find 'Google Services Framework' > Storage & cache > Tap 'Clear Cache'.\n3. Find 'System Update' (or 'Software Update') > Clear Cache.\n4. Connect to charger and restart phone.",
                "test": "Return to Settings > System update and tap 'Check for update'.",
                "expectedResult": "Download starts fresh from 0% and completes."
            },
            {
                "id": "step-download-speed-fix",
                "title": "Verify Unmetered Wi-Fi Network Setting",
                "instruction": "If your home Wi-Fi network is marked as 'Metered' in Android settings, the OS halts background OTA downloads.\n1. Go to Settings > Network & Internet > Wi-Fi > Tap gear icon next to your network.\n2. Tap 'Advanced' > 'Network usage' > Select 'Treat as unmetered'.",
                "test": "Check download progress.",
                "expectedResult": "Download accelerates to full broadband bandwidth."
            }
        ]
    },
    {
        "id": "phone-stuck-on-boot-logo",
        "title": "Phone stuck on boot logo",
        "category": "system-updates",
        "categoryName": "Android System and Updates",
        "severity": "critical",
        "symptom": "Phone continuously reboots or stays indefinitely on the animated Android / manufacturer logo (bootloop).",
        "causes": [
            "Interrupted firmware update or corrupt system partition",
            "Incompatible software update with full internal storage",
            "Degraded physical battery unable to deliver boot voltage surge"
        ],
        "relatedGuide": "/android-backup-reset.html",
        "relatedGuideTitle": "Data Preservation and Recovery Guide",
        "safetyWarning": "CRITICAL DATA NOTICE: If Safe Mode cannot be reached, a Factory Reset from Recovery will permanently erase all local photos and files. If personal data is unbacked, consult an authorized service center.",
        "steps": [
            {
                "id": "step-1",
                "question": "Can you enter Safe Mode or Recovery Mode by holding physical button combinations?",
                "options": [
                    {
                        "text": "Yes, I can access Recovery Mode with hardware buttons",
                        "next": "step-recovery-wipe-cache"
                    },
                    {
                        "text": "No, phone reboots constantly every 5 seconds (hard bootloop)",
                        "next": "step-hard-bootloop-escalation"
                    }
                ]
            },
            {
                "id": "step-recovery-wipe-cache",
                "title": "Wipe Cache Partition in Recovery Mode",
                "instruction": "1. Connect phone via USB cable to a PC (many modern Androids require USB connection to enter recovery).\n2. Power off, then hold Volume Up + Power until Recovery appears.\n3. Select 'Wipe Cache Partition' (this preserves personal data).\n4. Select 'Reboot system now'.",
                "crossLink": {
                    "url": "/android-backup-reset.html",
                    "text": "Read our guide on backup and recovery before proceeding"
                },
                "test": "Allow 5-10 minutes for system boot initialization.",
                "expectedResult": "Device boots successfully into lockscreen."
            },
            {
                "id": "step-hard-bootloop-escalation",
                "title": "Service Center Firmware Re-flash",
                "instruction": "A continuous loop without recovery access indicates corrupted primary bootloader (U-Boot/ABOOT) partitions or failed eMMC/UFS memory controller. Authorized service tools (Samsung Smart Switch Emergency Recovery, Google Android Flash Tool) can re-flash stock factory images.",
                "test": "Connect to PC and verify if device is recognized in fastboot/download mode.",
                "expectedResult": "Stock firmware flashed or motherboard serviced."
            }
        ]
    },
    {
        "id": "system-ui-repeatedly-stopping",
        "title": "System UI repeatedly stopping",
        "category": "system-updates",
        "categoryName": "Android System and Updates",
        "severity": "high",
        "symptom": "Screen flashes black every few seconds, displaying popup: 'System UI isn't responding. Close app'.",
        "causes": [
            "Incompatible third-party home launcher or theme engine",
            "Corrupted Google app updating search overlay",
            "Zero remaining byte headroom on root partition"
        ],
        "relatedGuide": "/android-make-phone-faster.html",
        "relatedGuideTitle": "Android System UI & Stability Guide",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Did this start after installing a custom third-party launcher (Nova, Lawnchair), theme pack, or updating the Google app?",
                "options": [
                    {
                        "text": "After using a third-party launcher or theme",
                        "next": "step-reset-default-launcher"
                    },
                    {
                        "text": "Started spontaneously after a recent app update",
                        "next": "step-uninstall-google-updates"
                    }
                ]
            },
            {
                "id": "step-reset-default-launcher",
                "title": "Revert to Stock Factory Home Launcher in Safe Mode",
                "instruction": "1. Boot into Safe Mode: Hold Power > Long-press 'Power off' > Reboot to Safe Mode.\n2. In Safe Mode: Go to Settings > Apps > Default apps > 'Home app' > Select the stock OEM launcher (One UI Home, Pixel Launcher, System Launcher).\n3. Uninstall the third-party launcher causing the crash.\n4. Reboot normally.",
                "test": "Verify home screen stability.",
                "expectedResult": "System UI operates without crashing."
            },
            {
                "id": "step-uninstall-google-updates",
                "title": "Uninstall Updates to Google App & Android System WebView",
                "instruction": "The System UI relies heavily on Google app search bars and WebView libraries.\n1. Go to Settings > Apps > 'Google' > Tap 3 dots in upper corner > Tap 'Uninstall updates'.\n2. Do the same for 'Android System WebView'.\n3. Restart device.",
                "test": "Swipe notification bar down.",
                "expectedResult": "System UI crash loop stops."
            }
        ]
    },
    {
        "id": "camera-wont-open",
        "title": "Camera won't open",
        "category": "camera-photos",
        "categoryName": "Camera and Photos",
        "severity": "high",
        "symptom": "Opening Camera app displays 'Can't connect to camera', shows a pitch-black viewfinder, or crashes immediately.",
        "causes": [
            "Camera hardware resource locked by a background app (WhatsApp, Instagram, Flashlight)",
            "Corrupted Camera app storage",
            "Disconnected optical camera module flex cable"
        ],
        "relatedGuide": "/android-permissions.html",
        "relatedGuideTitle": "Android Camera Permissions",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does third-party camera use (like in WhatsApp or Instagram) work, or is the camera dead across all apps?",
                "options": [
                    {
                        "text": "Works in WhatsApp/Instagram, only stock Camera app fails",
                        "next": "step-clear-camera-app-data"
                    },
                    {
                        "text": "Fails across ALL apps with black screen (hardware resource lock)",
                        "next": "step-release-camera-lock"
                    }
                ]
            },
            {
                "id": "step-clear-camera-app-data",
                "title": "Clear Camera App Storage and Cache",
                "instruction": "1. Go to Settings > Apps > Camera.\n2. Tap 'Force Stop'.\n3. Tap Storage & cache > Tap 'Clear Storage' and 'Clear Cache' (this resets camera presets; your stored photos are NOT deleted).\n4. Relaunch Camera.",
                "test": "Open stock Camera app.",
                "expectedResult": "Viewfinder activates instantly."
            },
            {
                "id": "step-release-camera-lock",
                "title": "Release Camera Hardware Resource Lock & Check Safe Mode",
                "instruction": "Android allows only one process to access the Camera HAL (Hardware Abstraction Layer) at a time. If an app hangs while holding the lock, all other apps are locked out.\n1. Turn off Flashlight.\n2. Restart phone into Safe Mode to confirm no rogue background video app is monopolizing the sensor.\n3. If camera fails in Safe Mode, the sensor module has hardware failure.",
                "test": "Open Camera in Safe Mode.",
                "expectedResult": "Camera sensor activates."
            }
        ]
    },
    {
        "id": "blurry-photos",
        "title": "Blurry photos",
        "category": "camera-photos",
        "categoryName": "Camera and Photos",
        "severity": "low",
        "symptom": "Images look hazy, milky, or out-of-focus; camera fails to autofocus on close-up objects.",
        "causes": [
            "Fingerprint oil film on lens protective glass",
            "Third-party lens protective glass caps refracting light",
            "Stuck voice coil motor (VCM) autofocus mechanism"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Is the blur caused by hazy/foggy lighting glare, or does the lens physically fail to focus on near/far subjects?",
                "options": [
                    {
                        "text": "Hazy, milky, light streaks across the photo",
                        "next": "step-clean-lens-oil"
                    },
                    {
                        "text": "Lens stays stuck in macro focus and won't focus on distance (or vice versa)",
                        "next": "step-vcm-autofocus-unstuck"
                    }
                ]
            },
            {
                "id": "step-clean-lens-oil",
                "title": "Clean Lens Sapphire Glass and Remove Camera Protectors",
                "instruction": "1. Skin oils on the camera glass cause severe diffraction streaks in photos.\n2. Wipe with a dry, clean microfiber cloth.\n3. Remove cheap adhesive 'glass camera lens protectors'; they create internal reflections and block autofocus time-of-flight (ToF) sensors.",
                "test": "Take a photo pointing toward a light source.",
                "expectedResult": "Crisp contrast and sharpness restored."
            },
            {
                "id": "step-vcm-autofocus-unstuck",
                "title": "Free Stuck Voice Coil Motor (VCM)",
                "instruction": "Smartphones use microscopic electromagnetic springs (Voice Coil Motors) to slide lens elements. After a mechanical drop, the lens carriage can stick.\n1. Open Camera app.\n2. Gently tap the side of the phone against the palm of your hand.\n3. Toggle between 1x, 3x telephoto, and 0.6x ultrawide lenses to reset motor coils.",
                "test": "Tap near object on screen to trigger autofocus.",
                "expectedResult": "Autofocus snaps into sharp lock."
            }
        ]
    },
    {
        "id": "flashlight-unavailable",
        "title": "Flashlight unavailable",
        "category": "camera-photos",
        "categoryName": "Camera and Photos",
        "severity": "low",
        "symptom": "Flashlight quick setting tile is grayed out with a message: 'Camera light is in use' or 'Phone is too warm'.",
        "causes": [
            "Active camera application holding flash LED resource",
            "Battery temperature exceeding 40\u00b0C thermal protection",
            "Battery level below 5% critical reserve threshold"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Is your battery level below 5-10%, or has the phone been in heavy sunlight / charging?",
                "options": [
                    {
                        "text": "Battery is very low (under 10%) or phone is hot",
                        "next": "step-thermal-battery-threshold"
                    },
                    {
                        "text": "Battery is high and phone is cool, but tile says 'Camera in use'",
                        "next": "step-force-close-camera-flashlight"
                    }
                ]
            },
            {
                "id": "step-thermal-battery-threshold",
                "title": "Cool Phone or Recharge Past 15%",
                "instruction": "Android power management automatically disables the high-current LED driver when the battery drops below 5% or when battery temperature crosses 42\u00b0C to prevent thermal runaway.",
                "test": "Plug phone in and let cool down for 10 minutes.",
                "expectedResult": "Flashlight toggle unlocks."
            },
            {
                "id": "step-force-close-camera-flashlight",
                "title": "Close Camera Apps and Restart MediaServer",
                "instruction": "1. Open Recent Apps and swipe away all camera and video apps.\n2. Go to Settings > Apps > Camera > Force Stop.\n3. Toggle Flashlight tile.",
                "test": "Tap Flashlight in Quick Settings.",
                "expectedResult": "Torch illuminates normally."
            }
        ]
    },
    {
        "id": "missing-gallery-photos",
        "title": "Missing gallery photos",
        "category": "camera-photos",
        "categoryName": "Camera and Photos",
        "severity": "medium",
        "symptom": "Photos taken previously no longer appear in Gallery albums, or thumbnails show gray broken icons.",
        "causes": [
            "Hidden .nomedia file in storage folder",
            "Scoped Storage media scanner cache desync",
            "Cloud backup 'Free up device space' moved originals to cloud"
        ],
        "relatedGuide": "/android-storage.html",
        "relatedGuideTitle": "Android Storage & File Systems",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Did you recently use Google Photos 'Free up space', or are photos missing after transferring files?",
                "options": [
                    {
                        "text": "Used 'Free up space' in Google Photos",
                        "next": "step-google-photos-cloud-check"
                    },
                    {
                        "text": "Photos are on the phone storage but Gallery doesn't show them",
                        "next": "step-media-scanner-nomedia"
                    }
                ]
            },
            {
                "id": "step-google-photos-cloud-check",
                "title": "Verify Google Photos Cloud Originals",
                "instruction": "The 'Free up space' tool deliberately deletes local copies from phone flash storage after confirming they are safely backed up to your Google account.\n1. Open Google Photos.\n2. Tap the photo and tap 'Download' to restore original file to local device storage.",
                "test": "Check local Gallery app.",
                "expectedResult": "Photo re-appears in local Camera album."
            },
            {
                "id": "step-media-scanner-nomedia",
                "title": "Remove .nomedia Files & Rebuild MediaStore Index",
                "instruction": "Any folder containing a blank file named '.nomedia' instructs Android's MediaStore indexer to hide all images from gallery apps.\n1. Open Google Files or Samsung My Files > Settings > Enable 'Show hidden system files'.\n2. Navigate to DCIM or Pictures and delete any '.nomedia' file.\n3. Restart phone to force MediaStore to re-scan storage.",
                "crossLink": {
                    "url": "/android-storage.html",
                    "text": "See full explanation in our Android Storage guide"
                },
                "test": "Open Gallery.",
                "expectedResult": "All photo albums populate properly."
            }
        ]
    },
    {
        "id": "phone-not-recognized-by-computer",
        "title": "Phone not recognized by computer",
        "category": "usb-sharing",
        "categoryName": "USB, Files and Sharing",
        "severity": "medium",
        "symptom": "Plugging phone into Windows PC or Mac only charges the battery; no device appears in File Explorer or Finder.",
        "causes": [
            "Charge-only USB cable lacking D+/D- data lines",
            "USB configuration defaulting to 'No data transfer' (Android security lock)",
            "Missing MTP USB driver in Windows Device Manager"
        ],
        "relatedGuide": "/android-transfer-photos.html",
        "relatedGuideTitle": "How to Transfer Photos from Android to PC/Mac",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "When plugged into the computer, does a notification appear on your phone saying 'Charging this device via USB'?",
                "options": [
                    {
                        "text": "Yes, notification appears saying 'Charging via USB'",
                        "next": "step-switch-usb-mode"
                    },
                    {
                        "text": "No notification appears at all (only battery charges silently)",
                        "next": "step-data-cable-check"
                    }
                ]
            },
            {
                "id": "step-switch-usb-mode",
                "title": "Switch USB Mode to File Transfer (MTP)",
                "instruction": "For security, Android defaults to 'No data transfer' whenever plugged into a USB host.\n1. Unlock your phone with fingerprint or PIN.\n2. Swipe down the notification shade.\n3. Tap 'Charging this device via USB'.\n4. Change selection to 'File Transfer' (or 'Transferring files / MTP').",
                "crossLink": {
                    "url": "/android-transfer-photos.html",
                    "text": "Read our complete photo transfer walkthrough"
                },
                "test": "Open 'This PC' in Windows File Explorer.",
                "expectedResult": "Phone storage icon appears with internal storage drive."
            },
            {
                "id": "step-data-cable-check",
                "title": "Replace Charge-Only Cable with a 4-Wire USB Data Cable",
                "instruction": "Many cheap charging cords and power bank cables only contain 2 wires (+5V and GND) and omit the D+ and D- twisted data pair. Use the original phone manufacturer cable or a certified USB data cable.",
                "test": "Connect using a known data cable directly into a motherboard rear USB port.",
                "expectedResult": "Computer chimes and recognizes MTP hardware."
            }
        ]
    },
    {
        "id": "usb-file-transfer-unavailable",
        "title": "USB file transfer unavailable",
        "category": "usb-sharing",
        "categoryName": "USB, Files and Sharing",
        "severity": "medium",
        "symptom": "Phone connects to PC, but opening the drive shows an empty folder, or large video file transfers freeze at 99%.",
        "causes": [
            "Screen is locked with PIN/fingerprint (security protection)",
            "Mac lacks Android File Transfer / OpenMTP utility",
            "MTP protocol timing out on files larger than 4GB (FAT32 limitation)"
        ],
        "relatedGuide": "/android-transfer-photos.html",
        "relatedGuideTitle": "Android to PC File Transfer Diagnostics",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Are you connecting to a Windows PC or an Apple Mac computer?",
                "options": [
                    {
                        "text": "Connecting to an Apple Mac (macOS)",
                        "next": "step-mac-openmtp"
                    },
                    {
                        "text": "Connecting to a Windows PC",
                        "next": "step-windows-unlock-screen"
                    }
                ]
            },
            {
                "id": "step-mac-openmtp",
                "title": "Install OpenMTP on macOS",
                "instruction": "macOS does not natively support Android's MTP protocol in Finder.\n1. Download OpenMTP (open source) or official Android File Transfer on your Mac.\n2. Close any conflicting apps like Google Drive or Smart Switch.\n3. Unlock your phone before plugging in USB cable.",
                "test": "Open OpenMTP on Mac.",
                "expectedResult": "Complete internal storage folder directory populates."
            },
            {
                "id": "step-windows-unlock-screen",
                "title": "Unlock Screen and Keep Display Awake During Transfer",
                "instruction": "1. Android closes USB data streams the moment the device locks.\n2. Keep your screen unlocked while transferring files.\n3. For files larger than 4GB, transfer in smaller batches or use Quick Share / local Wi-Fi.",
                "test": "Drag and drop a 1GB file.",
                "expectedResult": "File transfer completes smoothly."
            }
        ]
    },
    {
        "id": "downloads-failing",
        "title": "Downloads failing",
        "category": "usb-sharing",
        "categoryName": "USB, Files and Sharing",
        "severity": "low",
        "symptom": "Browser and PDF downloads fail immediately with 'Download failed' or 'Unsuccessful'.",
        "causes": [
            "Android system Download Manager service disabled or corrupted",
            "Insufficient storage space in default /Download folder",
            "Browser lacks Storage/Photos permission"
        ],
        "relatedGuide": "/android-storage.html",
        "relatedGuideTitle": "Managing Android Storage & Downloads",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does the download fail immediately upon clicking the link, or after downloading 90%?",
                "options": [
                    {
                        "text": "Fails immediately upon clicking the link",
                        "next": "step-download-manager-reset"
                    },
                    {
                        "text": "Fails after partial download",
                        "next": "step-storage-space-downloads"
                    }
                ]
            },
            {
                "id": "step-download-manager-reset",
                "title": "Reset Android System Download Manager",
                "instruction": "All Android browsers pass file transfers to the background 'Download Manager' service.\n1. Go to Settings > Apps > Tap Show system apps.\n2. Find 'Download Manager' > Storage & cache > Tap 'Clear Storage' and 'Clear Cache'.\n3. Ensure the app is 'Enabled'.\n4. Restart phone.",
                "test": "Download a sample PDF in Chrome.",
                "expectedResult": "Download completes and saves to /Download."
            },
            {
                "id": "step-storage-space-downloads",
                "title": "Verify Free Storage in Download Location",
                "instruction": "If free storage is below 500MB, Android rejects incoming file streams.\n1. Open Google Files > Delete large temporary files.\n2. Ensure at least 2GB free space.",
                "test": "Retry download.",
                "expectedResult": "File finishes downloading completely."
            }
        ]
    },
    {
        "id": "nearby-sharing-not-working",
        "title": "Nearby sharing not working",
        "category": "usb-sharing",
        "categoryName": "USB, Files and Sharing",
        "severity": "low",
        "symptom": "Quick Share (formerly Nearby Share) fails to discover recipient phone, or file transfer fails midway.",
        "causes": [
            "Bluetooth, Wi-Fi, or Location toggles turned off on either phone",
            "Visibility setting set to 'Contacts only' while sender is unsaved",
            "VPN active on either device blocking Wi-Fi Direct peer-to-peer"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Are the devices failing to see each other, or does the transfer abort during transmission?",
                "options": [
                    {
                        "text": "Devices cannot discover each other at all",
                        "next": "step-quick-share-visibility"
                    },
                    {
                        "text": "Discovered, but file transfer rejects or aborts",
                        "next": "step-disable-vpns-wifi-direct"
                    }
                ]
            },
            {
                "id": "step-quick-share-visibility",
                "title": "Change Quick Share Visibility to 'Everyone for 10 minutes'",
                "instruction": "1. On the recipient phone, swipe down Quick Settings and tap 'Quick Share'.\n2. Change device visibility from 'Contacts only' to 'Everyone' (or 'Everyone for 10 minutes').\n3. Ensure Wi-Fi, Bluetooth, and Location are turned ON on BOTH phones.",
                "test": "Search for recipient on sender phone.",
                "expectedResult": "Recipient avatar appears instantly."
            },
            {
                "id": "step-disable-vpns-wifi-direct",
                "title": "Turn Off VPN and Low Power Mode",
                "instruction": "Quick Share creates a local high-speed Wi-Fi Direct peer-to-peer tunnel. Active VPNs block local subnet routing.\n1. Turn off VPNs on both devices.\n2. Keep screens awake on both phones during transfer.",
                "test": "Send a 50MB video.",
                "expectedResult": "High-speed Wi-Fi Direct transfer completes."
            }
        ]
    },
    {
        "id": "gps-inaccurate",
        "title": "GPS inaccurate",
        "category": "location-calls",
        "categoryName": "Location and Calls",
        "severity": "medium",
        "symptom": "Google Maps shows large blue circle of uncertainty, reports 'Searching for GPS', or places you several streets away.",
        "causes": [
            "Google Location Accuracy (Wi-Fi/Cell trilateration) turned off",
            "Outdated A-GPS satellite ephemeris data cache",
            "Metal or magnetic phone case interfering with compass"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Is Google Maps navigation jumping erratically between streets, or does the compass direction point the wrong way?",
                "options": [
                    {
                        "text": "Location jumping erratically or says 'Searching for GPS'",
                        "next": "step-enable-google-location-accuracy"
                    },
                    {
                        "text": "Location is accurate, but beam points in the wrong direction",
                        "next": "step-calibrate-compass"
                    }
                ]
            },
            {
                "id": "step-enable-google-location-accuracy",
                "title": "Enable Google Location Accuracy & Refresh A-GPS",
                "instruction": "Standalone satellite GPS takes several minutes to lock. Assisted GPS (A-GPS) uses cellular towers and Wi-Fi beacons for instant triangulated lock.\n1. Go to Settings > Location > Location services > 'Google Location Accuracy' > Turn ON.\n2. Remove any metallic or magnetic wallet cases.\n3. Open Google Maps, tap the blue dot, and tap 'Calibrate'.",
                "test": "Walk outdoors with clear view of sky.",
                "expectedResult": "Blue dot shrinks to tight 3-5 meter accuracy."
            },
            {
                "id": "step-calibrate-compass",
                "title": "Calibrate Magnetometer (Figure-8 Motion)",
                "instruction": "Internal compass sensors get magnetized over time.\n1. Open Google Maps.\n2. Move the phone through the air in a smooth figure-8 motion three times.\n3. Compass accuracy indicator updates to 'High'.",
                "test": "Rotate phone while standing in place.",
                "expectedResult": "Blue directional beam matches facing direction."
            }
        ]
    },
    {
        "id": "calls-dropping",
        "title": "Calls dropping",
        "category": "location-calls",
        "categoryName": "Location and Calls",
        "severity": "medium",
        "symptom": "Phone calls cut off after 1\u20132 minutes, or audio drops out into silence mid-sentence.",
        "causes": [
            "VoLTE / Wi-Fi Calling handover failure during fringe cellular coverage",
            "Carrier network IMS registration loss",
            "Accidental cheek touch hanging up due to malfunctioning proximity sensor"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Do calls drop primarily inside your home, or do calls end when your cheek touches the screen?",
                "options": [
                    {
                        "text": "Inside home or office with weak cell signal",
                        "next": "step-wifi-calling-priority"
                    },
                    {
                        "text": "Screen lights up during call and cheek touches 'End Call'",
                        "next": "step-proximity-sensor-audit"
                    }
                ]
            },
            {
                "id": "step-wifi-calling-priority",
                "title": "Configure Wi-Fi Calling Preferred Handover",
                "instruction": "When cell reception is weak, phones struggle with VoLTE handoffs.\n1. Go to Settings > Network & Internet > SIMs (or Connections) > 'Wi-Fi Calling'.\n2. Turn ON 'Wi-Fi Calling'.\n3. Under Calling preference, select 'Call over Wi-Fi' when indoors.",
                "test": "Place a 10-minute test call indoors.",
                "expectedResult": "Call stays crystal clear without drops."
            },
            {
                "id": "step-proximity-sensor-audit",
                "title": "Verify Virtual Proximity Sensor",
                "instruction": "Many modern phones use an ultrasound 'Virtual Proximity Sensor'. Screen protectors covering the top bezel or holding the phone at a tilt cause the screen to turn back on during calls, resulting in cheek touches ending the call.\n1. Hold phone vertical to ear.\n2. Clean top earpiece area.",
                "test": "Make a call and verify screen stays completely black when near ear.",
                "expectedResult": "Screen stays off and cheek touches stop."
            }
        ]
    },
    {
        "id": "microphone-problems-during-calls",
        "title": "Microphone problems during calls",
        "category": "location-calls",
        "categoryName": "Location and Calls",
        "severity": "medium",
        "symptom": "Callers say you sound like you are 'underwater', robotic, or cutting in and out constantly.",
        "causes": [
            "Secondary noise-cancellation microphone port covered by protective case",
            "Corrupted carrier VoLTE HD Voice AMR-WB codec stream",
            "Microphone hole partially blocked by pocket lint"
        ],
        "relatedGuide": null,
        "safetyWarning": "Never poke needles or metal wires into microphone pinholes.",
        "steps": [
            {
                "id": "step-1",
                "question": "Does the muffled voice happen on normal handset calls, or also when switching to Speakerphone?",
                "options": [
                    {
                        "text": "Only on normal handset calls; speakerphone sounds fine",
                        "next": "step-check-case-top-mic"
                    },
                    {
                        "text": "Sounds robotic / cutting in and out across all calls",
                        "next": "step-volte-toggle"
                    }
                ]
            },
            {
                "id": "step-check-case-top-mic",
                "title": "Inspect Top Secondary Noise-Cancellation Mic & Case Cutout",
                "instruction": "Smartphones use a secondary microphone on the top edge to sample ambient noise and subtract it from your voice. If an ill-fitting phone case blocks this hole, the algorithm mistakenly subtracts your voice!\n1. Inspect top edge pinhole and keep fingers clear.\n2. Use a soft, dry toothbrush to clean lint from bottom and top mic pinholes.",
                "test": "Call with case removed.",
                "expectedResult": "Voice transmits cleanly with full natural clarity."
            },
            {
                "id": "step-volte-toggle",
                "title": "Toggle VoLTE / Enhanced Calling Mode",
                "instruction": "If the carrier HD voice codec stream has high jitter, your voice degrades into digital robotic artifacts.\n1. Go to Settings > Network & Internet > Mobile Network > Toggle 'VoLTE' or 'HD Calling' off and back on.\n2. If available, test Wi-Fi Calling.",
                "test": "Place a test call to landline or mobile.",
                "expectedResult": "Audio stream stabilizes."
            }
        ]
    },
    {
        "id": "alarm-not-ringing",
        "title": "Alarm not ringing",
        "category": "everyday-features",
        "categoryName": "Everyday Phone Features",
        "severity": "high",
        "symptom": "Morning alarm fails to sound, or rings silently with zero volume while you sleep.",
        "causes": [
            "Separate 'Alarm volume' slider muted in sound settings",
            "Third-party clock app put to sleep by aggressive OEM battery optimization",
            "Do Not Disturb configured to block alarms"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Are you using the official built-in Clock app, or a third-party alarm app from Play Store?",
                "options": [
                    {
                        "text": "Using a third-party alarm app (Alarmy, Sleep as Android, etc.)",
                        "next": "step-third-party-alarm-battery"
                    },
                    {
                        "text": "Using the stock Google / Samsung Clock app",
                        "next": "step-alarm-volume-dnd-check"
                    }
                ]
            },
            {
                "id": "step-third-party-alarm-battery",
                "title": "Grant 'Unrestricted' Battery & 'Alarms & Reminders' Permission",
                "instruction": "Third-party clock apps get killed by Android Doze mode unless granted special exact alarm permissions.\n1. Go to Settings > Apps > [Your Clock App] > Battery > Set to 'Unrestricted'.\n2. Go to Settings > Apps > Special app access > 'Alarms & reminders' > Ensure permission is Allowed.\n3. Recommendation: Use the official Google Clock or Samsung Clock app, which is whitelisted at the OS kernel level.",
                "test": "Set an alarm for 3 minutes from now and lock phone.",
                "expectedResult": "Alarm fires reliably on time."
            },
            {
                "id": "step-alarm-volume-dnd-check",
                "title": "Verify Dedicated 'Alarm Volume' Slider & DND Bypass",
                "instruction": "Android has 4 distinct audio volume sliders: Media, Call, Ringtone, and Alarm. Muting ringtone does NOT mute alarms, but lowering Alarm volume will.\n1. Press Volume Up > Tap 3 dots (...) on volume slider.\n2. Ensure 'Alarm volume' is set to 80-100%.\n3. In Settings > Sound > Do Not Disturb > Alarms and other interruptions > Ensure 'Alarms' is toggled ON.",
                "test": "Test alarm sound preview in Clock app settings.",
                "expectedResult": "Alarm sounds at full volume."
            }
        ]
    },
    {
        "id": "screen-recording-without-sound",
        "title": "Screen recording without sound",
        "category": "everyday-features",
        "categoryName": "Everyday Phone Features",
        "severity": "low",
        "symptom": "Recorded video plays back with pristine visuals but completely silent audio.",
        "causes": [
            "Audio source selector set to 'None' in Screen Recorder settings",
            "App protected by Android FLAG_SECURE / DRM (Netflix, banking apps)",
            "Microphone permission muted"
        ],
        "relatedGuide": null,
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Does the recording have no sound in ANY app, or only when recording protected apps (Netflix, banking, games)?",
                "options": [
                    {
                        "text": "No sound across all apps and home screen",
                        "next": "step-screen-recorder-audio-source"
                    },
                    {
                        "text": "Only silent when recording streaming apps or games (DRM block)",
                        "next": "step-drm-flag-secure"
                    }
                ]
            },
            {
                "id": "step-screen-recorder-audio-source",
                "title": "Set Screen Recorder Audio Source to 'Media and Mic'",
                "instruction": "1. Swipe down Quick Settings and long-press the 'Screen Record' tile (or open Screen Recorder settings).\n2. Under 'Sound' / 'Audio source', change from 'None' to 'Device audio' (Media) or 'Device audio and microphone'.",
                "oemNotes": {
                    "samsung": "Settings > Advanced features > Screenshots and screen recordings > Sound > Select 'Media and mic'.",
                    "pixel": "When starting screen record from Quick Settings, tap 'Record audio' dropdown > Select 'Device audio & microphone'."
                },
                "test": "Record a 10-second YouTube clip.",
                "expectedResult": "Video plays back with crisp internal audio."
            },
            {
                "id": "step-drm-flag-secure",
                "title": "Understand Android DRM & FLAG_SECURE Audio Restrictions",
                "instruction": "Android operating system enforces hardware DRM (Widevine L1). Streaming services (Netflix, Prime, Disney+) and banking apps flag windows with WindowManager.LayoutParams.FLAG_SECURE. By Android design, the system mutters audio and blanks video to prevent piracy.",
                "test": "Test recording in an unprotected app (Chrome or Camera).",
                "expectedResult": "Verified whether restriction is intentional DRM protection."
            }
        ]
    },
    {
        "id": "keyboard-disappearing",
        "title": "Keyboard disappearing",
        "category": "everyday-features",
        "categoryName": "Everyday Phone Features",
        "severity": "medium",
        "symptom": "Tapping into text fields causes the keyboard (Gboard / Samsung Keyboard) to flicker and vanish immediately.",
        "causes": [
            "Virtual keyboard process crash loop",
            "Corrupted personal dictionary or keyboard cache",
            "Full-screen gaming mode suppressing IME window"
        ],
        "relatedGuide": "/android-make-phone-faster.html",
        "relatedGuideTitle": "Android Input & Performance Troubleshooting",
        "safetyWarning": null,
        "steps": [
            {
                "id": "step-1",
                "question": "Which keyboard are you using, and does clearing its temporary cache resolve the flicker?",
                "options": [
                    {
                        "text": "Using Gboard (Google Keyboard)",
                        "next": "step-gboard-cache-reset"
                    },
                    {
                        "text": "Using Samsung Keyboard / OEM default keyboard",
                        "next": "step-samsung-keyboard-reset"
                    }
                ]
            },
            {
                "id": "step-gboard-cache-reset",
                "title": "Clear Gboard Cache and Uninstall Updates",
                "instruction": "1. Go to Settings > Apps > Gboard.\n2. Tap 'Force Stop'.\n3. Tap Storage & cache > Tap 'Clear Cache'.\n4. If flickering persists, tap 3 dots in upper right > 'Uninstall updates', then update fresh in Play Store.",
                "test": "Tap Google search bar.",
                "expectedResult": "Keyboard opens reliably and stays docked on screen."
            },
            {
                "id": "step-samsung-keyboard-reset",
                "title": "Reset Samsung Keyboard Settings to Default",
                "instruction": "1. Go to Settings > General management > Samsung Keyboard settings.\n2. Scroll to bottom and tap 'Reset to default settings'.\n3. Tap 'Reset keyboard settings' and 'Clear personalized data'.",
                "test": "Tap any text box to type.",
                "expectedResult": "Keyboard appears with smooth input response."
            }
        ]
    }
]
};
