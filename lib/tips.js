const tips = [
    // EXAMPLE TIP:
    // { 
    //     "text": "This is a tip",       // The tip text to show
    //     "href": "http://something.com" // Optional.  A link to show along with the tip
    //     "usedFor": [...],              // The views it is appropriate to show this tip on.
    // },
    {
        "text": "The first entry in the list is automatically selected in light yellow.  You can fill this entry by tapping [ENTER] or move to the next one by pressing [TAB] or [DOWN ARROW]", 
        "usedFor": ["EntryList"] // The view it is acceptable to show this tip on.
    },
    {
        "text": "You can open Tusk at any time with the hotkey CTRL+SHIFT+SPACE.",
        "usedFor": ["EntryList", "Unlock"]
    },
    {
        "text": "See more details like notes, group, or URL by clicking on an entry in this list",
        "usedFor": ["EntryList"]
    },
    {
        "text": "You can slide the remember bar to choose how long the browser will remember your password.",
        "usedFor": ["Unlock"]
    },
    {
        "text": "You can store Time-Based One Time Password (TOTP) tokens in your KeePass database and access them through Tusk.",
        "usedFor": ["Unlock", "EntryList"]
    },
    {
        "text": "You can read the full user guide at ",
        "href": "https://github.com/subdavis/tusk/wiki",
        "usedFor": ["Unlock", "EntryList", "EntryDetails"]
    }
]

export {
    tips
}