const about_me_overlay = document.querySelector(".about_me_overlay");
const about_me = document.querySelector("#developer img");
const close_about_me = document.querySelector(".close_about_me .close_icon");
const left_elem = document.querySelectorAll(".left_elem");
const right_about = document.querySelector(".right_about");

const game_pic = document.querySelector("#game_pic");
const game_pic_description = document.querySelector(
    ".about_game_description p"
);

const game_description_screenshots_loc = ["./images/about_game/ui/0.png"];
const game_description_obj = {
    0: "This is overall ui of the game",
};

about_me.addEventListener("click", () => {
    about_me_overlay.style.cssText = "z-index: 1;opacity:1";
});

close_about_me.addEventListener("click", () => {
    about_me_overlay.style.cssText = "z-index: -1;opacity:0";
});

game_pic.setAttribute("src", game_description_screenshots_loc[0]);
game_pic_description.textContent = game_description_obj[0];

left_elem.forEach((elem) => {
    elem.addEventListener("click", (event) => {
        left_elem.forEach((param) => {
            param.classList.remove("active_left_elem");
        });
        event.target.classList.add("active_left_elem");
        if (event.target.textContent == "Game") {
            right_about.children[1].style.display = "none";
            right_about.children[0].style.display = "block";
        } else if (event.target.textContent == "Developer") {
            right_about.children[0].style.display = "none";
            right_about.children[1].style.display = "block";
        }
    });
});
