document.addEventListener('DOMContentLoaded', function() {
    var images = [
        'img/H_ChickenThali.png',
        /*'img/H_MuttonSukkaThali.png', 
        'img/H_ChickenSukkaThali.png',*/
        'img/H_EggCurryThali.png',
        'img/H_ZunkaBhakarThali.png' 
    ];

    var currentIndex = 0;

    setInterval(function() {
        currentIndex = (currentIndex + 1) % images.length; // Loop back to the first image after the last
        document.getElementById('slidingImages').style.backgroundImage = 'url(' + images[currentIndex] + ')';
    }, 2000); // Change image every 4000 milliseconds (4 seconds)
});
