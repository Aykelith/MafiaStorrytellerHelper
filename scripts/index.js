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

const DEFAULT_ROUNDS_ORDER = [ 
    NIGHT_ROUND.Mafia, 
    NIGHT_ROUND.Serialkiller, 
    NIGHT_ROUND.Police, 
    NIGHT_ROUND.Vigilante,
    NIGHT_ROUND.Veteran, 
    NIGHT_ROUND.Doctor 
];

const DEFAULT_PLAYER = {
    name: "",
    role: -1,
    alive: true
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
            { name: "Mafia 1", role: "Mafia" },
            { name: "Mafia 2", role: "Mafia" },
            { name: "Godfather", role: "Godfather" },
            { name: "Policeman", role: "Policeman" },
            { name: "Veteran", role: "Veteran" },
            { name: "Vigilante", role: "Vigilante" },
            { name: "Doctor", role: "Doctor" },
            { name: "Mayor", role: "Mayor" },
            { name: "Clown", role: "Clown" },
            { name: "Serialkiller", role: "Serialkiller" }
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

        this.renderPlayer = this.renderPlayer.bind(this);

        this.renderDay = this.renderDay.bind(this);
        this.renderNight = this.renderNight.bind(this);

        this.renderMafia = this.renderMafia.bind(this);
    }

    componentDidMount() {
        this.props.parent.createHash();
    }

    renderPlayer(player, onClick) {
        return (
            <div onClick={onClick} className={`${player.role}`}>
                <div>{player.name}</div>
                <div>{PLAYER_ROLES[player.role].text}</div>
            </div>
        )
    }

    renderDay() {
        return (
            <div id="nightPage_day" className="main">
                <h2 id="dayNumber">Ziua {this.props.parent.state.dayNumber}</h2>
                <div id="playersStatusCnt">
                    <h3>Lista jucatori</h3>
                    {
                        this.props.parent.state.players.map((player, index) => {
                            return this.renderPlayer(player);
                        })
                    }
                </div>
                <button
                    id="startNightBtn"
                    onClick={e => {
                        this.props.parent.state.isNight = true;
                        ++this.props.parent.state.dayNumber;
                        this.props.parent.state.nightCurrentState = this.props.parent.state.nightOrder[0]
                        this.props.parent.setState(this.props.parent.state);
                    }}
                >
                    Incepe noaptea
                </button>
            </div>
        )
    }

    renderMafia() {
        return (
            <div id="mafiaStep" className="nightStep">
                {
                    this.props.parent.state.players
                        .filter(player => !NIGHT_ROUND._roleIsForThisRound(this.props.parent.state.nightCurrentState, player.role) && player.alive)
                        .map((player, index) => {
                        return this.renderPlayer(player);
                    })
                }
            </div>
        )
    }

    renderNight() {
        console.log(this.props.parent.state.players
            .filter(player => NIGHT_ROUND._roleIsForThisRound(this.props.parent.state.nightCurrentState, player.role) && player.alive));
            
        return (
            <div id="nightPage_night" className="main">
                <h1>{NIGHT_ROUND._toRoundText(this.props.parent.state.nightCurrentState)}</h1>
                <div id="selectedStepPlayersCnt">
                    {
                        this.props.parent.state.players
                            .filter(player => NIGHT_ROUND._roleIsForThisRound(this.props.parent.state.nightCurrentState, player.role) && player.alive)
                            .map((player, index) => {
                            return this.renderPlayer(player);
                        })
                    }
                </div>
                <button 
                    id="nextState"
                >
                    Urmatorul
                </button>
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

            players: [],
            nightOrder: DEFAULT_ROUNDS_ORDER.slice(),

            dayNumber: 1,
            isNight: false,

            nightCurrentState: null
        };

        this.createHash = this.createHash.bind(this);
    }

    componentDidMount() {
        let token1 = window.location.hash.indexOf("&&");

        if (token1 == -1) return; 

        let playersString = decodeURIComponent(window.location.hash).substring(1, window.location.hash.indexOf("&&")-4);
        console.log("playersString", playersString);

        let players = playersString.split("&");
        for (let i=0, length=players.length; i < length; ++i) {
            let chars = players[i].split("|");

            this.state.players.push({
                name: chars[0],
                role: Object.keys(PLAYER_ROLES).filter(role => PLAYER_ROLES[role].id == chars[1])[0],
                alive: chars[2] == "1" ? true : false
            });
        }

        console.log(this.state.players);

        let token2 = window.location.hash.indexOf("&&", token1);
        this.state.day = parseInt(window.location.hash.substring(token1, token2 - 4));

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