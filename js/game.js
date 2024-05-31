const container = document.querySelector(".container");
const mode_img = document.querySelector("#game-mode-img");
const audio_box = document.querySelector("#audio-box");
const marking_boxes = document.querySelectorAll(".box");
const restart = document.querySelector(".restart");
const player1_name = document.querySelector("#player1_name");
const player2_name = document.querySelector("#player2_name");
const player1_score = document.querySelector(".player1-score");
const player2_score = document.querySelector(".player2-score");
const tie_score = document.querySelector(".tie-score");
const current_player_denoters = document.querySelectorAll(
    ".current-player-denoter"
);
const player_mode_overlay = document.querySelector(".player-mode-overlay span");
const audio_overlay = document.querySelector(".audio_overlay");
const player_score_cards = document.querySelectorAll(".player_score_card");
const audio_file = document.querySelector("#game_audio");
const win_imgs = document.querySelectorAll(".win_img");


const mode1_src = "./images/1-player.png";
const mode2_src = "./images/2-player.png";
let current_player;

let game_mode = 1;

const user_label = {
    player1: "X",
    player2: "O",
};
const user_input = {
    player1: [],
    player2: [],
    not_available: [],
};
const winning_seq = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
const match_won = {
    player1: 0,
    player2: 0,
    tie: 0,
};
const audio_file_loc = {
    0: "./audio/game_won.mp3",
    1: "./audio/markdown.mp3",
    2:"./audio/tie_sound.mp3"
};

let game_state = 1;
let is_audio_on = true;

function game_function() {
    function play_audio() {
        if (is_audio_on) {
            audio_file.setAttribute("src", audio_file_loc[game_state]);
            audio_file.play();
        }
    }

    function reset_game() {
        game_state = 1;
        let player_val;
        marking_boxes.forEach((box) => {
            box.textContent = "";
        });
        if (game_mode == 1) {
            player_val = 1;
            player2_name.innerHTML = "COMPUTER(<span>O</span>)";
            player_mode_overlay.textContent = 2;
            mode_img.setAttribute("src", mode2_src);
        } else if (game_mode == 2) {
            player_val = Math.ceil(Math.random() * 2);
            player2_name.innerHTML = "PLAYER(<span>O</span>)";
            player_mode_overlay.textContent = 1;
            mode_img.setAttribute("src", mode1_src);
        }
        current_player = `player${player_val}`;
        // console.log(user_input)
        current_player_denoters[0].classList.add("hide");
        current_player_denoters[1].classList.add("hide");
        win_imgs[0].classList.add("hide");
        win_imgs[1].classList.add("hide");
        player_score_cards[0].classList.remove("active_player");
        player_score_cards[1].classList.remove("active_player");
        current_player_denoters[player_val - 1].classList.remove("hide");
        player_score_cards[player_val - 1].classList.add("active_player");
        user_input.player1 = [];
        user_input.player2 = [];
        user_input.not_available = [];
        player1_score.textContent = match_won.player1;
        player2_score.textContent = match_won.player2;
        tie_score.textContent = match_won.tie;
        marking_boxes.forEach((box)=>{
            box.style.color='#E1F7F5';
        })
        player_score_cards.forEach((card)=>{
            card.style.color='#EEEEEE';
        })
    }

    window.addEventListener("load", () => {
        reset_game();
    });

    function toggle_game_mode() {
        img_src = mode_img.getAttribute("src");
        if (img_src === mode1_src) {
            mode_img.setAttribute("src", mode2_src);
            player2_name.innerHTML = "COMPUTER(<span>O</span>)";
            game_mode = 1;
            player_mode_overlay.textContent = "2";
            match_won.player1 = 0;
            match_won.player2 = 0;
            reset_game();
        } else if (img_src === mode2_src) {
            mode_img.setAttribute("src", mode1_src);
            player2_name.innerHTML = "PLAYER(<span>O</span>)";
            game_mode = 2;
            player_mode_overlay.textContent = "1";
            match_won.player1 = 0;
            match_won.player2 = 0;
            reset_game();
        }
    }

    mode_img.addEventListener("click", toggle_game_mode);

    audio_box.addEventListener("click", () => {
        if (audio_box.getAttribute("src") === "./images/mute.png") {
            audio_box.setAttribute("src", "./images/volume.png");
            audio_overlay.textContent = "On";
            is_audio_on = true;
        } else if (audio_box.getAttribute("src") === "./images/volume.png") {
            audio_box.setAttribute("src", "./images/mute.png");
            audio_overlay.textContent = "Off";
            is_audio_on = false;
        }
    });

    function toggle_current_player() {
        if (game_state) {
            if (current_player === "player1") {
                current_player = "player2";
                current_player_denoters[0].classList.add("hide");
                current_player_denoters[1].classList.remove("hide");
                player_score_cards[0].classList.remove("active_player");
                player_score_cards[1].classList.add("active_player");
            } else if (current_player === "player2") {
                current_player = "player1";
                current_player_denoters[0].classList.remove("hide");
                current_player_denoters[1].classList.add("hide");
                player_score_cards[1].classList.remove("active_player");
                player_score_cards[0].classList.add("active_player");
            }
        }
    }

    restart.addEventListener("click", reset_game);

    function updatescore() {
        player1_score.textContent = match_won.player1;
        player2_score.textContent = match_won.player2;
        tie_score.textContent = match_won.tie;
    }

    marking_boxes.forEach((box, box_index) => {
        box.addEventListener("click", () => {
            if (game_state) {
                if (marking_boxes[box_index].textContent === "") {
                    marking_boxes[box_index].textContent =
                        user_label[current_player];
                    user_input[current_player].push(box_index);
                    user_input.not_available.push(box_index);
                    if (win_check()) {
                        updatescore();
                        setTimeout(reset_game, 1500);
                        console.log("winner is declared");
                        return;
                    } else {
                        play_audio();
                        // audio_file.play();
                        toggle_current_player();
                    }

                    if (
                        game_mode == 1 &&
                        current_player == "player2" &&
                        game_state
                    ) {
                        while (user_input.not_available.length != 9) {
                            //this is computers choice you have to make it better so that you can have a better game
                            computer_choice = Math.floor(Math.random() * 9);

                            if (
                                marking_boxes[computer_choice].textContent ===
                                ""
                            ) {
                                setTimeout(() => {
                                    marking_boxes[computer_choice].textContent =
                                        user_label[current_player];
                                    user_input[current_player].push(
                                        computer_choice
                                    );
                                    user_input.not_available.push(
                                        computer_choice
                                    );
                                    if (win_check()) {
                                        updatescore();
                                        setTimeout(reset_game, 1500);
                                        console.log("winner is declared");
                                        return;
                                    } else {
                                        play_audio();
                                        // audio_file.play();
                                        toggle_current_player();
                                    }
                                }, 250);
                                break;
                            }
                        }
                    }
                }

                // this is for draw matches
                if (user_input.not_available.length == 9 && game_state) {
                    match_won.tie += 1;
                    // console.log('this is tie')
                    if(is_audio_on){
                        audio_file.setAttribute('src',audio_file_loc[2]);
                        audio_file.play()
                    }
                    marking_boxes.forEach((box)=>{
                        box.style.cssText='color: #DC5F00;';
                    })
                    setTimeout(reset_game, 1500);
                    return 0;
                }
            }
            if (!game_state) {
                // console.log('updated via initial'); 
                updatescore();
                setTimeout(reset_game, 1500);
            }
        });
    });

    function win_check() {
        winning_seq.forEach((seq,seq_index) => {
            let seq_match_count = 0;
            seq.forEach((seq_elem) => {
                if (user_input[current_player].includes(seq_elem)) {
                    seq_match_count += 1;
                }
            });
            if (seq_match_count == 3) {
                match_won[current_player] += 1;
                game_state = 0;
                if (current_player == "player1") {
                    win_imgs[0].classList.remove("hide");
                    player_score_cards[0].style.color='#4CCD99';
                    player_score_cards[1].style.color='#DC5F00';
                    
                    
                } else if (current_player == "player2") {
                    win_imgs[1].classList.remove("hide");
                    player_score_cards[0].style.color='#DC5F00';
                    player_score_cards[1].style.color='#4CCD99';
                    
                }
                marking_boxes.forEach((box,index)=>{
                    if(seq.includes(index)){
                        // console.log(seq)
                        box.style.color='#4CCD99';
                    }
                })
                return current_player == "player1" ? 1 : 2;
            }
        });

        return 0;
    }
}

game_function();


