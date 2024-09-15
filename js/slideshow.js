//js for simple slideshow on second page
//mostly taken from good o'l gpt
document.addEventListener('DOMContentLoaded', () => {
    //going to handle all of slideshow in js to keep html cleaner
    const imagesFolder = "../assets/slideshow/"; 
    //array of images
    const imageFiles = ["IMG_0176.JPG", "IMG_0177.JPG", "IMG_0181.JPG", "IMG_0187.JPG", "IMG_0191.JPG", "IMG_0198.JPG", "IMG_0199.JPG", "IMG_0209.JPG", "IMG_0216.JPG", "IMG_0221.JPG", "IMG_0222.JPG", "IMG_0236.JPG"]; 

    const slideshow = document.getElementById('slideshowCont');

    imageFiles.forEach((image, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = `${imagesFolder}${image}`;
        if (index === 0) {
            imgElement.classList.add('active'); 
        }
        slideshow.appendChild(imgElement);
    });

    let currentIndex = 0;
    const images = slideshow.getElementsByTagName('img');
    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    //Changing every 30 seconds 
    setInterval(showNextImage, 30000); 
});

   
    