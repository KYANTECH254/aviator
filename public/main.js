function toggleSubMenu() {
    const btn = document.querySelector("#toggle-submenu");
    const menu = document.querySelector(".aviator-heading-submenu");
    if (!btn || !menu) return;
    btn.addEventListener("click", function () {
        if (!menu) return;
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    });
}

function toggleAviatorBetsHeader() {
    const liveBetsBtn = document.querySelector("#live-bets-btn");
    const myBetsBtn = document.querySelector("#my-bets-btn");
    const topBetsBtn = document.querySelector("#top-bets-btn");
    if (!liveBetsBtn || !myBetsBtn || !topBetsBtn) return;

    const buttons = [liveBetsBtn, myBetsBtn, topBetsBtn];

    function setActiveButton(activeBtn) {
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn === activeBtn);
        });
    }

    const myBetsTabs = document.querySelectorAll("#my-bets");
    const liveBetsTabs = document.querySelectorAll("#live-bets");
    const topBetsTabs = document.querySelectorAll("#top-bets");

    myBetsBtn.addEventListener("click", function () {
        myBetsTabs.forEach(tab => {
            tab.style.display = 'flex';
        });
        liveBetsTabs.forEach(tab => {
            tab.style.display = 'none';
        });
        topBetsTabs.forEach(tab => {
            tab.style.display = 'none';
        });

        setActiveButton(myBetsBtn);
    });

    liveBetsBtn.addEventListener("click", function () {
        liveBetsTabs.forEach(tab => {
            tab.style.display = 'flex';
        });
        myBetsTabs.forEach(tab => {
            tab.style.display = 'none';
        });
        topBetsTabs.forEach(tab => {
            tab.style.display = 'none';
        });

        setActiveButton(liveBetsBtn);
    });

    topBetsBtn.addEventListener("click", function () {
        topBetsTabs.forEach(tab => {
            tab.style.display = 'flex';
        });
        myBetsTabs.forEach(tab => {
            tab.style.display = 'none';
        });
        liveBetsTabs.forEach(tab => {
            tab.style.display = 'none';
        });

        setActiveButton(topBetsBtn);
    });
}

function toggleRoundHistory() {
    const openBtn = document.querySelector("#open-round-history");
    const closeBtn = document.querySelector("#close-round-history");
    if (!openBtn || !closeBtn) return;

    openBtn.addEventListener("click", function () {
        const roundHistoryBottomTabs = document.getElementsByClassName("aviator-round-history-header-2");
        const roundHistoryTopTabs = document.getElementsByClassName("aviator-round-history-header-1");

        // Ensure that elements exist
        if (roundHistoryBottomTabs.length === 0 || roundHistoryTopTabs.length === 0) return;

        // Show bottom tabs and hide top tabs
        Array.from(roundHistoryBottomTabs).forEach(tab => {
            tab.style.display = 'flex';
        });

    });

    closeBtn.addEventListener("click", function () {
        const roundHistoryBottomTab = document.querySelector(".aviator-round-history-header-2");
        const roundHistoryTopTab = document.querySelector(".aviator-round-history-header-1");
        if (!roundHistoryBottomTab || !roundHistoryTopTab) return;

        // Show top tabs and hide bottom tabs
        if (roundHistoryBottomTab.style.display === 'flex') {
            roundHistoryBottomTab.style.display = 'none';
            roundHistoryTopTab.style.display = 'flex';
        }
    });
}

function toggleAviatorTopBets() {
    const dayBetsBtn = document.querySelector("#day-bets-btn");
    const monthBetsBtn = document.querySelector("#month-bets-btn");
    const yearBetsBtn = document.querySelector("#year-bets-btn");

    const betSections = {
        day: document.querySelectorAll(".daily-bets"),
        month: document.querySelectorAll(".monthly-bets"),
        year: document.querySelectorAll(".yearly-bets")
    };

    function setActiveButton(activeBtn) {
        [dayBetsBtn, monthBetsBtn, yearBetsBtn].forEach(btn => {
            btn.classList.toggle('active', btn === activeBtn);
        });
    }

    Object.values(betSections).forEach(bets => {
        bets.forEach(bet => {
            bet.style.display = 'none';
        });
    });

    Object.values(betSections.day).forEach(bet => {
        bet.style.display = 'flex';
    });

    function showSection(section) {
        Object.values(betSections).forEach(bets => {
            bets.forEach(bet => {
                bet.style.display = 'none';
            });
        });

        section.forEach(bet => {
            bet.style.display = 'flex';
        });
    }

    dayBetsBtn.addEventListener("click", function () {
        showSection(betSections.day);
        setActiveButton(dayBetsBtn);
    });

    monthBetsBtn.addEventListener("click", function () {
        showSection(betSections.month);
        setActiveButton(monthBetsBtn);
    });

    yearBetsBtn.addEventListener("click", function () {
        showSection(betSections.year);
        setActiveButton(yearBetsBtn);
    });
}

function toggleAviatorTopBetsHeader() {
    const hugeWinsBtn = document.querySelector("#huge-wins-btn");
    const biggestWinsBtn = document.querySelector("#biggest-wins-btn");
    const multipliersBtn = document.querySelector("#multipliers-btn");
    if (!hugeWinsBtn || !biggestWinsBtn || !multipliersBtn) return;

    const buttons = [hugeWinsBtn, biggestWinsBtn, multipliersBtn];

    function setActiveButton(activeBtn) {
        buttons.forEach(btn => {
            btn.classList.toggle('subheader-active', btn === activeBtn);
        });
    }

    const hugeWinsTabs = document.querySelectorAll("#huge-wins");
    const biggestWinsTabs = document.querySelectorAll("#biggest-wins");
    const multiplierTabs = document.querySelectorAll("#multipliers");

    hugeWinsBtn.addEventListener("click", function () {

        hugeWinsTabs.forEach(tab => {
            tab.style.display = 'flex';
        });
        biggestWinsTabs.forEach(tab => {
            tab.style.display = 'none';
        });
        multiplierTabs.forEach(tab => {
            tab.style.display = 'none';
        });

        setActiveButton(hugeWinsBtn);
    });

    biggestWinsBtn.addEventListener("click", function () {

        hugeWinsTabs.forEach(tab => {
            tab.style.display = 'none';
        });
        biggestWinsTabs.forEach(tab => {
            tab.style.display = 'flex';
        });
        multiplierTabs.forEach(tab => {
            tab.style.display = 'none';
        });

        setActiveButton(biggestWinsBtn);
    });

    multipliersBtn.addEventListener("click", function () {

        hugeWinsTabs.forEach(tab => {
            tab.style.display = 'none';
        });
        biggestWinsTabs.forEach(tab => {
            tab.style.display = 'none';
        });
        multiplierTabs.forEach(tab => {
            tab.style.display = 'flex';
        });

        setActiveButton(multipliersBtn);
    });

}

function AviatorCanvaAnimation() {
    const canvas = document.getElementById('aviatorCanvas');
    const ctx = canvas.getContext('2d');
}

function toggleInputValue() {
    let intervalId;

    const startIncrement = (input) => {
        intervalId = setInterval(() => {
            input.value = (parseFloat(input.value) + 1).toFixed(2);
        }, 100);
    };

    const startDecrement = (input) => {
        intervalId = setInterval(() => {
            input.value = (parseFloat(input.value) - 1).toFixed(2);
        }, 100);
    };

    const stopChange = () => {
        clearInterval(intervalId);
    };

    // Event listeners for input 1
    const input1 = document.getElementById('input1');
    document.querySelector('#plus-input1').addEventListener('mousedown', () => startIncrement(input1));
    document.querySelector('#minus-input1').addEventListener('mousedown', () => startDecrement(input1));
    document.querySelector('#plus-input1').addEventListener('mouseup', stopChange);
    document.querySelector('#plus-input1').addEventListener('mouseleave', stopChange);
    document.querySelector('#minus-input1').addEventListener('mouseup', stopChange);
    document.querySelector('#minus-input1').addEventListener('mouseleave', stopChange);

    // Event listeners for input 2
    const input2 = document.getElementById('input2');
    document.querySelector('#plus-input2').addEventListener('mousedown', () => startIncrement(input2));
    document.querySelector('#minus-input2').addEventListener('mousedown', () => startDecrement(input2));
    document.querySelector('#plus-input2').addEventListener('mouseup', stopChange);
    document.querySelector('#plus-input2').addEventListener('mouseleave', stopChange);
    document.querySelector('#minus-input2').addEventListener('mouseup', stopChange);
    document.querySelector('#minus-input2').addEventListener('mouseleave', stopChange);
}

function toggleAutoCashOutMultipllierInput() {
    const toggle4 = document.getElementById('toggle5');
    const toggle5 = document.getElementById('toggle7');
    const input1 = document.getElementById('aviator-auto-multiplier1');
    const input2 = document.getElementById('aviator-auto-multiplier2');
    const clearButton1 = document.getElementById('clear-input-btn1');
    const clearButton2 = document.getElementById('clear-input-btn2');
    const elementsContainer = document.querySelector(".aviator-auto-multiplier-input");

    const disableElements = [elementsContainer, input1, input2, clearButton1, clearButton2];
    disableElements.forEach(el => {
        el.disabled = true;
    });


    toggle4.addEventListener('change', () => {
        if (toggle4.checked) {
            input1.disabled = false;
            clearButton1.disabled = false
            input1.focus();
        } else {
            clearButton1.disabled = true
            input1.disabled = true;
            input1.value = '1.10';
        }
    });

    toggle5.addEventListener('change', () => {
        if (toggle4.checked) {
            input2.disabled = false;
            clearButton2.disabled = false
            input2.focus();
        } else {
            input2.disabled = true;
            clearButton2.disabled = true
            input2.value = '1.10';
        }
    });

    clearButton1.addEventListener('click', () => {
        input1.value = '';
    });

    clearButton2.addEventListener('click', () => {
        input2.value = '';
    });
}

function toggleAutoBet() {
    const manualBetsBtn = document.querySelector("#aviator-manual-bet-btn");
    const autoBetsBtn = document.querySelector("#aviator-auto-bet-btn");
    const manualBetsBtn2 = document.querySelector("#aviator-manual-bet-btn2");
    const autoBetsBtn2 = document.querySelector("#aviator-auto-bet-btn2");

    if (!manualBetsBtn || !autoBetsBtn || !manualBetsBtn2 || !autoBetsBtn2) return;

    const Tab1buttons = [manualBetsBtn, autoBetsBtn];
    const Tab2buttons = [manualBetsBtn2, autoBetsBtn2];

    function setActiveButton(activeBtn) {
        Tab1buttons.forEach(btn => {
            btn.classList.toggle('active', btn === activeBtn);
        });
    }

    function setActiveButton2(activeBtn) {
        Tab2buttons.forEach(btn => {
            btn.classList.toggle('active', btn === activeBtn);
        });
    }

    const autoBetsTabs1 = document.querySelector("#aviator-autobet-section1");
    const autoBetsTabs2 = document.querySelector("#aviator-autobet-section2");
    const margin1 = document.querySelector("#separator1")
    const margin2 = document.querySelector("#separator2")
    if (!autoBetsTabs1 || !autoBetsTabs2 || !margin1 || !margin2) return;

    manualBetsBtn.addEventListener("click", function () {
        autoBetsTabs1.style.display = 'none';
        margin1.style.display = 'none'
        setActiveButton(manualBetsBtn);
    });

    manualBetsBtn2.addEventListener("click", function () {
        autoBetsTabs2.style.display = 'none';
        margin2.style.display = 'none'
        setActiveButton2(manualBetsBtn2);
    });

    autoBetsBtn.addEventListener("click", function () {
        autoBetsTabs1.style.display = 'flex';
        margin1.style.display = 'flex'
        setActiveButton(autoBetsBtn);
    });

    autoBetsBtn2.addEventListener("click", function () {
        margin2.style.display = 'flex'
        autoBetsTabs2.style.display = 'flex';
        setActiveButton2(autoBetsBtn2);
    });
}

function toggleMusic() {
    const audio = document.getElementById('myAudio');
    const audioToggle = document.getElementById('toggle2');

    if (localStorage.getItem('musicPlaying') === null) {
        localStorage.setItem('musicPlaying', true);
        audioToggle.checked = true;
    }

    const isPlaying = JSON.parse(localStorage.getItem('musicPlaying'));
    audioToggle.checked = isPlaying;
    if (isPlaying) {
        audio.play();
    }

    audioToggle.addEventListener('change', () => {
        if (audioToggle.checked) {
            audio.play();
            localStorage.setItem('musicPlaying', true);
        } else {
            audio.pause();
            localStorage.setItem('musicPlaying', false);
        }
    });

    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        if (audioToggle.checked) {
            audio.play();
        }
    });
}

function toggleInputOption() {
    const inputItems = document.querySelectorAll("#aviator-input-btn");
    const amountInput = document.getElementById("input1");
    const inputItems2 = document.querySelectorAll("#aviator-input-btn2");
    const amountInput2 = document.getElementById("input2");
    const amountBtntxt = document.getElementById("aviator-bet-btn-amount");
    const amountBtntxt2 = document.getElementById("aviator-bet-btn-amount2");

    amountInput.addEventListener("input", function () {
        const value = parseFloat(amountInput.value);
        amountBtntxt.innerHTML = `${value.toLocaleString()} KES`;
    });

    amountInput2.addEventListener("input", function () {
        const value = parseFloat(amountInput2.value);
        amountBtntxt2.innerHTML = `${value.toLocaleString()} KES`;
    });

    inputItems.forEach(item => {
        item.addEventListener("click", function () {
            const value = parseFloat(item.getAttribute("data-value"));
            amountInput.value = value;
            amountBtntxt.innerHTML = `${value.toLocaleString()} KES`
        });
    });

    inputItems2.forEach(item => {
        item.addEventListener("click", function () {
            const value = parseFloat(item.getAttribute("data-value"));
            amountInput2.value = value;
            amountBtntxt2.innerHTML = `${value.toLocaleString()} KES`
        });
    });
}

function toggleDisplayAvatar() {
    fetch('data/demo.json')
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayAvatars(data.avatar.avatars);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

    function displayAvatars(avatars) {
        const avatarContainer = document.getElementById('avatarContainer');
        avatars.forEach(avatar => {
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'avatar-container';
            avatarDiv.innerHTML = `<img src="assets/images/${avatar}" alt="${avatar}">`;
            avatarContainer.appendChild(avatarDiv);
        });
    }
}

function toggleAvatarPopup() {
    const btn = document.querySelector("#avatar-popup-btn")
    const tab = document.querySelector("#aviator-avatar-tab");
    const closebtns = document.querySelectorAll("#aviator-avatar-popup-close")
    if (!btn || !tab || !closebtns) return;

    btn.addEventListener("click", function () {
        tab.style.display = 'flex';
        const menu = document.querySelector(".aviator-heading-submenu");
        if (!menu) return;
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        }
    })

    closebtns.forEach(closebtn => {
        closebtn.addEventListener("click", function () {
            tab.style.display = 'none'
        })
    })

    tab.addEventListener('click', (event) => {
        if (event.target === tab) {
            tab.style.display = 'none';
        }
    });
}

function toggleFreeBets() {
    const btn = document.querySelector("#free-bets-btn")
    const tab = document.querySelector("#aviator-freebets-tab");
    const freebetstab = document.querySelector("#free-bets-tab")
    const closebtn = document.querySelector("#aviator-popup-close")
    const archivetab = document.querySelector("#freebets-archive-tab")
    const archivebtn = document.querySelector("#freebets-archive-btn")
    const backbtn = document.querySelector("#freebets-archive-backbtn")
    const togglebtn = document.querySelector("#checkbox")
    if (!btn || !tab || !closebtn || !archivebtn || !archivetab || !freebetstab || !backbtn) return;

    if (togglebtn) {
        togglebtn.checked = true
    }

    btn.addEventListener("click", function () {
        tab.style.display = 'flex';
        const menu = document.querySelector(".aviator-heading-submenu");
        if (!menu) return;
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        }
    })

    closebtn.addEventListener("click", function () {
        tab.style.display = 'none'
    })

    archivebtn.addEventListener("click", function () {
        freebetstab.style.display = 'none'
        archivetab.style.display = 'flex'
    })

    backbtn.addEventListener("click", function () {
        archivetab.style.display = 'none'
        freebetstab.style.display = 'flex'
    })

    tab.addEventListener('click', (event) => {
        if (event.target === tab) {
            tab.style.display = 'none';
        }
    });
}

function toggleHowToPlay() {
    const btn = document.querySelector("#howtoplay-btn")
    const mobbtn = document.querySelector("#howtoplay-mobbtn")
    const tab = document.querySelector("#aviator-howtoplay-tab");
    const closebtn = document.querySelector("#aviator-howtoplay-popup-close")

    if (!btn || !tab || !closebtn || !mobbtn) return;

    btn.addEventListener("click", function () {
        tab.style.display = 'flex';
    })

    mobbtn.addEventListener("click", function () {
        tab.style.display = 'flex';
    })

    closebtn.addEventListener("click", function () {
        tab.style.display = 'none'
    })

    tab.addEventListener('click', (event) => {
        if (event.target === tab) {
            tab.style.display = 'none';
        }
    });

    const btn2 = document.querySelector("#aviator-howtoplay-detailed");
    btn2.addEventListener("click", function () {
        const rulestab = document.querySelector("#aviator-rules-tab");
        if (!rulestab) return;
        rulestab.style.display = 'flex';
        tab.style.display = 'none';
    })
}

function toggleGameLimits() {
    const btn = document.querySelector("#aviator-gamelimits-btn")
    const tab = document.querySelector("#aviator-gamelimits-tab");
    const closebtn = document.querySelector("#aviator-gamelimits-popup-close")
    if (!btn || !tab || !closebtn) return;

    btn.addEventListener("click", function () {
        tab.style.display = 'flex';
        const menu = document.querySelector(".aviator-heading-submenu");
        if (!menu) return;
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        }
    })

    closebtn.addEventListener("click", function () {
        tab.style.display = 'none'
    })

    tab.addEventListener('click', (event) => {
        if (event.target === tab) {
            tab.style.display = 'none';
        }
    });
}

function toggleMyBetHistory() {
    const btn = document.querySelector("#aviator-bethistory-btn")
    const tab = document.querySelector("#aviator-bethistory-tab");
    const closebtn = document.querySelector("#aviator-bethistory-popup-close")
    if (!btn || !tab || !closebtn) return;

    btn.addEventListener("click", function () {
        tab.style.display = 'flex';
        const menu = document.querySelector(".aviator-heading-submenu");
        if (!menu) return;
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        }
    })

    closebtn.addEventListener("click", function () {
        tab.style.display = 'none'
    })

    tab.addEventListener('click', (event) => {
        if (event.target === tab) {
            tab.style.display = 'none';
        }
    });
}

function toggleGameRules() {
    const btn = document.querySelector("#aviator-rules-btn")
    const tab = document.querySelector("#aviator-rules-tab");
    const closebtn = document.querySelector("#aviator-rules-popup-close")
    if (!btn || !tab || !closebtn) return;

    btn.addEventListener("click", function () {
        tab.style.display = 'flex';
        const menu = document.querySelector(".aviator-heading-submenu");
        if (!menu) return;
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        }
    })

    closebtn.addEventListener("click", function () {
        tab.style.display = 'none'
    })

    tab.addEventListener('click', (event) => {
        if (event.target === tab) {
            tab.style.display = 'none';
        }
    });
}

function toggleBetInputContainer() {
    const showbtn = document.querySelector("#aviator-show-betobject")
    const hidebtn = document.querySelector("#aviator-hide-betobject")
    const tab = document.querySelector("#aviator-bet-input2");
    if (!showbtn || !hidebtn || !tab) return;

    const firstelement = document.querySelector("#aviator-btn-container-1")
    if (!firstelement) return;
    const btnswidth = document.querySelectorAll(".aviator-btn-top-container-btns");
    if (!btnswidth.length) return;

    showbtn.addEventListener("click", function () {
        tab.style.display = 'flex';
        showbtn.style.display = 'none';
        firstelement.style.flex = '1';
        btnswidth.forEach(btnw => {
            btnw.style.marginLeft = '25%';
        });
    });


    hidebtn.addEventListener("click", function () {
        tab.style.display = 'none'
        showbtn.style.display = 'flex'
        firstelement.style.flex = '0 0 80%';
        btnswidth.forEach(btnw => {
            btnw.style.marginLeft = '35%';
        });
    })
}

function toggleProvablyFairSettings() {
    const btn = document.querySelector("#aviator-settings-btn")
    const tab = document.querySelector("#aviator-settings-tab");
    const closebtn = document.querySelector("#aviator-settings-popup-close")
    const provablytab = document.querySelector("#aviator-provably-tab");
    const provablybtn = document.querySelector("#provably-btn");

    if (!btn || !tab || !closebtn || !provablytab || !provablybtn) return;

    btn.addEventListener("click", function () {
        tab.style.display = 'flex';
        const menu = document.querySelector(".aviator-heading-submenu");
        if (!menu) return;
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        }
    })

    closebtn.addEventListener("click", function () {
        tab.style.display = 'none'
    })

    provablybtn.addEventListener("click", function () {
        provablytab.style.display = 'flex'
    })

    tab.addEventListener('click', (event) => {
        if (event.target === tab) {
            tab.style.display = 'none';
        }
    });
}

function toggleProvablyFair() {
    const btn = document.querySelector("#aviator-settings-btn")
    const tab = document.querySelector("#aviator-settings-tab");
    const closebtn = document.querySelector("#aviator-settings-popup-close")
    const provablytab = document.querySelector("#aviator-provably-tab");
    const provablybtn = document.querySelector("#provably-btn");

    if (!btn || !tab || !closebtn || !provablytab || !provablybtn) return;

    btn.addEventListener("click", function () {
        tab.style.display = 'flex';
        const menu = document.querySelector(".aviator-heading-submenu");
        if (!menu) return;
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        }
    })

    closebtn.addEventListener("click", function () {
        tab.style.display = 'none'
    })

    provablybtn.addEventListener("click", function () {
        provablytab.style.display = 'flex'
    })

    tab.addEventListener('click', (event) => {
        if (event.target === tab) {
            tab.style.display = 'none';
        }
    });
}

function toggleCopyText() {
    const btn = document.querySelector("#settings-copy-btn")
    const btn2 = document.querySelector("#settings-copy-btn2")
    const input = document.querySelector('#settings-input');
    const input2 = document.querySelector('#settings-input2');
    if (!btn || !btn2 || !input || !input2) return;
    btn.addEventListener("click", function () {
        input.select();
        document.execCommand('copy');
        showAlert("Copied!", "green", 3000)
    })
    btn2.addEventListener("click", function () {
        input2.select();
        document.execCommand('copy');
        showAlert("Copied!", "green", 3000)
    })

}

function showAlert(message, type, duration) {
    const alertPopup = document.getElementById('alertPopup');
    if (!alertPopup) return;
    alertPopup.className = `alert-popup ${type} show`;
    alertPopup.querySelector('.alert-message').textContent = message;

    setTimeout(() => {
        alertPopup.classList.remove('show');
        setTimeout(() => {
            alertPopup.classList.remove(type);
        }, 500);
    }, duration);
}

function closeAlert() {
    const alertPopup = document.getElementById('alertPopup');
    const closeBtn = document.querySelector("#close-alert");
    if (!alertPopup || !closeBtn) return;
    closeBtn.addEventListener("click", function () {
        alertPopup.classList.remove('show');
        setTimeout(() => {
            alertPopup.classList.remove(type);
        }, 500);
    })
}

function toggleSettingsInactiveTab() {
    const toggle1 = document.querySelector("#checkbox2");
    const toggle2 = document.querySelector("#checkbox3");
    const tab1 = document.querySelector("#aviator-settings-tab1")
    const tab2 = document.querySelector("#aviator-settings-tab2")

    if (!toggle1 || !toggle2 || !tab1 || !tab2) return;
    const tabs = [tab1, tab2];
    function setInActiveTab(activeBtn) {
        tabs.forEach(tab => {
            tab.classList.toggle('inactive', tab === activeBtn);
        });
    }

    setInActiveTab(tab2)
    toggle1.checked = true;

    toggle1.addEventListener('change', () => {
        if (toggle1.checked) {
            setInActiveTab(tab2)
            toggle2.checked = false
        } else {
            setInActiveTab(tab1)
            toggle2.checked = true
        }
    });
    toggle2.addEventListener('change', () => {
        if (toggle2.checked) {
            setInActiveTab(tab1)
            toggle1.checked = false;
        } else {
            setInActiveTab(tab2)
            toggle1.checked = true;
        }
    });
}

function toggleChangeSeed() {
    const btn = document.querySelector("#aviator-seed-btn")
    const tab = document.querySelector("#aviator-seed-tab");
    const closebtns = document.querySelectorAll("#aviator-seed-popup-close")
    if (!btn || !tab || !closebtns) return;

    btn.addEventListener("click", function () {
        tab.style.display = 'flex';
    })

    closebtns.forEach(closebtn => {
        closebtn.addEventListener("click", function () {
            tab.style.display = 'none'
        })
    });

    tab.addEventListener('click', (event) => {
        if (event.target === tab) {
            tab.style.display = 'none';
        }
    });
}

function toggleProvablyTab() {
    const closebtn = document.querySelector("#aviator-provably-popup-close");
    const tab = document.querySelector("#aviator-provably-tab");

    if (!closebtn || !tab) return;
    closebtn.addEventListener("click", function () {
        tab.style.display = 'none';
    })

    tab.addEventListener('click', (event) => {
        if (event.target === tab) {
            tab.style.display = 'none';
        }
    });
}

function toggleMultiplierDetails() {
    const btns = document.querySelectorAll("#round-history-btn")
    const tab = document.querySelector("#aviator-rounds-tab");
    const closebtn = document.querySelector("#aviator-rounds-popup-close")
    const provablytab = document.querySelector("#aviator-provably-tab");
    const provablybtn = document.querySelector("#provably-rounds-btn");

    if (!btns || !tab || !closebtn || !provablytab || !provablybtn) return;

    btns.forEach((btn) => {
        btn.addEventListener("click", function () {
            tab.style.display = 'flex';
        })
    })

    closebtn.addEventListener("click", function () {
        tab.style.display = 'none'
    })

    provablybtn.addEventListener("click", function () {
        provablytab.style.display = 'flex'
    })

    tab.addEventListener('click', (event) => {
        if (event.target === tab) {
            tab.style.display = 'none';
        }
    });
}

function toggleActiveBtnClass() {
    const tab = document.querySelector(".aviator-btn-container-1")
    const tab2 = document.querySelector(".aviator-btn-container-2")
    const btn = document.querySelector("#button1");
    const btn2 = document.querySelector("#button2");

    if (!tab || !btn || !tab2 || !btn2) return;
    btn.addEventListener("click", function () {
        tab.classList.toggle('betActive');
        showAlert(`"betActive" class Added to button`, "red", 5000)
    })
    btn2.addEventListener("click", function () {
        tab2.classList.toggle('cashoutActive');
        showAlert(`"cashoutActive" class Added to button`, "orange", 5000)
    })
}

function toggleChatSection() {
    const btn = document.querySelector("#toggle-chatsection");
    const tab = document.querySelector("#aviator-chat-section");
    const close = document.querySelector("#close-chatsection");
    const bets = document.querySelector("#aviator-bets-section");
    const betting = document.querySelector("#aviator-betting-section");
    const header = document.querySelector(".aviator-heading");

    if (!btn || !tab || !close || !bets || !betting || !header) return;

    btn.addEventListener("click", function () {
        if (tab.style.display === 'none' || tab.style.display === '') {
            tab.style.display = 'flex';
            bets.style.marginRight = '285px';
            betting.style.marginRight = '285px';
            betting.style.width = '100%'
            header.style.marginRight = '280px';
        } else {
            tab.style.display = 'none';
            bets.style.marginRight = '0';
            betting.style.marginRight = '0';
            header.style.marginRight = '0';
        }
    });

    close.addEventListener("click", function () {
        tab.style.display = 'none';
        bets.style.marginRight = '0';
        betting.style.marginRight = '0';
        header.style.marginRight = '0';
    });

    tab.addEventListener('click', (event) => {
        if (event.target === tab) {
            tab.style.display = 'none';
            bets.style.marginRight = '0';
            betting.style.marginRight = '0';
            header.style.marginRight = '0';
        }
    });
}

function togglefetchAndMapMultipliers() {
    fetch('data/demo.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const multipliers = data.multiplier.multipliers;

            // Map multipliers to the top container
            const topContainer = document.querySelector('.aviator-round-history-header-1 .aviator-round-history-header-1-outcomes');
            topContainer.innerHTML = ''; // Clear existing multipliers
            multipliers.forEach(multiplier => {
                const value = parseFloat(multiplier);
                const div = document.createElement('div');
                div.id = 'round-history-btn';

                // Determine the class based on the value
                if (value >= 1 && value < 2) {
                    div.className = 'aviator-round-history-outcome aviator-bets-multiplier small';
                } else if (value >= 2 && value < 10) {
                    div.className = 'aviator-round-history-outcome aviator-bets-multiplier medium';
                } else if (value >= 10) {
                    div.className = 'aviator-round-history-outcome aviator-bets-multiplier large';
                }

                div.textContent = `${multiplier}x`; // Append 'x' to the multiplier
                topContainer.appendChild(div);
            });

            // Map multipliers to the bottom container
            const bottomContainer = document.querySelector('.aviator-round-history-header-bottom');
            bottomContainer.innerHTML = ''; // Clear existing multipliers
            multipliers.forEach(multiplier => {
                const value = parseFloat(multiplier);
                const div = document.createElement('div');
                div.id = 'round-history-btn';

                // Determine the class based on the value
                if (value >= 1 && value < 2) {
                    div.className = 'aviator-round-history-outcome aviator-bets-multiplier small';
                } else if (value >= 2 && value < 10) {
                    div.className = 'aviator-round-history-outcome aviator-bets-multiplier medium';
                } else if (value >= 10) {
                    div.className = 'aviator-round-history-outcome aviator-bets-multiplier large';
                }

                div.textContent = `${multiplier}x`; // Append 'x' to the multiplier
                bottomContainer.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error fetching multipliers:', error);
        });
}

function processData() {
    const phone = '254700909271';

    // Assuming you're using a script in your HTML file
    const socket = new WebSocket('ws://localhost:3000');

    // When the socket connection is opened
    socket.addEventListener('open', function (event) {
        console.log('Connected to WebSocket server');

        // Example phone number to fetch data for (replace this with the actual phone number you want)
        const phone = '254700909271';

        // Request user data
        socket.send(JSON.stringify({
            type: 'fetch_user_data',
            phone: phone
        }));

        socket.send(JSON.stringify(
            {
                type: 'client_seed',
                phone: phone
            }
        ));

        document.getElementById('button1').addEventListener('click', (event) => {
            event.preventDefault();

            const phoneNumber = phone;
            const amount = parseFloat(document.getElementById('input1').value);
            const clientSeed = document.getElementById('settings-input').value;

            const betData = {
                phoneNumber,
                amount,
                clientSeed
            };

            console.log(betData)

            // Send the bet data to the server
            socket.send(JSON.stringify(
                {
                    type: 'bet',
                    data: betData
                }
            ));

        });

    });

    // When a message is received from the server
    socket.addEventListener('message', function (event) {
        const response = JSON.parse(event.data);

        if (response.type === 'user_data') {
            const balance = parseFloat(response.data.balance); 
            const formattedBalance = balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById('username').innerText = response.data.username;
            document.getElementById('avatar').src = `assets/images/${response.data.avatar}`;
            document.getElementById('balance').innerText = `${(formattedBalance)}`;
            document.getElementById('currency').innerText = `${response.data.currency}`;
        } else if (response.type === 'error') {
            console.error('Error:', response.message);
            showAlert(response.data.message, 'red', 3000)
        } else if (response.type === 'client_seed_generated') {
            if (response.data.phone === phone) {
                document.getElementById('settings-input').value = response.data.clientSeed;
            }
        } else if (response.type === 'bet_placed') {
            const tab = document.querySelector(".aviator-btn-container-1")
            const btn = document.querySelector("#button1");
            if (!tab || !btn) return;
            tab.classList.toggle('betActive');
            btn.querySelector('.aviator-bet-btn-text') = `CANCEL`;
            showAlert(response.data.message, 'green', 3000);
        } else if (response.type === 'server_seed') {
            document.getElementById('serverseed').value = response.data;
        } else if (response.type === 'multiplier_update') {
            document.getElementById('serverseed').value = response.data.multiplier;
        } else if (response.type === 'client_seed') {
            document.getElementById('settings-input').value = response.data.client_seed;
        }
    });

}




toggleSubMenu();
toggleAviatorBetsHeader();
toggleRoundHistory();
toggleInputValue();
toggleAutoBet();
toggleAutoCashOutMultipllierInput();
setInterval(toggleMusic, 1000);
toggleInputOption();
toggleDisplayAvatar();
toggleAvatarPopup();
toggleFreeBets();
toggleHowToPlay();
toggleGameLimits();
toggleMyBetHistory();
toggleGameRules();
toggleBetInputContainer();
toggleProvablyFairSettings();
toggleAviatorTopBets();
toggleAviatorTopBetsHeader();
toggleCopyText();
toggleSettingsInactiveTab();
toggleChangeSeed();
toggleProvablyTab();
toggleMultiplierDetails();
// toggleActiveBtnClass();
toggleChatSection();
// togglefetchAndMapMultipliers();
document.addEventListener("DOMContentLoaded", function () {
    AviatorCanvaAnimation();
    processData();
});

