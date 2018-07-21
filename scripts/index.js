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
        text: "Capul mafiei",
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

    _toText: (round) => {
        switch (round) {
            case NIGHT_ROUND.Mafia: return "Mafia";
            case NIGHT_ROUND.Serialkiller: return "Serialkillerii";
            case NIGHT_ROUND.Vigilante: return "Vigilentii";
            case NIGHT_ROUND.Veteran: return "Veteranii";
            case NIGHT_ROUND.Police: return "Politistii";
            case NIGHT_ROUND.Doctor: return "Doctorii";
            case NIGHT_ROUND.Clown: return "Mascaricii";
        }

        return "Error";
    },

    _toRoundText: (round) => {
        switch (round) {
            case NIGHT_ROUND.Mafia: return "Runda mafiotilor";
            case NIGHT_ROUND.Serialkiller: return "Runda serialkiller-ilor";
            case NIGHT_ROUND.Vigilante: return "Runda vigilentilor";
            case NIGHT_ROUND.Veteran: return "Runda veteranilor";
            case NIGHT_ROUND.Police: return "Runda politistilor";
            case NIGHT_ROUND.Doctor: return "Runda doctorilor";
            case NIGHT_ROUND.Clown: return "Runda mascariciilor";
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
                                        <span>{NIGHT_ROUND._toText(round)}</span>
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

        this.props.parent.state.players = [
            { name: "Mafia 1", role: "Mafia", alive: true },
            { name: "Mafia 2", role: "Mafia", alive: true },
            { name: "Godfather", role: "Godfather", alive: true },
            { name: "Policeman", role: "Policeman", alive: true },
            { name: "Policeman 2", role: "Policeman", alive: true },
            { name: "Veteran", role: "Veteran", alive: true },
            { name: "Vigilante", role: "Vigilante", alive: true },
            { name: "Doctor", role: "Doctor", alive: true },
            { name: "Mayor", role: "Mayor", alive: true },
            { name: "Clown", role: "Clown", alive: true },
            { name: "Serialkiller", role: "Serialkiller", alive: true }
        ]
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
        this.getRoleAlive = this.getRoleAlive.bind(this);
        
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
            if (this.props.parent.state.players[i].role == role) return i;
        } 

        return null;
    }
    getRoleAlive(role) {
        return this.props.parent.state.players
            .filter(player => NIGHT_ROUND._roleIsForThisRound(role, player.role) && player.alive);
    }

    calculateNight() {
        let night = this.props.parent.state.night;
        night.otherDeaths = [];

        let veteranUsedTheBullet = false;

        if (night.mafiaSelected) {
            console.log("MAFIA", night.mafiaSelected, this.props.parent.state.players[night.mafiaSelected]);
            if (this.wasSelfDefence(night.mafiaSelected)) {
                console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet);
                if (!veteranUsedTheBullet) {
                    --this.props.parent.state.players[night.mafiaSelected].bullets;
                    veteranUsedTheBullet = true;
                }

                let id = this.getRoleIndex('Godfather');
                this.props.parent.state.players[id].alive = false;
                night.mafiaSelected = { id: id, action: ROUND_ACTION.SELF_DEFENCE };
            } else if (this.wasProtectedByDoctor(night.mafiaSelected)) {
                console.log("   ", "WAS PROTECTED BY DOCTOR");
                night.mafiaSelected = { id: night.mafiaSelected, action: ROUND_ACTION.SAVED_BY_DOCTOR };
            } else {
                this.props.parent.state.players[night.mafiaSelected].alive = false;
                night.mafiaSelected = { id: night.mafiaSelected, action: ROUND_ACTION.KILLED_IN_NIGHT };
            }
        }
        
        if (night.serialkillerSelected) {
            console.log("SERIALKILLER", night.serialkillerSelected, this.props.parent.state.players[night.serialkillerSelected]);
            if (this.wasSelfDefence(night.serialkillerSelected)) {
                console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet);
                if (!veteranUsedTheBullet) {
                    --this.props.parent.state.players[night.serialkillerSelected].bullets;
                    veteranUsedTheBullet = true;
                }

                let id = this.getRoleIndex('Serialkiller');
                this.props.parent.state.players[id].alive = false;
                night.serialkillerSelected = { id: id, action: ROUND_ACTION.SELF_DEFENCE };
            } else if (this.wasProtectedByDoctor(night.serialkillerSelected)) {
                console.log("   ", "WAS PROTECTED BY DOCTOR");
                night.serialkillerSelected = { id: night.serialkillerSelected, action: ROUND_ACTION.SAVED_BY_DOCTOR };
            } else {
                this.props.parent.state.players[night.serialkillerSelected].alive = false;
                night.serialkillerSelected = { id: night.serialkillerSelected, action: ROUND_ACTION.KILLED_IN_NIGHT };
            }
        }
        
        if (night.vigilanteSelected) {
            console.log("VIGILANTE", night.vigilanteSelected, this.props.parent.state.players[night.vigilanteSelected]);
            if (this.wasSelfDefence(night.vigilanteSelected)) {
                console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet);
                if (!veteranUsedTheBullet) {
                    --this.props.parent.state.players[night.vigilanteSelected].bullets;
                    veteranUsedTheBullet = true;
                }

                let id = this.getRoleIndex('Vigilante');
                this.props.parent.state.players[id].alive = false;
                night.vigilanteSelected = { id: id, action: ROUND_ACTION.SELF_DEFENCE };
            } else if (this.wasProtectedByDoctor(night.vigilanteSelected)) {
                console.log("   ", "WAS PROTECTED BY DOCTOR");
                night.vigilanteSelected = { id: night.vigilanteSelected, action: ROUND_ACTION.SAVED_BY_DOCTOR };
            } else {
                this.props.parent.state.players[night.vigilanteSelected].alive = false;
                night.vigilanteSelected = { id: night.vigilanteSelected, action: ROUND_ACTION.KILLED_IN_NIGHT };
            }
        }

        if (night.policeSelected) {
            console.log("POLICE", night.policeSelected, this.props.parent.state.players[night.policeSelected]);
            if (this.wasSelfDefence(night.policeSelected)) {
                console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet, night.policeVeteranSelected, this.props.parent.state.players[night.policeVeteranSelected]);
                if (!veteranUsedTheBullet) {
                    --this.props.parent.state.players[night.policeSelected].bullets;
                    veteranUsedTheBullet = true;
                }

                this.props.parent.state.players[night.policeVeteranSelected].alive = false;
                night.otherDeaths.push({ id: night.policeVeteranSelected, action: ROUND_ACTION.SELF_DEFENCE });
            }

            night.policeSelected = { id: night.policeSelected, action: this.isGuilty(night.policeSelected) ? ROUND_ACTION.GUILTY : ROUND_ACTION.INNOCENT };
        }
        
        if (night.doctorSelected) {
            console.log("DOCTOR", night.doctorSelected, this.props.parent.state.players[night.doctorSelected]);
            if (this.wasSelfDefence(night.doctorSelected)) {
                console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet, night.doctorVeteranSelected, this.props.parent.state.players[night.doctorVeteranSelected]);
                if (!veteranUsedTheBullet) {
                    --this.props.parent.state.players[night.doctorSelected].bullets;
                    veteranUsedTheBullet = true;
                }

                this.props.parent.state.players[night.doctorVeteranSelected].alive = false;
                night.otherDeaths.push({ id: night.doctorVeteranSelected, action: ROUND_ACTION.SELF_DEFENCE });
            }

            night.doctorSelected = { id: night.doctorSelected, action: this.isGuilty(night.doctorSelected) ? ROUND_ACTION.GUILTY : ROUND_ACTION.INNOCENT };
        }
    }

    renderPlayer(player, settings) {
        return (
            <div onClick={settings.onClick} className={`${player.role} ${settings.className || ""}`}>
                <div>{player.name}</div>
                <div>{settings.role ? settings.role(player) : PLAYER_ROLES[player.role].text}</div>
            </div>
        )
    }

    getResultMessage(round, result) {
        if (round == NIGHT_ROUND.Mafia) {
            if (result.action == ROUND_ACTION.KILLED_IN_NIGHT) {
                return <span>Mafiotii au omorat pe <b>{this.props.parent.state.players[this.props.parent.state.night.mafiaSelected.id].name}</b></span>;
            } else if (result.action == ROUND_ACTION.SELF_DEFENCE) {
                return <span>Mafiotii fraierii</span>;
            }
        }
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
                        {
                            this.props.parent.state.night.mafiaSelected
                            &&
                            <div className="Mafia">{this.getResultMessage(NIGHT_ROUND.Mafia, this.props.parent.state.night.mafiaSelected)}</div>
                        }
                        {
                            this.props.parent.state.night.serialkillerSelected
                            &&
                            <div className="Serialkiller">Serialkiller-ii au selectat pe {this.props.parent.state.night.serialkillerSelected.id} si {this.props.parent.state.night.serialkillerSelected.action}</div>
                        }
                    </div>
                }
                <div className="playersStatusCnt">
                    <h3>Lista jucatori</h3>
                    <h4>(selecteaza un jucator pentru a-l linsa)</h4>
                    {
                        this.props.parent.state.players
                            .map((player, index) => {
                            return this.renderPlayer(
                                player, 
                                {
                                    className: `${this.state.selectedPlayer == index ? "selected" : ""} ${!player.alive ? "deleted" : ""}`, 
                                    onClick: () => {
                                        console.log(player.alive);
                                        if (!player.alive) return;

                                        this.state.selectedPlayer = this.state.selectedPlayer == index ? null : index;
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
                        this.state.selectedPlayer = null;
                        this.state.auxSelected = null;
                        this.state.auxActivated = false;
                        this.state.veteranButton = null;

                        this.props.parent.state.isNight = true;
                        ++this.props.parent.state.dayNumber;
                        this.props.parent.state.nightCurrentState = this.props.parent.state.nightOrder[0];
                        this.props.parent.state.nightCurrentOrderIndex = 0;
                        this.props.parent.state.night = {};
                        this.props.parent.setState(this.props.parent.state);
                    }}
                >
                    Incepe noaptea
                </button>
            </div>
        )
    }

    renderSelectable(settings) {
        console.log(settings);
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
                            return this.renderPlayer(
                                player, 
                                Object.assign(
                                    {
                                        className: settings.className ? 
                                            `${this.state.selectedPlayer == index ? "selected" : ""} ${settings.className(player, index)}` : 
                                            this.state.selectedPlayer == index && "selected", 
                                        onClick: () => {
                                            this.state.selectedPlayer = this.state.selectedPlayer == index ? null : index;
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
                                return this.renderPlayer(player, 
                                    {
                                        className: this.props.parent.state.night.policeVeteranSelected == index && "selected", 
                                        onClick: () => {
                                            this.props.parent.state.night.policeVeteranSelected = this.props.parent.state.night.policeVeteranSelected == index ? null : index;
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
                                return this.renderPlayer(player, this.props.parent.state.night.doctorVeteranSelected == index && "selected", () => {
                                    this.props.parent.state.night.doctorVeteranSelected = this.props.parent.state.night.doctorVeteranSelected == index ? null : index;
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
                <div className="playersStatusCnt">
                    <h3>Lista jucatori</h3>
                    {
                        currentRoundPlayers.map((player, index) => {
                            return this.renderPlayer(player, 
                                {
                                    className: this.state.auxActivated && this.state.auxSelected == index && "selected", 
                                    onClick: () => {
                                        this.state.auxSelected = this.state.auxSelected == index ? null : index;
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
                    this.renderSelectable({ title: "Posibile victime", subtitle: "(selecteaza o victima)", required: true })
                }
                {
                    this.props.parent.state.nightCurrentState == NIGHT_ROUND.Serialkiller
                    &&
                    this.renderSelectable({ title: "Posibile victime", subtitle: "(selecteaza o victima)" })
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
                        }
                    })
                }
                {
                    this.props.parent.state.nightCurrentState == NIGHT_ROUND.Vigilante
                    &&
                    this.renderSelectable({ title: "Posibile victime", subtitle: "(selecteaza o victima sau nu)" })
                }
                {
                    this.props.parent.state.nightCurrentState == NIGHT_ROUND.Doctor
                    &&
                    this.renderSelectable({ title: "Posibile victime", subtitle: "(selecteaza o victima sau nu)" })
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
                                        return alert("Selecteaza un politis");
                                    }

                                    if (this.props.parent.state.night.doctorSelected == this.props.parent.state.night.veteranSelected && this.getRoleAlive(NIGHT_ROUND.Doctor).length > 1 && !this.props.parent.state.night.doctorVeteranSelected) {
                                        return alert("Selecteaza un doctor");
                                    }
                                }
                            } else if (this.props.parent.state.nightCurrentState == NIGHT_ROUND.Doctor) {
                                if (currentRoundPlayers.length > 0 && this.state.selectedPlayer == null) {
                                    return alert("Selecteaza un jucator");
                                }

                                this.props.parent.state.night.doctorSelected = this.state.selectedPlayer;
                            }

                            this.state.selectedPlayer = null;
                            this.state.auxSelected = null;
                            this.state.auxActivated = false;

                            ++this.props.parent.state.nightCurrentOrderIndex;

                            if (this.props.parent.state.nightCurrentOrderIndex >= this.props.parent.state.nightOrder.length) {
                                this.calculateNight();
                                this.props.parent.state.isNight = false;
                            } else {
                                this.props.parent.state.nightCurrentState = this.props.parent.state.nightOrder[this.props.parent.state.nightCurrentOrderIndex];
                            }
                            
                            this.props.parent.setState(this.props.parent.state);
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
            nights: []
        };

        this.createHash = this.createHash.bind(this);
    }

    componentDidMount() {
        let decodedURI = decodeURIComponent(window.location.hash);
        let token1 = decodedURI.indexOf("&&");

        if (token1 == -1) return; 
        
        let playersString = decodedURI.substring(1, token1);
        console.log("playersString", playersString);

        let players = playersString.split("&");
        for (let i=0, length=players.length; i < length; ++i) {
            let chars = players[i].split("|");

            console.log(players[i], chars);

            this.state.players.push({
                name: chars[0],
                role: Object.keys(PLAYER_ROLES).filter(role => PLAYER_ROLES[role].id == chars[1])[0],
                alive: chars[2] == "1" ? true : false
            });
        }

        console.log(this.state.players);

        let token2 = decodedURI.indexOf("&&", token1 + 1);
        this.state.day = parseInt(decodedURI.substring(token1 + 2, token2));

        this.state.gameStep = GAME_STEP.NIGHT;
        this.setState(this.state);
    }

    createHash() {
        window.location.hash = createHashFromPlayers(this.state.players) + "&" + this.state.dayNumber + "&&";
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