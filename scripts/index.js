const GAME_STEP = {
    WELCOME: 0,
    GAME_SETUP: 2,
    PLAYERS_SETUP: 3,
    NIGHT: 4,

    GENERATOR: 99
}

const PLAYER_ROLES = {
    Mafia: {
        text: "Mafiot",
        id: 0
    },
    Godfather: {
        text: "Godfather",
        id: 1
    },
    Serialkiller: {
        text: "Serial killer",
        id: 2
    },
    Veteran: {
        text: "Veteran",
        id: 3
    },
    Vigilante: {
        text: "Vigilentul",
        id: 4
    },
    Policeman: {
        text: "Politist",
        id: 5
    },
    Doctor: {
        text: "Medic",
        id: 6
    },
    Mayor: {
        text: "Primar",
        id: 7
    },
    Clown: {
        text: "Mascarici",
        id: 8
    }
};

function roleIsInnocent(role) {
    return !(role == "Mafia" || role == "Serialkiller");
}

const NIGHT_ROUND = {
    Mafia: 0,
    Serialkiller: 1,
    Vigilante: 2,
    Veteran: 3,
    Police: 4,
    Doctor: 5,
    Clown: 6,
    Town: 7,

    _toText: (round) => {
        switch (round) {
            case NIGHT_ROUND.Mafia: return "Mafia";
            case NIGHT_ROUND.Serialkiller: return "Serialkillerului";
            case NIGHT_ROUND.Vigilante: return "Vigilentului";
            case NIGHT_ROUND.Veteran: return "Veteranului";
            case NIGHT_ROUND.Police: return "Politistii";
            case NIGHT_ROUND.Doctor: return "Doctorii";
            case NIGHT_ROUND.Clown: return "Mascariciului";
            case NIGHT_ROUND.Town: return "Orasul";
        }

        return "Error";
    },

    _toText2: (round) => {
        switch (round) {
            case NIGHT_ROUND.Mafia: return "Mafia";
            case NIGHT_ROUND.Serialkiller: return "Serialkillerul";
            case NIGHT_ROUND.Vigilante: return "Vigilentul";
            case NIGHT_ROUND.Veteran: return "Veteranul";
            case NIGHT_ROUND.Police: return "Politistii";
            case NIGHT_ROUND.Doctor: return "Doctorii";
            case NIGHT_ROUND.Clown: return "Mascariciul";
            case NIGHT_ROUND.Town: return "Orasul";
        }

        return "Error";
    },

    _toRoundText: (round) => {
        switch (round) {
            case NIGHT_ROUND.Mafia: return "Runda mafiotilor";
            case NIGHT_ROUND.Serialkiller: return "Runda serialkillerului";
            case NIGHT_ROUND.Vigilante: return "Runda vigilentului";
            case NIGHT_ROUND.Veteran: return "Runda veteranului";
            case NIGHT_ROUND.Police: return "Runda politistilor";
            case NIGHT_ROUND.Doctor: return "Runda doctorilor";
            case NIGHT_ROUND.Clown: return "Runda mascariciului";
        }

        return "Error";
    },

    _roleIsForThisRound: (round, role) => {
        switch (round) {
            case NIGHT_ROUND.Mafia: return role == "Mafia" || role == "Godfather";
            case NIGHT_ROUND.Serialkiller: return role == "Serialkiller";
            case NIGHT_ROUND.Vigilante: return role == "Vigilante";
            case NIGHT_ROUND.Veteran: return role == "Veteran";
            case NIGHT_ROUND.Police: return role == "Policeman";
            case NIGHT_ROUND.Doctor: return role == "Doctor";
            case NIGHT_ROUND.Clown: return role == "Clown";
        }

        return false;
    }
};

const ROUND_ACTION = {
    SAVED_BY_DOCTOR: 0,
    KILLED_IN_NIGHT: 1,
    LYNCHED: 2,
    SELF_DEFENCE: 3,
    GUILTY: 4,
    INNOCENT: 5
}

const DEFAULT_ROUNDS_ORDER = [ 
    NIGHT_ROUND.Mafia, 
    NIGHT_ROUND.Serialkiller, 
    NIGHT_ROUND.Police, 
    NIGHT_ROUND.Vigilante,
    NIGHT_ROUND.Doctor,
    NIGHT_ROUND.Veteran
];

const DEFAULT_PLAYER = {
    name: "",
    role: -1,
    alive: true
};

const DEFAULT_GAME_SETTINGS = {

};

function createHashFromPlayers(players) {
    let hash = "";
    for (let i=0, length=players.length; i < length; ++i) {
        hash += players[i].name + "|" + PLAYER_ROLES[players[i].role].id + "|" + (players[i].alive ? "1" : "0") + "&";
    }

    return hash;
}

class WelcomePage extends React.Component {
    render() {
        return (
            <div id="welcomePage" className="main">
                <h1>Mafia Storyteller Helper</h1>
                <h2>Created by Aykelith@NiAl</h2>
                <button 
                    id="startBtn"
                    onClick={() => {
                        this.props.parent.state.gameStep = GAME_STEP.GAME_SETUP;
                        this.props.parent.setState(this.props.parent.state);
                    }}
                >
                    Start
                </button>
                <button
                    id="generatorBtn"
                    onClick={() => {

                    }}
                >
                    Generator
                </button>
            </div>
        );
    }
};

class GameSetupPage extends React.Component {
    render() {
        return (
            <div id="gameSetupPage" className="main">
                <h2>Game Setup</h2>
                <div className="block">
                    <div>Ordinea noptilor:</div>
                    <div id="nightsOrderCnt">
                        {
                            this.props.parent.state.nightOrder.map(round => {
                                return (
                                    <div key={`round${round}`}>
                                        <span>{NIGHT_ROUND._toText2(round)}</span>
                                        <div>
                                            
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <button
                    onClick={() => {
                        this.props.parent.state.gameStep = GAME_STEP.PLAYERS_SETUP;
                        this.props.parent.setState(this.props.parent.state);
                    }}
                >
                    Urmatorul
                </button>
            </div>
        )
    }
}

class PlayersSetupPage extends React.Component {
    constructor(props) {
        super(props);

        if (window.debugMode) {
            this.props.parent.state.players = [
                { name: "Mafia 1", role: "Mafia", alive: true },
                { name: "Mafia 2", role: "Mafia", alive: true },
                { name: "Godfather", role: "Godfather", alive: true },
                { name: "Policeman", role: "Policeman", alive: true },
                { name: "Policeman 2", role: "Policeman", alive: true },
                { name: "Veteran", role: "Veteran", alive: true, timesUsedBullet: 0 },
                { name: "Vigilante", role: "Vigilante", alive: true },
                { name: "Doctor", role: "Doctor", alive: true, timesSavedHimself: 0 },
                { name: "Mayor", role: "Mayor", alive: true },
                { name: "Clown", role: "Clown", alive: true },
                { name: "Serialkiller", role: "Serialkiller", alive: true }
            ]
        }
    }
    
    render() {
        return (
            <div id="playersSetupPage" className="main">
                <h2>Players setup</h2>
                <div>
                    <span>Numarul de jucatori: </span>
                    <input
                        type="number"
                        value={this.props.parent.state.players.length}
                        onChange={e => {
                            this.props.parent.state.players.length = parseInt(e.target.value);

                            for (let i=0, length = this.props.parent.state.players.length; i < length; ++i) {
                                if (!this.props.parent.state.players[i]) {
                                    this.props.parent.state.players[i] = Object.assign({}, DEFAULT_PLAYER);
                                }
                            }

                            this.props.parent.setState(this.props.parent.state);
                        }}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Nr</th>
                            <th>Nume</th>
                            <th>Rol</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.parent.state.players.map((player, index) => {
                                return (
                                    <tr key={`player${index}`}>
                                        <td>{index}</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={player.name}
                                                onChange={e => {
                                                    this.props.parent.state.players[index].name = e.target.value;
                                                    this.props.parent.setState(this.props.parent.state);
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                value={player.role}
                                                onChange={e => {
                                                    this.props.parent.state.players[index].role = e.target.value;

                                                    if (e.target.value == PLAYER_ROLES.Doctor) {
                                                        this.props.parent.state.players[index].timesSavedHimself = 0;
                                                    }

                                                    if (e.target.value == PLAYER_ROLES.Veteran) {
                                                        this.props.parent.state.players[index].timesUsedBullet = 0;
                                                    }

                                                    this.props.parent.setState(this.props.parent.state);
                                                }}
                                            >
                                                <option value={-1}>Niciun rol</option>
                                                {
                                                    Object.keys(PLAYER_ROLES).map(role => {
                                                        return <option key={role} value={role}>{PLAYER_ROLES[role].text}</option>;
                                                    })
                                                }
                                            </select>
                                        </td>
                                        <td></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <button
                    onClick={() => {
                        this.props.parent.state.gameStep = GAME_STEP.NIGHT;
                        console.log(this.props.parent.state.players);
                        this.props.parent.setState(this.props.parent.state);
                    }}
                >
                    Incepe jocul
                </button>
            </div>
        )
    }
}

class NightPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.calculateNight = this.calculateNight.bind(this);

        this.renderPlayer = this.renderPlayer.bind(this);

        this.renderDay = this.renderDay.bind(this);
        this.renderNight = this.renderNight.bind(this);

        this.renderSelectable = this.renderSelectable.bind(this);
        this.renderVeteran = this.renderVeteran.bind(this);

        this.wasProtectedByDoctor = this.wasProtectedByDoctor.bind(this);
        this.wasSelfDefence = this.wasSelfDefence.bind(this);
        this.isGuilty = this.isGuilty.bind(this);
        this.getRoleIndex = this.getRoleIndex.bind(this);
        this.getNameIndex = this.getNameIndex.bind(this);
        this.getRoleAlive = this.getRoleAlive.bind(this);
        this.countSpecial = this.countSpecial.bind(this);

        this.resetBetweenRounds = this.resetBetweenRounds.bind(this);
        this.prepareForNextNight = this.prepareForNextNight.bind(this);
        
        this.getResultMessage = this.getResultMessage.bind(this);
    }

    componentDidMount() {
        this.props.parent.createHash();
    }

    wasProtectedByDoctor(index) { return this.props.parent.state.night.doctorSelected == index; }
    wasSelfDefence(index) { return this.props.parent.state.night.veteranSelected == index };
    isGuilty(index) { return ['Mafia', 'Serialkiller'].includes(this.props.parent.state.players[index].role); }
    getRoleIndex(role) { 
        for (let i=0, length=this.props.parent.state.players.length; i < length; ++i) {
            if (this.props.parent.state.players[i].role == role && this.props.parent.state.players[i].alive) return i;
        } 

        return null;
    }
    getRoleAlive(role) {
        return this.props.parent.state.players
            .filter(player => NIGHT_ROUND._roleIsForThisRound(role, player.role) && player.alive);
    }
    getNameIndex(name) {
        for (let i=0, length=this.props.parent.state.players.length; i < length; ++i) {
            if (this.props.parent.state.players[i].name == name) return i;
        } 

        return null;
    }
    countSpecial(special) {
        let count = 0;
        for (let i=0, length=this.props.parent.state.players.length; i < length; ++i) {
            if (this.props.parent.state.players[i][special]) count += this.props.parent.state.players[i][special];
        } 

        return count;
    }

    resetBetweenRounds() {
        this.state.selectedPlayer = null;
        this.state.auxSelected = null;
        this.state.auxUnique = false;
        this.state.auxActivated = false;
    }

    prepareForNextNight() {
        this.props.parent.state.nightCurrentState = this.props.parent.state.nightOrder[this.props.parent.state.nightCurrentOrderIndex];

        if (this.props.parent.state.nightCurrentState == NIGHT_ROUND.Doctor) {
            this.state.auxActivated = true;
            this.state.auxUnique = true;
        }
    }

    calculateNight() {
        let night = this.props.parent.state.night;

        let veteranUsedTheBullet = false;

        if (night.townSelected != null) {
            console.log("TOWN", night.townSelected, this.props.parent.state.players[night.townSelected]);
            night.townSelected = { id: night.townSelected, action: ROUND_ACTION.KILLED_IN_NIGHT };
        }

        if (night.mafiaSelected != null) {
            console.log("MAFIA", night.mafiaSelected, this.props.parent.state.players[night.mafiaSelected]);
            if (this.wasSelfDefence(night.mafiaSelected)) {
                console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet);
                if (!veteranUsedTheBullet) {
                    ++this.props.parent.state.players[night.mafiaSelected].timesUsedBullet;
                    veteranUsedTheBullet = true;
                }

                let id = this.getRoleIndex('Godfather');
                this.props.parent.state.players[id].alive = false;
                night.mafiaSelected = { id: night.mafiaSelected, action: ROUND_ACTION.SELF_DEFENCE };
            } else if (this.wasProtectedByDoctor(night.mafiaSelected)) {
                console.log("   ", "WAS PROTECTED BY DOCTOR");
                night.mafiaSelected = { id: night.mafiaSelected, action: ROUND_ACTION.SAVED_BY_DOCTOR };
            } else {
                this.props.parent.state.players[night.mafiaSelected].alive = false;
                night.mafiaSelected = { id: night.mafiaSelected, action: ROUND_ACTION.KILLED_IN_NIGHT };
            }
        }
        
        if (night.serialkillerSelected != null) {
            console.log("SERIALKILLER", night.serialkillerSelected, this.props.parent.state.players[night.serialkillerSelected]);
            if (this.wasSelfDefence(night.serialkillerSelected)) {
                console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet);
                if (!veteranUsedTheBullet) {
                    ++this.props.parent.state.players[night.serialkillerSelected].timesUsedBullet;
                    veteranUsedTheBullet = true;
                }

                let id = this.getRoleIndex('Serialkiller');
                this.props.parent.state.players[id].alive = false;
                night.serialkillerSelected = { id: night.serialkillerSelected, action: ROUND_ACTION.SELF_DEFENCE };
            } else if (this.wasProtectedByDoctor(night.serialkillerSelected)) {
                console.log("   ", "WAS PROTECTED BY DOCTOR");
                night.serialkillerSelected = { id: night.serialkillerSelected, action: ROUND_ACTION.SAVED_BY_DOCTOR };
            } else {
                this.props.parent.state.players[night.serialkillerSelected].alive = false;
                night.serialkillerSelected = { id: night.serialkillerSelected, action: ROUND_ACTION.KILLED_IN_NIGHT };
            }
        }
        
        if (night.vigilanteSelected != null) {
            console.log("VIGILANTE", night.vigilanteSelected, this.props.parent.state.players[night.vigilanteSelected]);
            if (this.wasSelfDefence(night.vigilanteSelected)) {
                console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet);
                if (!veteranUsedTheBullet) {
                    ++this.props.parent.state.players[night.vigilanteSelected].timesUsedBullet;
                    veteranUsedTheBullet = true;
                }

                let id = this.getRoleIndex('Vigilante');
                this.props.parent.state.players[id].alive = false;
                night.vigilanteSelected = { id: night.vigilanteSelected, action: ROUND_ACTION.SELF_DEFENCE };
            } else if (this.wasProtectedByDoctor(night.vigilanteSelected)) {
                console.log("   ", "WAS PROTECTED BY DOCTOR");
                night.vigilanteSelected = { id: night.vigilanteSelected, action: ROUND_ACTION.SAVED_BY_DOCTOR };
            } else {
                this.props.parent.state.players[night.vigilanteSelected].alive = false;
                night.vigilanteSelected = { id: night.vigilanteSelected, action: ROUND_ACTION.KILLED_IN_NIGHT };
            }
        }

        if (night.policeSelected != null) {
            console.log("POLICE", night.policeSelected, this.props.parent.state.players[night.policeSelected]);

            night.policeSelected = { id: night.policeSelected, police: this.isGuilty(night.policeSelected) ? ROUND_ACTION.GUILTY : ROUND_ACTION.INNOCENT };

            if (this.wasSelfDefence(night.policeSelected)) {
                console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet, night.policeVeteranSelected, this.props.parent.state.players[night.policeVeteranSelected]);
                if (!veteranUsedTheBullet) {
                    ++this.props.parent.state.players[night.policeSelected].timesUsedBullet;
                    veteranUsedTheBullet = true;
                }

                this.props.parent.state.players[night.policeVeteranSelected].alive = false;
                night.policeSelected.action = ROUND_ACTION.SELF_DEFENCE;
            } else {
                night.policeSelected.action = 999;
            }
        }
        
        if (night.doctorSelected != null) {
            console.log("DOCTOR", night.doctorSelected, this.props.parent.state.players[night.doctorSelected]);
            if (this.wasSelfDefence(night.doctorSelected)) {
                if (!night.doctorVeteranSelected) night.doctorVeteranSelected = this.getRoleIndex("Doctor");

                console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet, night.doctorVeteranSelected, this.props.parent.state.players[night.doctorVeteranSelected]);
                if (!veteranUsedTheBullet) {
                    ++this.props.parent.state.players[night.doctorSelected].timesUsedBullet;
                    veteranUsedTheBullet = true;
                }

                this.props.parent.state.players[night.doctorVeteranSelected].alive = false;
            } else if (this.props.parent.state.players[night.doctorSelected].role == "Doctor") {
                ++this.props.parent.state.players[night.doctorSelected].timesSavedHimself;
            }

            night.doctorSelected = { id: night.doctorSelected };
        }

        if (night.veteranSelected != null && !veteranUsedTheBullet) {
            ++this.props.parent.state.players[night.veteranSelected].timesUsedBullet;
            veteranUsedTheBullet = true;
        }
    }

    renderPlayer(player, settings) {
        return (
            <div onClick={settings.onClick} className={`${player.role} ${settings.className || ""}`}>
                <div>{player.name} {window.debugMode && <span>({this.getNameIndex(player.name)})</span>}</div>
                <div>{settings.role ? settings.role(player) : PLAYER_ROLES[player.role].text}</div>
            </div>
        )
    }

    getResultMessage(round, result, className) {
        console.log(NIGHT_ROUND._toText(round), result);
        if (result == null) {
            if (round == NIGHT_ROUND.Town) {
                return <div><span>Orasul a decis sa nu omoare pe nimeni</span></div>
            }
    
            if (round == NIGHT_ROUND.Vigilante) {
                return <div className={className}><span>Vigilentul a ales sa nu omoare</span></div>
            }

            if (round == NIGHT_ROUND.Veteran) {
                return <div className={className}><span>Veteranul a ales sa nu-si foloseasca glontul</span></div>
            }

            return null;
        }

        if (round == NIGHT_ROUND.Veteran) {
            let message = "Veteranul si-a folosit glontul si-a omorat pe: ";

            let count = 0;
            for (let roundName in this.props.parent.state.night) {
                let _result = this.props.parent.state.night[roundName];
                if (typeof _result == 'object' && _result && _result.action == ROUND_ACTION.SELF_DEFENCE) {
                    ++count;
                    message += `<b>${this.props.parent.state.players[_result.id].name}(${PLAYER_ROLES[this.props.parent.state.players[_result.id].role].text})</b>,`;
                }
            }

            return <div className={className}>{ count > 0 ? <span dangerouslySetInnerHTML={{ __html: message }}></span> : "Veteranul si-a folosit glontul dar nu a omorat pe nimeni!" }</div>;
        }

        if (round == NIGHT_ROUND.Doctor) {
            let person = <b>{this.props.parent.state.players[result.id].name}({PLAYER_ROLES[this.props.parent.state.players[result.id].role].text})</b>;

            for (let roundName in this.props.parent.state.night) {
                let _result = this.props.parent.state.night[roundName];
                if (typeof _result == 'object' && _result && _result.action == ROUND_ACTION.SAVED_BY_DOCTOR) {
                    return <div className={className}><span>Doctorii au salvat pe cine trebuia! ({person})</span></div>;
                }
            }

            return <div className={className}><span>Doctorii nu au salvat pe cine trebuia! ({person})</span></div>
        }

        if (round == NIGHT_ROUND.Police) {
            return <div className={className}><span>Politistii au ales si a iesit {result.police == ROUND_ACTION.GUILTY ? "necurat" : "curat"} (<b>{this.props.parent.state.players[result.id].name}({PLAYER_ROLES[this.props.parent.state.players[result.id].role].text})</b>)</span></div>
        }

        if (result.action == ROUND_ACTION.KILLED_IN_NIGHT) {
            return <div className={className}><span>{NIGHT_ROUND._toText2(round)} au omorat pe <b>{this.props.parent.state.players[result.id].name}({PLAYER_ROLES[this.props.parent.state.players[result.id].role].text})</b></span></div>;
        } else if (result.action == ROUND_ACTION.SAVED_BY_DOCTOR || result.action == ROUND_ACTION.SELF_DEFENCE) {
            return <div className={className}><span>{NIGHT_ROUND._toText2(round)} nu au reusit sa omoare pe nimeni (<b>{this.props.parent.state.players[result.id].name}({PLAYER_ROLES[this.props.parent.state.players[result.id].role].text})</b>)</span></div>;
        }

        return null;
    }

    renderDay() {
        console.log("RRR", this.props.parent.state.night);

        return (
            <div id="nightPage_day" className="main">
                <h2 id="dayNumber">Ziua {this.props.parent.state.dayNumber}</h2>
                {
                    this.props.parent.state.night
                    &&
                    <div className="playersStatusCnt">
                        <h3>Noaptea trecuta</h3>
                        { this.getResultMessage(NIGHT_ROUND.Town, this.props.parent.state.night.townSelected) }
                        { this.getResultMessage(NIGHT_ROUND.Mafia, this.props.parent.state.night.mafiaSelected, "Mafia") }
                        { this.getResultMessage(NIGHT_ROUND.Serialkiller, this.props.parent.state.night.serialkillerSelected, "Serialkiller") }
                        { this.getResultMessage(NIGHT_ROUND.Police, this.props.parent.state.night.policeSelected, "Policeman") }
                        { this.getResultMessage(NIGHT_ROUND.Vigilante, this.props.parent.state.night.vigilanteSelected, "Vigilante") }
                        { this.getResultMessage(NIGHT_ROUND.Doctor, this.props.parent.state.night.doctorSelected, "Doctor") }
                        { this.getResultMessage(NIGHT_ROUND.Veteran, this.props.parent.state.night.veteranSelected, "Veteran") }
                    </div>
                }
                <div className="playersStatusCnt">
                    <h3>Lista jucatori</h3>
                    <h4>(selecteaza un jucator pentru a-l linsa)</h4>
                    {
                        this.props.parent.state.players
                            .map((player, index) => {
                            let index2 = this.getNameIndex(player.name);

                            return this.renderPlayer(
                                player, 
                                {
                                    className: `${this.state.selectedPlayer == index2 ? "selected" : ""} ${!player.alive ? "deleted" : ""}`, 
                                    onClick: () => {
                                        if (!player.alive) return;

                                        this.state.selectedPlayer = this.state.selectedPlayer == index2 ? null : index2;
                                        this.setState(this.state);
                                    }
                                }
                            );
                        })
                    }
                </div>
                <button
                    id="startNightBtn"
                    onClick={e => {
                        this.props.parent.state.night = { townSelected: this.state.selectedPlayer }
                        if (this.state.selectedPlayer) {
                            this.props.parent.state.players[this.state.selectedPlayer].alive = false;
                        }

                        this.state.selectedPlayer = null;
                        this.state.auxSelected = null;
                        this.state.auxActivated = false;
                        this.state.auxUnique = false;
                        this.state.veteranButton = null;

                        this.props.parent.state.isNight = true;
                        ++this.props.parent.state.dayNumber;
                        this.props.parent.state.nightCurrentState = this.props.parent.state.nightOrder[0];
                        this.props.parent.state.nightCurrentOrderIndex = 0;

                        if (this.getRoleIndex("Godfather") == null) {
                            this.state.auxActivated = true;
                        }

                        this.props.parent.setState(this.props.parent.state, () => { window.scrollTo(0,0); });

                        console.log("PLAYERS", this.props.parent.state.players);
                    }}
                >
                    Incepe noaptea
                </button>
            </div>
        )
    }

    renderSelectable(settings) {
        console.log("SETTINGS", settings);
        return (
            <div id="mafiaStep" className="nightStep">
                <div className="playersStatusCnt">
                    <h3>{settings.title}</h3>
                    <h4>{settings.subtitle}</h4>
                    {
                        this.props.parent.state.players
                            .filter(player => !NIGHT_ROUND._roleIsForThisRound(this.props.parent.state.nightCurrentState, player.role) && player.alive)
                            .sort(settings.filter ? settings.filter : (player1, player2) => player1.role > player2.role)
                            .map((player, index) => {
                            let index2 = this.getNameIndex(player.name);
                            return this.renderPlayer(
                                player, 
                                Object.assign(
                                    {
                                        className: settings.className ? 
                                            `${this.state.selectedPlayer == index2 ? "selected" : ""} ${settings.className(player, index2)}` : 
                                            this.state.selectedPlayer == index2 && "selected", 
                                        onClick: () => {
                                            if (settings.playersLength == 0) return;

                                            this.state.selectedPlayer = this.state.selectedPlayer == index2 ? null : index2;
                                            if (this.state.auxUnique) this.state.auxSelected = null;
                                            this.setState(this.state);
                                        },
                                    }, 
                                    settings.player || {}
                                )
                            );
                        })
                    }
                </div>
            </div>
        )
    }

    renderVeteran() {
        return (
            <div id="veteranStep" className="nightStep">
                <h3>Vrei sa folosesti glontul?</h3>
                <div id="buttonsCnt">
                    <button 
                        className={this.state.veteranButton == 1 && 'selected'}
                        onClick={() => {
                            this.props.parent.state.night.veteranSelected = this.getRoleIndex('Veteran');
                            this.state.veteranButton = 1;
                            this.setState(this.state);
                        }}
                    >
                        Da
                    </button>
                    <button 
                        className={this.state.veteranButton == 2 && 'selected'}
                        onClick={() => {
                            this.props.parent.state.night.veteranSelected = null;
                            this.state.veteranButton = 2;
                            this.setState(this.state);
                        }}
                    >
                        Nu
                    </button>
                </div>
                {
                    this.props.parent.state.night.veteranSelected
                    &&
                    this.props.parent.state.night.policeSelected == this.props.parent.state.night.veteranSelected
                    && 
                    this.getRoleAlive(NIGHT_ROUND.Police).length > 1
                    &&
                    <div className="playersStatusCnt">
                        <h3>Lista politisti</h3>
                        <h4>(selecteaza un politist pentru a-l omori)</h4>
                        {
                            this.getRoleAlive(NIGHT_ROUND.Police).map((player, index) => {
                                let index2 = this.getNameIndex(player.name);
                                return this.renderPlayer(player, 
                                    {
                                        className: this.props.parent.state.night.policeVeteranSelected == index2 && "selected", 
                                        onClick: () => {
                                            this.props.parent.state.night.policeVeteranSelected = this.props.parent.state.night.policeVeteranSelected == index2 ? null : index2;
                                            this.props.parent.setState(this.props.parent.state);
                                        }
                                    }
                                );
                            })
                        }
                    </div>
                }
                {
                    this.props.parent.state.night.veteranSelected
                    &&
                    this.props.parent.state.night.doctorSelected == this.props.parent.state.night.veteranSelected
                    && 
                    this.getRoleAlive(NIGHT_ROUND.Doctor).length > 1
                    &&
                    <div className="playersStatusCnt">
                        <h3>Lista doctori</h3>
                        <h4>(selecteaza un doctor pentru a-l omori)</h4>
                        {
                            this.getRoleAlive(NIGHT_ROUND.Doctor).map((player, index) => {
                                let index2 = this.getNameIndex(player.name);
                                return this.renderPlayer(player, this.props.parent.state.night.doctorVeteranSelected == index2 && "selected", () => {
                                    this.props.parent.state.night.doctorVeteranSelected = this.props.parent.state.night.doctorVeteranSelected == index2 ? null : index2;
                                    this.props.parent.setState(this.props.parent.state);
                                });
                            })
                        }
                    </div>
                }
            </div>
        )
    }

    renderNight() {
        let currentRoundPlayers = this.props.parent.state.players
            .filter(player => NIGHT_ROUND._roleIsForThisRound(this.props.parent.state.nightCurrentState, player.role) && player.alive)
            .sort((player1, player2) => player1.role > player2.role);
            
        return (
            <div id="nightPage_night" className="main">
                <h1>{NIGHT_ROUND._toRoundText(this.props.parent.state.nightCurrentState)}</h1>
                {
                    this.props.parent.state.nightCurrentState == NIGHT_ROUND.Doctor
                    &&
                    <div className="specialCnt">Medicii s-or salvat pe ei de {this.countSpecial("timesSavedHimself")} ori</div>
                }
                {
                    this.props.parent.state.nightCurrentState == NIGHT_ROUND.Veteran
                    &&
                    <div className="specialCnt">Veteranul o folosit glontul de {this.countSpecial("timesUsedBullet")} ori</div>
                }
                <div className="playersStatusCnt">
                    <h3>Lista jucatori</h3>
                    {
                        currentRoundPlayers.map((player, index) => {
                            let index2 = this.getNameIndex(player.name);
                            return this.renderPlayer(player, 
                                {
                                    className: this.state.auxActivated && this.state.auxSelected == index2 && "selected", 
                                    onClick: () => {
                                        this.state.auxSelected = this.state.auxSelected == index2 ? null : index2;
                                        if (this.state.auxUnique) this.state.selectedPlayer = null;
                                        this.setState(this.state);
                                    }
                                }
                            );
                        })
                    }
                </div>
                {
                    this.props.parent.state.nightCurrentState == NIGHT_ROUND.Mafia
                    &&
                    this.renderSelectable({ title: "Posibile victime", subtitle: "(selecteaza o victima)", required: true, playersLength: currentRoundPlayers.length })
                }
                {
                    this.props.parent.state.nightCurrentState == NIGHT_ROUND.Serialkiller
                    &&
                    this.renderSelectable({ title: "Posibile victime", subtitle: "(selecteaza o victima)", playersLength: currentRoundPlayers.length })
                }
                {
                    this.props.parent.state.nightCurrentState == NIGHT_ROUND.Police
                    &&
                    this.renderSelectable({ 
                        title: "Posibili criminali", 
                        subtitle: "(selecteaza un jucator)",
                        filter: (player1, player2) => roleIsInnocent(player1.role) > roleIsInnocent(player2.role),
                        className: (player, index) => roleIsInnocent(player.role) ? "innocent" : "guilty",
                        player: {
                            role: (player) => roleIsInnocent(player.role) ? "Inocent" : "Vinovant"
                        }, 
                        playersLength: currentRoundPlayers.length 
                    })
                }
                {
                    this.props.parent.state.nightCurrentState == NIGHT_ROUND.Vigilante
                    &&
                    this.renderSelectable({ title: "Posibile victime", subtitle: "(selecteaza o victima sau nu)", playersLength: currentRoundPlayers.length })
                }
                {
                    this.props.parent.state.nightCurrentState == NIGHT_ROUND.Doctor
                    &&
                    this.renderSelectable({ title: "Posibile victime", subtitle: "(selecteaza o victima sau nu)", playersLength: currentRoundPlayers.length })
                }
                {
                    this.props.parent.state.nightCurrentState == NIGHT_ROUND.Veteran
                    &&
                    this.renderVeteran()
                }
                <div id="buttonsCnt">
                    <button
                        id="backState"
                        onClick={() => {
                            this.resetBetweenRounds();

                            --this.props.parent.state.nightCurrentOrderIndex;
                            if (this.props.parent.state.nightCurrentOrderIndex == -1) {
                                this.props.parent.state.isNight = false;
                                --this.props.parent.state.dayNumber;
                                this.props.parent.state.night = Object.assign({}, this.props.parent.state.lastNight);
                            } else {
                                this.prepareForNextNight();
                            }

                            this.props.parent.setState(this.props.parent.state, () => { window.scrollTo(0,0); });
                        }}
                    >
                        Inapoi
                    </button>
                    <button 
                        id="nextState"
                        onClick={() => {
                            if (this.props.parent.state.nightCurrentState == NIGHT_ROUND.Mafia) {
                                if (currentRoundPlayers.length > 0 && this.state.selectedPlayer == null) {
                                    return alert("Selecteaza un jucator");
                                }

                                if (currentRoundPlayers.length > 0 && this.getRoleIndex("Godfather") == null) {
                                    if (this.state.auxSelected == null) return alert("Selecteaza noul Godfather");
                                    else {
                                        this.props.parent.state.players[this.state.auxSelected].role = "Godfather";
                                    }
                                }

                                this.props.parent.state.night.mafiaSelected = this.state.selectedPlayer;
                            } else if (this.props.parent.state.nightCurrentState == NIGHT_ROUND.Serialkiller) {
                                if (currentRoundPlayers.length > 0 && this.state.selectedPlayer == null) {
                                    return alert("Selecteaza un jucator");
                                }

                                this.props.parent.state.night.serialkillerSelected = this.state.selectedPlayer;
                            } else if (this.props.parent.state.nightCurrentState == NIGHT_ROUND.Police) {
                                if (currentRoundPlayers.length > 0 && this.state.selectedPlayer == null) {
                                    return alert("Selecteaza un jucator");
                                }

                                this.props.parent.state.night.policeSelected = this.state.selectedPlayer;
                            } else if (this.props.parent.state.nightCurrentState == NIGHT_ROUND.Vigilante) {
                                this.props.parent.state.night.vigilanteSelected = this.state.selectedPlayer;
                            } else if (this.props.parent.state.nightCurrentState == NIGHT_ROUND.Veteran) {
                                if (this.props.parent.state.night.veteranSelected === undefined) {
                                    return alert("Selecteaza DA sau NU");
                                }

                                if (this.props.parent.state.night.veteranSelected) {
                                    if (this.props.parent.state.night.policeSelected == this.props.parent.state.night.veteranSelected && this.getRoleAlive(NIGHT_ROUND.Police).length > 1 && !this.props.parent.state.night.policeVeteranSelected) {
                                        return alert("Selecteaza un politist");
                                    }

                                    if (this.props.parent.state.night.doctorSelected == this.props.parent.state.night.veteranSelected && this.getRoleAlive(NIGHT_ROUND.Doctor).length > 1 && !this.props.parent.state.night.doctorVeteranSelected) {
                                        return alert("Selecteaza un doctor");
                                    }
                                }
                            } else if (this.props.parent.state.nightCurrentState == NIGHT_ROUND.Doctor) {
                                if (currentRoundPlayers.length > 0 && this.state.selectedPlayer == null && this.state.auxSelected == null) {
                                    return alert("Selecteaza un jucator");
                                }

                                this.props.parent.state.night.doctorSelected = this.state.selectedPlayer || this.state.auxSelected;
                            }

                            this.resetBetweenRounds();

                            ++this.props.parent.state.nightCurrentOrderIndex;

                            if (this.props.parent.state.nightCurrentOrderIndex >= this.props.parent.state.nightOrder.length) {
                                this.calculateNight();
                                this.props.parent.state.lastNight = Object.assign({}, this.props.parent.state.night);
                                this.props.parent.state.isNight = false;

                                this.props.parent.createHash();
                            } else {
                                this.prepareForNextNight();
                            }
                            
                            this.props.parent.setState(this.props.parent.state, () => { window.scrollTo(0,0); });
                        }}
                    >
                        Urmatorul
                    </button>
                </div>
            </div>
        )
    }

    render() {
        return this.props.parent.state.isNight ? this.renderNight() : this.renderDay();
    }
}

class GeneratorPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        <div id="generatorPage" className="main">
            <h2>Generator</h2>
            <div id="presetCnt">
                <div id="presetSelectCnt">
                    <span>Preset:</span>
                </div>
            </div>
        </div>
    }
};

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameStep: GAME_STEP.WELCOME,
            gameSettings: Object.assign({}, DEFAULT_GAME_SETTINGS),

            players: [],
            nightOrder: DEFAULT_ROUNDS_ORDER.slice(),

            dayNumber: 1,
            isNight: false,

            nightCurrentState: null,
            nightCurrentOrderIndex: 0,
            night: null,
            lastNight: null
        };

        this.createHash = this.createHash.bind(this);
    }

    componentDidMount() {
        window.packCompresser = window.JsonUrl('pack'); // JsonUrl is added to the window object

        if (window.location.hash) {
            window.packCompresser.decompress(window.location.hash)
                .then(json => { 
                    Object.assign(this.state, json);

                    this.state.lastNight = Object.assign({}, this.state.night);

                    this.state.gameStep = GAME_STEP.NIGHT;
                    this.setState(this.state);
                });
        }
    }

    createHash() {
        window.packCompresser.compress(
            { 
                players: this.state.players, 
                night: this.state.night,
                dayNumber: this.state.dayNumber
            }
        ).then(output => window.location.hash = output);
    }

    render() {
        let displayBlock = null;
        if (this.state.gameStep == GAME_STEP.WELCOME) displayBlock = <WelcomePage parent={this}/>
        else if (this.state.gameStep == GAME_STEP.GAME_SETUP) displayBlock = <GameSetupPage parent={this}/>
        else if (this.state.gameStep == GAME_STEP.PLAYERS_SETUP) displayBlock = <PlayersSetupPage parent={this}/>
        else if (this.state.gameStep == GAME_STEP.NIGHT) displayBlock = <NightPage parent={this}/>
        else if (this.state.gameStep == GAME_STEP.GENERATOR) displayBlock = <GeneratorPage parent={this}/>

        return displayBlock;
    }
};

ReactDOM.render(
    <MainPage/>,
    document.getElementById('root')
);