window.onload = function() {
    const images = [
        "./images/instruction-card-01.jpg",
        "./images/instruction-card-02.jpg",
        "./images/instruction-card-03.jpg"
    ];
    let current = 0;
    const img = document.getElementById("flip-img");

    setInterval(() => {
        img.style.transform = "rotateY(180deg)";
        setTimeout(() => {
            current = (current + 1) % images.length;
            img.src = images[current];
            img.style.transform = "rotateY(0deg)";
        }, 300);
    }, 2000);
};